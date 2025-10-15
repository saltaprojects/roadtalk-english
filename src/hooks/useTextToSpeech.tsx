import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const playText = async (text: string, lang: string = "en-US") => {
    try {
      if (!synth) {
        toast({
          title: "Not supported",
          description: "Text-to-speech is not supported in your browser.",
          variant: "destructive",
        });
        return;
      }

      // Stop any currently playing speech
      synth.cancel();

      setIsPlaying(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (error) => {
        console.error("TTS Error:", error);
        setIsPlaying(false);
        toast({
          title: "Error",
          description: "Failed to play audio.",
          variant: "destructive",
        });
      };

      synth.speak(utterance);
    } catch (error) {
      console.error("TTS Error:", error);
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (synth) {
      synth.cancel();
    }
    setIsPlaying(false);
  };

  return { playText, isPlaying, stop };
};
