import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Radio, 
  FileText, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  MessageCircle, 
  Navigation,
  Timer,
  TrendingUp
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { grammarTopics } from "@/data/grammarTopics";

const iconMap = {
  Calendar,
  Radio,
  FileText,
  Clock,
  AlertTriangle,
  MapPin,
  MessageCircle,
  Navigation,
};

export default function MiniGrammar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ru';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentLang === 'en' ? 'Back to Dashboard' : 'На панель управления'}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {currentLang === 'en' ? 'Mini Grammar for Truck Drivers' : 'Мини-грамматика для водителей'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {currentLang === 'en' 
              ? 'Learn essential English grammar using real truck driving terminology and scenarios' 
              : 'Изучайте основную грамматику английского с использованием терминологии грузоперевозок'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grammarTopics.map((topic) => {
            const IconComponent = iconMap[topic.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={topic.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1"
                onClick={() => navigate(`/mini-grammar/${topic.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
                      </div>
                    </div>
                    <Badge variant={topic.difficulty === 'beginner' ? 'secondary' : 'default'}>
                      {topic.difficulty === 'beginner' 
                        ? (currentLang === 'en' ? 'Beginner' : 'Начальный')
                        : (currentLang === 'en' ? 'Intermediate' : 'Средний')}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{topic.title[currentLang]}</CardTitle>
                  <CardDescription className="text-base">{topic.description[currentLang]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>{topic.estimatedMinutes} {currentLang === 'en' ? 'minutes' : 'минут'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{topic.exercises.length} {currentLang === 'en' ? 'exercises' : 'упражнений'}</span>
                    </div>
                  </div>
                  <Button variant="default" size="lg" className="w-full mt-4 text-base">
                    {currentLang === 'en' ? 'Start Learning 🚛' : 'Начать обучение 🚛'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
