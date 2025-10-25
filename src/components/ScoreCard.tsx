// src/components/ScoreCard.tsx
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";

interface ScoreCardProps {
  score: number;               // ej. 685
  change: number;              // ej. +12
  formalTransactions: number;  // ej. 5 → Bronce
  onLevelClick?: (levelId: "bronze" | "silver" | "gold" | "platinum") => void;
}

// Ajuste de umbrales: Bronce con 5 para que tu estado actual (5) ya cuente como desbloqueado
const LEVELS = [
  { id: "bronze",   label: "Bronce",   required: 5,   color: "text-amber-700",  border: "border-amber-500",  bg: "bg-amber-100",  bar: "bg-amber-600",  ring: "focus:ring-amber-500" },
  { id: "silver",   label: "Plata",    required: 35,  color: "text-slate-700",  border: "border-slate-500",  bg: "bg-slate-100",  bar: "bg-slate-600",  ring: "focus:ring-slate-500" },
  { id: "gold",     label: "Oro",      required: 60,  color: "text-yellow-700", border: "border-yellow-500", bg: "bg-yellow-100", bar: "bg-yellow-700", ring: "focus:ring-yellow-500" },
  { id: "platinum", label: "Platino",  required: 85,  color: "text-violet-700", border: "border-violet-500", bg: "bg-violet-100", bar: "bg-violet-600", ring: "focus:ring-violet-500" },
] as const;

export const ScoreCard = ({
  score,
  change,
  formalTransactions,
  onLevelClick,
}: ScoreCardProps) => {
  const isPositive = change >= 0;
  const scoreColor =
    score >= 700 ? "text-accent" :
    score >= 600 ? "text-primary" :
    "text-destructive";

  // % barra (rango 300–850)
  const min = 300, max = 850;
  const pct = Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));

  // Nivel actual alcanzado (el más alto)
  const currentLevel =
    [...LEVELS].reverse().find(l => formalTransactions >= l.required) ?? null;

  // Color de la barra: prioriza el nivel; si no hay, usa esquema por score
  const barColor = currentLevel
    ? currentLevel.bar
    : (score >= 700 ? "bg-accent" : score >= 600 ? "bg-primary" : "bg-destructive");

  // Color del ícono del encabezado "Fortalecimiento"
  const headingIconColor = currentLevel ? currentLevel.color : "text-amber-700";

  const handleClick = (levelId: typeof LEVELS[number]["id"], unlocked: boolean) => {
    if (!unlocked) return;
    if (onLevelClick) onLevelClick(levelId);
  };

  return (
    <Card className="p-6 bg-card shadow-lg border-border">
      <div className="space-y-4">
        {/* Header + delta */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Score Financiero</h3>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-medium">{isPositive ? '+' : ''}{change}</span>
          </div>
        </div>

        {/* Valor + barra */}
        <div className="space-y-2">
          <div className={`text-5xl font-bold ${scoreColor}`}>{score}</div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>300</span>
            <span className="font-medium">Excelente: 700+</span>
            <span>850</span>
          </div>
        </div>

        {/* Mensaje */}
        <p className="text-sm text-muted-foreground">
          {score >= 700 ? '¡Excelente! Mantén tus buenos hábitos.' :
           score >= 600 ? 'Buen progreso. Sigue mejorando.' :
           'Hay oportunidades de mejora. Revisa las recomendaciones.'}
        </p>

        {/* Fortalecimiento: Gamificación de Progreso Formal */}
        <div className="mt-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <Trophy className={`h-4 w-4 ${headingIconColor}`} />
            <span>80%</span>
          </div>

          {/* Grid: nivel actual vívido; demás lavados + hover en desbloqueados */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {LEVELS.map((lvl) => {
              const unlocked = formalTransactions >= lvl.required;
              const isCurrent = currentLevel?.id === lvl.id;

              const base = [
                "text-left rounded-2xl border-2 p-4 transition-all",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                lvl.bg, lvl.border, lvl.ring,
              ].join(" ");

              const stateClasses = isCurrent
                ? "opacity-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                : unlocked
                  ? "opacity-90 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                  : "opacity-60 cursor-not-allowed";

              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleClick(lvl.id, unlocked)}
                  className={`${base} ${stateClasses}`}
                  aria-pressed={isCurrent}
                  aria-disabled={!unlocked}
                  aria-label={`Nivel ${lvl.label}${unlocked ? '' : ' bloqueado'}`}
                >
                  <div className={`flex items-center gap-2 ${lvl.color} ${unlocked ? "" : "opacity-80"}`}>
                    <Trophy className="h-5 w-5" />
                    <div className="text-lg font-semibold text-slate-900">{lvl.label}</div>
                  </div>
                  <div className="mt-1 text-sm text-slate-700">
                    {lvl.required} transacciones
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* /Fortalecimiento */}
      </div>
    </Card>
  );
};
