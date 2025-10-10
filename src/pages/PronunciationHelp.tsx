import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import PhraseCard from "@/components/PhraseCard";
import { getPhrasesByCategory, type PhraseCategory } from "@/data/pronunciationPhrases";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type CategoryFilter = 'all' | PhraseCategory;

interface PracticeResult {
  score: number;
  category: 'excellent' | 'good' | 'fair' | 'needsPractice';
}

const PronunciationHelp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isRecording, isAnalyzing, startRecording, stopRecording } = useSpeechRecognition();
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);
  const [recordingPhraseId, setRecordingPhraseId] = useState<string | null>(null);
  const [practiceResults, setPracticeResults] = useState<Record<string, PracticeResult>>({});

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

  const handlePlayAudio = async (phraseId: string) => {
    const phrase = phrases.find(p => p.id === phraseId);
    if (!phrase) return;

    // Stop any currently playing audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    setPlayingPhraseId(phraseId);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: phrase.english, voice: 'echo' }
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        
        audio.onended = () => {
          setPlayingPhraseId(null);
        };
        
        audio.onerror = () => {
          setPlayingPhraseId(null);
          toast({
            title: t('pronunciation.feedback.audioError'),
            variant: "destructive",
          });
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      setPlayingPhraseId(null);
      toast({
        title: t('pronunciation.feedback.audioError'),
        variant: "destructive",
      });
    }
  };

  const handlePracticePronunciation = async (phraseId: string) => {
    const phrase = phrases.find(p => p.id === phraseId);
    if (!phrase) return;

    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: t('pronunciation.feedback.notSupported'),
        variant: "destructive",
      });
      return;
    }

    // If already recording this phrase, stop it
    if (isRecording && recordingPhraseId === phraseId) {
      stopRecording();
      setRecordingPhraseId(null);
      return;
    }

    // Request microphone permission and start recording
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setRecordingPhraseId(phraseId);
      
      const result = await startRecording(phrase.english);
      
      // Update practice results
      setPracticeResults(prev => ({
        ...prev,
        [phraseId]: {
          score: result.score,
          category: result.category,
        },
      }));

      setRecordingPhraseId(null);

      // Show feedback toast
      toast({
        title: `${result.score}%`,
        description: t(`pronunciation.feedback.${result.category}`),
      });

    } catch (error: any) {
      setRecordingPhraseId(null);
      
      let errorMessage = t('pronunciation.feedback.recognitionError');
      
      if (error.message === 'microphone-permission') {
        errorMessage = t('pronunciation.feedback.microphoneError');
      } else if (error.message === 'no-speech') {
        errorMessage = t('pronunciation.feedback.noSpeechDetected');
      }

      toast({
        title: errorMessage,
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
                onPractice={handlePracticePronunciation}
                isRecording={isRecording && recordingPhraseId === phrase.id}
                isAnalyzing={isAnalyzing && recordingPhraseId === phrase.id}
                practiceResult={practiceResults[phrase.id] || null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationHelp;
