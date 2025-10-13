import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { grammarTopics } from "@/data/grammarTopics";
import { GrammarExercise } from "./GrammarExercise";

export const GrammarLesson = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ru';

  const topic = grammarTopics.find(t => t.id === topicId);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background p-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/mini-grammar')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentLang === 'en' ? 'Back to Topics' : 'К темам'}
          </Button>
          <p>{currentLang === 'en' ? 'Topic not found' : 'Тема не найдена'}</p>
        </div>
      </div>
    );
  }

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setCompletedExercises(prev => prev + 1);
    
    // Move to next exercise after a delay
    setTimeout(() => {
      if (currentExerciseIndex < topic.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      }
    }, 2000);
  };

  const progress = (completedExercises / topic.exercises.length) * 100;
  const isCompleted = completedExercises === topic.exercises.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/mini-grammar')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentLang === 'en' ? 'Back to Topics' : 'К темам'}
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">{topic.title[currentLang]}</CardTitle>
            </div>
            <CardDescription className="text-base">{topic.description[currentLang]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">
                {currentLang === 'en' ? 'Grammar Rule:' : 'Грамматическое правило:'}
              </h3>
              <p className="text-muted-foreground">{topic.explanation[currentLang]}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">
                {currentLang === 'en' ? 'Examples:' : 'Примеры:'}
              </h3>
              <div className="space-y-3">
                {topic.examples.map((example, index) => (
                  <div key={index} className="p-3 bg-secondary/30 rounded-lg">
                    <p className="font-medium">{example.en}</p>
                    <p className="text-sm text-muted-foreground mt-1">{example.ru}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">
              {currentLang === 'en' ? 'Practice Exercises' : 'Упражнения'}
            </h3>
            <span className="text-sm text-muted-foreground">
              {completedExercises}/{topic.exercises.length} {currentLang === 'en' ? 'completed' : 'выполнено'}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
        </div>

        {!isCompleted ? (
          <GrammarExercise
            exercise={topic.exercises[currentExerciseIndex]}
            onComplete={handleExerciseComplete}
          />
        ) : (
          <Card className="border-2 border-green-500">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {currentLang === 'en' ? '🎉 Lesson Complete!' : '🎉 Урок завершен!'}
              </h3>
              <p className="text-lg mb-4">
                {currentLang === 'en' 
                  ? `You got ${correctAnswers} out of ${topic.exercises.length} correct!` 
                  : `Вы ответили правильно на ${correctAnswers} из ${topic.exercises.length}!`}
              </p>
              <Button onClick={() => navigate('/mini-grammar')} className="mt-4">
                {currentLang === 'en' ? 'Back to All Topics' : 'К списку тем'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
