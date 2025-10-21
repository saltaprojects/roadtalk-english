import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Timer, Target, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scenarios } from "@/data/miniGameQuestions";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const MiniGames = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { subscribed, createCheckoutSession } = useSubscription();
  const { canAccessItem } = useLessonProgress();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return t(`miniGames.difficulty.${difficulty}`);
  };

  const handleScenarioClick = (scenarioId: string, index: number) => {
    const canAccess = canAccessItem('games', index, subscribed);
    if (canAccess) {
      navigate(`/mini-games/play?scenario=${scenarioId}`);
    } else {
      createCheckoutSession();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('miniGames.backToDashboard')}
          </Button>
          <h1 className="text-3xl font-bold">{t('miniGames.title')}</h1>
          <p className="text-white/80 mt-1">{t('miniGames.subtitle')}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                {t('miniGames.stats.gamesPlayed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                {t('miniGames.stats.bestScore')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">--</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-500" />
                {t('miniGames.stats.totalTime')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0 {t('miniGames.stats.minutes')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('miniGames.selectScenario')}</h2>
          <p className="text-muted-foreground mb-6">{t('miniGames.scenarioDescriptionNew')}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((scenario, index) => {
              const isFirstScenario = index === 0;
              const canAccess = canAccessItem('games', index, subscribed);
              
              return (
                <Card
                  key={scenario.id}
                  className={`card-elevated transition-transform duration-200 ${
                    canAccess ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleScenarioClick(scenario.id, index)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-5xl">{scenario.icon}</div>
                      {isFirstScenario && (
                        <Badge className="bg-green-500 text-white ml-auto">
                          {t('freemium.firstFree')}
                        </Badge>
                      )}
                      {!canAccess && (
                        <Lock className="h-5 w-5 text-muted-foreground ml-auto" />
                      )}
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      <span>{t(scenario.titleKey)}</span>
                      <span className="text-xs px-2 py-1 bg-muted rounded">
                        {scenario.questionCount} {t('miniGames.phrases')}
                      </span>
                    </CardTitle>
                    <CardDescription>{t(scenario.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                        {getDifficultyLabel(scenario.difficulty)}
                      </span>
                    </div>
                    {canAccess ? (
                      <Button className="w-full">
                        {t('miniGames.playNow')}
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

        {/* Daily Challenge Placeholder */}
        <Card className="card-elevated border-accent/20 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 {t('miniGames.dailyChallenge.title')}
            </CardTitle>
            <CardDescription>{t('miniGames.dailyChallenge.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t('miniGames.dailyChallenge.comingSoon')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MiniGames;
