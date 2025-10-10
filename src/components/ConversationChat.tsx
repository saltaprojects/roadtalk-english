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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
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

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isAI = message.role === "assistant";
          const avatar = isAI ? characters.ai : characters.user;
          const name = isAI ? scenarioTitle.split(" ")[0] : "You";

          return (
            <div
              key={index}
              className={`flex gap-3 animate-fade-in ${!isAI ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className={`w-10 h-10 rounded-full object-cover border-2 ${
                    isAI ? "border-primary" : "border-secondary"
                  }`}
                />
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col ${!isAI ? "items-end" : "items-start"} max-w-[70%]`}>
                <span className="text-xs text-muted-foreground mb-1">{name}</span>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    isAI
                      ? "bg-card border border-border rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>

                {/* Speaking indicator for AI messages */}
                {isAI && isPlaying && index === messages.length - 1 && (
                  <div className="flex items-center gap-2 mt-2 text-primary">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span className="text-xs">Speaking...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="flex-shrink-0">
              <img
                src={characters.ai}
                alt="AI"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">{t("practice.chat.typing")}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
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
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
