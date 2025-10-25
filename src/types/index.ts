export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'saving';
  category: string;
  amount: number;
  description: string;
  date: Date;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  potentialImpact: number;
}

export interface UserStats {
  creditScore: number;
  crediTokens: number;
  totalTransactions: number;
  savingsRate: number;
  monthlyProgress: number;
}
