import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a single audio element that will be reused
    audioRef.current = new Audio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const playText = async (text: string, voice: string = "echo", retries = 2) => {
    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(true);

      // Check cache first
      const cacheKey = `${text}-${voice}`;
      if (audioCacheRef.current.has(cacheKey)) {
        const cachedAudio = audioCacheRef.current.get(cacheKey)!;
        
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        
        const audio = audioRef.current;
        
        // Return a Promise that resolves when audio finishes
        return new Promise<void>((resolve, reject) => {
          // Remove old event listeners
          audio.onended = null;
          audio.onerror = null;
          
          // Set new event listeners
          audio.onended = () => {
            setIsPlaying(false);
            resolve();
          };

          audio.onerror = (error) => {
            setIsPlaying(false);
            toast({
              title: "Error",
              description: "Failed to play audio.",
              variant: "destructive",
            });
            reject(error);
          };

          // Set the audio source and play
          audio.src = `data:audio/mp3;base64,${cachedAudio}`;
          audio.play().catch(reject);
        });
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

            if (!audioRef.current) {
              audioRef.current = new Audio();
            }
            
            const audio = audioRef.current;
            
            // Return a Promise that resolves when audio finishes
            return new Promise<void>((resolve, reject) => {
              // Remove old event listeners
              audio.onended = null;
              audio.onerror = null;
              
              // Set new event listeners
              audio.onended = () => {
                setIsPlaying(false);
                resolve();
              };

              audio.onerror = (error) => {
                setIsPlaying(false);
                toast({
                  title: "Error",
                  description: "Failed to play audio.",
                  variant: "destructive",
                });
                reject(error);
              };

              // Set the audio source and play
              audio.src = `data:audio/mp3;base64,${data.audioContent}`;
              audio.play().catch(reject);
            });
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return { playText, isPlaying, stop };
};
