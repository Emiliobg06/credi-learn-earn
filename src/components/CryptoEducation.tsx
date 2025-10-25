import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, Clock, CheckCircle2, Coins,
  Link2, Wallet, FileText, Building2, BarChart3
} from "lucide-react";
import type { CryptoLesson } from "@/types";

interface CryptoEducationProps {
  lessons: CryptoLesson[];
  onStartLesson: (lessonId: string) => void;
}

export const CryptoEducation = ({ lessons, onStartLesson }: CryptoEducationProps) => {
  // Toggle: 'pending' (no completadas) | 'completed' (completadas)
  const [view, setView] = useState<"pending" | "completed">("pending");

  const completedCount = useMemo(
    () => lessons.filter(l => l.completed).length,
    [lessons]
  );
  const progressPercentage = lessons.length ? (completedCount / lessons.length) * 100 : 0;

  const filteredLessons = useMemo(() => {
    return lessons
      .filter(l => (view === "completed" ? l.completed : !l.completed))
      // opcional: ordenar por dificultad/tiempo/etc.
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [lessons, view]);

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
      {/* Header */}
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

      <Progress value={progressPercentage} className="mb-4" />

      {/* Toggle bar */}
      <div className="mb-4 inline-flex rounded-xl border border-border p-1 bg-background">
        <button
          type="button"
          onClick={() => setView("pending")}
          className={[
            "px-3 py-1.5 rounded-lg text-sm transition",
            view === "pending"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          ].join(" ")}
          aria-pressed={view === "pending"}
        >
          No completadas
          <span className="ml-2 rounded-md px-1.5 py-0.5 text-xs bg-muted text-foreground/80">
            {lessons.length - completedCount}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setView("completed")}
          className={[
            "ml-1 px-3 py-1.5 rounded-lg text-sm transition",
            view === "completed"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          ].join(" ")}
          aria-pressed={view === "completed"}
        >
          Completadas
          <span className="ml-2 rounded-md px-1.5 py-0.5 text-xs bg-muted text-foreground/80">
            {completedCount}
          </span>
        </button>
      </div>

      {/* Scrollable list */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredLessons.length === 0 ? (
          <Card className="p-6 border-dashed text-center text-sm text-muted-foreground">
            {view === "completed"
              ? "Aún no tienes lecciones completadas."
              : "No hay lecciones pendientes. ¡Excelente!"}
          </Card>
        ) : (
          filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`p-4 transition-all ${
                lesson.completed
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-card border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-primary shrink-0">{getIcon(lesson.id)}</div>

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
                        className={
                          lesson.completed
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
          ))
        )}
      </div>
    </Card>
  );
};
