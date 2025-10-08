import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Clock, Play, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const completedLessons = 3;
  const totalLessons = 20;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserName(`${profile.first_name} ${profile.last_name}`);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
    });
    navigate("/");
  };

  const topics = [
    { id: 1, title: t('dashboard.topics.navigation.title'), lessons: t('dashboard.topics.navigation.lessons'), completed: 3, icon: "🗺️" },
    { id: 2, title: t('dashboard.topics.delivery.title'), lessons: t('dashboard.topics.delivery.lessons'), completed: 0, icon: "📦" },
    { id: 3, title: t('dashboard.topics.border.title'), lessons: t('dashboard.topics.border.lessons'), completed: 0, icon: "🛂" },
    { id: 4, title: t('dashboard.topics.roadside.title'), lessons: t('dashboard.topics.roadside.lessons'), completed: 0, icon: "🔧" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {userName ? `Welcome Back, ${userName}!` : t('dashboard.welcome')}
            </h1>
            <p className="text-white/80 mt-1">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <LanguageSwitcher />
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Progress Overview */}
        <Card className="p-6 card-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{t('dashboard.progress.title')}</h2>
              <p className="text-muted-foreground">{completedLessons} {t('dashboard.progress.lessonsCompleted')}</p>
            </div>
            <Trophy className="w-12 h-12 text-accent" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{completedLessons} / {totalLessons}</span>
              <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </Card>

        {/* Today's Lesson */}
        <Card className="p-8 card-elevated border-accent/20 border-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">{t('dashboard.todayLesson.badge')}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('dashboard.todayLesson.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.todayLesson.description')}
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground mb-6">
                <span>⏱️ {t('dashboard.todayLesson.duration')}</span>
              </div>
              <Button 
                size="lg" 
                className="btn-hero"
                onClick={() => navigate("/lesson/1")}
              >
                <Play className="mr-2 h-5 w-5" />
                {t('dashboard.todayLesson.start')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Topics Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('dashboard.topics.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Card 
                key={topic.id} 
                className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => navigate(`/lesson/${topic.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>{topic.lessons}</span>
                      {topic.completed > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-accent font-medium">
                            {topic.completed} completed
                          </span>
                        </>
                      )}
                    </div>
                    {topic.completed > 0 && (
                      <Progress 
                        value={(topic.completed / parseInt(topic.lessons)) * 100} 
                        className="h-2"
                      />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
