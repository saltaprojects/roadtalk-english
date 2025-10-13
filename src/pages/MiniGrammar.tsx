import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Radio, 
  FileText, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  MessageCircle, 
  Navigation 
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
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => navigate(`/mini-grammar/${topic.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    <CardTitle className="text-xl">{topic.title[currentLang]}</CardTitle>
                  </div>
                  <CardDescription>{topic.description[currentLang]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {topic.explanation[currentLang].slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {topic.exercises.length} {currentLang === 'en' ? 'exercises' : 'упражнений'}
                    </span>
                    <Button variant="secondary" size="sm">
                      {currentLang === 'en' ? 'Start Learning' : 'Начать'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
