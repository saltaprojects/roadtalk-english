import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Truck, BookOpen, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-truck.jpg";
const Home = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Truck className="w-16 h-16 mx-auto mb-6 text-accent animate-fade-in" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            RoadTalk English
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Learn practical English for truck drivers — on your time, on your route
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="btn-hero text-lg px-8 py-6" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Built for Life on the Road
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <Clock className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">5-Minute Lessons</h3>
              <p className="text-muted-foreground">
                Quick micro-lessons perfect for rest stops. Learn while you take a break.
              </p>
            </Card>

            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Job-Focused Content</h3>
              <p className="text-muted-foreground">
                Navigation, delivery, border crossings — English you actually need on the job.
              </p>
            </Card>

            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <Award className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Track Your Progress</h3>
              <p className="text-muted-foreground">
                See your improvement with every completed lesson. Stay motivated!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-road text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Improve Your English?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join drivers learning practical English for the road
          </p>
          <Button size="lg" className="btn-hero text-lg px-8 py-6" onClick={() => navigate("/auth")}>
            Start Learning Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2025 RoadTalk English. Built for drivers, by language experts.</p>
        </div>
      </footer>
    </div>;
};
export default Home;