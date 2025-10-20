import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Library } from "lucide-react";
import { ImmersiveReader } from "@/components/ImmersiveReader";
import { ReadingPassagePreview } from "@/components/ReadingPassagePreview";
import { getDialoguesByDifficulty, type DialogueDifficulty } from "@/data/dialogueTexts";
const ReadingPractice = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const [selectedReadingDifficulty, setSelectedReadingDifficulty] = useState<DialogueDifficulty | null>(null);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);
  const handleDialogueClick = (dialogue: any) => {
    const dialogues = getDialoguesByDifficulty(dialogue.difficulty);
    const index = dialogues.findIndex(d => d.id === dialogue.id);
    setCurrentReadingIndex(index >= 0 ? index : 0);
    setSelectedReadingDifficulty(dialogue.difficulty);
  };
  if (selectedReadingDifficulty) {
    const dialogues = getDialoguesByDifficulty(selectedReadingDifficulty);
    return <ImmersiveReader dialogues={dialogues} currentIndex={currentReadingIndex} onBack={() => {
      setSelectedReadingDifficulty(null);
      setCurrentReadingIndex(0);
    }} onNext={() => setCurrentReadingIndex(prev => Math.min(prev + 1, dialogues.length - 1))} onPrevious={() => setCurrentReadingIndex(prev => Math.max(prev - 1, 0))} />;
  }
  return <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("contact.back")}
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Library className="w-6 h-6 text-amber-700 dark:text-amber-500" />
            </div>
            <h1 className="text-4xl font-bold flex items-center gap-2">
              {t("dialogue.title")}
              <BookOpen className="w-10 h-10 text-amber-600" />
            </h1>
          </div>
          <p className="text-muted-foreground text-lg ml-16">{t("dialogue.subtitle")}</p>
        </div>

        {/* Beginner Reading Passages */}
        

        {/* Intermediate Reading Passages */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {t('dialogue.difficulty.intermediate')}
            </Badge>
            <h3 className="text-xl font-semibold">{t('dialogue.intermediateDesc')}</h3>
          </div>
          <div className="space-y-3">
            {getDialoguesByDifficulty('intermediate').map(dialogue => <ReadingPassagePreview key={dialogue.id} dialogue={dialogue} onClick={() => handleDialogueClick(dialogue)} />)}
          </div>
        </div>

        {/* Advanced Reading Passages */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="destructive" className="text-sm px-3 py-1">
              {t('dialogue.difficulty.advanced')}
            </Badge>
            <h3 className="text-xl font-semibold">{t('dialogue.advancedDesc')}</h3>
          </div>
          <div className="space-y-3">
            {getDialoguesByDifficulty('advanced').map(dialogue => <ReadingPassagePreview key={dialogue.id} dialogue={dialogue} onClick={() => handleDialogueClick(dialogue)} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default ReadingPractice;