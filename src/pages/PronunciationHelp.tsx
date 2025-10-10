import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import PhraseCard from "@/components/PhraseCard";
import { getPhrasesByCategory, type PhraseCategory } from "@/data/pronunciationPhrases";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type CategoryFilter = 'all' | PhraseCategory;

const PronunciationHelp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const phrases = getPhrasesByCategory(selectedCategory);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: t('pronunciation.categories.all') },
    { value: 'navigation', label: t('pronunciation.categories.navigation') },
    { value: 'delivery', label: t('pronunciation.categories.delivery') },
    { value: 'border', label: t('pronunciation.categories.border') },
    { value: 'emergency', label: t('pronunciation.categories.emergency') },
    { value: 'dispatch', label: t('pronunciation.categories.dispatch') },
    { value: 'mechanics', label: t('pronunciation.categories.mechanics') },
  ];

  const handlePlayAudio = (phraseId: string) => {
    const phrase = phrases.find(p => p.id === phraseId);
    if (!phrase) return;

    // Stop any currently playing speech
    window.speechSynthesis.cancel();
    
    try {
      const utterance = new SpeechSynthesisUtterance(phrase.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      setPlayingPhraseId(phraseId);
      
      utterance.onend = () => {
        setPlayingPhraseId(null);
      };
      
      utterance.onerror = () => {
        setPlayingPhraseId(null);
        toast({
          title: t('pronunciation.feedback.audioError'),
          variant: "destructive",
        });
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error with speech synthesis:', error);
      toast({
        title: t('pronunciation.feedback.audioError'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-road text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('pronunciation.backToDashboard')}
            </Button>
            <LanguageSwitcher />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('pronunciation.title')}
            </h1>
            <p className="text-white/80">
              {t('pronunciation.subtitle')}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="text-sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Phrases Grid */}
        {phrases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t('pronunciation.feedback.noPhrasesInCategory')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                onPlay={handlePlayAudio}
                isPlaying={playingPhraseId === phrase.id}
                isLoading={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationHelp;
