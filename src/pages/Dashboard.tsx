import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Clock, Play, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const completedLessons = 3;
  const totalLessons = 20;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const topics = [
    { id: 1, title: "Navigation & Directions", lessons: 5, completed: 3, icon: "🗺️" },
    { id: 2, title: "Delivery & Pickups", lessons: 4, completed: 0, icon: "📦" },
    { id: 3, title: "Border Crossings", lessons: 3, completed: 0, icon: "🛂" },
    { id: 4, title: "Roadside Assistance", lessons: 4, completed: 0, icon: "🔧" },
    { id: 5, title: "Rest Stop Conversations", lessons: 4, completed: 0, icon: "☕" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-white/80 mt-1">Welcome back, Driver!</p>
          </div>
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Progress Overview */}
        <Card className="p-6 card-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <p className="text-muted-foreground">Keep up the great work!</p>
            </div>
            <Trophy className="w-12 h-12 text-accent" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{completedLessons} of {totalLessons} lessons completed</span>
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
                <span className="text-sm font-medium text-accent">TODAY'S LESSON</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Asking for Directions</h3>
              <p className="text-muted-foreground mb-4">
                Learn key phrases for finding your way: "Where is...", "How do I get to...", and understanding directions.
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground mb-6">
                <span>⏱️ 5 minutes</span>
                <span>•</span>
                <span>🎧 Audio included</span>
                <span>•</span>
                <span>❓ 5 questions</span>
              </div>
              <Button 
                size="lg" 
                className="btn-hero"
                onClick={() => navigate("/lesson/1")}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Lesson
              </Button>
            </div>
          </div>
        </Card>

        {/* Topics Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Topics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Card 
                key={topic.id} 
                className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => navigate(`/topic/${topic.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>{topic.lessons} lessons</span>
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
                        value={(topic.completed / topic.lessons) * 100} 
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
