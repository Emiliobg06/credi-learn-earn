import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp } from "lucide-react";
import type { AIRecommendation } from "@/types";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export const AIRecommendations = ({ recommendations }: AIRecommendationsProps) => {
  const getPriorityColor = (priority: AIRecommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-lg border-border">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Recomendaciones IA</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-accent/50 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-medium text-foreground flex-1">{rec.title}</h4>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Media' : 'Baja'}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {rec.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>Impacto potencial: +{rec.potentialImpact} puntos</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
