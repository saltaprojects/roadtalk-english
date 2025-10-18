import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight, ArrowLeft, Eye, EyeOff, Gauge } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { getDialoguesByDifficulty, type DialogueDifficulty } from "@/data/dialogueTexts";

interface DialogueReadingProps {
  difficulty: DialogueDifficulty;
  onBack: () => void;
}

export const DialogueReading = ({ difficulty, onBack }: DialogueReadingProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { playText, isPlaying } = useTextToSpeech();
  const { isRecording, isAnalyzing, startRecording, stopRecording } = useSpeechRecognition();
  const isRussian = i18n.language === 'ru';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceResults, setPracticeResults] = useState<Record<number, { score: number; category: string }>>({});
  const [showTranslation, setShowTranslation] = useState(isRussian);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const dialogues = getDialoguesByDifficulty(difficulty);
  const currentDialogue = dialogues[currentIndex];
  const progress = ((currentIndex + 1) / dialogues.length) * 100;

  const handlePlayAudio = () => {
    if (currentDialogue) {
      playText(currentDialogue.dialogueText);
    }
  };

  const handleRecord = async () => {
    if (!currentDialogue) return;

    if (isRecording) {
      stopRecording();
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const result = await startRecording(currentDialogue.dialogueText);
      
      setPracticeResults(prev => ({
        ...prev,
        [currentIndex]: {
          score: result.score,
          category: result.category,
        },
      }));

      toast({
        title: `${result.score}%`,
        description: t(`dialogue.feedback.${result.category}`),
      });

    } catch (error: any) {
      let errorMessage = t('dialogue.feedback.recognitionError');
      
      if (error.message === 'microphone-permission') {
        errorMessage = t('dialogue.feedback.microphoneError');
      } else if (error.message === 'no-speech') {
        errorMessage = t('dialogue.feedback.noSpeechDetected');
      }

      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate overall score
      const scores = Object.values(practiceResults);
      const averageScore = scores.length > 0
        ? Math.round(scores.reduce((sum, r) => sum + r.score, 0) / scores.length)
        : 0;

      toast({
        title: t('dialogue.feedback.completed'),
        description: `${t('dialogue.feedback.overallScore')}: ${averageScore}%`,
      });
      
      onBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentResult = practiceResults[currentIndex];

  if (!currentDialogue) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">{t('dialogue.feedback.noDialogues')}</p>
            <Button onClick={onBack} className="mt-4">
              {t('contact.back')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25];
    const currentIdx = speeds.indexOf(playbackSpeed);
    const nextIdx = (currentIdx + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-background to-muted dark:from-amber-950/5 dark:via-background dark:to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{t('dialogue.readingPractice')}</CardTitle>
              <Badge variant="secondary">
                {currentIndex + 1} / {dialogues.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
        </Card>

        {/* Main Practice Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
            {/* Header with Difficulty and Title */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge 
                  variant={
                    difficulty === 'beginner' ? 'default' :
                    difficulty === 'intermediate' ? 'secondary' : 'destructive'
                  }
                >
                  {t(`dialogue.difficulty.${difficulty}`)}
                </Badge>
                <Badge variant="outline">
                  {currentDialogue.category}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold">{t(currentDialogue.titleKey)}</h2>
            </div>

            {/* Reading Controls */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Label htmlFor="show-translation" className="text-sm cursor-pointer">
                  {showTranslation ? <Eye className="w-4 h-4 inline mr-1" /> : <EyeOff className="w-4 h-4 inline mr-1" />}
                  {t('dialogue.showTranslation')}
                </Label>
                <Switch
                  id="show-translation"
                  checked={showTranslation}
                  onCheckedChange={setShowTranslation}
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={cycleSpeed}
                className="gap-2"
              >
                <Gauge className="w-4 h-4" />
                {playbackSpeed}x
              </Button>
            </div>

            {/* Dialogue Text */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50/50 to-background dark:from-amber-950/10 dark:to-background p-6 rounded-lg border-l-4 border-l-amber-600/50">
                <p className="text-lg leading-relaxed font-serif">{currentDialogue.dialogueText}</p>
              </div>
              
              {/* Transcription */}
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground mb-2">{t('dialogue.transcription')}:</p>
                <p className="text-base italic leading-relaxed">{currentDialogue.transcription}</p>
              </div>

              {/* Translation - Conditional, only in Russian mode */}
              {showTranslation && isRussian && (
                <div className="bg-accent/30 p-4 rounded-lg border border-accent/20 animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-2">{t('dialogue.translation')}:</p>
                  <p className="text-base leading-relaxed">{currentDialogue.translation}</p>
                </div>
              )}

              {/* Reading Stats */}
              {currentDialogue.wordCount && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{currentDialogue.wordCount} words</span>
                  {currentDialogue.estimatedReadingTime && (
                    <>
                      <span>•</span>
                      <span>{currentDialogue.estimatedReadingTime} min reading time</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handlePlayAudio}
                disabled={isPlaying || isRecording}
                variant="outline"
                size="lg"
                className="flex-1 max-w-xs"
              >
                <Volume2 className="mr-2 h-5 w-5" />
                {isPlaying ? t('dialogue.playing') : t('dialogue.listenToDialogue')}
              </Button>
              
              <Button
                onClick={handleRecord}
                disabled={isPlaying || isAnalyzing}
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                className="flex-1 max-w-xs"
              >
                <Mic className="mr-2 h-5 w-5" />
                {isRecording 
                  ? t('dialogue.recording') 
                  : isAnalyzing 
                  ? t('dialogue.analyzing')
                  : t('dialogue.recordReading')}
              </Button>
            </div>

            {/* Practice Result */}
            {currentResult && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                currentResult.category === 'excellent' || currentResult.category === 'good'
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
              }`}>
                {currentResult.category === 'excellent' || currentResult.category === 'good' ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{currentResult.score}%</p>
                  <p className="text-sm">{t(`dialogue.feedback.${currentResult.category}`)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('dialogue.previous')}
          </Button>
          
          <Button
            onClick={onBack}
            variant="ghost"
            size="lg"
          >
            {t('contact.back')}
          </Button>
          
          <Button
            onClick={handleNext}
            size="lg"
          >
            {currentIndex < dialogues.length - 1 ? (
              <>
                {t('dialogue.next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              t('dialogue.finish')
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};