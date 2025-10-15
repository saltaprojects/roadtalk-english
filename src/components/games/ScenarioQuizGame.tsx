import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GameQuestion } from "@/data/miniGameQuestions";
import { useTranslation } from "react-i18next";
import { CheckCircle2, XCircle, Trophy, Timer } from "lucide-react";

interface ScenarioQuizGameProps {
  questions: GameQuestion[];
  scenarioTitle: string;
  onComplete: (score: number, totalQuestions: number) => void;
}

const ScenarioQuizGame = ({ questions, scenarioTitle, onComplete }: ScenarioQuizGameProps) => {
  const { i18n } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = currentQuestion 
    ? [currentQuestion.correctAnswer, ...currentQuestion.wrongAnswers].sort(() => Math.random() - 0.5)
    : [];

  useEffect(() => {
    if (showResult || isGameComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResult, isGameComplete]);

  const handleTimeout = () => {
    setShowResult(true);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(10);
    } else {
      setIsGameComplete(true);
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const getButtonVariant = (answer: string) => {
    if (!showResult) return "outline";
    if (answer === currentQuestion.correctAnswer) return "default";
    if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) return "destructive";
    return "outline";
  };

  if (isGameComplete) {
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="card-elevated max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl">Game Complete!</CardTitle>
            <CardDescription>Great job on completing {scenarioTitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">{finalScore}/{questions.length}</div>
              <div className="text-xl text-muted-foreground">{percentage}% Correct</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {finalScore}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {questions.length - finalScore}
                </div>
                <div className="text-sm text-muted-foreground">Wrong Answers</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()} className="flex-1">
                Play Again
              </Button>
              <Button onClick={() => window.history.back()} variant="outline" className="flex-1">
                Back to Scenarios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{scenarioTitle}</CardTitle>
                <CardDescription>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-muted-foreground" />
                <span className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-primary'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-xl">
              {i18n.language === 'ru' ? currentQuestion.situationRU : currentQuestion.situationEN}
            </CardTitle>
            {i18n.language === 'ru' && (
              <CardDescription className="text-sm italic">
                {currentQuestion.situationEN}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {allAnswers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                variant={getButtonVariant(answer)}
                className="w-full justify-start text-left h-auto py-4 px-6"
                disabled={showResult}
              >
                <span className="flex-1">{answer}</span>
                {showResult && answer === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {showResult && answer === selectedAnswer && answer !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Result Feedback */}
        {showResult && (
          <Card className={`card-elevated ${selectedAnswer === currentQuestion.correctAnswer ? 'border-green-500' : 'border-red-500'} border-2`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Correct!</h3>
                      <p className="text-sm text-muted-foreground">Great job! That's the right response.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                        {selectedAnswer ? "Incorrect" : "Time's Up!"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The correct answer was: <span className="font-semibold">{currentQuestion.correctAnswer}</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <Button onClick={handleNext} className="w-full">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Score Display */}
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Score</span>
              <span className="text-2xl font-bold">{score}/{currentQuestionIndex + (showResult ? 1 : 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioQuizGame;
