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
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();
  const [currentStep, setCurrentStep] = useState<"intro" | "flashcards" | "quiz" | "complete">("intro");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const {
    subscribed,
    loading: subLoading,
    createCheckoutSession
  } = useSubscription();
  const {
    canAccessLesson,
    markLessonComplete,
    FREE_LESSONS_LIMIT
  } = useLessonProgress();
  const lessonNumber = parseInt(id || "1");
  const isFirstLesson = lessonNumber === 1;
  const requiresSubscription = !isFirstLesson && !subscribed;
  const lessonData = {
    title: t('dashboard.todayLesson.title'),
    description: t('dashboard.todayLesson.description'),
    audioContext: t('lessons.highwayCommunication.scenario'),
    flashcards: [
      {
        front: t('lessons.highwayCommunication.flashcards.0.english'),
        back: t('lessons.highwayCommunication.flashcards.0.translation'),
        transcription: t('lessons.highwayCommunication.flashcards.0.transcription'),
        audio: "phrase-1"
      },
      {
        front: t('lessons.highwayCommunication.flashcards.1.english'),
        back: t('lessons.highwayCommunication.flashcards.1.translation'),
        transcription: t('lessons.highwayCommunication.flashcards.1.transcription'),
        audio: "phrase-2"
      },
      {
        front: t('lessons.highwayCommunication.flashcards.2.english'),
        back: t('lessons.highwayCommunication.flashcards.2.translation'),
        transcription: t('lessons.highwayCommunication.flashcards.2.transcription'),
        audio: "phrase-3"
      },
      {
        front: t('lessons.highwayCommunication.flashcards.3.english'),
        back: t('lessons.highwayCommunication.flashcards.3.translation'),
        transcription: t('lessons.highwayCommunication.flashcards.3.transcription'),
        audio: "phrase-4"
      }
    ],
    practiceSentences: [
      {
        english: t('lessons.highwayCommunication.practiceSentences.0.english'),
        transcription: t('lessons.highwayCommunication.practiceSentences.0.transcription'),
        translation: t('lessons.highwayCommunication.practiceSentences.0.translation')
      },
      {
        english: t('lessons.highwayCommunication.practiceSentences.1.english'),
        transcription: t('lessons.highwayCommunication.practiceSentences.1.transcription'),
        translation: t('lessons.highwayCommunication.practiceSentences.1.translation')
      },
      {
        english: t('lessons.highwayCommunication.practiceSentences.2.english'),
        transcription: t('lessons.highwayCommunication.practiceSentences.2.transcription'),
        translation: t('lessons.highwayCommunication.practiceSentences.2.translation')
      },
      {
        english: t('lessons.highwayCommunication.practiceSentences.3.english'),
        transcription: t('lessons.highwayCommunication.practiceSentences.3.transcription'),
        translation: t('lessons.highwayCommunication.practiceSentences.3.translation')
      },
      {
        english: t('lessons.highwayCommunication.practiceSentences.4.english'),
        transcription: t('lessons.highwayCommunication.practiceSentences.4.transcription'),
        translation: t('lessons.highwayCommunication.practiceSentences.4.translation')
      }
    ],
    quiz: [
      {
        question: t('lessons.highwayCommunication.quiz.0.question'),
        questionTranscription: t('lessons.highwayCommunication.quiz.0.questionTranscription'),
        options: [
          t('lessons.highwayCommunication.quiz.0.options.0'),
          t('lessons.highwayCommunication.quiz.0.options.1'),
          t('lessons.highwayCommunication.quiz.0.options.2'),
          t('lessons.highwayCommunication.quiz.0.options.3')
        ],
        optionTranscriptions: [
          t('lessons.highwayCommunication.quiz.0.optionTranscriptions.0'),
          t('lessons.highwayCommunication.quiz.0.optionTranscriptions.1'),
          t('lessons.highwayCommunication.quiz.0.optionTranscriptions.2'),
          t('lessons.highwayCommunication.quiz.0.optionTranscriptions.3')
        ],
        correct: 0
      },
      {
        question: t('lessons.highwayCommunication.quiz.1.question'),
        questionTranscription: t('lessons.highwayCommunication.quiz.1.questionTranscription'),
        options: [
          t('lessons.highwayCommunication.quiz.1.options.0'),
          t('lessons.highwayCommunication.quiz.1.options.1'),
          t('lessons.highwayCommunication.quiz.1.options.2'),
          t('lessons.highwayCommunication.quiz.1.options.3')
        ],
        optionTranscriptions: [
          t('lessons.highwayCommunication.quiz.1.optionTranscriptions.0'),
          t('lessons.highwayCommunication.quiz.1.optionTranscriptions.1'),
          t('lessons.highwayCommunication.quiz.1.optionTranscriptions.2'),
          t('lessons.highwayCommunication.quiz.1.optionTranscriptions.3')
        ],
        correct: 1
      },
      {
        question: t('lessons.highwayCommunication.quiz.2.question'),
        questionTranscription: t('lessons.highwayCommunication.quiz.2.questionTranscription'),
        options: [
          t('lessons.highwayCommunication.quiz.2.options.0'),
          t('lessons.highwayCommunication.quiz.2.options.1'),
          t('lessons.highwayCommunication.quiz.2.options.2')
        ],
        optionTranscriptions: [
          t('lessons.highwayCommunication.quiz.2.optionTranscriptions.0'),
          t('lessons.highwayCommunication.quiz.2.optionTranscriptions.1'),
          t('lessons.highwayCommunication.quiz.2.optionTranscriptions.2')
        ],
        correct: 2
      }
    ]
  };
  const playAudio = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 2000);
    toast({
      title: t('flashcard.playAudio')
    });
  };
  const handleQuizComplete = async () => {
    await markLessonComplete(id || "1");
    setCurrentStep("complete");
  };
  useEffect(() => {
    // Only redirect if not first lesson and not subscribed
    if (!subLoading && requiresSubscription) {
      toast({
        title: t('lesson.subscription.required'),
        description: t('lesson.subscription.firstFree'),
        variant: "destructive"
      });
    }
  }, [subLoading, requiresSubscription, toast, t]);
  const progressValue = currentStep === "intro" ? 25 : currentStep === "flashcards" ? 50 : currentStep === "quiz" ? 75 : 100;
  return <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
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
        {!subLoading && requiresSubscription && <Alert className="mb-6 border-accent bg-accent/10">
            <Lock className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium">{t('lesson.subscription.required')}</p>
                <p className="text-sm">{t('lesson.subscription.firstFree')}</p>
              </div>
              <Button onClick={createCheckoutSession} className="shrink-0">
                <CreditCard className="mr-2 h-4 w-4" />
                {t('lesson.subscription.subscribeNow')}
              </Button>
            </AlertDescription>
          </Alert>}

        {/* Intro Step */}
        {currentStep === "intro" && !requiresSubscription && <Card className="p-8 card-elevated">
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
                  <Button onClick={playAudio} disabled={audioPlaying} className="btn-hero">
                    <Volume2 className="mr-2 h-4 w-4" />
                    {audioPlaying ? "Playing..." : t('flashcard.playAudio')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                
                
                
                
                <span>5 minutes</span>
              </div>

              <Button size="lg" className="w-full btn-hero text-lg" onClick={() => setCurrentStep("flashcards")}>
                {t('lesson.next')}
              </Button>
            </div>
          </Card>}

        {/* Flashcards Step */}
        {currentStep === "flashcards" && !requiresSubscription && <div className="space-y-6">
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
                  transcription={card.transcription}
                />
              ))}
            </div>

            <Card className="p-6">
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setCurrentStep("intro")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('lesson.backToDashboard')}
                </Button>
                <Button size="lg" className="btn-hero" onClick={() => setCurrentStep("quiz")}>
                  {t('lesson.next')}
                </Button>
              </div>
            </Card>
          </div>}

        {/* Quiz Step */}
        {currentStep === "quiz" && !requiresSubscription && <Quiz questions={lessonData.quiz} onComplete={handleQuizComplete} />}

        {/* Complete Step */}
        {currentStep === "complete" && !requiresSubscription && <Card className="p-8 card-elevated text-center">
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
              <Button variant="outline" size="lg" onClick={() => {
            setCurrentStep("intro");
            window.scrollTo(0, 0);
          }}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {t('lesson.backToDashboard')}
              </Button>
              <Button size="lg" className="btn-hero" onClick={() => navigate("/dashboard")}>
                {t('lesson.backToDashboard')}
              </Button>
            </div>
          </Card>}
      </div>
    </div>;
};
export default Lesson;