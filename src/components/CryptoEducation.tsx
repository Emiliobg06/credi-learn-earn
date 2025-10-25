import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CheckCircle2, Coins, Link2, Wallet, FileText, Building2, BarChart3 } from "lucide-react";
import type { CryptoLesson } from "@/types";

interface CryptoEducationProps {
  lessons: CryptoLesson[];
  onStartLesson: (lessonId: string) => void;
}

export const CryptoEducation = ({ lessons, onStartLesson }: CryptoEducationProps) => {
  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-accent/10 text-accent border-accent/20',
      intermediate: 'bg-primary/10 text-primary border-primary/20',
      advanced: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const getIcon = (lessonId: string) => {
    const icons: Record<string, JSX.Element> = {
      '1': <Link2 className="h-6 w-6" />,
      '2': <Wallet className="h-6 w-6" />,
      '3': <FileText className="h-6 w-6" />,
      '4': <Building2 className="h-6 w-6" />,
      '5': <BarChart3 className="h-6 w-6" />
    };
    return icons[lessonId] || <BookOpen className="h-6 w-6" />;
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Educación Cripto</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Progreso</p>
          <p className="text-lg font-bold text-primary">
            {completedCount}/{lessons.length}
          </p>
        </div>
      </div>

      <Progress value={progressPercentage} className="mb-6" />

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`p-4 transition-all ${
              lesson.completed
                ? 'bg-primary/5 border-primary/20'
                : 'bg-card border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-primary">{getIcon(lesson.id)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">
                    {lesson.title}
                  </h3>
                  {lesson.completed && (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                      {lesson.difficulty === 'beginner' && 'Principiante'}
                      {lesson.difficulty === 'intermediate' && 'Intermedio'}
                      {lesson.difficulty === 'advanced' && 'Avanzado'}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration} min</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-primary">
                      <Coins className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        +{lesson.rewardTokens}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onStartLesson(lesson.id)}
                      disabled={lesson.completed}
                      className={lesson.completed 
                        ? "bg-muted text-muted-foreground" 
                        : "bg-primary text-primary-foreground hover:opacity-90"
                      }
                    >
                      {lesson.completed ? 'Completado' : 'Iniciar'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
