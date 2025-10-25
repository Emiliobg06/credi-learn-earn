import { Card } from "@/components/ui/card";
import { Award, Lock, CheckCircle } from "lucide-react";
import type { Badge } from "@/types";

interface BadgesSectionProps {
  badges: Badge[];
}

export const BadgesSection = ({ badges }: BadgesSectionProps) => {
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <Card className="p-6 bg-gradient-card shadow-lg border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Logros</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4 text-accent" />
          <span>{unlockedCount}/{badges.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              badge.unlocked 
                ? 'bg-accent/10 border-accent shadow-md' 
                : 'bg-secondary/50 border-border opacity-60'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <div className={`text-4xl ${badge.unlocked ? 'scale-100' : 'scale-90 grayscale'} transition-all`}>
                  {badge.icon}
                </div>
                {badge.unlocked ? (
                  <CheckCircle className="h-4 w-4 text-success absolute -top-1 -right-1" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground absolute -top-1 -right-1" />
                )}
              </div>
              
              <div>
                <p className={`font-medium text-sm ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {badge.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
