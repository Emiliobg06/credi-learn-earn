// src/pages/LearnPymes.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CryptoEducation } from "@/components/CryptoEducation";
import type { CryptoLesson } from "@/types";
import { ArrowLeft } from "lucide-react";

type Diff = "beginner" | "intermediate" | "advanced";

const BASIC: string[] = [
  "Tipos de persona y regímenes (RESICO, AE, moral S.A./S. de R.L.)",
  "RFC, e.firma y Buzón Tributario (alta y uso)",
  "CFDI 4.0: emisor/receptor, uso CFDI, claves, timbrado y cancelación",
  "IVA e ISR: conceptos, obligaciones y calendario fiscal",
  "Cuenta empresarial y separación de finanzas",
  "Costeo básico: costos directos/indirectos, precio y margen",
  "Flujo de caja semanal y conciliación banco–CFDI–POS",
  "Nómina: percepciones/deducciones, IMSS/INFONAVIT, CFDI nómina",
  "Documentación mínima (contratos, políticas, checklist SAT)",
];

const INTERM: string[] = [
  "Declaraciones (IVA/ISR pagos provisionales y anuales)",
  "Control de inventarios y costo de venta",
  "DSO/DPO y capital de trabajo",
  "Crédito Pyme: CAT, líneas, factoraje, garantías",
  "Indicadores: margen bruto/neto, punto de equilibrio, días de caja",
  "SRF (Score de Reputación Financiera): componentes y cómo mejorarlo",
  "Gestión de proveedores y clientes (política de crédito/cobranza)",
  "Cumplimiento y auditoría interna ligera",
  "Protección de datos y buenas prácticas de seguridad",
];

const ADV: string[] = [
  "Planeación fiscal (deducciones, estímulos; sin esquemas agresivos)",
  "Presupuesto maestro y rolling forecast",
  "Análisis de rentabilidad por producto/canal",
  "Estrategias de precios (value-based, bundles, promos)",
  "Riesgo y fraude: señales en CFDI y POS",
  "Open finance para scoring/financiamiento",
  "Credenciales verificables (DID/VC) y reputación portable (blockchain)",
  "Automatización: reglas + IA para alertas y decisiones en tiempo real",
  "Gobierno corporativo básico (roles, controles, comités)",
];

// pequeña fabrica para crear lecciones homogéneas
function buildLessons(items: string[], difficulty: Diff, startId: number): CryptoLesson[] {
  return items.map((title, i) => ({
    id: String(startId + i),
    title,
    description: difficulty === "beginner"
      ? "Fundamentos prácticos para iniciar y formalizar tu operación."
      : difficulty === "intermediate"
      ? "Mejores prácticas para escalar cumplimiento y gestión."
      : "Técnicas avanzadas para optimizar y proteger tu negocio.",
    difficulty,
    duration: difficulty === "beginner" ? 15 : difficulty === "intermediate" ? 25 : 35,
    completed: false,
    rewardTokens: difficulty === "beginner" ? 160 : difficulty === "intermediate" ? 220 : 280,
    icon: ""
  }));
}

export default function LearnPymes() {
  const navigate = useNavigate();

  const initialLessons = useMemo(() => ([
    ...buildLessons(BASIC, "beginner", 100),
    ...buildLessons(INTERM, "intermediate", 200),
    ...buildLessons(ADV, "advanced", 300),
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
          <h1 className="text-xl font-bold text-foreground">Pymes · Formalización y gestión</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="p-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Ruta de aprendizaje por niveles: <strong>Básico → Intermedio → Avanzado</strong>.
            Completa módulos para subir tu SRF y desbloquear beneficios.
          </p>
        </Card>
        <CryptoEducation lessons={lessons} onStartLesson={handleStartLesson} />
      </main>
    </div>
  );
}
