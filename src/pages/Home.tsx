import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Truck, BookOpen, Award, Clock, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import heroImage from "@/assets/hero-truck.jpg";
const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return <div className="min-h-screen">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="btn-hero text-lg px-8 py-6" onClick={() => navigate("/auth")}>
              {t('home.getStarted')}
            </Button>
            
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your Learning Path
          </h2>

          {/* Beginner Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 font-bold text-xl">B</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold">Beginner</h3>
                <p className="text-muted-foreground">Perfect for those starting their trucking journey</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🗺️</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Navigation Basics</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>5 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Learn essential navigation skills for truck drivers</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📦</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Delivery Fundamentals</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>6 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Master the basics of safe and efficient deliveries</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Intermediate Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-xl">I</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold">Intermediate</h3>
                <p className="text-muted-foreground">Advance your skills with complex scenarios</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🛂</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Border Procedures</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>7 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Navigate international border crossings with confidence</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔧</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Roadside Maintenance</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>8 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Handle common roadside issues and maintenance</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Professional Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-500 font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold">Professional</h3>
                <p className="text-muted-foreground">Expert-level training for seasoned drivers</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏗️</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">Heavy Load Management</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>8 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Specialized training for oversized and heavy loads</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-elevated hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🌍</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">International Routes</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>10 lessons</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Master cross-border logistics and regulations</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-road text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t('home.cta.subtitle')}
          </p>
          <Button size="lg" className="btn-hero text-lg px-8 py-6" onClick={() => navigate("/auth")}>
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>{t('home.footer')}</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate("/contact")}
            className="btn-hero fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse z-50"
            size="icon"
          >
            <Mail className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="text-base">
          <p>{t('home.fab.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </div>;
};
export default Home;