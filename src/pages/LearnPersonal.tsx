// src/pages/LearnPersonal.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CryptoEducation } from "@/components/CryptoEducation";
import type { CryptoLesson } from "@/types";
import { ArrowLeft } from "lucide-react";

type Diff = "beginner" | "intermediate" | "advanced";

const BASIC: string[] = [
  "Presupuesto 50/30/20 y control de gastos",
  "Ahorro de emergencia (3–6 meses)",
  "Interés simple vs. compuesto",
  "Crédito y tarjeta: CAT, pago total vs mínimo, utilización 10–30%",
  "Buró de crédito: qué es, cómo leerlo y mejorarlo",
  "Impuestos PF: RFC, deducciones personales, declaración anual",
  "Seguros esenciales (salud, vida, auto)",
];

const INTERM: string[] = [
  "Metas financieras y automatización de aportes",
  "Deuda inteligente: consolidación, avalancha vs bola de nieve",
  "Inversión básica (fondos, CETES, diversificación)",
  "Planeación de grandes compras (auto, estudios)",
  "Protección contra fraude y ciberseguridad básica",
  "Herramientas: apps de presupuesto, alertas bancarias",
];

const ADV: string[] = [
  "Inversión intermedia (ETFs, índice; riesgo/rendimiento)",
  "Optimización fiscal personal (deducciones, constancias)",
  "Crédito hipotecario: comparación integral (CAT, seguros, comisiones)",
  "Retiro (AFORE/planes privados; asset allocation por edad)",
  "Patrimonio y sucesión (testamento, co-propiedad)",
  "Reputación crediticia: subir score de forma sostenible",
];

function buildLessons(items: string[], difficulty: Diff, startId: number): CryptoLesson[] {
  return items.map((title, i) => ({
    id: String(startId + i),
    title,
    description: difficulty === "beginner"
      ? "Bases para ordenar tus finanzas y evitar errores costosos."
      : difficulty === "intermediate"
      ? "Herramientas y estrategias para acelerar tu progreso."
      : "Optimiza impuestos, inversión y patrimonio a largo plazo.",
    difficulty,
    duration: difficulty === "beginner" ? 15 : difficulty === "intermediate" ? 25 : 35,
    completed: false,
    rewardTokens: difficulty === "beginner" ? 140 : difficulty === "intermediate" ? 210 : 270,
    icon: ""
  }));
}

export default function LearnPersonal() {
  const navigate = useNavigate();

  const initialLessons = useMemo(() => ([
    ...buildLessons(BASIC, "beginner", 400),
    ...buildLessons(INTERM, "intermediate", 500),
    ...buildLessons(ADV, "advanced", 600),
  ]), []);

  const [lessons, setLessons] = useState<CryptoLesson[]>(initialLessons);

  const handleStartLesson = (lessonId: string) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, completed: true } : l));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-xl font-bold text-foreground">Finanzas personales</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="p-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Ruta de aprendizaje por niveles: <strong>Básico → Intermedio → Avanzado</strong>.
            Completa lecciones para mejorar tu score y hábitos financieros.
          </p>
        </Card>
        <CryptoEducation lessons={lessons} onStartLesson={handleStartLesson} />
      </main>
    </div>
  );
}
