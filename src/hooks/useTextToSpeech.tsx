import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const playText = async (text: string, voice: string = "echo") => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      setIsPlaying(true);

      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice },
      });

      if (error) {
        console.error("TTS Error:", error);
        if (error.message?.includes("429")) {
          toast({
            title: "Rate limit",
            description: "Too many requests. Please wait a moment.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to generate audio. Please try again.",
            variant: "destructive",
          });
        }
        setIsPlaying(false);
        return;
      }

      if (data?.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        setCurrentAudio(audio);

        audio.onended = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
        };

        audio.onerror = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
          toast({
            title: "Error",
            description: "Failed to play audio.",
            variant: "destructive",
          });
        };

        await audio.play();
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  };

  return { playText, isPlaying, stop };
};
