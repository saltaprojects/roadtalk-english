import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Volume2, 
  Mic, 
  Languages, 
  Settings, 
  Pause, 
  Play,
  RotateCcw,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Clock
} from "lucide-react";
import { DialogueText } from "@/data/dialogueTexts";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useToast } from "@/hooks/use-toast";

interface ImmersiveReaderProps {
  dialogues: DialogueText[];
  currentIndex: number;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ImmersiveReader = ({ 
  dialogues, 
  currentIndex, 
  onBack,
  onNext,
  onPrevious 
}: ImmersiveReaderProps) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [highlightedSentence, setHighlightedSentence] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    accuracy: number;
    correctWords: number;
    totalWords: number;
    missingWords: number;
    extraWords: number;
    transcribedText: string;
  } | null>(null);
  
  const { playText, stop } = useTextToSpeech();
  const { toast } = useToast();
  const recordingIntervalRef = useRef<NodeJS.Timeout>();
  const readingIntervalRef = useRef<NodeJS.Timeout>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const dialogue = dialogues[currentIndex];
  const sentences = dialogue.sentences || dialogue.dialogueText.split(/[.!?]+/).filter(s => s.trim());
  const totalWords = dialogue.dialogueText.split(/\s+/).length;

  useEffect(() => {
    // Start reading time tracker when component mounts
    readingIntervalRef.current = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (readingIntervalRef.current) clearInterval(readingIntervalRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      stop();
    };
  }, [currentIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReadAlong = async () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
      setHighlightedSentence(null);
      return;
    }

    setIsPlaying(true);
    for (let i = 0; i < sentences.length; i++) {
      setHighlightedSentence(i);
      try {
        await playText(sentences[i], "echo");
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Error playing text:", error);
        break;
      }
    }
    setHighlightedSentence(null);
    setIsPlaying(false);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Calculate WPM
        const minutes = recordingTime / 60;
        const wpm = Math.round(totalWords / minutes);
        setWordsPerMinute(wpm);
        
        toast({
          title: "Recording Complete",
          description: `${formatTime(recordingTime)} - ${wpm} words per minute`,
        });
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Read the passage naturally. Tap pause when done.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      
      // Wait for the audio to be processed
      setIsAnalyzing(true);
      
      // The actual analysis will happen in the onstop handler
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Calculate WPM
        const minutes = recordingTime / 60;
        const wpm = Math.round(totalWords / minutes);
        setWordsPerMinute(wpm);
        
        try {
          // Convert blob to base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            
            // Send to edge function for analysis
            const response = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-recording`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                  audio: base64Audio,
                  originalText: dialogue.dialogueText,
                }),
              }
            );
            
            if (!response.ok) {
              throw new Error('Failed to analyze recording');
            }
            
            const analysisResult = await response.json();
            setAnalysis(analysisResult);
            setIsAnalyzing(false);
            
            toast({
              title: "Analysis Complete",
              description: `Accuracy: ${analysisResult.accuracy}% - ${wpm} WPM`,
            });
          };
        } catch (error) {
          console.error('Error analyzing recording:', error);
          setIsAnalyzing(false);
          toast({
            title: "Analysis Failed",
            description: "Could not analyze your recording",
            variant: "destructive",
          });
        }
        
        if (mediaRecorderRef.current?.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  };

  const readingProgress = sentences.length > 0 
    ? ((highlightedSentence ?? -1) + 1) / sentences.length * 100 
    : 0;

  return (
    <div className="min-h-screen bg-[hsl(var(--reading-bg))] text-[hsl(var(--reading-text))]">
      {/* Header - Minimal */}
      <div className="sticky top-0 z-10 bg-[hsl(var(--reading-paper))] border-b border-[hsl(var(--reading-muted))] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-[hsl(var(--reading-text))] hover:bg-[hsl(var(--reading-bg))]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Library
          </Button>
          
          <div className="flex items-center gap-3 text-sm text-[hsl(var(--reading-muted))]">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTime(readingTime)}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {currentIndex + 1} / {dialogues.length}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        {isPlaying && (
          <Progress value={readingProgress} className="h-1 rounded-none" />
        )}
      </div>

      {/* Main Reading Area */}
      <div className="container mx-auto px-6 pt-12 pb-48 max-w-4xl">
        <Card className="bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-muted))] shadow-2xl">
          <div className="p-12">
            {/* Title */}
            <h1 className="text-3xl font-serif mb-2 text-[hsl(var(--reading-text))]">
              {dialogue.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex items-center gap-4 mb-8 text-sm text-[hsl(var(--reading-muted))]">
              <span className="capitalize">{dialogue.difficulty}</span>
              <span>•</span>
              <span>{dialogue.category}</span>
              <span>•</span>
              <span>{dialogue.estimatedReadingTime}</span>
            </div>

            {/* Reading Content */}
            <div className="prose prose-lg max-w-none">
              {dialogue.paragraphs ? (
                dialogue.paragraphs.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className="mb-6 leading-relaxed text-[hsl(var(--reading-text))] font-serif text-lg"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <div className="space-y-4">
                  {sentences.map((sentence, index) => (
                    <span
                      key={index}
                      className={`inline ${
                        highlightedSentence === index
                          ? "bg-[hsl(var(--reading-accent)/0.2)] rounded px-1 transition-colors duration-300"
                          : ""
                      } text-[hsl(var(--reading-text))] font-serif text-lg leading-relaxed`}
                    >
                      {sentence.trim()}.{" "}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Translation */}
            {showTranslation && dialogue.translation && (
              <div className="mt-8 pt-8 border-t border-[hsl(var(--reading-muted))]">
                <h3 className="text-lg font-semibold mb-3 text-[hsl(var(--reading-text))]">Перевод</h3>
                <p className="text-[hsl(var(--reading-text))] font-serif leading-relaxed">
                  {dialogue.translation}
                </p>
              </div>
            )}

            {/* Recording Analysis */}
            {analysis && (
              <div className="mt-8 pt-8 border-t border-[hsl(var(--reading-muted))]">
                <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--reading-text))]">Recording Analysis</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[hsl(var(--reading-bg))] p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[hsl(var(--reading-accent))]">
                        {analysis.accuracy}%
                      </div>
                      <div className="text-sm text-[hsl(var(--reading-muted))]">Accuracy</div>
                    </div>
                    <div className="bg-[hsl(var(--reading-bg))] p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[hsl(var(--reading-accent))]">
                        {wordsPerMinute}
                      </div>
                      <div className="text-sm text-[hsl(var(--reading-muted))]">Words Per Minute</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded">
                      <div className="font-semibold text-green-700 dark:text-green-400">
                        {analysis.correctWords}
                      </div>
                      <div className="text-green-600 dark:text-green-500">Correct Words</div>
                    </div>
                    {analysis.missingWords > 0 && (
                      <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded">
                        <div className="font-semibold text-orange-700 dark:text-orange-400">
                          {analysis.missingWords}
                        </div>
                        <div className="text-orange-600 dark:text-orange-500">Missing Words</div>
                      </div>
                    )}
                    {analysis.extraWords > 0 && (
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded">
                        <div className="font-semibold text-blue-700 dark:text-blue-400">
                          {analysis.extraWords}
                        </div>
                        <div className="text-blue-600 dark:text-blue-500">Extra Words</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-[hsl(var(--reading-bg))] p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-[hsl(var(--reading-text))]">What You Said:</h4>
                    <p className="text-[hsl(var(--reading-muted))] italic">"{analysis.transcribedText}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Vocabulary */}
            {dialogue.keyVocabulary && dialogue.keyVocabulary.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[hsl(var(--reading-muted))]">
                <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--reading-text))]">Key Vocabulary</h3>
                <div className="grid grid-cols-2 gap-3">
                  {dialogue.keyVocabulary.map((word, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-semibold text-[hsl(var(--reading-accent))]">{word}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-4 px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-muted))] hover:bg-[hsl(var(--reading-bg))]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={currentIndex === dialogues.length - 1}
          className="bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-muted))] hover:bg-[hsl(var(--reading-bg))]"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Floating Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--reading-paper))] border-t border-[hsl(var(--reading-muted))] shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            {/* Listen/Pause Button */}
            <Button
              size="lg"
              variant="outline"
              onClick={handleReadAlong}
              className="bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-accent))] text-[hsl(var(--reading-accent))] hover:bg-[hsl(var(--reading-accent)/0.1)]"
            >
              {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
              {isPlaying ? "Pause" : "Listen"}
            </Button>

            {/* Record Button */}
            <Button
              size="lg"
              variant="outline"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isAnalyzing}
              className={`${
                isRecording 
                  ? "bg-red-500 text-white border-red-500 hover:bg-red-600" 
                  : "bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-accent))] text-[hsl(var(--reading-accent))] hover:bg-[hsl(var(--reading-accent)/0.1)]"
              }`}
            >
              {isRecording ? <Pause className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
              {isAnalyzing ? "Analyzing..." : isRecording ? formatTime(recordingTime) : "Record"}
            </Button>
          </div>

          {/* Stats Display */}
          {wordsPerMinute > 0 && (
            <div className="text-center mt-3 text-sm text-[hsl(var(--reading-muted))]">
              Reading Speed: <span className="font-semibold text-[hsl(var(--reading-accent))]">{wordsPerMinute} WPM</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
