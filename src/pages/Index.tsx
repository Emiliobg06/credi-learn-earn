import { useState } from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { ScoreCard } from "@/components/ScoreCard";
import { TokenBalance } from "@/components/TokenBalance";
import { TransactionList } from "@/components/TransactionList";
import { BadgesSection } from "@/components/BadgesSection";
import { AIRecommendations } from "@/components/AIRecommendations";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useToast } from "@/hooks/use-toast";
import type { Transaction, Badge, AIRecommendation, UserStats } from "@/types";

const Index = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [stats, setStats] = useState<UserStats>({
    creditScore: 685,
    crediTokens: 2450,
    totalTransactions: 87,
    savingsRate: 15,
    monthlyProgress: 12
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
      icon: '🎯',
      unlocked: true,
      requirement: '1 transacción'
    },
    {
      id: '2',
      name: 'Ahorrador',
      description: 'Ahorra 3 meses seguidos',
      icon: '🐷',
      unlocked: true,
      requirement: '3 meses ahorrando'
    },
    {
      id: '3',
      name: 'Disciplinado',
      description: '30 días sin gastos impulsivos',
      icon: '💪',
      unlocked: false,
      requirement: '30 días consecutivos'
    },
    {
      id: '4',
      name: 'Inversionista',
      description: 'Primera inversión',
      icon: '📈',
      unlocked: false,
      requirement: 'Realizar 1 inversión'
    },
    {
      id: '5',
      name: 'Maestro',
      description: 'Score mayor a 750',
      icon: '👑',
      unlocked: false,
      requirement: 'Score 750+'
    },
    {
      id: '6',
      name: 'Consistente',
      description: '100 transacciones',
      icon: '⭐',
      unlocked: false,
      requirement: '100 transacciones'
    }
  ];

  const recommendations: AIRecommendation[] = [
    {
      id: '1',
      title: 'Reduce gastos en entretenimiento',
      description: 'Has gastado 20% más que el mes pasado en entretenimiento. Reducir $100 este mes podría mejorar tu score.',
      priority: 'high',
      category: 'Gastos',
      potentialImpact: 15
    },
    {
      id: '2',
      title: 'Aumenta tu ahorro mensual',
      description: 'Con tu ingreso actual, podrías ahorrar 5% más sin afectar tu estilo de vida.',
      priority: 'medium',
      category: 'Ahorro',
      potentialImpact: 25
    },
    {
      id: '3',
      title: 'Excelente manejo de pagos',
      description: 'Has pagado todos tus servicios a tiempo. ¡Sigue así para mantener tu score alto!',
      priority: 'low',
      category: 'Pagos',
      potentialImpact: 5
    }
  ];

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date()
    };

    setTransactions([transaction, ...transactions]);
    
    // Simulate score change and token reward
    const scoreChange = transaction.type === 'saving' ? 5 : 
                       transaction.type === 'income' ? 3 : -2;
    const tokenReward = transaction.type === 'saving' ? 50 : 
                       transaction.type === 'income' ? 20 : 10;

    setStats(prev => ({
      ...prev,
      creditScore: Math.min(850, Math.max(300, prev.creditScore + scoreChange)),
      crediTokens: prev.crediTokens + tokenReward,
      totalTransactions: prev.totalTransactions + 1
    }));

    toast({
      title: "¡Transacción agregada!",
      description: `+${tokenReward} CrediTokens ganados`,
    });
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

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <AIRecommendations recommendations={recommendations} />
          <BadgesSection badges={badges} />
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
