import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlashcardProps {
  front: string;
  back: string;
  audioId: string;
}

export const Flashcard = ({ front, back, audioId }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Playing audio",
      description: "Listen carefully",
    });
    // In a real app, this would play actual audio
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
        <p className="text-xl font-bold mb-4">{front}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={playAudio}
          className="mt-auto"
        >
          <Volume2 className="mr-2 h-4 w-4" />
          Listen
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
        <p className="text-lg">{back}</p>
        <p className="text-sm text-muted-foreground mt-4">
          Click to flip back
        </p>
      </div>
    </Card>
  );
};
