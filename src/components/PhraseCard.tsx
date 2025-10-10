import { Volume2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import type { PronunciationPhrase } from "@/data/pronunciationPhrases";

interface PhraseCardProps {
  phrase: PronunciationPhrase;
  onPlay: (phraseId: string) => void;
  isPlaying: boolean;
  isLoading: boolean;
}

const PhraseCard = ({ phrase, onPlay, isPlaying, isLoading }: PhraseCardProps) => {
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

        {/* Play button */}
        <Button
          onClick={() => onPlay(phrase.id)}
          disabled={isLoading}
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
      </div>
    </Card>
  );
};

export default PhraseCard;
