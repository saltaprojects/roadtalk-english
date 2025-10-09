import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface FlashcardProps {
  front: string;
  back: string;
  audioId: string;
  transcription?: string;
}

export const Flashcard = ({ front, back, audioId, transcription }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const showTranscription = i18n.language === 'ru' && transcription;

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: t('flashcard.playAudio'),
    });
  };

  return (
    <Card
      className="h-64 cursor-pointer transition-all duration-500 transform hover:scale-105"
      style={{
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center backface-hidden"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <div className="mb-4">
          <span className="text-xs font-medium text-accent uppercase">
            Phrase
          </span>
        </div>
        <p className="text-xl font-bold mb-2">{front}</p>
        {showTranscription && (
          <p className="text-sm text-muted-foreground italic mb-4">
            [{transcription}]
          </p>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={playAudio}
          className="mt-auto"
        >
          <Volume2 className="mr-2 h-4 w-4" />
          {t('flashcard.playAudio')}
        </Button>
      </div>

      <div
        className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center backface-hidden bg-accent/5"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="mb-4">
          <span className="text-xs font-medium text-accent uppercase">
            Meaning
          </span>
        </div>
        <p className="text-base font-semibold mb-2">{front}</p>
        {showTranscription && (
          <p className="text-sm text-muted-foreground italic mb-3">
            [{transcription}]
          </p>
        )}
        <p className="text-lg">{back}</p>
        <p className="text-sm text-muted-foreground mt-4">
          {t('flashcard.flip')}
        </p>
      </div>
    </Card>
  );
};
