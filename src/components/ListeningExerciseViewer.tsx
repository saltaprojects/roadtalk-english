import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ListeningExercise } from "@/data/listeningExercises";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ListeningExerciseViewerProps {
  exercise: ListeningExercise;
  onClose: () => void;
}

export const ListeningExerciseViewer = ({ exercise, onClose }: ListeningExerciseViewerProps) => {
  const { t, i18n } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const isRussian = i18n.language === 'ru';

  const options = [
    { value: 'correct', text: exercise.correctText, textRu: exercise.correctTextRu },
    { value: 'wrong1', text: exercise.wrongOption1, textRu: exercise.wrongOption1Ru },
    { value: 'wrong2', text: exercise.wrongOption2, textRu: exercise.wrongOption2Ru },
  ].sort(() => Math.random() - 0.5); // Randomize order

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswer("");
    setIsSubmitted(false);
    setShowQuestion(false);
  };

  const isCorrect = selectedAnswer === 'correct';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('listeningPractice.backToExercises')}
          </Button>
          <h1 className="text-3xl font-bold">
            {isRussian ? exercise.titleRu : exercise.title}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Video Section */}
        <Card className="p-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              width="100%"
              height="100%"
              src={exercise.videoUrl}
              title={exercise.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          
          {!showQuestion && (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t('listeningPractice.watchInstructions')}
              </p>
              <Button onClick={() => setShowQuestion(true)} size="lg">
                {t('listeningPractice.showQuestion')}
              </Button>
            </div>
          )}
        </Card>

        {/* Question Section */}
        {showQuestion && !isSubmitted && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {t('listeningPractice.chooseCorrect')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('listeningPractice.selectVersion')}
            </p>

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-4">
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAnswer(option.value)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      <div className="font-semibold mb-1">
                        {t('listeningPractice.option')} {String.fromCharCode(65 + index)}
                      </div>
                      <div>{isRussian ? option.textRu : option.text}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full mt-6"
              size="lg"
            >
              {t('listeningPractice.submitAnswer')}
            </Button>
          </Card>
        )}

        {/* Feedback Section */}
        {isSubmitted && (
          <div className="space-y-4">
            {isCorrect ? (
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <AlertDescription className="ml-2">
                  <div className="font-bold text-lg text-green-700 dark:text-green-400">
                    {t('listeningPractice.correct')}
                  </div>
                  <div className="mt-2">
                    {t('listeningPractice.wellDone')}
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-500 bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-500" />
                <AlertDescription className="ml-2">
                  <div className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">
                    {t('listeningPractice.incorrect')}
                  </div>
                  <div className="mb-2">{t('listeningPractice.correctAnswerIs')}</div>
                  <div className="p-3 bg-background rounded-md border">
                    <div className="font-semibold">{exercise.correctText}</div>
                    <div className="text-muted-foreground mt-1">{exercise.correctTextRu}</div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Card className="p-6 bg-blue-500/10 border-blue-500/30">
              <h3 className="font-bold mb-2">{t('listeningPractice.translation')}</h3>
              <p className="text-muted-foreground">{exercise.correctTextRu}</p>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {t('listeningPractice.tryAgain')}
              </Button>
              <Button
                onClick={onClose}
                className="flex-1"
                size="lg"
              >
                {t('listeningPractice.nextExercise')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
