import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Word } from "@/data/vocabularyWords";

interface WordCardProps {
  word: Word;
  onClick: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}

export const WordCard = ({ word, onClick, isSelected, isDisabled }: WordCardProps) => {
  const { playText, isPlaying } = useTextToSpeech();
  const Icon = word.icon;

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    playText(word.text);
  };

  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-primary bg-primary/10" : ""
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="h-8 w-8 text-primary" />
        <p className="text-lg font-semibold text-center">{word.text}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlayAudio}
          disabled={isPlaying || isDisabled}
          className="h-8 w-8 p-0"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
