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
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
            <Truck className="w-4 h-4" />
            Professional Truck Driver Training
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-hero text-base px-8 py-6" onClick={() => navigate("/auth")}>
              {t('home.getStarted')}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary mb-1">20+</div>
              <div className="text-muted-foreground text-sm">Lessons</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="text-4xl font-bold text-accent mb-1">AI</div>
              <div className="text-muted-foreground text-sm">Powered</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="text-4xl font-bold text-secondary mb-1">100%</div>
              <div className="text-muted-foreground text-sm">Interactive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a confident professional driver
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 card-elevated group border border-primary/20 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('home.features.lesson.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.features.lesson.description')}
                </p>
              </div>
            </Card>

            <Card className="p-8 card-elevated group border border-accent/20 hover:border-accent/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors duration-300">
                  <BookOpen className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('home.features.content.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.features.content.description')}
                </p>
              </div>
            </Card>

            <Card className="p-8 card-elevated group border border-secondary/20 hover:border-secondary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors duration-300">
                  <Award className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('home.features.progress.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.features.progress.description')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <Button size="lg" className="btn-hero text-lg px-12 py-7" onClick={() => navigate("/auth")}>
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
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