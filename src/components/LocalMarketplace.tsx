import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Lock, CheckCircle2 } from "lucide-react";
import type { LocalBenefit } from "@/types";

interface LocalMarketplaceProps {
  benefits: LocalBenefit[];
  formalTransactions: number;
  onClaimBenefit: (benefitId: string) => void;
}

export const LocalMarketplace = ({ benefits, formalTransactions, onClaimBenefit }: LocalMarketplaceProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      cafe: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      coworking: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      taller: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      restaurante: 'bg-green-500/10 text-green-600 border-green-500/20',
      servicios: 'bg-pink-500/10 text-pink-600 border-pink-500/20'
    };
    return colors[category as keyof typeof colors] || colors.cafe;
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Beneficios Locales</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Transacciones formales: {formalTransactions}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Cupones disponibles</p>
          <p className="text-2xl font-bold text-primary">
            {benefits.filter(b => b.unlocked).length}/{benefits.length}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <Card
            key={benefit.id}
            className={`p-4 relative overflow-hidden transition-all ${
              benefit.unlocked
                ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'
                : 'bg-muted/30 border-border opacity-75'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{benefit.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {benefit.businessName}
                  </h3>
                  {benefit.unlocked ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                <Badge className={`${getCategoryColor(benefit.category)} mt-1 text-xs`}>
                  {benefit.category}
                </Badge>
                
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {benefit.description}
                </p>
                
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{benefit.location}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {benefit.discount}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">descuento</span>
                  </div>
                  
                  {benefit.unlocked ? (
                    <Button
                      size="sm"
                      onClick={() => onClaimBenefit(benefit.id)}
                      className="bg-primary text-primary-foreground hover:opacity-90"
                    >
                      Usar cupón
                    </Button>
                  ) : (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Requiere</p>
                      <p className="text-sm font-semibold text-foreground">
                        {benefit.requiredFormalTransactions} formales
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
