import { CheckCircle2, Circle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  // datos para evaluar logros
  formalTransactions: number;
  creditScore: number;
  savingsRate: number;         // %
  completedLessons: number;    // # lecciones completadas
  totalTransactions: number;
};

export default function BronzeChecklistDialog({
  open, onOpenChange,
  formalTransactions, creditScore, savingsRate, completedLessons, totalTransactions
}: Props) {
  const items = [
    { id: "formal10", label: "10 transacciones formales", done: formalTransactions >= 10 },
    { id: "score600", label: "Score financiero ≥ 600",     done: creditScore >= 600 },
    { id: "save10",   label: "Tasa de ahorro ≥ 10%",        done: savingsRate >= 10 },
    { id: "lessons2", label: "2 lecciones completadas",     done: completedLessons >= 2 },
    { id: "tx20",     label: "20 transacciones totales",    done: totalTransactions >= 20 },
  ];

  const doneCount = items.filter(i => i.done).length;
  const progress = Math.round((doneCount / items.length) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Nivel Bronce alcanzado 🥉</DialogTitle>
          <DialogDescription>
            Requisitos logrados para Bronce. ¡Sigue así para llegar a Plata!
          </DialogDescription>
        </DialogHeader>

        {/* Progreso */}
        <div className="mt-2">
          <div className="text-sm mb-2">{doneCount}/{items.length} completados • {progress}%</div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-2 bg-amber-600" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Checklist */}
        <ul className="mt-4 space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex items-center gap-2">
              {item.done
                ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                : <Circle className="h-5 w-5 text-muted-foreground" />}
              <span className={`text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Hint para el siguiente nivel */}
        <div className="mt-4 rounded-lg border p-3 text-sm">
          Próximo objetivo (Plata): <strong>35 transacciones formales</strong>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
