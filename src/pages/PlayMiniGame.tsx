import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ScenarioQuizGame from "@/components/games/ScenarioQuizGame";
import { getQuestionsByScenario, scenarios } from "@/data/miniGameQuestions";
import { useTranslation } from "react-i18next";

const PlayMiniGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const scenarioId = searchParams.get("scenario");

  const [questions, setQuestions] = useState<any[]>([]);
  const [scenarioTitle, setScenarioTitle] = useState("");

  useEffect(() => {
    if (!scenarioId) {
      navigate("/mini-games");
      return;
    }

    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      navigate("/mini-games");
      return;
    }

    const scenarioQuestions = getQuestionsByScenario(scenarioId);
    setQuestions(scenarioQuestions);
    setScenarioTitle(t(scenario.titleKey));
  }, [scenarioId, navigate, t]);

  const handleGameComplete = (score: number, totalQuestions: number) => {
    console.log(`Game completed! Score: ${score}/${totalQuestions}`);
    // TODO: Save score to database
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <Button onClick={() => navigate("/mini-games")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scenarios
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScenarioQuizGame
      questions={questions}
      scenarioTitle={scenarioTitle}
      onComplete={handleGameComplete}
    />
  );
};

export default PlayMiniGame;
