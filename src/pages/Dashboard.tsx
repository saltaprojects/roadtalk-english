import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Clock, Play, LogOut, CreditCard, AlertCircle, MessageSquare, OctagonAlert, Bot, Mic, Book, GraduationCap, Headphones, Gamepad2, Library, Speech } from "lucide-react";
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
  const { subscribed, subscription_status, subscription_end, loading: subLoading, createCheckoutSession, manageSubscription, checkSubscription } = useSubscription();
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
            <AlertDescription className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t('dashboard.subscription.active')} - {t('dashboard.subscription.activeDescription')}</div>
                {subscription_end && (
                  <p className="text-sm mt-1">
                    Next payment: {new Date(subscription_end).toLocaleDateString()} ($5.99/week)
                  </p>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={manageSubscription}
                className="ml-4 shrink-0"
              >
                Manage Subscription
              </Button>
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

        {/* Everyday English for Truck Drivers */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('everydayEnglish.title')}</h2>
            <p className="text-muted-foreground">{t('everydayEnglish.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Essential Phrases */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/essential-phrases")}
            >
              <Book className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.essentialPhrases.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.essentialPhrases.description')}
              </p>
            </Card>

            {/* Mini Grammar */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate('/mini-grammar')}
            >
              <GraduationCap className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.miniGrammar.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.miniGrammar.description')}
              </p>
            </Card>

            {/* Listening Practice */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => toast({ title: t('everydayEnglish.comingSoon'), description: t('everydayEnglish.comingSoonDescription') })}
            >
              <Headphones className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.listening.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.listening.description')}
              </p>
            </Card>

            {/* Mini Games */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => toast({ title: t('everydayEnglish.comingSoon'), description: t('everydayEnglish.comingSoonDescription') })}
            >
              <Gamepad2 className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.miniGames.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.miniGames.description')}
              </p>
            </Card>

            {/* Vocabulary Builder */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => toast({ title: t('everydayEnglish.comingSoon'), description: t('everydayEnglish.comingSoonDescription') })}
            >
              <Library className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.vocabulary.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.vocabulary.description')}
              </p>
            </Card>

            {/* Speaking Practice */}
            <Card 
              className="p-6 card-elevated hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/pronunciation-help")}
            >
              <Speech className="w-10 h-10 mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">{t('everydayEnglish.speaking.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('everydayEnglish.speaking.description')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
