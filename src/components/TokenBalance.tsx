import { Card } from "@/components/ui/card";
import { Coins, Sparkles } from "lucide-react";

interface TokenBalanceProps {
  balance: number;
  earned: number;
}

export const TokenBalance = ({ balance, earned }: TokenBalanceProps) => {
  return (
    <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-xl border-0 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <Sparkles className="h-32 w-32" />
      </div>
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          <h3 className="text-sm font-medium opacity-90">CrediTokens</h3>
        </div>
        
        <div className="space-y-1">
          <div className="text-4xl font-bold">
            {balance.toLocaleString()}
          </div>
          <p className="text-sm opacity-80">
            +{earned} ganados este mes
          </p>
        </div>

        <div className="pt-2 border-t border-white/20">
          <p className="text-xs opacity-75">
            Los tokens se ganan con buenos hábitos financieros
          </p>
        </div>
      </div>
    </Card>
  );
};
