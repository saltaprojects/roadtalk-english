import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WordCard } from "./WordCard";
import { Phrase, Word } from "@/data/vocabularyWords";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useToast } from "@/hooks/use-toast";

interface PhraseBuilderProps {
  phrases: Phrase[];
  scenarioTitle: string;
  scenarioImage: string;
  onComplete: () => void;
}

export const PhraseBuilder = ({ phrases, scenarioTitle, scenarioImage, onComplete }: PhraseBuilderProps) => {
  const { t } = useTranslation();
  const { playText, isPlaying } = useTextToSpeech();
  const { toast } = useToast();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [availableWords, setAvailableWords] = useState<Word[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentPhrase = phrases[currentPhraseIndex];
  const progress = ((currentPhraseIndex + 1) / phrases.length) * 100;

  useEffect(() => {
    if (currentPhrase) {
      const shuffled = [...currentPhrase.targetPhrase, ...currentPhrase.distractorWords]
        .sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setIsCorrect(null);
    }
  }, [currentPhraseIndex, currentPhrase]);

  const handleWordClick = (word: Word) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const handleSelectedWordClick = (word: Word, index: number) => {
    const newSelected = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = () => {
    const isMatch = 
      selectedWords.length === currentPhrase.targetPhrase.length &&
      selectedWords.every((word, index) => word.text === currentPhrase.targetPhrase[index].text);

    setIsCorrect(isMatch);

    if (isMatch) {
      setScore(score + 1);
      const fullPhrase = selectedWords.map(w => w.text).join(" ");
      playText(fullPhrase);
      toast({
        title: t("vocabulary.correct"),
        description: t("vocabulary.correctDescription"),
      });
    } else {
      toast({
        title: t("vocabulary.incorrect"),
        description: t("vocabulary.tryAgain"),
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentPhraseIndex < phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleReset = () => {
    setSelectedWords([]);
    setAvailableWords([...currentPhrase.targetPhrase, ...currentPhrase.distractorWords].sort(() => Math.random() - 0.5));
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{scenarioTitle}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {currentPhraseIndex + 1} / {phrases.length}
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img src={scenarioImage} alt={scenarioTitle} className="w-full h-48 object-cover" />
          </div>

          {/* Selected Words Area */}
          <div className="min-h-[100px] p-4 border-2 border-dashed rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground mb-2">{t("vocabulary.yourPhrase")}:</p>
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectedWordClick(word, index)}
                  variant="secondary"
                  className="h-auto py-2"
                  disabled={isCorrect !== null}
                >
                  {word.text}
                </Button>
              ))}
              {selectedWords.length === 0 && (
                <p className="text-muted-foreground italic">{t("vocabulary.tapWords")}</p>
              )}
            </div>
          </div>

          {/* Available Words */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">{t("vocabulary.availableWords")}:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableWords.map((word, index) => (
                <WordCard
                  key={index}
                  word={word}
                  onClick={() => handleWordClick(word)}
                  isSelected={false}
                  isDisabled={isCorrect !== null}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isCorrect === null ? (
              <>
                <Button
                  onClick={handleCheck}
                  disabled={selectedWords.length === 0}
                  className="flex-1"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {t("vocabulary.checkAnswer")}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </>
            ) : isCorrect ? (
              <Button onClick={handleNext} className="flex-1" size="lg">
                {currentPhraseIndex < phrases.length - 1 ? t("vocabulary.nextPhrase") : t("vocabulary.finish")}
              </Button>
            ) : (
              <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                <RotateCcw className="mr-2 h-5 w-5" />
                {t("vocabulary.tryAgain")}
              </Button>
            )}
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${isCorrect ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">{t("vocabulary.correctFeedback")}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  <span className="font-semibold">{t("vocabulary.incorrectFeedback")}</span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
