import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDialoguesByDifficulty, DialogueDifficulty } from "@/data/dialogueTexts";
import { ReadingPassagePreview } from "@/components/ReadingPassagePreview";
import { ImmersiveReader } from "@/components/ImmersiveReader";
import { useTranslation } from "react-i18next";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const ReadingPractice = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedDialogues, setSelectedDialogues] = useState<any[] | null>(null);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);
  const { subscribed, createCheckoutSession } = useSubscription();
  const { canAccessItem } = useLessonProgress();

  const handleDialogueClick = (difficulty: DialogueDifficulty, index: number) => {
    const canAccess = canAccessItem('reading', index, subscribed);
    if (canAccess) {
      const dialogues = getDialoguesByDifficulty(difficulty);
      setSelectedDialogues(dialogues);
      setCurrentReadingIndex(index);
    } else {
      createCheckoutSession();
    }
  };

  if (selectedDialogues) {
    return (
      <ImmersiveReader
        dialogues={selectedDialogues}
        currentIndex={currentReadingIndex}
        onBack={() => setSelectedDialogues(null)}
        onNext={() => setCurrentReadingIndex(prev => Math.min(prev + 1, selectedDialogues.length - 1))}
        onPrevious={() => setCurrentReadingIndex(prev => Math.max(prev - 1, 0))}
      />
    );
  }

  const renderDialogueSection = (difficulty: DialogueDifficulty, title: string, baseIndex: number) => {
    const dialogues = getDialoguesByDifficulty(difficulty);
    
    return (
      <div key={difficulty} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {dialogues.map((dialogue, dialogueIndex) => {
            const isFirstInDifficulty = dialogueIndex === 0 && difficulty === 'beginner';
            const canAccess = canAccessItem('reading', isFirstInDifficulty ? 0 : baseIndex + dialogueIndex, subscribed);
            
            return (
              <div key={dialogue.id} className="relative">
                {isFirstInDifficulty && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-green-500 text-white">
                    {t('freemium.firstFree')}
                  </Badge>
                )}
                {!canAccess && (
                  <div 
                    className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer"
                    onClick={() => createCheckoutSession()}
                  >
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className={`${!canAccess ? 'opacity-60' : ''}`}>
                  <ReadingPassagePreview
                    dialogue={dialogue}
                    onClick={() => canAccess && handleDialogueClick(difficulty, dialogueIndex)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('practice.backToDashboard')}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('everydayEnglish.readingPractice.title')}</h1>
          <p className="text-muted-foreground">
            {t('reading.subtitle')}
          </p>
        </div>

        {renderDialogueSection('beginner', t('practice.levels.beginner.title'), 0)}
        {renderDialogueSection('intermediate', t('practice.levels.intermediate.title'), 100)}
        {renderDialogueSection('advanced', t('practice.levels.advanced.title'), 200)}
      </div>
    </div>
  );
};

export default ReadingPractice;
