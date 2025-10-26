import { useEffect, useMemo, useState } from "react";
import { Wallet, TrendingUp, Presentation, Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreCard } from "@/components/ScoreCard";
import { TokenBalance } from "@/components/TokenBalance";
import { TransactionList } from "@/components/TransactionList";
import { BadgesSection } from "@/components/BadgesSection";
import { TransactionDialog } from "@/components/TransactionDialog";
import { LocalMarketplace } from "@/components/LocalMarketplace";
import { useToast } from "@/hooks/use-toast";
import BronzeChecklistDialog from "@/components/BronzeChecklistDialog";
import PymesGateDialog from "@/components/PymesGateDialog";
import ProgressRing from "@/components/ProgressRing";
import type { Transaction, Badge, UserStats, LocalBenefit, CryptoLesson } from "@/types";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bronzeOpen, setBronzeOpen] = useState(false);
  const [pymesGateOpen, setPymesGateOpen] = useState(false);

  const [stats, setStats] = useState<UserStats>({
    creditScore: 685,
    crediTokens: 2450,
    totalTransactions: 87,
    savingsRate: 15,
    monthlyProgress: 12,
    formalTransactions: 5
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income',  category: 'Salario',     amount: 3500, description: 'Pago mensual',             date: new Date(2025, 9, 20), impact: 'positive' },
    { id: '2', type: 'expense', category: 'Comida',      amount: 85,   description: 'Supermercado',             date: new Date(2025, 9, 22), impact: 'negative' },
    { id: '3', type: 'saving',  category: 'Ahorro',      amount: 500,  description: 'Ahorro mensual',           date: new Date(2025, 9, 21), impact: 'positive' },
    { id: '4', type: 'expense', category: 'Servicios',   amount: 120,  description: 'Internet y streaming',     date: new Date(2025, 9, 18), impact: 'neutral' },
    { id: '5', type: 'expense', category: 'Transporte',  amount: 45,   description: 'Gasolina',                 date: new Date(2025, 9, 23), impact: 'negative' }
  ]);

  const badges: Badge[] = [
    { id: '1', name: 'Primer Paso',  description: 'Primera transacción', icon: '', unlocked: true,  requirement: '1 transacción' },
    { id: '2', name: 'Ahorrador',    description: 'Ahorra 3 meses seguidos', icon: '', unlocked: true,  requirement: '3 meses ahorrando' },
    { id: '3', name: 'Disciplinado', description: '30 días sin gastos impulsivos', icon: '', unlocked: false, requirement: '30 días consecutivos' },
    { id: '4', name: 'Inversionista',description: 'Primera inversión', icon: '', unlocked: false, requirement: 'Realizar 1 inversión' },
    { id: '5', name: 'Maestro',      description: 'Score mayor a 750', icon: '', unlocked: false, requirement: 'Score 750+' },
    { id: '6', name: 'Consistente',  description: '100 transacciones', icon: '', unlocked: false, requirement: '100 transacciones' },
  ];

  const [localBenefits, setLocalBenefits] = useState<LocalBenefit[]>([
    { id: '1', businessName: 'Café Iguana',    category: 'cafe',       discount: 15, description: 'Descuento en café y snacks. Ambiente perfecto para trabajar.', icon: '', requiredFormalTransactions: 3,  unlocked: true,  location: 'Centro, Calle Principal 123' },
    { id: '2', businessName: 'Sigma Alimentos',      category: 'coworking',  discount: 20, description: 'Espacio de trabajo para Sigma con internet y yogurts.',        icon: '', requiredFormalTransactions: 10, unlocked: false, location: 'Zona Financiera, Av. Innovación 456' },
    { id: '3', businessName: 'Taller A2 Capacitación',        category: 'taller',     discount: 25, description: 'Talleres presenciales de finanzas descentralizadas.',         icon: '', requiredFormalTransactions: 5,  unlocked: true,  location: 'Universidad Tecnológica, Campus Norte' },
    { id: '4', businessName: 'Tacos Dany',category: 'restaurante',discount: 10, description: 'Comida saludable con pago en cripto aceptado.',               icon: '', requiredFormalTransactions: 7,  unlocked: false, location: 'Plaza Comercial, Local 789' }
  ]);

  // Mantengo cryptoLessons SOLO para el popup de Bronce (completedLessons)
  const [cryptoLessons, setCryptoLessons] = useState<CryptoLesson[]>([
    { id: '1', title: 'Introducción a Blockchain', description: 'Aprende los conceptos básicos de blockchain y criptomonedas.', difficulty: 'beginner', duration: 15, completed: true,  rewardTokens: 100, icon: '' },
    { id: '2', title: 'Carteras Digitales',        description: 'Cómo crear y gestionar tu primera wallet de manera segura.',   difficulty: 'beginner', duration: 20, completed: true,  rewardTokens: 150, icon: '' },
    { id: '3', title: 'Smart Contracts Básicos',   description: 'Entiende cómo funcionan los contratos inteligentes.',          difficulty: 'intermediate', duration: 30, completed: false, rewardTokens: 200, icon: '' },
  ]);

  // --------- Progreso para ruedas (lee localStorage si existe) ----------
  const computePymesFallback = useMemo(() => {
    const pct = (stats.formalTransactions / 85) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [stats.formalTransactions]);

  const computePersonalFallback = useMemo(() => {
    // aprox desde score 300..850 → 0..100
    const pct = ((stats.creditScore - 300) / 5.5);
    return Math.max(0, Math.min(100, pct));
  }, [stats.creditScore]);

  const [pymesProgress, setPymesProgress] = useState<number>(() => {
    const v = localStorage.getItem("pymesProgress");
    return v ? Number(v) : computePymesFallback;
  });
  const [personalProgress, setPersonalProgress] = useState<number>(() => {
    const v = localStorage.getItem("personalProgress");
    return v ? Number(v) : computePersonalFallback;
  });

  useEffect(() => {
    const v = localStorage.getItem("pymesProgress");
    if (!v) setPymesProgress(computePymesFallback);
  }, [computePymesFallback]);

  useEffect(() => {
    const v = localStorage.getItem("personalProgress");
    if (!v) setPersonalProgress(computePersonalFallback);
  }, [computePersonalFallback]);
  // ----------------------------------------------------------------------

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = { ...newTransaction, id: Date.now().toString(), date: new Date() };
    setTransactions(prev => [transaction, ...prev]);

    const isFormal = transaction.type === 'income' || transaction.type === 'saving';
    const scoreChange = transaction.type === 'saving' ? 5 : transaction.type === 'income' ? 3 : -2;
    const tokenReward = transaction.type === 'saving' ? 50 : transaction.type === 'income' ? 20 : 10;

    setStats(prev => {
      const newFormalCount = isFormal ? prev.formalTransactions + 1 : prev.formalTransactions;
      setLocalBenefits(bPrev => bPrev.map(benefit => ({
        ...benefit,
        unlocked: benefit.unlocked || newFormalCount >= benefit.requiredFormalTransactions
      })));
      return {
        ...prev,
        creditScore: Math.min(850, Math.max(300, prev.creditScore + scoreChange)),
        crediTokens: prev.crediTokens + tokenReward,
        totalTransactions: prev.totalTransactions + 1,
        formalTransactions: newFormalCount
      };
    });

    toast({ title: "¡Transacción agregada!", description: `+${tokenReward} CrediTokens ganados${isFormal ? ' | Transacción formal registrada' : ''}` });
  };

  const handleClaimBenefit = (benefitId: string) => {
    const benefit = localBenefits.find(b => b.id === benefitId);
    if (benefit && benefit.unlocked) {
      toast({ title: "¡Cupón activado!", description: `${benefit.discount}% de descuento en ${benefit.businessName}` });
    }
  };

  // --------- Gate para Pymes ----------
  const tryEnterPymes = () => {
    const passed = localStorage.getItem("pymes_gate_passed") === "1";
    if (passed) {
      navigate("/learn/pymes");
    } else {
      setPymesGateOpen(true);
    }
  };
  // ------------------------------------

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-[#004977]/20 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/images/capital-one-logo.png"
                alt="Capital One"
                className="h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://logos-world.net/wp-content/uploads/2021/02/Capital-One-Logo.png";
                }}
              />
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-[#004977]" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#004977] to-[#da291c] bg-clip-text text-transparent">
                  CrediSense
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/pitch")}
                className="gap-2 border-[#004977] text-[#004977] hover:bg-[#004977] hover:text-white transition-all"
              >
                <Presentation className="h-4 w-4" />
                Ver Pitch
              </Button>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-[#da291c]" />
                <span>{stats.totalTransactions} transacciones</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <ScoreCard
            score={stats.creditScore}
            change={stats.monthlyProgress}
            formalTransactions={stats.formalTransactions}
            onLevelClick={(levelId) => {
              if (levelId === "bronze") setBronzeOpen(true);
            }}
          />

          <TokenBalance balance={stats.crediTokens} earned={240} />
          <div className="md:col-span-2 lg:col-span-1">
            <TransactionList
              transactions={transactions}
              onAddTransaction={() => setDialogOpen(true)}
            />
          </div>
        </div>

        <div className="mb-6">
          <BadgesSection badges={badges} />
        </div>

        {/* Beneficios + Learn Hub embebido */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <LocalMarketplace
            benefits={localBenefits}
            formalTransactions={stats.formalTransactions}
            onClaimBenefit={handleClaimBenefit}
          />

          {/* Cajita Learn Hub: botones más grandes + rueda progreso */}
          <Card className="p-6 bg-card border-border">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Aprendizaje y SRF</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Completa rutas por niveles para subir tu SRF, desbloquear beneficios y ganar CrediTokens.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {/* Módulo Pymes (con gate) */}
              <div className="rounded-xl border p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <button
                  type="button"
                  onClick={tryEnterPymes}
                  className="text-left w-full"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-lg text-foreground truncate">Pymes</div>
                      <div className="text-xs text-muted-foreground">Formalización y gestión</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Básico → Intermedio → Avanzado
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-4">
                  <ProgressRing value={pymesProgress} label="Progreso del módulo" />
                </div>
              </div>

              {/* Módulo Finanzas personales */}
              <div className="rounded-xl border p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <button
                  type="button"
                  onClick={() => navigate("/learn/personal")}
                  className="text-left w-full"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-lg text-foreground truncate">Finanzas personales</div>
                      <div className="text-xs text-muted-foreground">Alfabetización y salud crediticia</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Básico → Intermedio → Avanzado
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-4">
                  <ProgressRing value={personalProgress} label="Progreso del módulo" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* === DIALOGS === */}
      <PymesGateDialog
        open={pymesGateOpen}
        onOpenChange={setPymesGateOpen}
        onPassed={() => navigate("/learn/pymes")}
      />

      <BronzeChecklistDialog
        open={bronzeOpen}
        onOpenChange={setBronzeOpen}
        formalTransactions={stats.formalTransactions}
        creditScore={stats.creditScore}
        savingsRate={stats.savingsRate}
        completedLessons={cryptoLessons.filter(l => l.completed).length}
        totalTransactions={stats.totalTransactions}
      />

      <TransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
