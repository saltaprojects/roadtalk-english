import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { ConversationChat } from "@/components/ConversationChat";
import { useSubscription } from "@/hooks/useSubscription";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Scenario = {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  difficultyKey: string;
};

const scenarios: Scenario[] = [
  { id: "police", icon: "🚔", titleKey: "practice.scenarios.police.title", descriptionKey: "practice.scenarios.police.description", difficultyKey: "practice.scenarios.police.difficulty" },
  { id: "gasStation", icon: "⛽", titleKey: "practice.scenarios.gasStation.title", descriptionKey: "practice.scenarios.gasStation.description", difficultyKey: "practice.scenarios.gasStation.difficulty" },
  { id: "dispatcher", icon: "📞", titleKey: "practice.scenarios.dispatcher.title", descriptionKey: "practice.scenarios.dispatcher.description", difficultyKey: "practice.scenarios.dispatcher.difficulty" },
  { id: "border", icon: "🛂", titleKey: "practice.scenarios.border.title", descriptionKey: "practice.scenarios.border.description", difficultyKey: "practice.scenarios.border.difficulty" },
  { id: "weighStation", icon: "⚖️", titleKey: "practice.scenarios.weighStation.title", descriptionKey: "practice.scenarios.weighStation.description", difficultyKey: "practice.scenarios.weighStation.difficulty" },
  { id: "delivery", icon: "📦", titleKey: "practice.scenarios.delivery.title", descriptionKey: "practice.scenarios.delivery.description", difficultyKey: "practice.scenarios.delivery.difficulty" },
];

const Practice = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const { subscribed, loading } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("dashboard.progress.title")}</p>
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="container mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("contact.back")}
          </Button>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("dashboard.subscription.requiredShort")}</AlertTitle>
            <AlertDescription>
              {t("dashboard.subscription.description")}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (selectedScenario) {
    return (
      <ConversationChat
        scenario={selectedScenario.id}
        scenarioTitle={t(selectedScenario.titleKey)}
        scenarioDescription={t(selectedScenario.descriptionKey)}
        onEnd={() => setSelectedScenario(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("contact.back")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("practice.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("practice.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{scenario.icon}</div>
                <CardTitle>{t(scenario.titleKey)}</CardTitle>
                <CardDescription>{t(scenario.descriptionKey)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{t(scenario.difficultyKey)}</Badge>
                  <Button onClick={() => setSelectedScenario(scenario)}>
                    {t("practice.chat.startConversation")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;
