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
      <Card className="border-2">
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-4">{exercise.question[currentLang]}</p>
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
            {exercise.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`option-${index}`} disabled={showFeedback} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={`cursor-pointer ${
                    showFeedback && option === exercise.correctAnswer ? 'text-green-600 font-semibold' : ''
                  } ${
                    showFeedback && option === userAnswer && !isCorrect ? 'text-red-600' : ''
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showFeedback && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                <span className="font-semibold">{isCorrect ? 'Correct!' : 'Not quite right'}</span>
              </div>
              <p className="text-sm">{exercise.explanation[currentLang]}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!showFeedback ? (
            <Button onClick={handleSubmit} disabled={!userAnswer} className="w-full">
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              Next Exercise
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (exercise.type === 'fill-blank' || exercise.type === 'translate') {
    return (
      <Card className="border-2">
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-4">{exercise.question[currentLang]}</p>
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={currentLang === 'en' ? 'Type your answer...' : 'Введите ваш ответ...'}
            disabled={showFeedback}
            className="mb-4"
          />

          {showFeedback && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                <span className="font-semibold">{isCorrect ? 'Correct!' : 'Not quite right'}</span>
              </div>
              {!isCorrect && (
                <p className="text-sm mb-2">
                  <strong>{currentLang === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}</strong>
                  {exercise.correctAnswer}
                </p>
              )}
              <p className="text-sm">{exercise.explanation[currentLang]}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!showFeedback ? (
            <Button onClick={handleSubmit} disabled={!userAnswer} className="w-full">
              {currentLang === 'en' ? 'Check Answer' : 'Проверить'}
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              {currentLang === 'en' ? 'Next Exercise' : 'Следующее упражнение'}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return null;
};
