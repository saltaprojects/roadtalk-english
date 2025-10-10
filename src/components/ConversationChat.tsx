import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useConversationChat } from "@/hooks/useConversationChat";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTranslation } from "react-i18next";
import { Loader2, Send, X, Volume2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import policeOfficer from "@/assets/characters/police-officer.png";
import truckDriver from "@/assets/characters/truck-driver.png";
import gasAttendant from "@/assets/characters/gas-attendant.png";
import dispatcher from "@/assets/characters/dispatcher.png";
import borderOfficer from "@/assets/characters/border-officer.png";
import weighInspector from "@/assets/characters/weigh-inspector.png";
import warehouseWorker from "@/assets/characters/warehouse-worker.png";

type ConversationChatProps = {
  scenario: string;
  scenarioTitle: string;
  scenarioDescription: string;
  onEnd: () => void;
};

const scenarioCharacters: Record<string, { ai: string; aiVoice: string; user: string }> = {
  police: { ai: policeOfficer, aiVoice: "onyx", user: truckDriver },
  gasStation: { ai: gasAttendant, aiVoice: "echo", user: truckDriver },
  dispatcher: { ai: dispatcher, aiVoice: "nova", user: truckDriver },
  border: { ai: borderOfficer, aiVoice: "onyx", user: truckDriver },
  weighStation: { ai: weighInspector, aiVoice: "echo", user: truckDriver },
  delivery: { ai: warehouseWorker, aiVoice: "fable", user: truckDriver },
};

export const ConversationChat = ({
  scenario,
  scenarioTitle,
  scenarioDescription,
  onEnd,
}: ConversationChatProps) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showResponseSide, setShowResponseSide] = useState(false);
  const { messages, isLoading, error, sendMessage, resetConversation } = useConversationChat();
  const { playText, isPlaying, stop } = useTextToSpeech();
  const lastMessageRef = useRef<string>("");
  
  const characters = scenarioCharacters[scenario] || scenarioCharacters.police;

  useEffect(() => {
    // Auto-play TTS for new AI messages
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && lastMessage.content !== lastMessageRef.current) {
      lastMessageRef.current = lastMessage.content;
      playText(lastMessage.content, characters.aiVoice);
      setShowResponseSide(false);
    }
  }, [messages, playText, characters.aiVoice]);

  useEffect(() => {
    // Send initial AI greeting when conversation starts
    if (messages.length === 0) {
      sendMessage("Hello", scenario);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input, scenario);
    setInput("");
    setCurrentCardIndex(prev => prev + 1);
    setShowResponseSide(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEnd = () => {
    stop();
    resetConversation();
    onEnd();
  };

  const handleFlipCard = () => {
    if (!isLoading) {
      setShowResponseSide(!showResponseSide);
    }
  };

  // Group messages into pairs (AI message + user response)
  const conversationPairs: Array<{ ai: string; user?: string }> = [];
  for (let i = 0; i < messages.length; i += 2) {
    if (messages[i]?.role === "assistant") {
      conversationPairs.push({
        ai: messages[i].content,
        user: messages[i + 1]?.content,
      });
    }
  }

  const currentPair = conversationPairs[currentCardIndex] || { ai: messages[messages.length - 1]?.content || "" };
  const isLastCard = currentCardIndex === conversationPairs.length - 1;
  const canGoBack = currentCardIndex > 0;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{scenarioTitle}</h2>
          <p className="text-sm text-muted-foreground">{scenarioDescription}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleEnd}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Card Display Area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Exchange {currentCardIndex + 1} of {Math.max(conversationPairs.length, 1)}
            </p>
            <div className="flex justify-center gap-2 mt-2">
              {conversationPairs.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentCardIndex
                      ? "w-8 bg-primary"
                      : idx < currentCardIndex
                      ? "w-2 bg-primary/50"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Flippable Card */}
          <Card
            className={`relative min-h-[400px] transition-all duration-500 cursor-pointer ${
              showResponseSide ? "shadow-2xl scale-105" : "shadow-xl"
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: showResponseSide ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            onClick={isLastCard && !isLoading ? handleFlipCard : undefined}
          >
            {/* Front Side - AI Message */}
            <div
              className="absolute inset-0 p-6 md:p-8 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={characters.ai}
                    alt={scenarioTitle}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{scenarioTitle.split(" ")[0]}</h3>
                    {isPlaying && isLastCard && (
                      <div className="flex items-center gap-2 text-primary text-sm">
                        <Volume2 className="w-4 h-4 animate-pulse" />
                        <span>Speaking...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex items-center">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap break-words">
                    {currentPair.ai}
                  </p>
                </div>

                {isLastCard && !isLoading && (
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    Click to respond →
                  </div>
                )}
              </div>
            </div>

            {/* Back Side - Response Input */}
            <div
              className="absolute inset-0 p-6 md:p-8 backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={characters.user}
                    alt="You"
                    className="w-16 h-16 rounded-full object-cover border-4 border-secondary"
                  />
                  <h3 className="font-bold text-lg">Your Response</h3>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    What will you say?
                  </p>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t("practice.chat.inputPlaceholder")}
                    disabled={isLoading}
                    className="mb-4"
                    autoFocus
                  />
                  {currentPair.user && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">You said:</p>
                      <p className="text-base">{currentPair.user}</p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("practice.chat.typing")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Response
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentCardIndex(prev => Math.max(0, prev - 1));
                setShowResponseSide(false);
              }}
              disabled={!canGoBack}
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentCardIndex(prev => Math.min(conversationPairs.length - 1, prev + 1));
                setShowResponseSide(false);
              }}
              disabled={currentCardIndex >= conversationPairs.length - 1}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
