import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, RotateCcw, Lock, CreditCard } from "lucide-react";
import { Flashcard } from "@/components/Flashcard";
import { Quiz } from "@/components/Quiz";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSubscription } from "@/hooks/useSubscription";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<"intro" | "flashcards" | "quiz" | "complete">("intro");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { subscribed, loading: subLoading, createCheckoutSession } = useSubscription();
  const { canAccessLesson, markLessonComplete, FREE_LESSONS_LIMIT } = useLessonProgress();
  
  const lessonNumber = parseInt(id || "1");

  const lessonData = {
    title: "Asking for Directions",
    description: "Learn essential phrases for finding your way on the road",
    audioContext: "You're at a gas station and need to find the nearest truck stop with parking.",
    flashcards: [
      { 
        front: "Where is the nearest truck stop?", 
        back: "Use this to find truck-specific facilities",
        audio: "where-truck-stop"
      },
      { 
        front: "How do I get to the highway?", 
        back: "Ask for directions to major roads",
        audio: "how-highway"
      },
      { 
        front: "Is there parking available?", 
        back: "Check if overnight parking is allowed",
        audio: "parking-available"
      },
      { 
        front: "Which exit should I take?", 
        back: "Clarify which highway exit to use",
        audio: "which-exit"
      },
    ],
    quiz: [
      {
        question: "You need to find the nearest truck stop. What do you say?",
        options: [
          "Where is the nearest truck stop?",
          "I want food",
          "Give me directions",
          "Where am I?"
        ],
        correct: 0
      },
      {
        question: "How do you ask if overnight parking is allowed?",
        options: [
          "Can I sleep?",
          "Is there parking available?",
          "Where is hotel?",
          "I need rest"
        ],
        correct: 1
      },
      {
        question: "You're confused about which highway exit. What do you ask?",
        options: [
          "Help me",
          "I don't know",
          "Which exit should I take?",
          "Where is exit?"
        ],
        correct: 2
      },
      {
        question: "Someone says 'Take exit 42 and turn right'. What should you do?",
        options: [
          "Ask them to repeat",
          "Take exit 42, then turn right",
          "Turn left at exit 42",
          "Keep driving straight"
        ],
        correct: 1
      },
      {
        question: "Complete: 'How ___ I get to the highway?'",
        options: [
          "can",
          "is",
          "do",
          "am"
        ],
        correct: 2
      }
    ]
  };

  const playAudio = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 2000);
    toast({
      title: t('flashcard.playAudio'),
    });
  };

  const handleQuizComplete = async () => {
    await markLessonComplete(id || "1");
    setCurrentStep("complete");
  };

  useEffect(() => {
    if (!subLoading && !subscribed) {
      toast({
        title: "Subscription Required",
        description: "Subscribe for $19.99/month to access lessons.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [subLoading, subscribed, navigate, toast]);

  const progressValue = 
    currentStep === "intro" ? 25 : 
    currentStep === "flashcards" ? 50 : 
    currentStep === "quiz" ? 75 : 100;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('lesson.backToDashboard')}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('lesson.introduction')} {id}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Access Restricted Alert */}
        {!subLoading && !subscribed && (
          <Alert className="mb-6 border-accent bg-accent/10">
            <Lock className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium">Subscription Required</p>
                <p className="text-sm">Subscribe for $19.99/month to access all lessons (first 3 lessons included!)</p>
              </div>
              <Button onClick={createCheckoutSession} className="shrink-0">
                <CreditCard className="mr-2 h-4 w-4" />
                Subscribe Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Intro Step */}
        {currentStep === "intro" && subscribed && (
          <Card className="p-8 card-elevated">
            <h1 className="text-3xl font-bold mb-4">{lessonData.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {lessonData.description}
            </p>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <Volume2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Scenario</h3>
                  <p className="mb-4">{lessonData.audioContext}</p>
                  <Button 
                    onClick={playAudio}
                    disabled={audioPlaying}
                    className="btn-hero"
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    {audioPlaying ? "Playing..." : t('flashcard.playAudio')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>📚 {lessonData.flashcards.length}</span>
                <span>•</span>
                <span>❓ {lessonData.quiz.length}</span>
                <span>•</span>
                <span>⏱️ ~5 minutes</span>
              </div>

              <Button 
                size="lg" 
                className="w-full btn-hero text-lg"
                onClick={() => setCurrentStep("flashcards")}
              >
                {t('lesson.next')}
              </Button>
            </div>
          </Card>
        )}

        {/* Flashcards Step */}
        {currentStep === "flashcards" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-2">{t('lesson.vocabulary')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('flashcard.flip')}
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {lessonData.flashcards.map((card, index) => (
                <Flashcard
                  key={index}
                  front={card.front}
                  back={card.back}
                  audioId={card.audio}
                />
              ))}
            </div>

            <Card className="p-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("intro")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('lesson.backToDashboard')}
                </Button>
                <Button
                  size="lg"
                  className="btn-hero"
                  onClick={() => setCurrentStep("quiz")}
                >
                  {t('lesson.next')}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Quiz Step */}
        {currentStep === "quiz" && (
          <Quiz 
            questions={lessonData.quiz} 
            onComplete={handleQuizComplete}
          />
        )}

        {/* Complete Step */}
        {currentStep === "complete" && (
          <Card className="p-8 card-elevated text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4">{t('lesson.congratulations')}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('lesson.completionMessage')}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">
                  {lessonData.flashcards.length}
                </div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">5</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep("intro");
                  window.scrollTo(0, 0);
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {t('lesson.backToDashboard')}
              </Button>
              <Button
                size="lg"
                className="btn-hero"
                onClick={() => navigate("/dashboard")}
              >
                {t('lesson.backToDashboard')}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Lesson;
