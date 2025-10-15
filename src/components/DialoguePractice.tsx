import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { getPhrasesByCategory, type PhraseCategory } from "@/data/pronunciationPhrases";

interface DialoguePracticeProps {
  category: PhraseCategory | 'all';
  onBack: () => void;
}

export const DialoguePractice = ({ category, onBack }: DialoguePracticeProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { playText, isPlaying } = useTextToSpeech();
  const { isRecording, isAnalyzing, startRecording, stopRecording } = useSpeechRecognition();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceResults, setPracticeResults] = useState<Record<number, { score: number; category: string }>>({});
  
  const phrases = getPhrasesByCategory(category);
  const currentPhrase = phrases[currentIndex];
  const progress = ((currentIndex + 1) / phrases.length) * 100;

  const handlePlayAudio = () => {
    if (currentPhrase) {
      playText(currentPhrase.english);
    }
  };

  const handleRecord = async () => {
    if (!currentPhrase) return;

    if (isRecording) {
      stopRecording();
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const result = await startRecording(currentPhrase.english);
      
      setPracticeResults(prev => ({
        ...prev,
        [currentIndex]: {
          score: result.score,
          category: result.category,
        },
      }));

      toast({
        title: `${result.score}%`,
        description: t(`pronunciation.feedback.${result.category}`),
      });

    } catch (error: any) {
      let errorMessage = t('pronunciation.feedback.recognitionError');
      
      if (error.message === 'microphone-permission') {
        errorMessage = t('pronunciation.feedback.microphoneError');
      } else if (error.message === 'no-speech') {
        errorMessage = t('pronunciation.feedback.noSpeechDetected');
      }

      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate overall score
      const scores = Object.values(practiceResults);
      const averageScore = scores.length > 0
        ? Math.round(scores.reduce((sum, r) => sum + r.score, 0) / scores.length)
        : 0;

      toast({
        title: t('pronunciation.feedback.completed'),
        description: `${t('pronunciation.feedback.overallScore')}: ${averageScore}%`,
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

  if (!currentPhrase) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">{t('pronunciation.feedback.noPhrasesInCategory')}</p>
            <Button onClick={onBack} className="mt-4">
              {t('pronunciation.backToDashboard')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{t('pronunciation.dialoguePractice')}</CardTitle>
              <Badge variant="secondary">
                {currentIndex + 1} / {phrases.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
        </Card>

        {/* Main Practice Card */}
        <Card>
          <CardContent className="p-8 space-y-6">
            {/* Difficulty Badge */}
            <div className="flex justify-between items-center">
              <Badge 
                variant={
                  currentPhrase.difficulty === 'beginner' ? 'default' :
                  currentPhrase.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                }
              >
                {t(`pronunciation.difficulty.${currentPhrase.difficulty}`)}
              </Badge>
              <Badge variant="outline">
                {t(`pronunciation.categories.${currentPhrase.category}`)}
              </Badge>
            </div>

            {/* English Text */}
            <div className="text-center space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-2xl font-semibold mb-2">{currentPhrase.english}</p>
                <p className="text-lg text-muted-foreground italic">{currentPhrase.transcription}</p>
              </div>
              
              {/* Translation */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('pronunciation.translation')}:</p>
                <p className="text-lg">{currentPhrase.translation}</p>
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
                {isPlaying ? t('pronunciation.playing') : t('pronunciation.listenToPhrase')}
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
                  ? t('pronunciation.recording') 
                  : isAnalyzing 
                  ? t('pronunciation.analyzing')
                  : t('pronunciation.recordYourself')}
              </Button>
            </div>

            {/* Practice Result */}
            {currentResult && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                currentResult.category === 'excellent' || currentResult.category === 'good'
                  ? "bg-green-500/10 text-green-700"
                  : "bg-yellow-500/10 text-yellow-700"
              }`}>
                {currentResult.category === 'excellent' || currentResult.category === 'good' ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{currentResult.score}%</p>
                  <p className="text-sm">{t(`pronunciation.feedback.${currentResult.category}`)}</p>
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
            {t('pronunciation.previous')}
          </Button>
          
          <Button
            onClick={onBack}
            variant="ghost"
            size="lg"
          >
            {t('pronunciation.backToDashboard')}
          </Button>
          
          <Button
            onClick={handleNext}
            size="lg"
          >
            {currentIndex < phrases.length - 1 ? (
              <>
                {t('pronunciation.next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              t('pronunciation.finish')
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};