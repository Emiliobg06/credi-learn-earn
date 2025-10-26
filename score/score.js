// score.js
import 'dotenv/config';
import fetch from 'node-fetch';
import dayjs from 'dayjs';

const BASE = process.env.NESSIE_BASE_URL;
const KEY  = process.env.NESSIE_KEY;
if(!KEY){ console.error('Falta NESSIE_KEY'); process.exit(1); }

const monthsBack=6, fromISO=dayjs().subtract(monthsBack,'month').startOf('day');
const clamp=(v,lo,hi)=>Math.min(Math.max(v,lo),hi);
const sum=(a,f=(x)=>x)=>a.reduce((s,x)=>s+f(x),0);
const mean=(a)=>a.length?sum(a)/a.length:0;
const coefVar=(nums)=>{ if(!nums.length) return 1; const m=mean(nums); if(!m) return 1; const v=mean(nums.map(x=>(x-m)**2)); return Math.sqrt(v)/m; };
const herf=(shares)=>sum(shares.map(s=>s*s));

async function jget(p){ const r=await fetch(`${BASE}${p}${p.includes('?')?'&':'?'}key=${KEY}`); if(!r.ok) throw new Error(`GET ${p} → ${r.status}`); return r.json(); }

function groupByMonth(items, dateField){
  const map=new Map();
  for (const it of items){
    const d=dayjs(it[dateField]||it.payment_date||it.due_date);
    if(!d.isValid()||d.isBefore(fromISO)) continue;
    const k=d.format('YYYY-MM');
    map.set(k,(map.get(k)||[]).concat(it));
  }
  return map;
}

function computeSubscores({monthlyIncome,monthlySpend,bills,purchases,endBalances}){
  const months = Array.from(new Set([...Object.keys(monthlyIncome),...Object.keys(monthlySpend),...Object.keys(endBalances)])).sort();
  const incomes=months.map(m=>monthlyIncome[m]||0);
  const spends =months.map(m=>monthlySpend[m] ||0);

  // 1) Ingresos (25%)
  const cv=coefVar(incomes.filter(x=>x>0));
  let scIncome=clamp(100*(1-Math.min(cv,1)),0,100);
  if(incomes.filter(x=>x>0).length>=5) scIncome=clamp(scIncome+10,0,100);

  // 2) Gasto/Ingreso (20%)
  const ratios=months.map((m,i)=>{ const inc=incomes[i], sp=spends[i]; if(inc<=0&&sp>0) return 1.2; if(inc<=0) return 0; return sp/inc; });
  const scSpendIncome=clamp(100-100*(mean(ratios.map(r=>clamp(r,0,1.2)))/1.2),0,100);

  // 3) Bills (20%)
  const total=bills.length, on=bills.filter(b=>(b.status||'').toLowerCase()==='paid').length;
  const late=bills.filter(b=>(b.status||'').toLowerCase()==='past due').length;
  const miss=bills.filter(b=>(b.status||'').toLowerCase()==='cancelled').length;
  let scBills=clamp(100*(total?on/total:1),0,100); scBills=clamp(scBills-30*late-60*miss,0,100);

  // 4) Ahorro/Liquidez (15%)
  const savingRates=months.map((m,i)=>{ const inc=incomes[i], sp=spends[i]; if(inc<=0) return 0; return clamp((inc-sp)/inc,0,1); });
  const bufferMean=mean(months.map((m,i)=>clamp((endBalances[m]||0)/(((spends[i]||0)/4.3)+1e-6),0,4)));
  const scSavings=clamp(50*(mean(savingRates)/0.2)+50*(bufferMean/4),0,100);

  // 5) Recurrentes (10%)
  const keyByMonth=months.map(m=>(purchases[m]||[]).map(p=>`${Math.round((p.amount||0)/10)*10}`));
  let maxStreak=0; const seen=new Map();
  keyByMonth.forEach(keys=>{ const set=new Set(keys); for(const k of set){ const prev=seen.get(k)||0; const curr=prev+1; seen.set(k,curr); maxStreak=Math.max(maxStreak,curr);} for(const k of Array.from(seen.keys())) if(!set.has(k)) seen.set(k,0); });
  const scRecur=clamp((Math.min(maxStreak,6)/6)*100,0,100);

  // 6) Diversificación (5%)
  const byMerch={}; Object.values(purchases).flat().forEach(p=>{ const m=p.merchant_id||'X'; byMerch[m]=(byMerch[m]||0)+(p.amount||0); });
  const totSp=sum(Object.values(byMerch)); const shares=totSp?Object.values(byMerch).map(v=>v/totSp):[];
  const scDiv=clamp(100*(1-Math.min(herf(shares),0.5)/0.5),0,100);

  // 7) Riesgo (5%)
  const risky=months.map((m,i)=> (spends[i]||0) > (incomes[i]||0)*1.2 ? 1 : 0);
  const scRisk=clamp(100-10*sum(risky),0,100);

  return {
    income_stability:Math.round(scIncome),
    spend_to_income:Math.round(scSpendIncome),
    bill_punctuality:Math.round(scBills),
    savings_liquidity:Math.round(scSavings),
    recurrent_reliability:Math.round(scRecur),
    diversification:Math.round(scDiv),
    risk_behaviour:Math.round(scRisk),
  };
}

function totalScore(s){
  const w={income_stability:.25, spend_to_income:.20, bill_punctuality:.20, savings_liquidity:.15, recurrent_reliability:.10, diversification:.05, risk_behaviour:.05};
  const sum100=Object.entries(s).reduce((acc,[k,v])=>acc+v*(w[k]||0),0);
  return Math.round(sum100*10);
}

async function compute(customerId){
  const accounts=await jget(`/customers/${customerId}/accounts`);
  const purchasesAll={}, depositsAll={}, billsAll=[], endBalances={};
  for(const acc of accounts){
    const [purchases,deposits,bills]=await Promise.all([
      jget(`/accounts/${acc._id}/purchases`),
      jget(`/accounts/${acc._id}/deposits`),
      jget(`/accounts/${acc._id}/bills`)
    ]);
    const gp=groupByMonth(purchases,'purchase_date');
    const gd=groupByMonth(deposits,'transaction_date');
    for(const [m,arr] of gp) purchasesAll[m]=(purchasesAll[m]||[]).concat(arr);
    for(const [m,arr] of gd) depositsAll[m] =(depositsAll[m] ||[]).concat(arr);
    billsAll.push(...bills.filter(b=>{ const d=dayjs(b.payment_date||b.due_date); return d.isValid()&&d.isAfter(fromISO); }));
    endBalances[dayjs().format('YYYY-MM')]=acc.balance||0;
  }
  const monthlyIncome={}, monthlySpend={};
  for(const [m,a] of Object.entries(depositsAll))  monthlyIncome[m]=sum(a,x=>x.amount||0);
  for(const [m,a] of Object.entries(purchasesAll)) monthlySpend[m] =sum(a,x=>x.amount||0);

  const subs=computeSubscores({monthlyIncome,monthlySpend,bills:billsAll,purchases:purchasesAll,endBalances});
  const score=totalScore(subs);
  console.log(JSON.stringify({customerId,score,subscores:subs},null,2));
}

const id=process.argv[2];
if(!id){ console.error('Uso: npm run score -- <CUSTOMER_ID>'); process.exit(1); }
compute(id).catch(e=>{console.error(e);process.exit(1);});
