import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { listeningExercises } from "@/data/listeningExercises";
import type { ListeningExercise } from "@/data/listeningExercises";
import { ListeningExerciseViewer } from "@/components/ListeningExerciseViewer";
import { useTranslation } from "react-i18next";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const ListeningPractice = () => {
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { subscribed, createCheckoutSession } = useSubscription();
  const { canAccessItem } = useLessonProgress();

  if (selectedExercise) {
    return (
      <ListeningExerciseViewer
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600';
      case 'intermediate':
        return 'text-orange-600';
      case 'advanced':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return t(`practice.levels.${difficulty}.title`);
  };

  const groupedExercises = listeningExercises.reduce((acc, exercise) => {
    if (!acc[exercise.difficulty]) {
      acc[exercise.difficulty] = [];
    }
    acc[exercise.difficulty].push(exercise);
    return acc;
  }, {} as Record<string, ListeningExercise[]>);

  const handleExerciseClick = (exercise: ListeningExercise, index: number) => {
    const canAccess = canAccessItem('listening', index, subscribed);
    if (canAccess) {
      setSelectedExercise(exercise);
    } else {
      createCheckoutSession();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('miniGames.backToDashboard')}
        </Button>

        <div>
          <h1 className="text-4xl font-bold mb-2">{t('everydayEnglish.listening.title')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('practice.listeningInstructions')}
          </p>
        </div>

        {Object.entries(groupedExercises).map(([difficulty, exercises]) => (
          <div key={difficulty} className="space-y-4">
            <h2 className={`text-2xl font-bold ${getDifficultyColor(difficulty)}`}>
              {getDifficultyLabel(difficulty)}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {exercises.map((exercise, index) => {
                const isFirstInDifficulty = index === 0 && difficulty === 'beginner';
                const canAccess = canAccessItem('listening', isFirstInDifficulty ? 0 : index + 1, subscribed);
                
                return (
                  <Card
                    key={exercise.id}
                    className={`p-6 transition-all duration-200 ${
                      canAccess ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => handleExerciseClick(exercise, isFirstInDifficulty ? 0 : index + 1)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold">{exercise.title}</h3>
                          {isFirstInDifficulty && (
                            <Badge variant="secondary" className="bg-green-500 text-white">
                              {t('freemium.firstFree')}
                            </Badge>
                          )}
                          {!canAccess && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {exercise.duration}
                        </p>
                      </div>
                    </div>
                    {canAccess ? (
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        {t('practice.startPractice')}
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        createCheckoutSession();
                      }}>
                        <Lock className="mr-2 h-4 w-4" />
                        {t('freemium.unlockWith')}
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeningPractice;
