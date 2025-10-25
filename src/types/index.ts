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
  formalTransactions: number;
}

export interface LocalBenefit {
  id: string;
  businessName: string;
  category: 'cafe' | 'coworking' | 'taller' | 'restaurante' | 'servicios';
  discount: number;
  description: string;
  icon: string;
  requiredFormalTransactions: number;
  unlocked: boolean;
  expiresAt?: Date;
  location: string;
}

export interface CryptoLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  completed: boolean;
  rewardTokens: number;
  icon: string;
}
