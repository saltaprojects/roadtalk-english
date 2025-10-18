import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GrammarExercise as ExerciseType } from "@/data/grammarTopics";

interface GrammarExerciseProps {
  exercise: ExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

export const GrammarExercise = ({ exercise, onComplete }: GrammarExerciseProps) => {
  const { i18n } = useTranslation();
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const currentLang = i18n.language as 'en' | 'ru';

  const handleSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);
    onComplete(correct);
  };

  const handleNext = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  if (exercise.type === 'multiple-choice') {
    return (
      <Card className="border-2 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="mb-6">
            <div className="text-sm font-semibold text-primary mb-2">
              {currentLang === 'en' ? '🎯 MULTIPLE CHOICE' : '🎯 ВЫБОР ОТВЕТА'}
            </div>
            <p className="text-2xl font-bold mb-6">{exercise.question[currentLang]}</p>
          </div>
          
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
            {exercise.options?.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 mb-3 p-4 rounded-xl border-2 transition-all ${
                  showFeedback && option === exercise.correctAnswer 
                    ? 'bg-green-50 border-green-500 dark:bg-green-950' 
                    : showFeedback && option === userAnswer && !isCorrect 
                    ? 'bg-red-50 border-red-500 dark:bg-red-950' 
                    : 'border-border hover:border-primary hover:bg-accent'
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} disabled={showFeedback} className="h-6 w-6" />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={`cursor-pointer text-lg flex-1 ${
                    showFeedback && option === exercise.correctAnswer ? 'text-green-700 dark:text-green-400 font-bold' : ''
                  } ${
                    showFeedback && option === userAnswer && !isCorrect ? 'text-red-700 dark:text-red-400 font-semibold' : ''
                  }`}
                >
                  {option}
                </Label>
                {showFeedback && option === exercise.correctAnswer && (
                  <Check className="h-6 w-6 text-green-600" />
                )}
                {showFeedback && option === userAnswer && !isCorrect && (
                  <X className="h-6 w-6 text-red-600" />
                )}
              </div>
            ))}
          </RadioGroup>

          {showFeedback && (
            <div className={`mt-6 p-6 rounded-xl border-2 ${
              isCorrect 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 dark:from-green-950 dark:to-green-900' 
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 dark:from-red-950 dark:to-red-900'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {isCorrect ? (
                  <div className="text-4xl">✅</div>
                ) : (
                  <div className="text-4xl">❌</div>
                )}
                <span className="text-2xl font-bold">
                  {isCorrect 
                    ? (currentLang === 'en' ? 'Perfect!' : 'Отлично!') 
                    : (currentLang === 'en' ? 'Not quite right' : 'Не совсем верно')}
                </span>
              </div>
              <p className="text-lg leading-relaxed">{exercise.explanation[currentLang]}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-6">
          {!showFeedback ? (
            <Button onClick={handleSubmit} disabled={!userAnswer} size="lg" className="w-full text-lg h-14">
              {currentLang === 'en' ? '✓ Check Answer' : '✓ Проверить ответ'}
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full text-lg h-14">
              {currentLang === 'en' ? 'Next Exercise →' : 'Следующее упражнение →'}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (exercise.type === 'fill-blank' || exercise.type === 'translate') {
    return (
      <Card className="border-2 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="mb-6">
            <div className="text-sm font-semibold text-primary mb-2">
              {exercise.type === 'fill-blank' 
                ? (currentLang === 'en' ? '✍️ FILL IN THE BLANK' : '✍️ ЗАПОЛНИТЕ ПРОПУСК')
                : (currentLang === 'en' ? '🌐 TRANSLATION' : '🌐 ПЕРЕВОД')}
            </div>
            <p className="text-2xl font-bold mb-6">{exercise.question[currentLang]}</p>
          </div>
          
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={currentLang === 'en' ? 'Type your answer here...' : 'Введите ваш ответ...'}
            disabled={showFeedback}
            className="text-xl h-16 mb-6 text-center font-semibold"
          />

          {showFeedback && (
            <div className={`mt-6 p-6 rounded-xl border-2 ${
              isCorrect 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 dark:from-green-950 dark:to-green-900' 
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 dark:from-red-950 dark:to-red-900'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {isCorrect ? (
                  <div className="text-4xl">✅</div>
                ) : (
                  <div className="text-4xl">❌</div>
                )}
                <span className="text-2xl font-bold">
                  {isCorrect 
                    ? (currentLang === 'en' ? 'Perfect!' : 'Отлично!') 
                    : (currentLang === 'en' ? 'Not quite right' : 'Не совсем верно')}
                </span>
              </div>
              {!isCorrect && (
                <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-lg mb-1 font-semibold">
                    {currentLang === 'en' ? 'Correct answer:' : 'Правильный ответ:'}
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {exercise.correctAnswer}
                  </p>
                </div>
              )}
              <p className="text-lg leading-relaxed">{exercise.explanation[currentLang]}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-6">
          {!showFeedback ? (
            <Button onClick={handleSubmit} disabled={!userAnswer} size="lg" className="w-full text-lg h-14">
              {currentLang === 'en' ? '✓ Check Answer' : '✓ Проверить ответ'}
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full text-lg h-14">
              {currentLang === 'en' ? 'Next Exercise →' : 'Следующее упражнение →'}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return null;
};
