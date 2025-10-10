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

  const userMessages = messages.filter(m => m.role === "user");
  const aiMessages = messages.filter(m => m.role === "assistant");
  const lastAiMessage = aiMessages[aiMessages.length - 1]?.content || "";
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || "";

  // Group messages into conversation pairs for comic panels
  const conversationPanels: Array<{ ai: string; user?: string }> = [];
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "assistant") {
      conversationPanels.push({ ai: msg.content, user: undefined });
    } else if (msg.role === "user") {
      // Add user message to the last AI panel if exists, otherwise create new panel
      if (conversationPanels.length > 0 && !conversationPanels[conversationPanels.length - 1].user) {
        conversationPanels[conversationPanels.length - 1].user = msg.content;
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4 shadow-sm">
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

      {/* Comic Panel Layout */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-4xl space-y-6">
          {conversationPanels.map((panel, index) => (
            <div
              key={index}
              className="relative border-4 border-foreground/20 rounded-lg p-6 bg-card shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Panel number badge */}
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </div>

              {/* AI Message Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`relative flex-shrink-0 ${isPlaying && index === conversationPanels.length - 1 ? "animate-bounce" : ""}`}>
                  <img
                    src={characters.ai}
                    alt="AI Character"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                  {isPlaying && index === conversationPanels.length - 1 && (
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                      <Volume2 className="w-4 h-4 text-primary-foreground animate-pulse" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4 shadow-md relative">
                    {/* Speech bubble tail */}
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-muted"></div>
                    <p className="text-base leading-relaxed whitespace-pre-wrap break-words">{panel.ai}</p>
                  </div>
                </div>
              </div>

              {/* User Message Section */}
              {panel.user && (
                <div className="flex items-start gap-4 flex-row-reverse">
                  <div className="relative flex-shrink-0">
                    <img
                      src={characters.user}
                      alt="Your Character"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
                    />
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 shadow-md relative ml-auto max-w-[85%]">
                      {/* Speech bubble tail */}
                      <div className="absolute -right-2 top-4 w-0 h-0 border-t-8 border-l-8 border-b-8 border-transparent border-l-primary"></div>
                      <p className="text-base leading-relaxed whitespace-pre-wrap break-words">{panel.user}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading Panel */}
          {isLoading && (
            <div className="relative border-4 border-foreground/20 rounded-lg p-6 bg-card shadow-lg animate-fade-in">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
                {conversationPanels.length + 1}
              </div>
              
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 animate-pulse">
                  <img
                    src={characters.ai}
                    alt="AI Character"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                </div>
                
                <div className="flex-1 relative">
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4 shadow-md relative">
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-muted"></div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">{t("practice.chat.typing")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4 shadow-lg">
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
    </div>
  );
};
