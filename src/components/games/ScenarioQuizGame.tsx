import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GameQuestion } from "@/data/miniGameQuestions";
import { useTranslation } from "react-i18next";
import { CheckCircle2, XCircle, Trophy, ArrowLeft } from "lucide-react";

interface ScenarioQuizGameProps {
  questions: GameQuestion[];
  scenarioTitle: string;
  onComplete: (score: number, totalQuestions: number) => void;
}

const ScenarioQuizGame = ({ questions, scenarioTitle, onComplete }: ScenarioQuizGameProps) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
    } else {
      setIsGameComplete(true);
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsGameComplete(false);
  };

  const getButtonVariant = (answer: string) => {
    if (!showResult) return "outline";
    if (answer === currentQuestion.correctAnswer) return "default";
    if (answer === selectedAnswer) return "destructive";
    return "outline";
  };

  // Shuffle answers
  const allAnswers = [currentQuestion.correctAnswer, ...currentQuestion.wrongAnswers].sort(() => Math.random() - 0.5);

  if (isGameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-muted/30 p-4 flex items-center justify-center">
        <Card className="card-elevated max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl">{t('miniGames.gameComplete.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">
                {score}/{questions.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {percentage}% {t('miniGames.gameComplete.correct')}
              </p>
              {percentage === 100 && (
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  {t('miniGames.gameComplete.perfect')}
                </p>
              )}
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={handlePlayAgain} 
                className="flex-1"
                size="lg"
              >
                {t('miniGames.gameComplete.playAgain')}
              </Button>
              <Button 
                onClick={() => window.history.back()} 
                variant="outline"
                className="flex-1"
                size="lg"
              >
                {t('miniGames.gameComplete.backToScenarios')}
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
        {/* Exit Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('miniGames.exitGame')}
        </Button>

        {/* Header */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{scenarioTitle}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {t('miniGames.question')} {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-6">
            {/* Scenario Image */}
            <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
              <img 
                src={currentQuestion.imageUrl} 
                alt={scenarioTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Translation Instruction */}
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold text-primary">
                {currentQuestion.questionLanguage === "en" 
                  ? t('miniGames.translateToRussian')
                  : t('miniGames.translateToEnglish')
                }
              </p>
              
              {/* Phrase to Translate */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-2xl font-bold">
                  {currentQuestion.questionLanguage === "en" 
                    ? currentQuestion.phraseEN
                    : currentQuestion.phraseRU
                  }
                </p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {allAnswers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  variant={getButtonVariant(answer)}
                  className="w-full text-lg py-6 justify-start"
                  disabled={showResult}
                >
                  <span className="flex items-center gap-3 w-full">
                    {showResult && answer === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    )}
                    {showResult && answer === selectedAnswer && answer !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span className="text-left">{answer}</span>
                  </span>
                </Button>
              ))}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
              }`}>
                <p className="font-semibold mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer 
                    ? t('miniGames.feedback.correct')
                    : t('miniGames.feedback.incorrect')
                  }
                </p>
                {selectedAnswer !== currentQuestion.correctAnswer && (
                  <p className="text-sm">
                    {t('miniGames.feedback.correctAnswer')}: {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <Button 
                onClick={handleNext} 
                className="w-full"
                size="lg"
              >
                {currentQuestionIndex < questions.length - 1 
                  ? t('miniGames.nextQuestion')
                  : t('miniGames.viewResults')
                }
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Score Display */}
        <Card className="card-elevated">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('miniGames.currentScore')}</span>
              <span className="text-xl font-bold">{score}/{currentQuestionIndex + (showResult ? 1 : 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioQuizGame;
