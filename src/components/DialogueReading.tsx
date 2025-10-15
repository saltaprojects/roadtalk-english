import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { getDialoguesByDifficulty, type DialogueDifficulty } from "@/data/dialogueTexts";

interface DialogueReadingProps {
  difficulty: DialogueDifficulty;
  onBack: () => void;
}

export const DialogueReading = ({ difficulty, onBack }: DialogueReadingProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { playText, isPlaying } = useTextToSpeech();
  const { isRecording, isAnalyzing, startRecording, stopRecording } = useSpeechRecognition();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceResults, setPracticeResults] = useState<Record<number, { score: number; category: string }>>({});
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
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

            {/* Dialogue Text */}
            <div className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-lg leading-relaxed">{currentDialogue.dialogueText}</p>
              </div>
              
              {/* Transcription */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">{t('dialogue.transcription')}:</p>
                <p className="text-base italic leading-relaxed">{currentDialogue.transcription}</p>
              </div>

              {/* Translation */}
              <div className="bg-accent/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">{t('dialogue.translation')}:</p>
                <p className="text-base leading-relaxed">{currentDialogue.translation}</p>
              </div>
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