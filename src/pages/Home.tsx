import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Truck, BookOpen, Award, Clock, Mail, User, Newspaper, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
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
      <section className="py-20 px-4 bg-muted/30">
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
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-left px-0 py-[9px] my-0 mx-0">
            {t('home.about.title')}
          </h2>
          
          <div className="relative">
            {/* Avatar/Image - Floated */}
            <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary shadow-xl rounded-xl float-left mr-8 mb-6">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Newspaper className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {t('home.news.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.news.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryNews.map((news) => (
              <Card key={news.id} className="p-6 card-elevated hover:scale-105 transition-transform duration-200 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {t(`home.news.categories.${news.category.toLowerCase()}`)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(news.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {news.title[i18n.language as 'en' | 'ru'] || news.title.en}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {news.excerpt[i18n.language as 'en' | 'ru'] || news.excerpt.en}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {news.source}
                  </span>
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    {t('home.news.readMore')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            ))}
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