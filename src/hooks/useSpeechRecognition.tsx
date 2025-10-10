import { useState, useCallback, useRef } from 'react';

interface SpeechRecognitionResult {
  transcript: string;
  score: number;
  category: 'excellent' | 'good' | 'fair' | 'needsPractice';
}

// Calculate similarity between two strings using word matching
const calculateSimilarity = (expected: string, actual: string): number => {
  // Normalize strings: lowercase, remove punctuation, trim whitespace
  const normalize = (str: string) => 
    str.toLowerCase()
      .replace(/[.,!?;:'"]/g, '')
      .trim()
      .split(/\s+/);
  
  const expectedWords = normalize(expected);
  const actualWords = normalize(actual);
  
  if (actualWords.length === 0) return 0;
  
  // Count matching words
  let matchCount = 0;
  const expectedSet = new Set(expectedWords);
  
  actualWords.forEach(word => {
    if (expectedSet.has(word)) {
      matchCount++;
    }
  });
  
  // Calculate percentage based on expected words
  const wordScore = (matchCount / expectedWords.length) * 100;
  
  // Bonus if actual contains most expected words in correct order
  let sequenceBonus = 0;
  let expectedIndex = 0;
  
  for (const word of actualWords) {
    if (expectedIndex < expectedWords.length && word === expectedWords[expectedIndex]) {
      sequenceBonus++;
      expectedIndex++;
    }
  }
  
  const sequenceScore = (sequenceBonus / expectedWords.length) * 100;
  
  // Weighted average: 70% word matching, 30% sequence
  return Math.round(wordScore * 0.7 + sequenceScore * 0.3);
};

const getScoreCategory = (score: number): SpeechRecognitionResult['category'] => {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'needsPractice';
};

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback((expectedPhrase: string): Promise<SpeechRecognitionResult> => {
    return new Promise((resolve, reject) => {
      // Check for browser support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        setIsAnalyzing(true);

        // Calculate score
        const score = calculateSimilarity(expectedPhrase, transcript);
        const category = getScoreCategory(score);

        setTimeout(() => {
          setIsAnalyzing(false);
          resolve({ transcript, score, category });
        }, 500); // Small delay for better UX
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        setIsAnalyzing(false);
        
        if (event.error === 'no-speech') {
          reject(new Error('no-speech'));
        } else if (event.error === 'not-allowed') {
          reject(new Error('microphone-permission'));
        } else {
          reject(new Error('recognition-error'));
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      try {
        recognition.start();
      } catch (error) {
        setIsRecording(false);
        reject(error);
      }
    });
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    isAnalyzing,
    startRecording,
    stopRecording,
  };
};
