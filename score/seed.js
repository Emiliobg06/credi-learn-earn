// score.js — FINAL
import 'dotenv/config';
import fetch from 'node-fetch';
import dayjs from 'dayjs';

const BASE = process.env.NESSIE_BASE_URL || 'http://api.nessieisreal.com';
const KEY  = process.env.NESSIE_KEY;
if (!KEY) { console.error('Falta NESSIE_KEY'); process.exit(1); }

// --- Config scoring ---
const monthsBack = 6;
const weights = {
  income_stability:     0.25,
  spend_to_income:      0.20,
  bill_punctuality:     0.22, // ↑ un poco
  savings_liquidity:    0.15,
  recurrent_reliability:0.10,
  diversification:      0.03, // ↓ un poco
  risk_behaviour:       0.05,
};

// --- Utils ---
const clamp=(v,lo,hi)=>Math.min(Math.max(v,lo),hi);
const sum=(a,f=(x)=>x)=>a.reduce((s,x)=>s+f(x),0);
const mean=(a)=>a.length?sum(a)/a.length:0;
const coefVar=(nums)=>{ if(!nums.length) return 1; const m=mean(nums); if(!m) return 1; const v=mean(nums.map(x=>(x-m)**2)); return Math.sqrt(v)/m; };

const fromISO = dayjs().subtract(monthsBack,'month').startOf('day');

// Acepta ISO y MM/DD/YYYY
const parseDate = (s) => {
  if (!s) return dayjs.invalid();
  let d = dayjs(s);
  if (d.isValid()) return d;
  const m = String(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const [_, mm, dd, yyyy] = m;
    return dayjs(`${yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`);
  }
  return dayjs.invalid();
};

