import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ReadingPassageViewer } from "./ReadingPassageViewer";
import { DialogueText, DialogueDifficulty, getDialoguesByDifficulty } from "@/data/dialogueTexts";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpenCheck, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2,
  Eye,
  EyeOff,
  Gauge,
  Trophy,
  Timer,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface TextReadingPracticeProps {
  difficulty: DialogueDifficulty;
  onBack: () => void;
}

export const TextReadingPractice = ({ difficulty, onBack }: TextReadingPracticeProps) => {
  const { i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';
  
  const [dialogues, setDialogues] = useState<DialogueText[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(isRussian);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [readingMode, setReadingMode] = useState<"none" | "read-along" | "recording" | "playback">("none");
  const [highlightedSentenceIndex, setHighlightedSentenceIndex] = useState<number>(-1);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [completedPassages, setCompletedPassages] = useState<Set<string>>(new Set());
  const [readingStartTime, setReadingStartTime] = useState<number | null>(null);
  
  const { toast } = useToast();
  const { playText, isPlaying, stop } = useTextToSpeech();
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();

  useEffect(() => {
    const fetchedDialogues = getDialoguesByDifficulty(difficulty);
    if (fetchedDialogues.length === 0) {
      toast({
        title: "No passages available",
        description: `No reading passages found for ${difficulty} level.`,
        variant: "destructive",
      });
      onBack();
    } else {
      setDialogues(fetchedDialogues);
    }
  }, [difficulty, toast, onBack]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (readingMode === "recording") {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [readingMode]);

  if (dialogues.length === 0) {
    return null;
  }

  const currentDialogue = dialogues[currentIndex];
  const progress = ((currentIndex + 1) / dialogues.length) * 100;

  const handleReadAlong = async () => {
    if (readingMode === "read-along") {
      stop();
      setReadingMode("none");
      setHighlightedSentenceIndex(-1);
      return;
    }

    setReadingMode("read-along");
    setReadingStartTime(Date.now());
    
    const sentences = currentDialogue.sentences || [currentDialogue.dialogueText];
    
    for (let i = 0; i < sentences.length; i++) {
      setHighlightedSentenceIndex(i);
      await playText(sentences[i], "echo");
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause between sentences
    }
    
    setHighlightedSentenceIndex(-1);
    setReadingMode("none");
    
    toast({
      title: "Read-along completed!",
      description: "Great job following along with the text.",
    });
  };

  const handleStartRecording = () => {
    setReadingMode("recording");
    setRecordingTime(0);
    setReadingStartTime(Date.now());
    
    toast({
      title: "Recording started",
      description: "Read the passage out loud at your own pace.",
    });
  };

  const handleStopRecording = () => {
    setReadingMode("none");
    
    const timeSpent = readingStartTime ? Math.floor((Date.now() - readingStartTime) / 1000) : recordingTime;
    const wordCount = currentDialogue.wordCount || 200;
    const wordsPerMinute = Math.round((wordCount / timeSpent) * 60);
    
    toast({
      title: "Recording completed!",
      description: `Reading time: ${timeSpent}s | Speed: ~${wordsPerMinute} WPM`,
    });
    
    // Mark as completed
    setCompletedPassages(prev => new Set(prev).add(currentDialogue.id));
  };

  const handlePlayFullAudio = async () => {
    if (isPlaying) {
      stop();
      return;
    }
    
    await playText(currentDialogue.dialogueText, "echo");
  };

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(isRussian);
      setReadingMode("none");
      setRecordingTime(0);
      setHighlightedSentenceIndex(-1);
      setReadingStartTime(null);
    } else {
      toast({
        title: "Congratulations!",
        description: `You've completed all ${dialogues.length} reading passages!`,
      });
      onBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowTranslation(isRussian);
      setReadingMode("none");
      setRecordingTime(0);
      setHighlightedSentenceIndex(-1);
      setReadingStartTime(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-amber-900">
                Reading Practice
              </h1>
              <p className="text-amber-700 mt-1">
                Passage {currentIndex + 1} of {dialogues.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300">
                <Trophy className="w-3 h-3 mr-1" />
                {completedPassages.size} completed
              </Badge>
            </div>
          </div>

          <Progress value={progress} className="h-2 bg-amber-200" />
        </div>

        {/* Control Panel */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur border-amber-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reading Mode Buttons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-amber-900 mb-2">Reading Modes:</h3>
              
              <Button
                onClick={handleReadAlong}
                disabled={readingMode === "recording"}
                variant={readingMode === "read-along" ? "default" : "outline"}
                className={readingMode === "read-along" 
                  ? "w-full bg-amber-600 hover:bg-amber-700 text-white"
                  : "w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                }
              >
                {readingMode === "read-along" ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Stop Read-Along
                  </>
                ) : (
                  <>
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Read with Audio
                  </>
                )}
              </Button>

              <Button
                onClick={readingMode === "recording" ? handleStopRecording : handleStartRecording}
                disabled={readingMode === "read-along"}
                variant={readingMode === "recording" ? "destructive" : "outline"}
                className={readingMode === "recording"
                  ? "w-full"
                  : "w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                }
              >
                {readingMode === "recording" ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Record My Reading
                  </>
                )}
              </Button>
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-amber-900 mb-2">Controls:</h3>
              
              <Button
                onClick={handlePlayFullAudio}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                disabled={readingMode !== "none"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Audio
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Listen to Full Passage
                  </>
                )}
              </Button>

              <Button
                onClick={() => setShowTranslation(!showTranslation)}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                {showTranslation ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Translation
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show Translation
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Recording Timer */}
          {readingMode === "recording" && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-semibold text-red-700">Recording in progress...</span>
              </div>
              <div className="flex items-center gap-2 text-red-700">
                <Timer className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(recordingTime)}</span>
              </div>
            </div>
          )}

          {/* Completed Indicator */}
          {completedPassages.has(currentDialogue.id) && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                You've completed this passage!
              </span>
            </div>
          )}
        </Card>

        {/* Reading Passage */}
        <ReadingPassageViewer
          dialogue={currentDialogue}
          highlightedSentenceIndex={highlightedSentenceIndex}
          showTranslation={showTranslation}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {currentIndex === dialogues.length - 1 ? "Finish" : "Next Passage"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
