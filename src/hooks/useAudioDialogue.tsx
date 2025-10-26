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
  const audioCacheRef = useRef<Map<string, ArrayBuffer>>(new Map());
  const playbackAbortedRef = useRef(false);
  const isGeneratingRef = useRef(false);
  const currentBlobUrlRef = useRef<string | null>(null);

  const generateAudio = async (text: string, voice: string = "echo", retries = 2): Promise<ArrayBuffer> => {
    // Check cache first
    const cacheKey = `${text}-${voice}`;
    if (audioCacheRef.current.has(cacheKey)) {
      return audioCacheRef.current.get(cacheKey)!;
    }

    let lastError: any;
    for (let attempt = 0; attempt <= retries; attempt++) {
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

        // Convert base64 to ArrayBuffer for efficient storage
        const binaryString = atob(data.audioContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const audioBuffer = bytes.buffer;

        // Cache the raw audio buffer
        audioCacheRef.current.set(cacheKey, audioBuffer);
        return audioBuffer;
      } catch (error: any) {
        lastError = error;
        console.error(`Audio generation attempt ${attempt + 1} failed:`, error);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }
    throw lastError;
  };

  const playDialogueLine = async (
    line: DialogueLine,
    index: number,
    isRussian: boolean,
    onComplete: () => void
  ) => {
    // Check if playback was aborted
    if (playbackAbortedRef.current) {
      return;
    }

    try {
      isGeneratingRef.current = true;
      const text = isRussian ? line.textRu : line.text;
      // Use different voices: "echo" for driver, "alloy" for others
      const voice = line.speaker.toLowerCase().includes("driver") ? "echo" : "alloy";
      
      const audioBuffer = await generateAudio(text, voice);
      
      // Check again after async operation
      if (playbackAbortedRef.current) {
        isGeneratingRef.current = false;
        return;
      }

      // Clean up previous audio if exists
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      
      // Revoke previous blob URL to free memory
      if (currentBlobUrlRef.current) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
        currentBlobUrlRef.current = null;
      }
      
      // Create Blob URL from ArrayBuffer (much more mobile-friendly)
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const blobUrl = URL.createObjectURL(audioBlob);
      currentBlobUrlRef.current = blobUrl;
      
      // Create audio element with Blob URL
      const audio = new Audio(blobUrl);
      audioRef.current = audio;
      isGeneratingRef.current = false;

      audio.onended = () => {
        // Check if playback was aborted during playback
        if (!playbackAbortedRef.current) {
          // Longer pause for mobile devices (1000ms instead of 500ms)
          setTimeout(() => {
            if (!playbackAbortedRef.current) {
              // Clean up blob URL before moving to next line
              if (currentBlobUrlRef.current) {
                URL.revokeObjectURL(currentBlobUrlRef.current);
                currentBlobUrlRef.current = null;
              }
              onComplete();
            }
          }, 1000);
        }
      };

      audio.onerror = (event) => {
        isGeneratingRef.current = false;
        console.error("Audio playback error:", event);
        if (!playbackAbortedRef.current) {
          // Revoke blob URL on error
          if (currentBlobUrlRef.current) {
            URL.revokeObjectURL(currentBlobUrlRef.current);
            currentBlobUrlRef.current = null;
          }
          toast({
            title: "Audio Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive",
          });
          setIsPlaying(false);
          setIsLoading(false);
        }
      };

      // Wrap play() in try-catch to handle mobile Safari promise rejections
      try {
        await audio.play();
      } catch (playError: any) {
        console.error("Play promise rejected:", playError);
        // Handle specific mobile errors
        if (playError.name === 'NotAllowedError') {
          toast({
            title: "Playback Blocked",
            description: "Please enable audio playback in your browser settings.",
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
        setIsLoading(false);
        
        // Clean up on play failure
        if (currentBlobUrlRef.current) {
          URL.revokeObjectURL(currentBlobUrlRef.current);
          currentBlobUrlRef.current = null;
        }
      }
    } catch (error: any) {
      isGeneratingRef.current = false;
      console.error("Error playing dialogue line:", error);
      if (!playbackAbortedRef.current) {
        toast({
          title: "Error",
          description: error.message || "Failed to generate audio",
          variant: "destructive",
        });
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  };

  const playDialogue = async (dialogue: DialogueLine[], isRussian: boolean) => {
    if (isPlaying || isGeneratingRef.current) return;

    playbackAbortedRef.current = false;
    setIsPlaying(true);
    setIsLoading(true);
    setCurrentLineIndex(0);
    setHasPlayedOnce(true);

    const playNextLine = async (index: number) => {
      // Check if playback was aborted
      if (playbackAbortedRef.current) {
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      if (index >= dialogue.length) {
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      setCurrentLineIndex(index);
      setIsLoading(false);

      try {
        await playDialogueLine(dialogue[index], index, isRussian, () => {
          playNextLine(index + 1);
        });
      } catch (error) {
        console.error("Error in playNextLine:", error);
        setIsPlaying(false);
        setIsLoading(false);
      }
    };

    await playNextLine(0);
  };

  const pause = () => {
    playbackAbortedRef.current = true;
    isGeneratingRef.current = false;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    
    // Clean up blob URL
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }
    
    setIsPlaying(false);
    setIsLoading(false);
  };

  const replay = async (dialogue: DialogueLine[], isRussian: boolean) => {
    pause();
    setCurrentLineIndex(0);
    // Small delay to ensure cleanup completes
    await new Promise(resolve => setTimeout(resolve, 100));
    await playDialogue(dialogue, isRussian);
  };

  const stop = () => {
    playbackAbortedRef.current = true;
    pause();
    setCurrentLineIndex(0);
    setHasPlayedOnce(false);
    
    // Ensure blob URL is cleaned up
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }
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
