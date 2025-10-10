import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Clock, Play, LogOut, CreditCard, AlertCircle, MessageSquare, OctagonAlert, Bot, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const { subscribed, subscription_status, loading: subLoading, createCheckoutSession, checkSubscription } = useSubscription();
  const { getCompletedCount, hasReachedFreeLimit, FREE_LESSONS_LIMIT, loading: progressLoading } = useLessonProgress();
  
  const completedLessons = getCompletedCount();
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
    
    // Check subscription status when coming back from payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      checkSubscription();
      toast({
        title: "Payment successful!",
        description: "Your subscription is now active.",
      });
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [navigate, checkSubscription, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
    });
    navigate("/");
  };

  const topicsByLevel = {
    beginner: [
      { id: 1, title: t('dashboard.topics.navigation.title'), lessons: t('dashboard.topics.navigation.lessons'), completed: 3, icon: "🗺️" },
      { id: 2, title: t('dashboard.topics.delivery.title'), lessons: t('dashboard.topics.delivery.lessons'), completed: 0, icon: "📦" },
    ],
    intermediate: [
      { id: 3, title: t('dashboard.topics.border.title'), lessons: t('dashboard.topics.border.lessons'), completed: 0, icon: "🛂" },
      { id: 4, title: t('dashboard.topics.roadside.title'), lessons: t('dashboard.topics.roadside.lessons'), completed: 0, icon: "🔧" },
    ],
    professional: [
      { id: 5, title: "Heavy Load Management", lessons: "8 lessons", completed: 0, icon: "🏗️" },
      { id: 6, title: "International Routes", lessons: "10 lessons", completed: 0, icon: "🌍" },
    ],
  };

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
              {t('dashboard.logout')}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Subscription Required Alert */}
        {!subLoading && !subscribed && (
          <Alert className="border-accent bg-accent/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">{t('dashboard.subscription.required')}</p>
                <p className="text-sm">{t('dashboard.subscription.description')}</p>
              </div>
              <Button onClick={createCheckoutSession} className="ml-4 shrink-0">
                <CreditCard className="mr-2 h-4 w-4" />
                {t('dashboard.subscription.subscribeNow')}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Subscription Active */}
        {!subLoading && subscribed && (
          <Alert className="border-green-500 bg-green-500/10">
            <Trophy className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <span className="font-medium">{t('dashboard.subscription.active')}</span> - {t('dashboard.subscription.activeDescription')}
            </AlertDescription>
          </Alert>
        )}

        {/* Progress Overview */}
        <Card className="p-4 card-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{t('dashboard.progress.title')}</h2>
              <p className="text-muted-foreground">{completedLessons} {t('dashboard.progress.lessonsCompleted')}</p>
            </div>
            <Trophy className="w-12 h-12 text-accent" />
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{completedLessons} / {totalLessons}</span>
              <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Practice Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            {/* AI Conversation Practice */}
            <div 
              className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/practice")}
            >
              <Bot className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm mb-1">{t('dashboard.practiceSections.aiConversation.title')}</h3>
              <p className="text-xs text-muted-foreground">{t('dashboard.practiceSections.aiConversation.description')}</p>
            </div>

            {/* Pronunciation Help */}
            <div 
              className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/pronunciation-help")}
            >
              <Mic className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm mb-1">{t('dashboard.practiceSections.pronunciation.title')}</h3>
              <p className="text-xs text-muted-foreground">{t('dashboard.practiceSections.pronunciation.description')}</p>
            </div>

            {/* Driver Chat with AI */}
            <div 
              className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/driver-chat")}
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm mb-1">{t('dashboard.practiceSections.driverChat.title')}</h3>
              <p className="text-xs text-muted-foreground">{t('dashboard.practiceSections.driverChat.description')}</p>
            </div>

            {/* Road Signs Practice */}
            <div 
              className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/road-signs")}
            >
              <OctagonAlert className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm mb-1">{t('dashboard.practiceSections.roadSigns.title')}</h3>
              <p className="text-xs text-muted-foreground">{t('dashboard.practiceSections.roadSigns.description')}</p>
            </div>
          </div>
        </Card>

        {/* Today's Lesson */}
        <Card className="p-8 card-elevated border-accent/20 border-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">{t('dashboard.todayLesson.badge')}</span>
                <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">FREE</span>
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
              {!subscribed && (
                <p className="text-sm text-muted-foreground mt-3">
                  ✨ Try your first lesson free! Subscribe for $14.55/month to unlock all lessons.
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Topics by Level */}
        <div className="space-y-8">
          {/* Beginner Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 font-bold text-lg">B</span>
              </div>
              <h2 className="text-2xl font-bold">{t('dashboard.levels.beginner')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {topicsByLevel.beginner.map((topic) => {
                const isFirstLesson = topic.id === 1;
                const canAccess = subscribed || isFirstLesson;
                
                return (
                  <Card 
                    key={topic.id} 
                    className={`p-6 card-elevated transition-transform duration-200 ${
                      canAccess ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canAccess) {
                        navigate(`/lesson/${topic.id}`);
                      } else {
                        createCheckoutSession();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{topic.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{topic.title}</h3>
                          {isFirstLesson && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">FREE</span>
                          )}
                        </div>
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
                );
              })}
            </div>
          </div>

          {/* Intermediate Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-lg">I</span>
              </div>
              <h2 className="text-2xl font-bold">{t('dashboard.levels.intermediate')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {topicsByLevel.intermediate.map((topic) => (
                <Card 
                  key={topic.id} 
                  className={`p-6 card-elevated transition-transform duration-200 ${
                    subscribed ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (subscribed) {
                      navigate(`/lesson/${topic.id}`);
                    } else {
                      createCheckoutSession();
                    }
                  }}
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

          {/* Professional Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-500 font-bold text-lg">P</span>
              </div>
              <h2 className="text-2xl font-bold">{t('dashboard.levels.professional')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {topicsByLevel.professional.map((topic) => (
                <Card 
                  key={topic.id} 
                  className={`p-6 card-elevated transition-transform duration-200 ${
                    subscribed ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (subscribed) {
                      navigate(`/lesson/${topic.id}`);
                    } else {
                      createCheckoutSession();
                    }
                  }}
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
    </div>
  );
};

export default Dashboard;
