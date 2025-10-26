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
  const preloadedAudioRef = useRef<Map<number, ArrayBuffer>>(new Map());
  const isPreloadingRef = useRef(false);

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

  const preloadAllAudio = async (
    dialogue: DialogueLine[],
    isRussian: boolean
  ): Promise<void> => {
    if (isPreloadingRef.current) return;
    
    isPreloadingRef.current = true;
    setIsLoading(true);
    
    try {
      console.log("[Audio] Preloading all dialogue audio...");
      
      const preloadPromises = dialogue.map(async (line, index) => {
        const text = isRussian ? line.textRu : line.text;
        const voice = line.speaker.toLowerCase().includes("driver") ? "echo" : "alloy";
        
        try {
          const audioBuffer = await generateAudio(text, voice);
          preloadedAudioRef.current.set(index, audioBuffer);
          console.log(`[Audio] Preloaded line ${index}: ${text.substring(0, 30)}...`);
          return true;
        } catch (error) {
          console.error(`[Audio] Failed to preload line ${index}:`, error);
          return false;
        }
      });
      
      const results = await Promise.all(preloadPromises);
      const successCount = results.filter(r => r).length;
      console.log(`[Audio] Preloaded ${successCount}/${dialogue.length} audio files`);
      
      if (successCount === 0) {
        throw new Error("Failed to preload any audio files");
      }
    } finally {
      isPreloadingRef.current = false;
      setIsLoading(false);
    }
  };

  const playDialogueLine = async (
    line: DialogueLine,
    index: number,
    isRussian: boolean,
    onComplete: () => void
  ) => {
    if (playbackAbortedRef.current) {
      console.log("[Audio] Playback aborted before starting line", index);
      return;
    }

    try {
      let audioBuffer: ArrayBuffer;
      
      if (preloadedAudioRef.current.has(index)) {
        console.log(`[Audio] Using preloaded audio for line ${index}`);
        audioBuffer = preloadedAudioRef.current.get(index)!;
      } else {
        console.log(`[Audio] Generating audio on-demand for line ${index}`);
        isGeneratingRef.current = true;
        const text = isRussian ? line.textRu : line.text;
        const voice = line.speaker.toLowerCase().includes("driver") ? "echo" : "alloy";
        audioBuffer = await generateAudio(text, voice);
        isGeneratingRef.current = false;
      }
      
      if (playbackAbortedRef.current) {
        console.log("[Audio] Playback aborted after audio generation");
        return;
      }

      if (currentBlobUrlRef.current) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
        currentBlobUrlRef.current = null;
      }
      
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const blobUrl = URL.createObjectURL(audioBlob);
      currentBlobUrlRef.current = blobUrl;
      
      const audio = audioRef.current;
      
      if (!audio) {
        throw new Error("Audio element not initialized");
      }

      const handleEnded = () => {
        if (!playbackAbortedRef.current) {
          console.log(`[Audio] Line ${index} ended, moving to next`);
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('error', handleError);
          
          setTimeout(() => {
            if (!playbackAbortedRef.current) {
              if (currentBlobUrlRef.current) {
                URL.revokeObjectURL(currentBlobUrlRef.current);
                currentBlobUrlRef.current = null;
              }
              onComplete();
            }
          }, 300);
        }
      };

      const handleError = (event: Event) => {
        console.error(`[Audio] Playback error for line ${index}:`, event);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        
        if (!playbackAbortedRef.current) {
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
          throw new Error("Audio playback failed");
        }
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      
      audio.src = blobUrl;
      audio.load();
      
      console.log(`[Audio] Waiting for audio to be ready for line ${index}...`);
      
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          console.error("[Audio] Audio load timeout");
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onLoadError);
          reject(new Error('Audio load timeout'));
        }, 15000);
        
        const onCanPlay = () => {
          clearTimeout(timeout);
          audio.removeEventListener('error', onLoadError);
          console.log(`[Audio] Audio ready for line ${index}`);
          resolve();
        };
        
        const onLoadError = (e: Event) => {
          clearTimeout(timeout);
          audio.removeEventListener('canplaythrough', onCanPlay);
          console.error("[Audio] Audio load error:", e);
          reject(new Error('Audio failed to load'));
        };
        
        audio.addEventListener('canplaythrough', onCanPlay, { once: true });
        audio.addEventListener('error', onLoadError, { once: true });
      });
      
      if (playbackAbortedRef.current) {
        console.log("[Audio] Playback aborted after audio ready");
        URL.revokeObjectURL(blobUrl);
        return;
      }

      try {
        console.log(`[Audio] Starting playback for line ${index}`);
        await audio.play();
        console.log(`[Audio] Successfully started playback for line ${index}`);
      } catch (playError: any) {
        console.error(`[Audio] Play error for line ${index}:`, playError);
        
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        
        if (playError.name === 'NotAllowedError') {
          toast({
            title: "Playback Blocked",
            description: "Please tap the screen to enable audio playback.",
            variant: "destructive",
          });
        } else if (playError.name === 'NotSupportedError') {
          toast({
            title: "Format Not Supported",
            description: "Your device cannot play this audio format.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Playback Error",
            description: `Failed to play audio: ${playError.message}`,
            variant: "destructive",
          });
        }
        
        setIsPlaying(false);
        setIsLoading(false);
        
        if (currentBlobUrlRef.current) {
          URL.revokeObjectURL(currentBlobUrlRef.current);
          currentBlobUrlRef.current = null;
        }
        
        throw playError;
      }
    } catch (error: any) {
      isGeneratingRef.current = false;
      console.error(`[Audio] Error playing dialogue line ${index}:`, error);
      
      if (!playbackAbortedRef.current) {
        if (!error.name || !['NotAllowedError', 'NotSupportedError'].includes(error.name)) {
          toast({
            title: "Error",
            description: error.message || "Failed to play audio",
            variant: "destructive",
          });
        }
        setIsPlaying(false);
        setIsLoading(false);
      }
      
      throw error;
    }
  };

  const playDialogue = async (dialogue: DialogueLine[], isRussian: boolean) => {
    if (isPlaying || isGeneratingRef.current || isPreloadingRef.current) {
      console.log("[Audio] Playback already in progress, ignoring");
      return;
    }

    playbackAbortedRef.current = false;
    
    console.log("[Audio] Starting dialogue playback sequence");
    
    try {
      await preloadAllAudio(dialogue, isRussian);
    } catch (error) {
      console.error("[Audio] Preload failed:", error);
      toast({
        title: "Loading Error",
        description: "Failed to load audio files. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (playbackAbortedRef.current) {
      console.log("[Audio] Playback aborted after preload");
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';
    console.log("[Audio] Created single audio element for dialogue playback");
    
    setIsPlaying(true);
    setCurrentLineIndex(0);
    setHasPlayedOnce(true);

    const playNextLine = async (index: number) => {
      if (playbackAbortedRef.current) {
        console.log("[Audio] Playback aborted in playNextLine");
        setIsPlaying(false);
        return;
      }

      if (index >= dialogue.length) {
        console.log("[Audio] Dialogue sequence complete");
        setIsPlaying(false);
        preloadedAudioRef.current.clear();
        return;
      }

      setCurrentLineIndex(index);

      try {
        await playDialogueLine(dialogue[index], index, isRussian, () => {
          playNextLine(index + 1);
        });
      } catch (error) {
        console.error(`[Audio] Error in playNextLine at index ${index}:`, error);
        setIsPlaying(false);
        preloadedAudioRef.current.clear();
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
    console.log("[Audio] Stopping playback");
    playbackAbortedRef.current = true;
    pause();
    setCurrentLineIndex(0);
    setHasPlayedOnce(false);
    
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }
    
    preloadedAudioRef.current.clear();
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
