import { Volume2, Loader2, Mic, MicOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import type { PronunciationPhrase } from "@/data/pronunciationPhrases";

interface PracticeResult {
  score: number;
  category: 'excellent' | 'good' | 'fair' | 'needsPractice';
}

interface PhraseCardProps {
  phrase: PronunciationPhrase;
  onPlay: (phraseId: string) => void;
  isPlaying: boolean;
  isLoading: boolean;
  onPractice: (phraseId: string) => void;
  isRecording: boolean;
  isAnalyzing: boolean;
  practiceResult: PracticeResult | null;
}

const PhraseCard = ({ phrase, onPlay, isPlaying, isLoading, onPractice, isRecording, isAnalyzing, practiceResult }: PhraseCardProps) => {
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';

  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-700 dark:text-green-300',
    intermediate: 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
    advanced: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
  };

  const categoryLabels = {
    navigation: t('pronunciation.categories.navigation'),
    delivery: t('pronunciation.categories.delivery'),
    border: t('pronunciation.categories.border'),
    emergency: t('pronunciation.categories.emergency'),
    dispatch: t('pronunciation.categories.dispatch'),
    mechanics: t('pronunciation.categories.mechanics'),
  };

  return (
    <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200">
      <div className="space-y-4">
        {/* Header with badges */}
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[phrase.category]}
          </Badge>
          <Badge className={difficultyColors[phrase.difficulty]}>
            {t(`pronunciation.difficulty.${phrase.difficulty}`)}
          </Badge>
        </div>

        {/* English phrase */}
        <div>
          <p className="text-lg font-bold text-foreground mb-2">
            {phrase.english}
          </p>
          
          {/* Cyrillic transcription - only show in Russian mode */}
          {isRussian && (
            <p className="text-sm text-muted-foreground italic mb-2">
              {phrase.transcription}
            </p>
          )}
          
          {/* Russian translation */}
          <p className="text-sm text-muted-foreground">
            {phrase.translation}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => onPlay(phrase.id)}
            disabled={isLoading || isRecording || isAnalyzing}
            className="w-full"
            variant={isPlaying ? "default" : "outline"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('pronunciation.actions.loading')}
              </>
            ) : isPlaying ? (
              <>
                <Volume2 className="mr-2 h-4 w-4 animate-pulse" />
                {t('pronunciation.actions.playing')}
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                {t('pronunciation.actions.playAudio')}
              </>
            )}
          </Button>

          <Button
            onClick={() => onPractice(phrase.id)}
            disabled={isLoading || isPlaying}
            className="w-full"
            variant={isRecording ? "destructive" : "secondary"}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('pronunciation.actions.analyzing')}
              </>
            ) : isRecording ? (
              <>
                <MicOff className="mr-2 h-4 w-4 animate-pulse" />
                {t('pronunciation.actions.recording')}
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                {t('pronunciation.actions.practice')}
              </>
            )}
          </Button>
        </div>

        {/* Practice Result */}
        {practiceResult && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('pronunciation.feedback.score')}</span>
              <span className="text-lg font-bold">{practiceResult.score}%</span>
            </div>
            <Progress value={practiceResult.score} className="h-2" />
            <Badge 
              className={
                practiceResult.category === 'excellent' 
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                  : practiceResult.category === 'good'
                  ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                  : practiceResult.category === 'fair'
                  ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                  : 'bg-red-500/20 text-red-700 dark:text-red-300'
              }
            >
              {t(`pronunciation.feedback.${practiceResult.category}`)}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhraseCard;
