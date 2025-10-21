import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type DialogueLine = {
  speaker: string;
  text: string;
  textRu: string;
};

export const useAudioDialogue = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());

  const generateAudio = async (text: string, voice: string = "echo"): Promise<string> => {
    // Check cache first
    const cacheKey = `${text}-${voice}`;
    if (audioCacheRef.current.has(cacheKey)) {
      return audioCacheRef.current.get(cacheKey)!;
    }

    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice },
      });

      if (error) {
        if (error.message?.includes("429")) {
          throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        }
        throw error;
      }

      if (!data?.audioContent) {
        throw new Error("No audio data received");
      }

      // Cache the audio
      audioCacheRef.current.set(cacheKey, data.audioContent);
      return data.audioContent;
    } catch (error: any) {
      console.error("Error generating audio:", error);
      throw error;
    }
  };

  const playDialogueLine = async (
    line: DialogueLine,
    index: number,
    isRussian: boolean,
    onComplete: () => void
  ) => {
    try {
      const text = isRussian ? line.textRu : line.text;
      // Use different voices: "echo" for driver, "alloy" for others
      const voice = line.speaker.toLowerCase().includes("driver") ? "echo" : "alloy";
      
      const audioContent = await generateAudio(text, voice);
      
      // Create audio element
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audioRef.current = audio;

      audio.onended = () => {
        // Add a natural pause between lines (500ms)
        setTimeout(() => {
          onComplete();
        }, 500);
      };

      audio.onerror = () => {
        toast({
          title: "Audio Error",
          description: "Failed to play audio. Please try again.",
          variant: "destructive",
        });
        setIsPlaying(false);
      };

      try {
        await audio.play();
      } catch (playError: any) {
        // Handle autoplay policy restrictions (common on mobile)
        if (playError.name === 'NotAllowedError') {
          toast({
            title: "Permission Required",
            description: "Please tap the Play button to start audio playback.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Playback Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive",
          });
        }
        setIsPlaying(false);
        throw playError;
      }
    } catch (error: any) {
      console.error("Error playing dialogue line:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate audio",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  const playDialogue = async (dialogue: DialogueLine[], isRussian: boolean) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setIsLoading(true);
    setCurrentLineIndex(0);
    setHasPlayedOnce(true);

    const playNextLine = async (index: number) => {
      if (index >= dialogue.length) {
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      setCurrentLineIndex(index);
      setIsLoading(false);

      await playDialogueLine(dialogue[index], index, isRussian, () => {
        playNextLine(index + 1);
      });
    };

    await playNextLine(0);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const replay = async (dialogue: DialogueLine[], isRussian: boolean) => {
    pause();
    setCurrentLineIndex(0);
    await playDialogue(dialogue, isRussian);
  };

  const stop = () => {
    pause();
    setCurrentLineIndex(0);
    setHasPlayedOnce(false);
  };

  return {
    isPlaying,
    currentLineIndex,
    isLoading,
    hasPlayedOnce,
    playDialogue,
    pause,
    replay,
    stop,
  };
};
