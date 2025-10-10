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
    signName: "Stop Sign (R1-1)",
    question: "What must you do when you see this octagonal red sign?",
    answers: [
      "Slow down and proceed with caution",
      "Come to a complete stop before the stop line",
      "Yield to oncoming traffic only",
      "Stop only if other vehicles are present"
    ],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-600",
    explanation: "MUTCD R1-1: You must come to a complete stop at the stop line, crosswalk, or intersection before proceeding. This is mandatory for all vehicles including trucks."
  },
  {
    id: 2,
    signEmoji: "⚠️",
    signName: "Yield Sign (R1-2)",
    question: "What action is required when approaching this triangular sign?",
    answers: [
      "Stop completely like a stop sign",
      "Speed up to merge quickly",
      "Slow down and give right of way to other traffic",
      "Honk horn and proceed"
    ],
    correctAnswer: 2,
    category: "Regulatory",
    color: "bg-red-500",
    explanation: "MUTCD R1-2: Yield means slow down, be prepared to stop if necessary, and give the right of way to traffic and pedestrians. Proceed only when safe."
  },
  {
    id: 3,
    signEmoji: "🚫",
    signName: "Commercial Vehicles Excluded (R5-4)",
    question: "What does this sign mean for truck drivers?",
    answers: [
      "Trucks under 10,000 lbs can proceed",
      "All commercial vehicles are prohibited from this road",
      "Only delivery trucks excluded",
      "Trucks must use right lane only"
    ],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    explanation: "MUTCD R5-4: This sign prohibits all commercial vehicles from using the road ahead. You must find an alternate route."
  },
  {
    id: 4,
    signEmoji: "⬇️",
    signName: "Steep Hill/Grade Warning (W7-1)",
    question: "As a truck driver approaching a steep downgrade, what should you do?",
    answers: [
      "Rely on service brakes only",
      "Shift to lower gear before descending to control speed",
      "Increase speed to maintain momentum",
      "Turn on cruise control"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W7-1: Use a lower gear before descending to avoid brake overheating. Check brakes at the top. Never rely solely on service brakes on long grades."
  },
  {
    id: 5,
    signEmoji: "🔃",
    signName: "Sharp Curve Warning (W1-2)",
    question: "How should truck drivers approach a sharp curve ahead?",
    answers: [
      "Maintain current highway speed",
      "Reduce speed before entering the curve",
      "Accelerate through the curve",
      "Apply brakes in the middle of curve"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W1-2: Slow down BEFORE the curve. Trucks have a higher center of gravity and can rollover on curves taken too fast. Never brake in the curve."
  },
  {
    id: 6,
    signEmoji: "🔀",
    signName: "Merge Sign (W4-1)",
    question: "What should you do when you see this sign?",
    answers: [
      "Speed up to prevent others from merging",
      "Stop and wait for a gap",
      "Be prepared for traffic merging into your lane",
      "Change lanes immediately"
    ],
    correctAnswer: 2,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W4-1: Be prepared for traffic entering from the side. Adjust speed and position to allow safe merging. For trucks, allow extra space."
  },
  {
    id: 7,
    signEmoji: "⛔",
    signName: "Do Not Enter (R5-1)",
    question: "What does this sign indicate?",
    answers: [
      "One-way street, wrong direction",
      "Road closed to all traffic",
      "Trucks only prohibited",
      "Parking not allowed"
    ],
    correctAnswer: 0,
    category: "Regulatory",
    color: "bg-red-600",
    explanation: "MUTCD R5-1: This sign means you are going the wrong way on a one-way street or exit ramp. Stop and turn around immediately."
  },
  {
    id: 8,
    signEmoji: "🚧",
    signName: "Road Work Ahead (W20-1)",
    question: "What should truck drivers do when seeing this sign?",
    answers: [
      "Maintain speed, workers will move",
      "Slow down and be alert for workers and equipment",
      "Use shoulder to pass",
      "Turn on high beams"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-orange-500",
    explanation: "MUTCD W20-1: Reduce speed, stay alert for workers, equipment, and changing road conditions. Follow all construction zone speed limits."
  },
  {
    id: 9,
    signEmoji: "🦌",
    signName: "Deer Crossing (W11-3)",
    question: "Why is this sign especially important for truck drivers at night?",
    answers: [
      "Deer only cross during daylight",
      "Deer are most active at dawn/dusk and can cause serious accidents",
      "Sign is just decorative",
      "Only small vehicles need to worry"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W11-3: Deer are most active at dawn and dusk. A collision with a deer can cause serious damage to a truck and injury. Reduce speed in these areas."
  },
  {
    id: 10,
    signEmoji: "❌",
    signName: "Divided Highway Ends (W6-2)",
    question: "What does this sign warn you about?",
    answers: [
      "Highway is ending, exit required",
      "Divided highway ahead",
      "Two-way traffic ahead on undivided road",
      "Road narrows to one lane"
    ],
    correctAnswer: 2,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W6-2: The median is ending and you'll be on an undivided road with two-way traffic. Be prepared for oncoming traffic in the opposite lane."
  },
  {
    id: 11,
    signEmoji: "🌉",
    signName: "Bridge Ices Before Road (W8-13)",
    question: "Why should truck drivers be especially careful with this sign?",
    answers: [
      "Bridges only ice in summer",
      "Bridges freeze before road surfaces, creating slippery conditions",
      "Sign only applies to cars",
      "Speed up to cross bridge quickly"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W8-13: Bridge surfaces freeze before regular roads due to cold air on both sides. Reduce speed and avoid sudden braking or steering on bridges in cold weather."
  },
  {
    id: 12,
    signEmoji: "🔄",
    signName: "Roundabout Ahead (W2-6)",
    question: "How should trucks navigate a roundabout?",
    answers: [
      "Speed up to enter quickly",
      "Yield to traffic already in the roundabout, proceed counterclockwise",
      "Stop in the roundabout and wait",
      "Drive clockwise around the circle"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W2-6: Slow down before entering. Yield to vehicles already in the roundabout. Travel counterclockwise. Large trucks may need extra space and multiple lanes."
  },
  {
    id: 13,
    signEmoji: "💨",
    signName: "Bump Ahead (W8-1)",
    question: "Why is this warning especially important for loaded trucks?",
    answers: [
      "Bumps don't affect trucks",
      "Sudden bumps can shift cargo and cause loss of control",
      "Only applies to empty trucks",
      "Increase speed to smooth out bump"
    ],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    explanation: "MUTCD W8-1: Reduce speed before bump. Sudden jolts can shift cargo, damage suspension, or cause loss of control, especially with heavy loads."
  },
  {
    id: 14,
    signEmoji: "🏗️",
    signName: "Low Clearance (W12-2)",
    question: "What must truck drivers do when seeing a low clearance sign?",
    answers: [
      "Proceed if moving slowly",
      "Know your vehicle height and find alternate route if too tall",
      "Only applies to double-decker buses",
      "Air can be released from tires to lower truck"
    ],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    explanation: "MUTCD W12-2: Know your truck's height including any cargo or equipment. If your vehicle exceeds the posted clearance, you MUST find another route. Striking an overpass is extremely dangerous and costly."
  },
  {
    id: 15,
    signEmoji: "💺",
    signName: "Seatbelt Required (R16-1)",
    question: "What is the law regarding seatbelts in commercial vehicles?",
    answers: [
      "Seatbelts optional for experienced drivers",
      "Required for all occupants in commercial vehicles",
      "Only passenger vehicles require seatbelts",
      "Required only on highways"
    ],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    explanation: "MUTCD R16-1: Federal law requires all occupants of commercial vehicles to wear seatbelts at all times while the vehicle is in motion. Violations can result in fines and CSA points."
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