async function jget(path) {
  const url = `${BASE}${path}${path.includes('?') ? '&' : '?'}key=${KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`GET ${path} → ${r.status}`);
  return r.json();
}

function groupByMonth(items, dateField){
  const map = new Map();
  for (const it of items) {
    const d = parseDate(it[dateField] || it.payment_date || it.due_date || it.creation_date);
    if (!d.isValid() || d.isBefore(fromISO)) continue;
    const k = d.format('YYYY-MM');
    map.set(k, (map.get(k) || []).concat(it));
  }
  return map;
}

// Si no hay bills, infiere “recibos” grandes al inicio de mes desde purchases
function inferBillsFromPurchases(purchasesByMonth){
  const inferred=[];
  for (const arr of Object.values(purchasesByMonth)){
    for (const p of arr){
      const d = parseDate(p.purchase_date);
      const isFirst3Days = d.isValid() && d.date() <= 3;
      const isLarge = (p.amount||0) >= 3000;
      if (isFirst3Days && isLarge){
        inferred.push({
          payment_date: d.format('YYYY-MM-DD'),
          payment_amount: p.amount,
          payee: 'Inferred Rent/Service'
        });
        break;
      }
    }
  }
  return inferred;
}

function computeSubscores({monthlyIncome, monthlySpend, bills, purchases, endBalances}){
  const months = Array.from(new Set([
    ...Object.keys(monthlyIncome),
    ...Object.keys(monthlySpend),
    ...Object.keys(endBalances),
  ])).sort();

  const incomes = months.map(m => monthlyIncome[m] || 0);
  const spends  = months.map(m => monthlySpend[m]  || 0);

  // 1) Estabilidad de ingresos (25%)
  const cv = coefVar(incomes.filter(x=>x>0));
  let scIncome = clamp(100 * (1 - Math.min(cv, 1)), 0, 100);
  if (incomes.filter(x=>x>0).length >= Math.max(1, Math.floor(monthsBack * 0.8))) scIncome = clamp(scIncome + 10, 0, 100);

  // 2) Relación gasto/ingreso (20%)
  const ratios = months.map((m,i)=>{ const inc=incomes[i], sp=spends[i]; if(inc<=0 && sp>0) return 1.2; if(inc<=0) return 0; return sp/inc; });
  const scSpendIncome = clamp(100 - 100 * (mean(ratios.map(r=>clamp(r,0,1.2))) / 1.2), 0, 100);

  // 3) Puntualidad de bills (22%) — reales o inferidas
  let billsUse = bills;
  if (!billsUse.length) billsUse = inferBillsFromPurchases(purchases);
  const totalBills = billsUse.length;
  const onTime = billsUse.filter(b => {
    const d = parseDate(b.payment_date);
    return d.isValid() && d.date() <= 3; // pagado al inicio de mes
  }).length;
  const scBills = clamp(100 * (totalBills ? onTime / totalBills : 1), 0, 100);

  // 4) Ahorro/Liquidez (15%)
  const savingRates = months.map((m,i)=>{ const inc=incomes[i], sp=spends[i]; if(inc<=0) return 0; return clamp((inc-sp)/inc, 0, 1); });
  const bufferMean  = mean(months.map((m,i)=> clamp((endBalances[m]||0) / (((spends[i]||0)/4.3) + 1e-6), 0, 4)));
  const scSavings   = clamp(50 * (mean(savingRates)/0.2) + 50 * (bufferMean/4), 0, 100);

  // 5) Recurrentes (10%) — rachas de montos parecidos
  const keyByMonth = months.map(m => (purchases[m]||[]).map(p => `${Math.round((p.amount||0)/10)*10}`));
  let maxStreak = 0; const seen = new Map();
  keyByMonth.forEach(keys => {
    const set = new Set(keys);
    for (const k of set) { const prev=seen.get(k)||0; const curr=prev+1; seen.set(k,curr); maxStreak=Math.max(maxStreak,curr); }
    for (const k of Array.from(seen.keys())) if (!set.has(k)) seen.set(k,0);
  });
  const scRecur = clamp((Math.min(maxStreak,6)/6)*100, 0, 100);

  // 6) Diversificación (3%) — ignora renta/servicios para no castigar fijo
  const byMerch = {};
  Object.values(purchases).flat().forEach(p => {
    const mId = (p.merchant_id || 'X');
    const amt = p.amount || 0;
    const d = parseDate(p.purchase_date);
    const looksMonthlyRent = (d.isValid() && d.date() <= 3 && amt >= 3000);
    if (looksMonthlyRent) return; // no lo cuentes para HHI
    byMerch[mId] = (byMerch[mId] || 0) + amt;
  });
  let scDiv = 100;
  const totSp = sum(Object.values(byMerch));
  if (totSp > 0) {
    const shares = Object.values(byMerch).map(v => v / totSp);
    const hhi = shares.reduce((a,s)=>a+s*s,0);  // 0..1
    scDiv = clamp(100 * (1 - Math.min(hhi, 0.66) / 0.66), 0, 100);
  }

  // 7) Riesgo (5%) — meses con gasto > 1.2× ingreso
  const risky = months.map((m,i)=> (spends[i]||0) > (incomes[i]||0) * 1.2 ? 1 : 0);
  const scRisk = clamp(100 - 10 * sum(risky), 0, 100);

  return {
    income_stability:      Math.round(scIncome),
    spend_to_income:       Math.round(scSpendIncome),
    bill_punctuality:      Math.round(scBills),
    savings_liquidity:     Math.round(scSavings),
    recurrent_reliability: Math.round(scRecur),
    diversification:       Math.round(scDiv),
    risk_behaviour:        Math.round(scRisk)
  };
}

function totalScore(s){
  const sum100 = Object.entries(s).reduce((acc,[k,v]) => acc + v * (weights[k] || 0), 0);
  return Math.round(sum100 * 10); // 0..1000
}

async function compute(customerId){
  const accounts = await jget(`/customers/${customerId}/accounts`);
  const purchasesAll = {}, depositsAll = {}, billsAll = [], endBalances = {};
  for (const acc of accounts) {
    const [purchases, deposits, bills] = await Promise.all([
      jget(`/accounts/${acc._id}/purchases`),
      jget(`/accounts/${acc._id}/deposits`),
      jget(`/accounts/${acc._id}/bills`)
    ]);
    const gp = groupByMonth(purchases, 'purchase_date');
    const gd = groupByMonth(deposits,  'transaction_date');
    for (const [m,arr] of gp) purchasesAll[m] = (purchasesAll[m] || []).concat(arr);
    for (const [m,arr] of gd) depositsAll[m]  = (depositsAll[m]  || []).concat(arr);

    // Bills de los últimos N meses
    billsAll.push(...bills.filter(b => {
      const d = parseDate(b.payment_date || b.due_date);
      return d.isValid() && d.isAfter(fromISO);
    }));

    // Snapshot de balance para colchón
    endBalances[dayjs().format('YYYY-MM')] = acc.balance || 0;
  }

  const monthlyIncome = {}, monthlySpend = {};
  for (const [m,arr] of Object.entries(depositsAll))  monthlyIncome[m] = sum(arr, x=>x.amount||0);
  for (const [m,arr] of Object.entries(purchasesAll)) monthlySpend[m]  = sum(arr, x=>x.amount||0);

  const subs = computeSubscores({ monthlyIncome, monthlySpend, bills: billsAll, purchases: purchasesAll, endBalances });
  const score = totalScore(subs);

  console.log(JSON.stringify({ customerId, score, subscores: subs }, null, 2));
}

const id = process.argv[2];
if (!id) { console.error('Uso: npm run score -- <CUSTOMER_ID>'); process.exit(1); }
compute(id).catch(e => { console.error(e); process.exit(1); });
