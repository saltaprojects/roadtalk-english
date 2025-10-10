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

  // Get the current speaker and their message
  const lastMessage = messages[messages.length - 1];
  const currentSpeaker = lastMessage?.role === "assistant" ? "ai" : "user";
  const currentMessage = lastMessage?.content || "";
  const currentCharacter = currentSpeaker === "ai" ? characters.ai : characters.user;
  const speakerName = currentSpeaker === "ai" ? scenarioTitle.split(" ")[0] : "You";

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Cinematic Header */}
      <div className="bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-white text-lg font-semibold mb-1">{scenarioTitle}</h2>
            <p className="text-white/70 text-sm">{scenarioDescription}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleEnd} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="m-4 z-20">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Theater Stage */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-black via-muted/10 to-black">
        {/* Character Display - Cinematic View */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className={`relative transition-all duration-500 ${isPlaying && currentSpeaker === "ai" ? "scale-105" : ""}`}>
            <img
              src={currentCharacter}
              alt="Current Speaker"
              className="w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-8 border-primary/50 shadow-2xl"
            />
            
            {/* Speaking Indicator */}
            {isPlaying && currentSpeaker === "ai" && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-primary-foreground animate-pulse" />
                  <span className="text-primary-foreground text-sm font-medium">Speaking...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="bg-primary/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />
                <span className="text-primary-foreground font-medium">{t("practice.chat.typing")}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtitle Bar - Fixed at Bottom */}
      <div className="bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-sm p-6 pb-32">
        <div className="container mx-auto max-w-4xl">
          {currentMessage && (
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 mb-4 border border-white/10 animate-fade-in">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-primary font-bold text-lg">{speakerName}:</div>
              </div>
              <p className="text-white text-lg leading-relaxed whitespace-pre-wrap break-words">
                {currentMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Input Controls - Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("practice.chat.inputPlaceholder")}
              disabled={isLoading}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading} 
              size="icon"
              className="bg-primary hover:bg-primary/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};
