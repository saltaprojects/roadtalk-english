import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Timer, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GameCard {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  difficulty: "easy" | "medium" | "hard";
  comingSoon?: boolean;
}

const games: GameCard[] = [
  {
    id: "traffic-light",
    icon: "🚦",
    titleKey: "miniGames.games.trafficLight.title",
    descriptionKey: "miniGames.games.trafficLight.description",
    difficulty: "easy",
  },
  {
    id: "word-match",
    icon: "🎯",
    titleKey: "miniGames.games.wordMatch.title",
    descriptionKey: "miniGames.games.wordMatch.description",
    difficulty: "easy",
  },
  {
    id: "cb-slang",
    icon: "📻",
    titleKey: "miniGames.games.cbSlang.title",
    descriptionKey: "miniGames.games.cbSlang.description",
    difficulty: "medium",
  },
  {
    id: "word-scramble",
    icon: "🔤",
    titleKey: "miniGames.games.wordScramble.title",
    descriptionKey: "miniGames.games.wordScramble.description",
    difficulty: "medium",
  },
  {
    id: "route-master",
    icon: "🗺️",
    titleKey: "miniGames.games.routeMaster.title",
    descriptionKey: "miniGames.games.routeMaster.description",
    difficulty: "medium",
    comingSoon: true,
  },
  {
    id: "trucker-trivia",
    icon: "🎓",
    titleKey: "miniGames.games.truckerTrivia.title",
    descriptionKey: "miniGames.games.truckerTrivia.description",
    difficulty: "hard",
    comingSoon: true,
  },
  {
    id: "highway-builder",
    icon: "🛣️",
    titleKey: "miniGames.games.highwayBuilder.title",
    descriptionKey: "miniGames.games.highwayBuilder.description",
    difficulty: "hard",
    comingSoon: true,
  },
  {
    id: "phrase-shooter",
    icon: "🎮",
    titleKey: "miniGames.games.phraseShooter.title",
    descriptionKey: "miniGames.games.phraseShooter.description",
    difficulty: "hard",
    comingSoon: true,
  },
];

const MiniGames = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

        {/* Games Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('miniGames.selectGame')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <Card
                key={game.id}
                className={`card-elevated transition-transform duration-200 ${
                  game.comingSoon 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:scale-105 cursor-pointer'
                }`}
                onClick={() => {
                  if (!game.comingSoon) {
                    // TODO: Navigate to specific game
                    console.log(`Starting game: ${game.id}`);
                  }
                }}
              >
                <CardHeader>
                  <div className="text-5xl mb-2">{game.icon}</div>
                  <CardTitle className="flex items-center justify-between">
                    <span>{t(game.titleKey)}</span>
                    {game.comingSoon && (
                      <span className="text-xs px-2 py-1 bg-muted rounded">
                        {t('miniGames.comingSoon')}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{t(game.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {getDifficultyLabel(game.difficulty)}
                    </span>
                    {!game.comingSoon && (
                      <span className="text-sm text-muted-foreground">
                        {t('miniGames.playNow')}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
