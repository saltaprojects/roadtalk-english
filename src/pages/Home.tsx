import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Truck, BookOpen, Award, Clock, Mail, User, Newspaper, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroImage from "@/assets/hero-truck.jpg";
import profileImage from "@/assets/profile-picture.jpg";
import { industryNews } from "@/data/industryNews";
const Home = () => {
  const navigate = useNavigate();
  const {
    t,
    i18n
  } = useTranslation();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % industryNews.length);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + industryNews.length) % industryNews.length);
  };

  const currentNews = industryNews[currentNewsIndex];
  return <div className="min-h-screen">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-hero-zoom" style={{
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

      {/* Features Section */}
      <section className="pt-20 pb-8 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('home.features.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <Clock className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">{t('home.features.lesson.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.features.lesson.description')}
              </p>
            </Card>

            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">{t('home.features.content.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.features.content.description')}
              </p>
            </Card>

            <Card className="p-8 card-elevated hover:scale-105 transition-transform duration-200">
              <Award className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">{t('home.features.progress.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.features.progress.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="pt-0 pb-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-left px-0 pt-6 pb-[9px] my-0 mx-0">
            {t('home.about.title')}
          </h2>
          
          <div className="relative">
            {/* Avatar/Image - Floated */}
            <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary shadow-xl rounded-xl float-left mr-8 mb-6 mt-4">
              <AvatarImage src={profileImage} alt="Profile" className="object-cover" />
              <AvatarFallback className="bg-primary text-white text-6xl rounded-xl">
                <User className="w-24 h-24" />
              </AvatarFallback>
            </Avatar>

            {/* Content - Wraps around image */}
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                {t('home.about.description')}
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground">
                "{t('home.about.quote')}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
          <div className="flex justify-center mb-0">
            <Newspaper className="w-12 h-12 text-accent" />
          </div>
            <h2 className="text-4xl font-bold mb-4">
              {t('home.news.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.news.subtitle')}
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-card rounded-lg p-8 shadow-lg border">
              <div className="flex items-start gap-3 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {t(`home.news.categories.${currentNews.category.toLowerCase()}`)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(currentNews.date).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                {currentNews.title[i18n.language as 'en' | 'ru'] || currentNews.title.en}
              </h3>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {currentNews.excerpt[i18n.language as 'en' | 'ru'] || currentNews.excerpt.en}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t">
                <span className="text-sm text-muted-foreground font-medium">
                  {currentNews.source}
                </span>
                <a 
                  href={currentNews.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-medium"
                >
                  {t('home.news.readMore')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={prevNews}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                {t('home.news.previous')}
              </Button>
              
              <div className="flex gap-2">
                {industryNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentNewsIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to news ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={nextNews}
                className="flex items-center gap-2"
              >
                {t('home.news.next')}
                <ChevronRight className="w-5 h-5" />
              </Button>
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
          <Button onClick={() => navigate("/contact")} className="btn-hero fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse z-50" size="icon">
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