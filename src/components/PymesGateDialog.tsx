import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

type Answers = {
  size: "micro" | "pequena" | "mediana" | "grande" | "";
  employees: "lt10" | "10to49" | "50to249" | "250plus" | "";
  revenue: "lt5m" | "5to30m" | "30to500m" | "500mplus" | "";
  attest: boolean;
};

interface PymesGateDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPassed: () => void; // navega a /learn/pymes
}

export default function PymesGateDialog({
  open,
  onOpenChange,
  onPassed,
}: PymesGateDialogProps) {
  const [ans, setAns] = useState<Answers>({
    size: "",
    employees: "",
    revenue: "",
    attest: false,
  });

  // Criterios de elegibilidad (ejemplo):
  // - Tamaño: mediana o grande
  // - Ó empleados: 50+
  // - Ó ingresos: >= 30M MXN
  const isEligible = useMemo(() => {
    const sizeOK = ans.size === "mediana" || ans.size === "grande";
    const empOK = ans.employees === "50to249" || ans.employees === "250plus";
    const revOK = ans.revenue === "30to500m" || ans.revenue === "500mplus";
    return (sizeOK || empOK || revOK) && ans.attest;
  }, [ans]);

  const handleContinue = () => {
    if (!isEligible) return;
    // Guarda banderita (opcional) para no mostrar el quiz otra vez
    localStorage.setItem("pymes_gate_passed", "1");
    onOpenChange(false);
    onPassed();
  };

  const Btn = ({
    active,
    onClick,
    children,
  }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-left w-full rounded-lg border px-3 py-2 text-sm transition",
        active
          ? "border-primary bg-primary/10"
          : "border-border hover:bg-muted/50",
      ].join(" ")}
    >
      {children}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Verificación rápida para Módulo Pymes</DialogTitle>
          <DialogDescription>
            Responde para confirmar que operas una empresa mediana o grande.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tamaño */}
          <div>
            <p className="text-sm font-medium mb-2">Tamaño de empresa</p>
            <div className="grid sm:grid-cols-4 gap-2">
              <Btn active={ans.size === "micro"} onClick={() => setAns(p => ({ ...p, size: "micro" }))}>Micro</Btn>
              <Btn active={ans.size === "pequena"} onClick={() => setAns(p => ({ ...p, size: "pequena" }))}>Pequeña</Btn>
              <Btn active={ans.size === "mediana"} onClick={() => setAns(p => ({ ...p, size: "mediana" }))}>Mediana</Btn>
              <Btn active={ans.size === "grande"} onClick={() => setAns(p => ({ ...p, size: "grande" }))}>Grande</Btn>
            </div>
          </div>

          {/* Empleados */}
          <div>
            <p className="text-sm font-medium mb-2">Número de empleados</p>
            <div className="grid sm:grid-cols-4 gap-2">
              <Btn active={ans.employees === "lt10"} onClick={() => setAns(p => ({ ...p, employees: "lt10" }))}>{"< 10"}</Btn>
              <Btn active={ans.employees === "10to49"} onClick={() => setAns(p => ({ ...p, employees: "10to49" }))}>10–49</Btn>
              <Btn active={ans.employees === "50to249"} onClick={() => setAns(p => ({ ...p, employees: "50to249" }))}>50–249</Btn>
              <Btn active={ans.employees === "250plus"} onClick={() => setAns(p => ({ ...p, employees: "250plus" }))}>250+</Btn>
            </div>
          </div>

          {/* Ingresos */}
          <div>
            <p className="text-sm font-medium mb-2">Ingresos anuales aproximados (MXN)</p>
            <div className="grid sm:grid-cols-4 gap-2">
              <Btn active={ans.revenue === "lt5m"} onClick={() => setAns(p => ({ ...p, revenue: "lt5m" }))}>{"< 5M"}</Btn>
              <Btn active={ans.revenue === "5to30m"} onClick={() => setAns(p => ({ ...p, revenue: "5to30m" }))}>5–30M</Btn>
              <Btn active={ans.revenue === "30to500m"} onClick={() => setAns(p => ({ ...p, revenue: "30to500m" }))}>30–500M</Btn>
              <Btn active={ans.revenue === "500mplus"} onClick={() => setAns(p => ({ ...p, revenue: "500mplus" }))}>{"> 500M"}</Btn>
            </div>
          </div>

          {/* Attest */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ans.attest}
              onChange={(e) => setAns(p => ({ ...p, attest: e.target.checked }))}
              className="h-4 w-4"
            />
            Declaro que la información proporcionada es verdadera.
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button onClick={handleContinue} disabled={!isEligible}>
              Continuar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
