import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { listeningExercises, ListeningExercise } from "@/data/listeningExercises";
import { ListeningExerciseViewer } from "@/components/ListeningExerciseViewer";

const ListeningPractice = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null);

  const isRussian = i18n.language === 'ru';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return t(`practice.levels.${difficulty}.title`);
  };

  const groupedExercises = {
    beginner: listeningExercises.filter(ex => ex.difficulty === 'beginner'),
    intermediate: listeningExercises.filter(ex => ex.difficulty === 'intermediate'),
    advanced: listeningExercises.filter(ex => ex.difficulty === 'advanced'),
  };

  if (selectedExercise) {
    return (
      <ListeningExerciseViewer
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('listeningPractice.back')}
          </Button>
          <h1 className="text-4xl font-bold mb-2">{t('listeningPractice.title')}</h1>
          <p className="text-white/90 text-lg">{t('listeningPractice.subtitle')}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Instructions */}
        <Card className="p-6 bg-blue-500/10 border-blue-500/30">
          <h2 className="text-xl font-bold mb-2">{t('listeningPractice.howItWorks')}</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• {t('listeningPractice.step1')}</li>
            <li>• {t('listeningPractice.step2')}</li>
            <li>• {t('listeningPractice.step3')}</li>
            <li>• {t('listeningPractice.step4')}</li>
          </ul>
        </Card>

        {/* Beginner Exercises */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Badge className={getDifficultyColor('beginner')}>
              {getDifficultyLabel('beginner')}
            </Badge>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedExercises.beginner.map((exercise) => (
              <Card
                key={exercise.id}
                className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">
                    {isRussian ? exercise.titleRu : exercise.title}
                  </h3>
                  <Play className="w-5 h-5 text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Intermediate Exercises */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Badge className={getDifficultyColor('intermediate')}>
              {getDifficultyLabel('intermediate')}
            </Badge>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedExercises.intermediate.map((exercise) => (
              <Card
                key={exercise.id}
                className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">
                    {isRussian ? exercise.titleRu : exercise.title}
                  </h3>
                  <Play className="w-5 h-5 text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced Exercises */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Badge className={getDifficultyColor('advanced')}>
              {getDifficultyLabel('advanced')}
            </Badge>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedExercises.advanced.map((exercise) => (
              <Card
                key={exercise.id}
                className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">
                    {isRussian ? exercise.titleRu : exercise.title}
                  </h3>
                  <Play className="w-5 h-5 text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningPractice;
