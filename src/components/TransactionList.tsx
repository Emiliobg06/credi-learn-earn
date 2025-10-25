import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, PiggyBank, Plus } from "lucide-react";
import type { Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  onAddTransaction: () => void;
}

export const TransactionList = ({ transactions, onAddTransaction }: TransactionListProps) => {
  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return <ArrowDownRight className="h-4 w-4 text-accent" />;
      case 'expense':
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case 'saving':
        return <PiggyBank className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-lg border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transacciones Recientes</h3>
        <Button onClick={onAddTransaction} size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4 mr-1" />
          Nueva
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-background">
                {getIcon(transaction.type)}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${transaction.type === 'income' ? 'text-accent' : transaction.type === 'expense' ? 'text-destructive' : 'text-primary'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
