import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Play, ArrowLeft, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const EssentialPhrases = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { subscribed, createCheckoutSession } = useSubscription();
  const { getCompletedCount } = useLessonProgress();

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

  const allLessons = [
    ...topicsByLevel.beginner,
    ...topicsByLevel.intermediate,
    ...topicsByLevel.professional
  ];

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
            {t('lesson.backToDashboard')}
          </Button>
          <h1 className="text-3xl font-bold">Essential Phrases & Short Tests</h1>
          <p className="text-white/80 mt-1">Highway communication, navigation, delivery documentation, and essential truck driver phrases</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Today's Lesson */}
        <Card className="p-8 card-elevated border-accent/20 border-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
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
                  ✨ Try your first lesson free! Subscribe for $5.99/week to unlock all lessons.
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* All Available Lessons */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Available Lessons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {allLessons.map((topic) => {
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
      </div>
    </div>
  );
};

export default EssentialPhrases;
