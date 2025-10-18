import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, BookOpen, ChevronRight, Lightbulb, FileText, Dumbbell, BookMarked } from "lucide-react";
import { useTranslation } from "react-i18next";
import { grammarTopics } from "@/data/grammarTopics";
import { GrammarExercise } from "./GrammarExercise";
import { QuickTipBox } from "./QuickTipBox";

export const GrammarLesson = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ru';

  const topic = grammarTopics.find(t => t.id === topicId);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

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
      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/mini-grammar')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentLang === 'en' ? 'Back to Topics' : 'К темам'}
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl">{topic.title[currentLang]}</CardTitle>
                <CardDescription className="text-lg mt-1">{topic.description[currentLang]}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="learn" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="learn" className="text-base">
              <Lightbulb className="mr-2 h-4 w-4" />
              {currentLang === 'en' ? 'Learn' : 'Изучить'}
            </TabsTrigger>
            <TabsTrigger value="examples" className="text-base">
              <FileText className="mr-2 h-4 w-4" />
              {currentLang === 'en' ? 'Examples' : 'Примеры'}
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <Dumbbell className="mr-2 h-4 w-4" />
              {currentLang === 'en' ? 'Practice' : 'Практика'}
            </TabsTrigger>
            <TabsTrigger value="reference" className="text-base">
              <BookMarked className="mr-2 h-4 w-4" />
              {currentLang === 'en' ? 'Reference' : 'Справка'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-2xl mb-4 text-primary">
                    {currentLang === 'en' ? '📚 Grammar Rule' : '📚 Грамматическое правило'}
                  </h3>
                  <p className="text-lg leading-relaxed">{topic.explanation[currentLang]}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-xl">
                    {currentLang === 'en' ? '💡 Pro Tips for Truck Drivers' : '💡 Советы для водителей'}
                  </h3>
                  {topic.tips.map((tip, index) => (
                    <QuickTipBox key={index} type="tip" text={tip[currentLang]} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-2 text-primary">
                    {currentLang === 'en' ? '🚛 Real Truck Driver Examples' : '🚛 Примеры из жизни водителей'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {currentLang === 'en' 
                      ? `Example ${currentExampleIndex + 1} of ${topic.examples.length}` 
                      : `Пример ${currentExampleIndex + 1} из ${topic.examples.length}`}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl border-2 border-primary/20 mb-6">
                  <p className="text-2xl font-bold mb-4">{topic.examples[currentExampleIndex].en}</p>
                  <p className="text-xl text-muted-foreground">{topic.examples[currentExampleIndex].ru}</p>
                  {topic.examples[currentExampleIndex].highlight && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300">
                      <span className="font-semibold">
                        {currentLang === 'en' ? '🎯 Focus: ' : '🎯 Обратите внимание: '}
                      </span>
                      <span className="font-bold text-primary">{topic.examples[currentExampleIndex].highlight}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentExampleIndex(Math.max(0, currentExampleIndex - 1))}
                    disabled={currentExampleIndex === 0}
                  >
                    {currentLang === 'en' ? '← Previous' : '← Предыдущий'}
                  </Button>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => setCurrentExampleIndex(Math.min(topic.examples.length - 1, currentExampleIndex + 1))}
                    disabled={currentExampleIndex === topic.examples.length - 1}
                  >
                    {currentLang === 'en' ? 'Next →' : 'Следующий →'}
                  </Button>
                </div>

                <div className="mt-6">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full">
                        {currentLang === 'en' ? 'View All Examples' : 'Показать все примеры'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-3">
                      {topic.examples.map((example, index) => (
                        <div key={index} className="p-4 bg-secondary/20 rounded-lg border">
                          <p className="font-semibold text-lg">{example.en}</p>
                          <p className="text-sm text-muted-foreground mt-1">{example.ru}</p>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-2xl text-primary">
                  {currentLang === 'en' ? '💪 Practice Exercises' : '💪 Упражнения'}
                </h3>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {currentLang === 'en' ? 'Progress' : 'Прогресс'}
                  </p>
                  <p className="text-2xl font-bold">
                    {completedExercises}/{topic.exercises.length}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="h-3 mb-6" />

              {!isCompleted ? (
                <GrammarExercise
                  exercise={topic.exercises[currentExerciseIndex]}
                  onComplete={handleExerciseComplete}
                />
              ) : (
                <Card className="border-4 border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-3">
                      {currentLang === 'en' ? 'Great Job, Driver!' : 'Отличная работа, водитель!'}
                    </h3>
                    <p className="text-xl mb-2">
                      {currentLang === 'en' 
                        ? `You completed all ${topic.exercises.length} exercises!` 
                        : `Вы выполнили все ${topic.exercises.length} упражнений!`}
                    </p>
                    <p className="text-2xl font-bold mb-6">
                      {currentLang === 'en' 
                        ? `Score: ${correctAnswers}/${topic.exercises.length} ⭐` 
                        : `Результат: ${correctAnswers}/${topic.exercises.length} ⭐`}
                    </p>
                    <Button onClick={() => navigate('/mini-grammar')} size="lg" className="text-lg">
                      {currentLang === 'en' ? 'Back to All Topics 🚛' : 'К списку тем 🚛'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reference">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h3 className="font-bold text-2xl mb-4 text-primary">
                  {currentLang === 'en' ? '📋 Quick Reference Cheat Sheet' : '📋 Шпаргалка'}
                </h3>
                
                <div className="p-6 bg-secondary/30 rounded-xl border-2">
                  <h4 className="font-bold text-lg mb-3">
                    {currentLang === 'en' ? 'Rule:' : 'Правило:'}
                  </h4>
                  <p className="text-lg mb-4">{topic.explanation[currentLang]}</p>
                  
                  <h4 className="font-bold text-lg mb-3 mt-6">
                    {currentLang === 'en' ? 'Quick Examples:' : 'Быстрые примеры:'}
                  </h4>
                  <div className="space-y-2">
                    {topic.examples.slice(0, 3).map((example, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                        <span className="text-primary font-bold">✓</span>
                        <div>
                          <p className="font-medium">{example.en}</p>
                          <p className="text-sm text-muted-foreground">{example.ru}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg">
                    {currentLang === 'en' ? 'Remember:' : 'Помните:'}
                  </h4>
                  {topic.tips.map((tip, index) => (
                    <div key={index} className="p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 rounded">
                      <p className="font-medium">{tip[currentLang]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
