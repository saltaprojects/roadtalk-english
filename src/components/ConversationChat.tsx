import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useConversationChat } from "@/hooks/useConversationChat";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTranslation } from "react-i18next";
import { Loader2, Send, X, Volume2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
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
  const { messages, isLoading, error, sendMessage, resetConversation } = useConversationChat();
  const { playText, isPlaying, stop } = useTextToSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string>("");
  
  const characters = scenarioCharacters[scenario] || scenarioCharacters.police;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Auto-play TTS for new AI messages
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && lastMessage.content !== lastMessageRef.current) {
      lastMessageRef.current = lastMessage.content;
      playText(lastMessage.content, characters.aiVoice);
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

  const userMessages = messages.filter(m => m.role === "user");
  const aiMessages = messages.filter(m => m.role === "assistant");
  const lastAiMessage = aiMessages[aiMessages.length - 1]?.content || "";
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || "";

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="container mx-auto flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{scenarioTitle}</h2>
            <p className="text-sm text-muted-foreground">{scenarioDescription}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleEnd}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Split Screen Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* AI Character Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted/30 to-background p-8 relative">
              <div className={`relative ${isPlaying ? "animate-bounce" : ""}`}>
                <img
                  src={characters.ai}
                  alt="AI Character"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-2xl"
                />
                {isPlaying && (
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-3">
                    <Volume2 className="w-6 h-6 text-primary-foreground animate-pulse" />
                  </div>
                )}
              </div>
              
              {/* AI Speech Bubble */}
              {lastAiMessage && (
                <Card className="mt-8 p-6 max-w-md bg-card shadow-xl relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-card"></div>
                  <p className="text-lg whitespace-pre-wrap break-words">{lastAiMessage}</p>
                </Card>
              )}

              {isLoading && !lastAiMessage && (
                <Card className="mt-8 p-6 max-w-md bg-muted shadow-xl relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-muted"></div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">{t("practice.chat.typing")}</span>
                  </div>
                </Card>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* User Character Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-bl from-primary/5 to-background p-8 relative">
              <div className="relative">
                <img
                  src={characters.user}
                  alt="Your Character"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-2xl"
                />
              </div>

              {/* User Speech Bubble */}
              {lastUserMessage && (
                <Card className="mt-8 p-6 max-w-md bg-primary text-primary-foreground shadow-xl relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-primary"></div>
                  <p className="text-lg whitespace-pre-wrap break-words">{lastUserMessage}</p>
                </Card>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("practice.chat.inputPlaceholder")}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};
