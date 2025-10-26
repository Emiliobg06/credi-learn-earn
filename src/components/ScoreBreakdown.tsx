import React from "react";
import { Card } from "@/components/ui/card";

export type Subscores = {
  income_stability: number;
  spend_to_income: number;
  bill_punctuality: number;
  savings_liquidity: number;
  recurrent_reliability: number;
  diversification: number;
  risk_behaviour: number;
};

const LABELS: Record<keyof Subscores, string> = {
  income_stability: "Estabilidad de ingresos",
  spend_to_income: "Gasto vs ingreso",
  bill_punctuality: "Puntualidad en pagos",
  savings_liquidity: "Ahorro y liquidez",
  recurrent_reliability: "Recurrentes confiables",
  diversification: "Diversificación de gasto",
  risk_behaviour: "Riesgo de sobre-gasto",
};

export const WEIGHTS: Record<keyof Subscores, number> = {
  income_stability: 0.25,
  spend_to_income: 0.2,
  bill_punctuality: 0.2,
  savings_liquidity: 0.15,
  recurrent_reliability: 0.1,
  diversification: 0.05,
  risk_behaviour: 0.05,
};

export function computeWeightedIndex(subscores: Subscores) {
  const entries = Object.entries(subscores) as [keyof Subscores, number][];
  return Math.round(entries.reduce((acc, [k, v]) => acc + v * (WEIGHTS[k] ?? 0), 0));
}

const COLOR_CLASSES: Record<keyof Subscores, string> = {
  income_stability: "from-sky-500 to-blue-600",
  spend_to_income: "from-emerald-500 to-teal-600",
  bill_punctuality: "from-amber-500 to-orange-600",
  savings_liquidity: "from-violet-500 to-fuchsia-600",
  recurrent_reliability: "from-cyan-500 to-indigo-600",
  diversification: "from-rose-500 to-pink-600",
  risk_behaviour: "from-lime-500 to-green-600",
};

export default function ScoreBreakdown({ subscores, showHeader = true }: { subscores: Subscores; showHeader?: boolean }) {
  const entries = Object.entries(subscores) as [keyof Subscores, number][];
  const weightedTotal = computeWeightedIndex(subscores);

  return (
    <Card className="p-6 bg-card border-border">
      {showHeader && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Desglose del Score (7 factores)</h3>
            <div className="text-sm text-muted-foreground">
              Índice ponderado: <span className="font-medium text-foreground">{weightedTotal}/100</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Cada factor se mide 0–100 y se pondera para construir tu Score.
          </p>
        </>
      )}

      <div className="mt-4 space-y-4">
        {entries.map(([key, value]) => {
          const label = LABELS[key];
          const weight = WEIGHTS[key] * 100;
          const clamped = Math.max(0, Math.min(100, value));
          const gradient = COLOR_CLASSES[key];
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground">{label}</div>
                <div className="flex items-center gap-2">

                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              </div>
              <div className="h-2 w-full rounded bg-muted">
                <div
                  className={`h-2 rounded bg-gradient-to-r ${gradient}`}
                  style={{ width: `${clamped}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
