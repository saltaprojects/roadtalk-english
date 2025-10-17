import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ListeningExercise } from "@/data/listeningExercises";
import { useAudioDialogue } from "@/hooks/useAudioDialogue";

interface ListeningExerciseViewerProps {
  exercise: ListeningExercise;
  onClose: () => void;
}

export const ListeningExerciseViewer = ({ exercise, onClose }: ListeningExerciseViewerProps) => {
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    isPlaying,
    currentLineIndex,
    isLoading,
    hasPlayedOnce,
    playDialogue,
    pause,
    replay,
  } = useAudioDialogue();

  const handlePlay = () => {
    playDialogue(exercise.dialogue, isRussian);
  };

  const handlePause = () => {
    pause();
  };

  const handleReplay = () => {
    setShowQuestion(false);
    setHasSubmitted(false);
    setSelectedAnswer(null);
    replay(exercise.dialogue, isRussian);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setShowQuestion(false);
    replay(exercise.dialogue, isRussian);
  };

  const options = [
    { text: isRussian ? exercise.correctAnswerRu : exercise.correctAnswer, isCorrect: true },
    { text: isRussian ? exercise.wrongOption1Ru : exercise.wrongOption1, isCorrect: false },
    { text: isRussian ? exercise.wrongOption2Ru : exercise.wrongOption2, isCorrect: false },
  ].sort(() => Math.random() - 0.5);

  const isCorrect = selectedAnswer === options.find(o => o.isCorrect)?.text;

  const currentDialogueLine = exercise.dialogue[currentLineIndex];
  const progress = ((currentLineIndex + 1) / exercise.dialogue.length) * 100;

  // Show question button after audio finishes
  const showQuestionButton = hasPlayedOnce && !isPlaying && !showQuestion;

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
            {t('readingPractice.backToExercises')}
          </Button>
          <h1 className="text-3xl font-bold">
            {isRussian ? exercise.titleRu : exercise.title}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Scenario Image Background */}
        <div 
          className="relative w-full h-64 rounded-lg overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${exercise.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Dialogue Display Card */}
        {(isPlaying || hasPlayedOnce) && currentDialogueLine && (
          <Card className="p-6 bg-card/95 backdrop-blur">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12">
                {exercise.characterImage && (
                  <AvatarImage src={exercise.characterImage} />
                )}
                <AvatarFallback>
                  {(isRussian ? currentDialogueLine.speakerRu : currentDialogueLine.speaker)[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  {isRussian ? currentDialogueLine.speakerRu : currentDialogueLine.speaker}
                </h3>
                <p className="text-lg leading-relaxed">
                  {isRussian ? currentDialogueLine.textRu : currentDialogueLine.text}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {t('listeningPractice.line')} {currentLineIndex + 1} / {exercise.dialogue.length}
              </p>
            </div>
          </Card>
        )}

        {/* Audio Controls */}
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {!isPlaying && !hasPlayedOnce && (
                <Button
                  size="lg"
                  onClick={handlePlay}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Play className="h-5 w-5" />
                  {isLoading ? t('listeningPractice.loading') : t('listeningPractice.playAudio')}
                </Button>
              )}

              {isPlaying && (
                <Button
                  size="lg"
                  onClick={handlePause}
                  variant="secondary"
                  className="gap-2"
                >
                  <Pause className="h-5 w-5" />
                  {t('listeningPractice.pause')}
                </Button>
              )}

              {hasPlayedOnce && !isPlaying && (
                <Button
                  size="lg"
                  onClick={handleReplay}
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  {t('listeningPractice.replay')}
                </Button>
              )}
            </div>

            {showQuestionButton && (
              <Button
                size="lg"
                onClick={() => setShowQuestion(true)}
                className="gap-2"
              >
                <Volume2 className="h-5 w-5" />
                {t('listeningPractice.showQuestion')}
              </Button>
            )}
          </div>
        </Card>

        {/* Question Section */}
        {showQuestion && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{t('listeningPractice.question')}</h2>
            <p className="mb-6 text-lg">{t('listeningPractice.whatHappened')}</p>

            <div className="space-y-3 mb-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !hasSubmitted && setSelectedAnswer(option.text)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === option.text
                      ? hasSubmitted
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-red-500 bg-red-50 dark:bg-red-950'
                        : 'border-primary bg-primary/5'
                      : hasSubmitted && option.isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {!hasSubmitted && selectedAnswer && (
              <Button onClick={handleSubmit} size="lg" className="w-full">
                {t('listeningPractice.submit')}
              </Button>
            )}

            {hasSubmitted && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    isCorrect
                      ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200'
                  }`}
                >
                  <p className="font-bold text-lg">
                    {isCorrect ? t('listeningPractice.correct') : t('listeningPractice.incorrect')}
                  </p>
                  {!isCorrect && (
                    <p className="mt-2">
                      {t('listeningPractice.correctAnswer')}: {options.find(o => o.isCorrect)?.text}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleTryAgain} variant="outline" className="flex-1">
                    {t('listeningPractice.tryAgain')}
                  </Button>
                  <Button onClick={onClose} className="flex-1">
                    {t('listeningPractice.finish')}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};
