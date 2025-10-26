import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const audioCacheRef = useRef<Map<string, string>>(new Map());

  const playText = async (text: string, voice: string = "echo", retries = 2) => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      setIsPlaying(true);

      // Check cache first
      const cacheKey = `${text}-${voice}`;
      if (audioCacheRef.current.has(cacheKey)) {
        const cachedAudio = audioCacheRef.current.get(cacheKey)!;
        const audio = new Audio(`data:audio/mp3;base64,${cachedAudio}`);
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
        return;
      }

      // Retry logic for audio generation
      let lastError: any;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
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
              setIsPlaying(false);
              return;
            }
            throw error;
          }

          if (data?.audioContent) {
            // Cache the audio
            audioCacheRef.current.set(cacheKey, data.audioContent);

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
            return;
          }
        } catch (error: any) {
          lastError = error;
          if (attempt < retries) {
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          }
        }
      }

      // All retries failed
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
      setIsPlaying(false);
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
