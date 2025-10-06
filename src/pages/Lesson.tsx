import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, RotateCcw } from "lucide-react";
import { Flashcard } from "@/components/Flashcard";
import { Quiz } from "@/components/Quiz";
import { useToast } from "@/hooks/use-toast";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"intro" | "flashcards" | "quiz" | "complete">("intro");
  const [audioPlaying, setAudioPlaying] = useState(false);

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
    // Simulate audio playback
    setTimeout(() => setAudioPlaying(false), 2000);
    toast({
      title: "Audio playing",
      description: "Listen to the pronunciation",
    });
  };

  const handleQuizComplete = () => {
    setCurrentStep("complete");
  };

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
              Back to Dashboard
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              Lesson {id}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Intro Step */}
        {currentStep === "intro" && (
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
                    {audioPlaying ? "Playing..." : "Listen to Scenario"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>📚 {lessonData.flashcards.length} vocabulary cards</span>
                <span>•</span>
                <span>❓ {lessonData.quiz.length} quiz questions</span>
                <span>•</span>
                <span>⏱️ ~5 minutes</span>
              </div>

              <Button 
                size="lg" 
                className="w-full btn-hero text-lg"
                onClick={() => setCurrentStep("flashcards")}
              >
                Start Learning
              </Button>
            </div>
          </Card>
        )}

        {/* Flashcards Step */}
        {currentStep === "flashcards" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-2">Vocabulary Practice</h2>
              <p className="text-muted-foreground mb-4">
                Click each card to see the meaning and context
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
                  Back to Intro
                </Button>
                <Button
                  size="lg"
                  className="btn-hero"
                  onClick={() => setCurrentStep("quiz")}
                >
                  Continue to Quiz
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
            <h1 className="text-3xl font-bold mb-4">Lesson Complete!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Great job! You've completed "{lessonData.title}"
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">
                  {lessonData.flashcards.length}
                </div>
                <div className="text-sm text-muted-foreground">Words Learned</div>
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
                Review Lesson
              </Button>
              <Button
                size="lg"
                className="btn-hero"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Lesson;
