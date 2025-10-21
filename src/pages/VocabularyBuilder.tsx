import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhraseBuilder } from "@/components/vocabulary/PhraseBuilder";
import { vocabularyScenarios } from "@/data/vocabularyWords";
import { ArrowLeft, Trophy, Lock } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const VocabularyBuilder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const { subscribed, createCheckoutSession } = useSubscription();
  const { canAccessItem } = useLessonProgress();

  const currentScenario = vocabularyScenarios.find(s => s.id === selectedScenario);

  const handleScenarioComplete = () => {
    if (selectedScenario && !completedScenarios.includes(selectedScenario)) {
      setCompletedScenarios([...completedScenarios, selectedScenario]);
    }
    setSelectedScenario(null);
  };

  const handleScenarioClick = (scenarioId: string, index: number) => {
    const canAccess = canAccessItem('vocabulary', index, subscribed);
    if (canAccess) {
      setSelectedScenario(scenarioId);
    } else {
      createCheckoutSession();
    }
  };

  if (selectedScenario && currentScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedScenario(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("vocabulary.backToScenarios")}
          </Button>
          <PhraseBuilder
            phrases={currentScenario.phrases}
            scenarioTitle={t(currentScenario.titleKey)}
            scenarioImage={currentScenario.image}
            onComplete={handleScenarioComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("vocabulary.backToDashboard")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("vocabulary.title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("vocabulary.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {vocabularyScenarios.map((scenario, index) => {
            const isCompleted = completedScenarios.includes(scenario.id);
            const isFirstScenario = index === 0;
            const canAccess = canAccessItem('vocabulary', index, subscribed);
            
            return (
              <Card
                key={scenario.id}
                className={`transition-all ${
                  canAccess ? 'cursor-pointer hover:shadow-lg' : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => handleScenarioClick(scenario.id, index)}
              >
                <CardHeader>
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="w-full h-48 object-cover"
                    />
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                        <Trophy className="h-5 w-5" />
                      </div>
                    )}
                    {isFirstScenario && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white">
                          {t('freemium.firstFree')}
                        </Badge>
                      </div>
                    )}
                    {!canAccess && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle>{t(scenario.titleKey)}</CardTitle>
                  <CardDescription>
                    {t("vocabulary.phrasesCount", { count: scenario.phrases.length })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {canAccess ? (
                    <Button className="w-full">
                      {isCompleted ? t("vocabulary.playAgain") : t("vocabulary.startPractice")}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      createCheckoutSession();
                    }}>
                      <Lock className="mr-2 h-4 w-4" />
                      {t('freemium.unlockWith')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VocabularyBuilder;
