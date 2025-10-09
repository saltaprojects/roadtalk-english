import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type QuizQuestion = {
  id: number;
  signEmoji: string;
  signName: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: string;
  color: string;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    signEmoji: "🛑",
    signName: "Stop Sign",
    question: "What must you do when you see this sign?",
    answers: [
      "Slow down and proceed with caution",
      "Come to a complete stop",
      "Yield to oncoming traffic",
      "Stop only if cars are coming"
    ],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    explanation: "You must come to a complete stop at the stop line, crosswalk, or intersection, whichever comes first."
  },
  {
    id: 2,
    signEmoji: "⚠️",
    signName: "Yield Sign",
    question: "What does this sign require you to do?",
    answers: [
      "Stop completely",
      "Speed up to merge",
      "Slow down and give right of way",
      "Honk your horn"
    ],
    correctAnswer: 2,
    category: "Regulatory",
    color: "bg-yellow-500",
    explanation: "Yield means slow down and give the right of way to traffic and pedestrians."
  },
  {
    id: 3,
    signEmoji: "⚖️",
    signName: "Weight Limit",
    question: "As a truck driver, what should you do when you see this sign?",
    answers: [
      "Ignore it if your load is light",
      "Check your truck's weight and comply with the limit",
      "Speed up before the weigh station",
      "Only commercial trucks need to follow this"
    ],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    explanation: "Always check your truck's total weight (including cargo) and ensure it's within the posted limit."
  },
  {
    id: 4,
    signEmoji: "📏",
    signName: "Height Restriction",
    question: "Why is this sign critical for truck drivers?",
    answers: [
      "It's just a suggestion",
      "It indicates the maximum safe height clearance",
      "Only applies to buses",
      "You can ignore it if moving slowly"
    ],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    explanation: "Height restrictions prevent trucks from hitting low bridges or overpasses. Always know your truck's height!"
  },
  {
    id: 5,
    signEmoji: "🏪",
    signName: "Weigh Station Ahead",
    question: "What must commercial truck drivers do at a weigh station?",
    answers: [
      "Drive past if there's no line",
      "Stop only if the lights are flashing",
      "All commercial trucks must stop unless sign says open/closed",
      "Only stop during business hours"
    ],
    correctAnswer: 2,
    category: "Truck-Specific",
    color: "bg-blue-500",
    explanation: "Commercial trucks must stop at weigh stations unless signs indicate the station is closed or you're exempt."
  },
  {
    id: 6,
    signEmoji: "🛣️",
    signName: "Truck Route",
    question: "What does this sign indicate?",
    answers: [
      "Trucks are prohibited",
      "This is a designated route for trucks",
      "Trucks must exit here",
      "Truck parking available"
    ],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-500",
    explanation: "This sign marks a designated route for trucks, often to avoid residential areas or weight-restricted roads."
  },
  {
    id: 7,
    signEmoji: "🔀",
    signName: "Merge Sign",
    question: "What should you do when you see this warning sign?",
    answers: [
      "Speed up to pass merging traffic",
      "Stop and wait",
      "Prepare for traffic merging from the side",
      "Change lanes immediately"
    ],
    correctAnswer: 2,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "Be prepared for traffic merging into your lane. Adjust speed and position to allow safe merging."
  },
  {
    id: 8,
    signEmoji: "⛰️",
    signName: "Steep Hill",
    question: "For truck drivers, this sign means:",
    answers: [
      "Use lower gear to control speed downhill",
      "Speed up going downhill",
      "Turn on hazard lights",
      "Avoid using brakes"
    ],
    correctAnswer: 0,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "Use a lower gear going downhill to avoid overheating brakes. Check your brakes before descending."
  },
  {
    id: 9,
    signEmoji: "🚛",
    signName: "No Trucks",
    question: "What does this sign mean?",
    answers: [
      "Trucks under 5 tons allowed",
      "No trucks allowed on this road",
      "Trucks must use right lane",
      "Truck parking prohibited"
    ],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-400",
    explanation: "This sign prohibits trucks from using the road ahead. Find an alternate route."
  },
  {
    id: 10,
    signEmoji: "↪️",
    signName: "Sharp Curve",
    question: "How should truck drivers approach this sign?",
    answers: [
      "Maintain current speed",
      "Reduce speed before the curve",
      "Speed up to get through quickly",
      "Use horn continuously"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "Slow down before the curve. Trucks have higher centers of gravity and can tip on sharp curves at high speeds."
  }
];

const RoadSigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerClick = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct! ✓",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the explanation below",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 shadow-xl">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto p-6 max-w-4xl">
          <Card className="p-12 text-center bg-white/95 backdrop-blur">
            <Trophy className={`w-24 h-24 mx-auto mb-6 ${passed ? 'text-green-500' : 'text-orange-500'}`} />
            <h1 className="text-4xl font-bold mb-4">
              {passed ? "Congratulations! 🎉" : "Good Try! 💪"}
            </h1>
            <p className="text-2xl mb-8 text-muted-foreground">
              You scored <span className="font-bold text-primary">{score}</span> out of{" "}
              <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="mb-8">
              <Progress value={percentage} className="h-4 mb-2" />
              <p className="text-lg font-semibold">{percentage}%</p>
            </div>
            <p className="text-lg mb-8">
              {passed 
                ? "Excellent work! You have a strong understanding of road signs for truck drivers."
                : "Keep practicing! Review the signs and try again to improve your score."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleRestart}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                variant="outline"
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 shadow-xl">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm text-white/80">Your Score</p>
              <p className="text-2xl font-bold">{score} / {quizQuestions.length}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">🚦 Road Signs Practice Quiz</h1>
          <p className="text-white/90 mb-4">Test your knowledge of US road signs for truck drivers</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="overflow-hidden bg-white/95 backdrop-blur">
          {/* Road Sign Display */}
          <div className={`${question.color} p-12 text-center`}>
            <Badge className="mb-4 text-sm">{question.category}</Badge>
            <div className="text-9xl mb-4 animate-in fade-in zoom-in duration-500">
              {question.signEmoji}
            </div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              {question.signName}
            </h2>
          </div>

          {/* Question and Answers */}
          <div className="p-8">
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              {question.question}
            </h3>

            <div className="space-y-3 mb-6">
              {question.answers.map((answer, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      showCorrect
                        ? "bg-green-100 border-green-500 text-green-800"
                        : showIncorrect
                        ? "bg-red-100 border-red-500 text-red-800"
                        : isSelected
                        ? "bg-blue-100 border-blue-500 text-blue-800"
                        : "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{answer}</span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                <p className="font-semibold mb-2 text-slate-800">
                  {selectedAnswer === question.correctAnswer ? "✓ Correct!" : "ℹ️ Explanation:"}
                </p>
                <p className="text-slate-700">{question.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoadSigns;
