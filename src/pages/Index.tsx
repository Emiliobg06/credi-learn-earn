import { useState } from "react";
import { Wallet, TrendingUp, Presentation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/ScoreCard";
import { TokenBalance } from "@/components/TokenBalance";
import { TransactionList } from "@/components/TransactionList";
import { BadgesSection } from "@/components/BadgesSection";
import { TransactionDialog } from "@/components/TransactionDialog";
import { LocalMarketplace } from "@/components/LocalMarketplace";
import { CryptoEducation } from "@/components/CryptoEducation";
import { useToast } from "@/hooks/use-toast";
import type { Transaction, Badge, UserStats, LocalBenefit, CryptoLesson } from "@/types";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [stats, setStats] = useState<UserStats>({
    creditScore: 685,
    crediTokens: 2450,
    totalTransactions: 87,
    savingsRate: 15,
    monthlyProgress: 12,
    formalTransactions: 5
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'Salario',
      amount: 3500,
      description: 'Pago mensual',
      date: new Date(2025, 9, 20),
      impact: 'positive'
    },
    {
      id: '2',
      type: 'expense',
      category: 'Comida',
      amount: 85,
      description: 'Supermercado',
      date: new Date(2025, 9, 22),
      impact: 'negative'
    },
    {
      id: '3',
      type: 'saving',
      category: 'Ahorro',
      amount: 500,
      description: 'Ahorro mensual',
      date: new Date(2025, 9, 21),
      impact: 'positive'
    },
    {
      id: '4',
      type: 'expense',
      category: 'Servicios',
      amount: 120,
      description: 'Internet y streaming',
      date: new Date(2025, 9, 18),
      impact: 'neutral'
    },
    {
      id: '5',
      type: 'expense',
      category: 'Transporte',
      amount: 45,
      description: 'Gasolina',
      date: new Date(2025, 9, 23),
      impact: 'negative'
    }
  ]);

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Primer Paso',
      description: 'Primera transacción',
      icon: '',
      unlocked: true,
      requirement: '1 transacción'
    },
    {
      id: '2',
      name: 'Ahorrador',
      description: 'Ahorra 3 meses seguidos',
      icon: '',
      unlocked: true,
      requirement: '3 meses ahorrando'
    },
    {
      id: '3',
      name: 'Disciplinado',
      description: '30 días sin gastos impulsivos',
      icon: '',
      unlocked: false,
      requirement: '30 días consecutivos'
    },
    {
      id: '4',
      name: 'Inversionista',
      description: 'Primera inversión',
      icon: '',
      unlocked: false,
      requirement: 'Realizar 1 inversión'
    },
    {
      id: '5',
      name: 'Maestro',
      description: 'Score mayor a 750',
      icon: '',
      unlocked: false,
      requirement: 'Score 750+'
    },
    {
      id: '6',
      name: 'Consistente',
      description: '100 transacciones',
      icon: '',
      unlocked: false,
      requirement: '100 transacciones'
    }
  ];

  const [localBenefits, setLocalBenefits] = useState<LocalBenefit[]>([
    {
      id: '1',
      businessName: 'Café Blockchain',
      category: 'cafe',
      discount: 15,
      description: 'Descuento en café y snacks. Ambiente perfecto para trabajar.',
      icon: '',
      requiredFormalTransactions: 3,
      unlocked: true,
      location: 'Centro, Calle Principal 123'
    },
    {
      id: '2',
      businessName: 'CoWork Crypto',
      category: 'coworking',
      discount: 20,
      description: 'Espacio de coworking con internet de alta velocidad.',
      icon: '',
      requiredFormalTransactions: 10,
      unlocked: false,
      location: 'Zona Financiera, Av. Innovación 456'
    },
    {
      id: '3',
      businessName: 'Taller DeFi',
      category: 'taller',
      discount: 25,
      description: 'Talleres presenciales de finanzas descentralizadas.',
      icon: '',
      requiredFormalTransactions: 5,
      unlocked: true,
      location: 'Universidad Tecnológica, Campus Norte'
    },
    {
      id: '4',
      businessName: 'Restaurante Digital',
      category: 'restaurante',
      discount: 10,
      description: 'Comida saludable con pago en cripto aceptado.',
      icon: '',
      requiredFormalTransactions: 7,
      unlocked: false,
      location: 'Plaza Comercial, Local 789'
    }
  ]);

  const [cryptoLessons, setCryptoLessons] = useState<CryptoLesson[]>([
    {
      id: '1',
      title: 'Introducción a Blockchain',
      description: 'Aprende los conceptos básicos de blockchain y criptomonedas.',
      difficulty: 'beginner',
      duration: 15,
      completed: true,
      rewardTokens: 100,
      icon: ''
    },
    {
      id: '2',
      title: 'Carteras Digitales',
      description: 'Cómo crear y gestionar tu primera wallet de manera segura.',
      difficulty: 'beginner',
      duration: 20,
      completed: true,
      rewardTokens: 150,
      icon: ''
    },
    {
      id: '3',
      title: 'Smart Contracts Básicos',
      description: 'Entiende cómo funcionan los contratos inteligentes.',
      difficulty: 'intermediate',
      duration: 30,
      completed: false,
      rewardTokens: 200,
      icon: ''
    },
    {
      id: '4',
      title: 'DeFi y Finanzas Descentralizadas',
      description: 'Explora el mundo de las finanzas sin intermediarios.',
      difficulty: 'intermediate',
      duration: 25,
      completed: false,
      rewardTokens: 250,
      icon: ''
    },
    {
      id: '5',
      title: 'Trading y Análisis Técnico',
      description: 'Estrategias avanzadas para operar en mercados cripto.',
      difficulty: 'advanced',
      duration: 45,
      completed: false,
      rewardTokens: 300,
      icon: ''
    }
  ]);


  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date()
    };

    setTransactions([transaction, ...transactions]);
    
    // Simulate score change and token reward
    const isFormal = transaction.type === 'income' || transaction.type === 'saving';
    const scoreChange = transaction.type === 'saving' ? 5 : 
                       transaction.type === 'income' ? 3 : -2;
    const tokenReward = transaction.type === 'saving' ? 50 : 
                       transaction.type === 'income' ? 20 : 10;
    
    const newFormalCount = isFormal ? stats.formalTransactions + 1 : stats.formalTransactions;

    setStats(prev => ({
      ...prev,
      creditScore: Math.min(850, Math.max(300, prev.creditScore + scoreChange)),
      crediTokens: prev.crediTokens + tokenReward,
      totalTransactions: prev.totalTransactions + 1,
      formalTransactions: newFormalCount
    }));

    // Unlock benefits based on formal transactions
    setLocalBenefits(prev => prev.map(benefit => ({
      ...benefit,
      unlocked: benefit.unlocked || newFormalCount >= benefit.requiredFormalTransactions
    })));

    toast({
      title: "¡Transacción agregada!",
      description: `+${tokenReward} CrediTokens ganados${isFormal ? ' | Transacción formal registrada' : ''}`,
    });
  };

  const handleClaimBenefit = (benefitId: string) => {
    const benefit = localBenefits.find(b => b.id === benefitId);
    if (benefit && benefit.unlocked) {
      toast({
        title: "¡Cupón activado!",
        description: `${benefit.discount}% de descuento en ${benefit.businessName}`,
      });
    }
  };

  const handleStartLesson = (lessonId: string) => {
    setCryptoLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
    
    const lesson = cryptoLessons.find(l => l.id === lessonId);
    if (lesson) {
      setStats(prev => ({
        ...prev,
        crediTokens: prev.crediTokens + lesson.rewardTokens
      }));

      toast({
        title: "¡Lección completada!",
        description: `+${lesson.rewardTokens} CrediTokens ganados`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">CrediLearn</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/pitch")}
                className="gap-2"
              >
                <Presentation className="h-4 w-4" />
                Ver Pitch
              </Button>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{stats.totalTransactions} transacciones</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <ScoreCard score={stats.creditScore} change={stats.monthlyProgress} />
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

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <LocalMarketplace 
            benefits={localBenefits}
            formalTransactions={stats.formalTransactions}
            onClaimBenefit={handleClaimBenefit}
          />
          <CryptoEducation 
            lessons={cryptoLessons}
            onStartLesson={handleStartLesson}
          />
        </div>
      </main>

      <TransactionDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
