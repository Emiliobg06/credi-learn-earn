// src/pages/LearnHub.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, User, ArrowLeft } from "lucide-react";

export default function LearnHub() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-xl font-bold text-foreground">Aprendizaje</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Pymes (formalización y gestión)</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Todo para formalizar, facturar, cumplir y gestionar tu negocio.
          </p>
          <Button className="mt-4 self-start" onClick={() => navigate("/learn/pymes")}>Entrar</Button>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Finanzas personales</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Fundamentos para presupuesto, crédito, inversión y protección.
          </p>
          <Button className="mt-4 self-start" onClick={() => navigate("/learn/personal")}>Entrar</Button>
        </Card>
      </main>
    </div>
  );
}
