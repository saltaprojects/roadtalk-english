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

  const generateSuggestedResponses = async (aiMessage: string) => {
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
          language: i18n.language
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
      sendMessage("Hello", scenario, i18n.language);
    }
  }, []);

  const handleSend = (message?: string) => {
    const textToSend = message || input.trim();
    if (!textToSend || isLoading) return;
    sendMessage(textToSend, scenario, i18n.language);
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

  // Get latest messages for each side
  const aiMessages = messages.filter(m => m.role === "assistant");
  const userMessages = messages.filter(m => m.role === "user");
  const latestAIMessage = aiMessages[aiMessages.length - 1];
  const latestUserMessage = userMessages[userMessages.length - 1]?.content || "";

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

      {/* Split Screen - Two Characters Side by Side */}
      <div className="flex-1 flex">
        {/* Left Side - AI Character */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-border bg-gradient-to-br from-primary/5 to-transparent">
          <div className={`transition-all duration-500 ${isPlaying ? "scale-105" : ""}`}>
            <img
              src={characters.ai}
              alt={scenarioTitle}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-primary shadow-2xl mb-6"
            />
          </div>
          
          <h3 className="text-xl font-bold mb-2">{scenarioTitle.split(" ")[0]}</h3>
          
          {isPlaying && (
            <div className="flex items-center gap-2 text-primary mb-4">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">{t("practice.chat.speaking")}</span>
            </div>
          )}

          {/* AI Speech Bubble */}
          {latestAIMessage && (
            <div className="relative max-w-md mt-6 animate-fade-in">
              <div className="bg-card border-2 border-primary rounded-3xl rounded-tl-none p-6 shadow-lg space-y-4">
                {latestAIMessage.contentEn && (
                  <div>
                    <div className="text-xs font-semibold text-primary mb-1">English:</div>
                    <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                      {latestAIMessage.contentEn}
                    </p>
                  </div>
                )}
                {latestAIMessage.contentRu && (
                  <div>
                    <div className="text-xs font-semibold text-secondary mb-1">Русский:</div>
                    <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                      {latestAIMessage.contentRu}
                    </p>
                  </div>
                )}
                {!latestAIMessage.contentEn && !latestAIMessage.contentRu && (
                  <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                    {latestAIMessage.content}
                  </p>
                )}
              </div>
              {/* Triangle pointer */}
              <div className="absolute -top-2 left-4 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-primary" />
              <div className="absolute -top-1 left-5 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[18px] border-b-card" />
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{t("practice.chat.typing")}</span>
            </div>
          )}
        </div>

        {/* Right Side - User Character */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-bl from-secondary/5 to-transparent">
          <img
            src={characters.user}
            alt={t("practice.chat.you")}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-secondary shadow-2xl mb-6"
          />
          
          <h3 className="text-xl font-bold mb-2">{t("practice.chat.you")}</h3>

          {/* User Speech Bubble */}
          {latestUserMessage && (
            <div className="relative max-w-md mt-6 animate-fade-in">
              <div className="bg-card border-2 border-secondary rounded-3xl rounded-tr-none p-6 shadow-lg">
                <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                  {latestUserMessage}
                </p>
              </div>
              {/* Triangle pointer */}
              <div className="absolute -top-2 right-4 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-secondary" />
              <div className="absolute -top-1 right-5 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[18px] border-b-card" />
            </div>
          )}
        </div>
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
        </div>
      </div>
    </div>
  );
};
