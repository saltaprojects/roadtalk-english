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
  difficulty: string;
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
  difficulty,
  onEnd,
}: ConversationChatProps) => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [suggestedResponses, setSuggestedResponses] = useState<Array<{en: string, ru: string}>>([]);
  const { messages, isLoading, error, sendMessage, resetConversation } = useConversationChat();
  const { playText, isPlaying, stop } = useTextToSpeech();
  const lastMessageRef = useRef<string>("");
  
  const characters = scenarioCharacters[scenario] || scenarioCharacters.police;
  const isBeginner = difficulty === t("practice.scenarios.gasStation.difficulty");
  const isIntermediate = difficulty === t("practice.scenarios.border.difficulty");

  useEffect(() => {
    // Auto-play TTS for new AI messages - use English version for TTS
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      const textToPlay = (lastMessage as any).contentEn || lastMessage.content;
      if (textToPlay !== lastMessageRef.current) {
        lastMessageRef.current = textToPlay;
        playText(textToPlay, characters.aiVoice);
        
        // Generate suggested responses for beginner level
        if (isBeginner && !isLoading) {
          generateSuggestedResponses(textToPlay);
        }
      }
    }
  }, [messages, playText, characters.aiVoice, isBeginner, isLoading]);

  // Generate suggested questions for intermediate level while AI is typing
  useEffect(() => {
    if (isIntermediate && isLoading && messages.length > 0) {
      const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content || "";
      generateSuggestedResponses(lastUserMessage, "questions");
    }
  }, [isLoading, isIntermediate, scenario, i18n.language]);

  const generateSuggestedResponses = async (aiMessage: string, type: string = "responses") => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          scenario,
          aiMessage,
          language: i18n.language,
          type
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedResponses(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  };

  useEffect(() => {
    // Send initial AI greeting when conversation starts
    if (messages.length === 0) {
      sendMessage("Hello", scenario, i18n.language, difficulty);
    }
  }, []);

  const handleSend = (message?: string) => {
    const textToSend = message || input.trim();
    if (!textToSend || isLoading) return;
    sendMessage(textToSend, scenario, i18n.language, difficulty);
    setInput("");
    setSuggestedResponses([]);
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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <img
            src={characters.ai}
            alt={scenarioTitle}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h2 className="text-lg font-semibold">{scenarioTitle}</h2>
            <p className="text-sm text-muted-foreground">{scenarioDescription}</p>
          </div>
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            {message.role === "assistant" && (
              <img
                src={characters.ai}
                alt={scenarioTitle}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary flex-shrink-0"
              />
            )}
            
            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                message.role === "assistant"
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-secondary/10 border border-secondary/20"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="space-y-3">
                  {message.contentEn && (
                    <div>
                      <div className="text-xs font-semibold text-primary mb-1">English:</div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.contentEn}
                      </p>
                    </div>
                  )}
                  {message.contentRu && (
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Русский:</div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.contentRu}
                      </p>
                    </div>
                  )}
                  {!message.contentEn && !message.contentRu && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              )}
            </div>

            {message.role === "user" && (
              <img
                src={characters.user}
                alt={t("practice.chat.you")}
                className="w-10 h-10 rounded-full object-cover border-2 border-secondary flex-shrink-0"
              />
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <img
              src={characters.ai}
              alt={scenarioTitle}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary flex-shrink-0"
            />
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">{t("practice.chat.typing")}</span>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className="flex items-center gap-2 justify-center text-primary">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">{t("practice.chat.speaking")}</span>
          </div>
        )}
      </div>

      {/* Input Area - Bottom Fixed */}
      <div className="border-t border-border bg-card p-4">
        <div className="container mx-auto max-w-3xl space-y-3">
          {/* Suggested responses for beginners */}
          {isBeginner && suggestedResponses.length > 0 && !isLoading && (
            <div className="flex flex-col gap-2">
              {suggestedResponses.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSend(suggestion.en)}
                  className="text-left h-auto py-3 px-4 whitespace-normal"
                >
                  <div className="space-y-1 w-full">
                    <div className="font-medium">{suggestion.en}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.ru}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Suggested questions for intermediate while AI is typing */}
          {isIntermediate && suggestedResponses.length > 0 && isLoading && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground mb-2">{t("practice.chat.suggestedQuestions") || "Suggested questions:"}</p>
              {suggestedResponses.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleSend(suggestion.en)}
                  className="text-left h-auto py-2 px-3 whitespace-normal justify-start"
                  disabled={isLoading}
                >
                  <div className="space-y-1 w-full">
                    <div className="text-sm">{suggestion.en}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.ru}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          {!isBeginner && (
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
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
