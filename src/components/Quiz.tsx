import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: () => void;
}

export const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Quiz Time!</h2>
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      <Card className="p-8 card-elevated">
        <h3 className="text-xl font-bold mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                variant="outline"
                className={`w-full h-auto p-4 text-left justify-start text-base transition-all ${
                  showCorrect
                    ? "bg-green-50 border-green-500 hover:bg-green-50"
                    : showIncorrect
                    ? "bg-red-50 border-red-500 hover:bg-red-50"
                    : isSelected
                    ? "border-accent bg-accent/5"
                    : ""
                }`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <span className="flex-1">{option}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="space-y-4">
            {selectedAnswer === question.correct ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-800">
                  ✓ Correct! Great job!
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-800">
                  Not quite. The correct answer is: "{question.options[question.correct]}"
                </p>
              </div>
            )}

            <Button
              size="lg"
              className="w-full btn-hero"
              onClick={handleNext}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Current Score</span>
          <span className="font-bold text-lg">
            {score} / {questions.length}
          </span>
        </div>
      </Card>
    </div>
  );
};
