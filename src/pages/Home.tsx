import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Truck, BookOpen, Award, Clock, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-hero-zoom" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/70" />
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium animate-fade-in">
            🚛 Professional Truck Driver Training
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="btn-hero text-lg px-10 py-7 shadow-2xl" onClick={() => navigate("/auth")}>
              {t('home.getStarted')}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">20+</div>
              <div className="text-white/80 text-sm">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">AI</div>
              <div className="text-white/80 text-sm">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-white/80 text-sm">Interactive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a confident professional driver
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated group border-2 border-transparent hover:border-primary/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.features.lesson.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.features.lesson.description')}
              </p>
            </Card>

            <Card className="p-8 card-elevated group border-2 border-transparent hover:border-accent/20">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.features.content.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.features.content.description')}
              </p>
            </Card>

            <Card className="p-8 card-elevated group border-2 border-transparent hover:border-secondary/20">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.features.progress.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.features.progress.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-road opacity-95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-10 text-white/95 max-w-2xl mx-auto leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 font-bold" onClick={() => navigate("/auth")}>
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground mb-2">{t('home.footer')}</p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground/60">
            <span>© 2025</span>
            <span>•</span>
            <span>Built with ❤️ for Truck Drivers</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate("/contact")}
            className="btn-hero fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl hover:shadow-[var(--shadow-glow)] transition-all duration-300 z-50 hover:scale-110"
            size="icon"
          >
            <Mail className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="text-base bg-primary text-white border-primary">
          <p>{t('home.fab.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </div>;
};
export default Home;