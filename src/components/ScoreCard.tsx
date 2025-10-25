import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ScoreCardProps {
  score: number;
  change: number;
}

export const ScoreCard = ({ score, change }: ScoreCardProps) => {
  const isPositive = change >= 0;
  const scoreColor = score >= 700 ? "text-accent" : score >= 600 ? "text-primary" : "text-destructive";
  
  return (
    <Card className="p-6 bg-gradient-card shadow-lg border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Score Financiero</h3>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-medium">{isPositive ? '+' : ''}{change}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className={`text-5xl font-bold ${scoreColor}`}>
            {score}
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${score >= 700 ? 'bg-accent' : score >= 600 ? 'bg-primary' : 'bg-destructive'}`}
              style={{ width: `${(score / 850) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>300</span>
            <span className="font-medium">Excelente: 700+</span>
            <span>850</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {score >= 700 ? '¡Excelente! Mantén tus buenos hábitos.' : 
           score >= 600 ? 'Buen progreso. Sigue mejorando.' :
           'Hay oportunidades de mejora. Revisa las recomendaciones.'}
        </p>
      </div>
    </Card>
  );
};
