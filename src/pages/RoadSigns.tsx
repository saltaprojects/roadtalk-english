import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Loader2, MessageCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type RoadSign = {
  id: string;
  name: string;
  emoji: string;
  category: "warning" | "regulatory" | "guide" | "truck-specific";
  description: string;
  color: string;
};

const roadSigns: RoadSign[] = [
  { id: "stop", name: "Stop Sign", emoji: "🛑", category: "regulatory", description: "Must come to complete stop", color: "bg-red-500" },
  { id: "yield", name: "Yield Sign", emoji: "⚠️", category: "regulatory", description: "Give right of way", color: "bg-yellow-500" },
  { id: "speed", name: "Speed Limit", emoji: "🚦", category: "regulatory", description: "Maximum speed allowed", color: "bg-white" },
  { id: "no-trucks", name: "No Trucks", emoji: "🚛", category: "truck-specific", description: "Trucks prohibited", color: "bg-red-400" },
  { id: "weight", name: "Weight Limit", emoji: "⚖️", category: "truck-specific", description: "Maximum weight allowed", color: "bg-orange-500" },
  { id: "height", name: "Height Restriction", emoji: "📏", category: "truck-specific", description: "Maximum height clearance", color: "bg-orange-500" },
  { id: "weigh", name: "Weigh Station", emoji: "🏪", category: "truck-specific", description: "Trucks must stop", color: "bg-blue-500" },
  { id: "truck-route", name: "Truck Route", emoji: "🛣️", category: "guide", description: "Designated truck route", color: "bg-green-500" },
  { id: "merge", name: "Merge", emoji: "🔀", category: "warning", description: "Traffic merging ahead", color: "bg-yellow-500" },
  { id: "curve", name: "Sharp Curve", emoji: "↪️", category: "warning", description: "Sharp turn ahead", color: "bg-yellow-500" },
  { id: "hill", name: "Steep Hill", emoji: "⛰️", category: "warning", description: "Steep grade ahead", color: "bg-yellow-500" },
  { id: "parking", name: "No Parking", emoji: "🅿️", category: "regulatory", description: "Parking prohibited", color: "bg-red-400" },
];

const RoadSigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedSign, setSelectedSign] = useState<RoadSign | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send initial greeting
  useEffect(() => {
    const initialGreeting: Message = {
      role: "assistant",
      content: "Hello! I'm your road signs and terminology assistant. Ask me anything about US road signs, traffic rules, or trucking terminology. For example: 'What does a yellow diamond sign mean?' or 'Explain truck route signs'."
    };
    setMessages([initialGreeting]);
  }, []);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/road-signs-helper`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, newUserMessage],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          setError("Too many requests. Please wait a moment and try again.");
          toast({
            title: "Rate Limited",
            description: "Please wait a moment before sending another message.",
            variant: "destructive",
          });
          return;
        }
        
        if (response.status === 402) {
          setError("AI service credits exhausted. Please contact support.");
          toast({
            title: "Service Unavailable",
            description: "Please contact support to continue using AI features.",
            variant: "destructive",
          });
          return;
        }
        
        throw new Error(errorData.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith(":")) continue;
            if (!line.startsWith("data: ")) continue;

            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage?.role === "assistant") {
                    lastMessage.content = assistantMessage;
                  } else {
                    newMessages.push({ role: "assistant", content: assistantMessage });
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSignClick = (sign: RoadSign) => {
    setSelectedSign(sign);
    const question = `Tell me about the ${sign.name} road sign. What does it mean and what should a truck driver do when they see it?`;
    sendMessage(question);
    setShowChat(true);
  };

  const categories = [
    { id: "all", name: "All Signs", icon: "🚦" },
    { id: "truck-specific", name: "Truck Specific", icon: "🚛" },
    { id: "warning", name: "Warning", icon: "⚠️" },
    { id: "regulatory", name: "Regulatory", icon: "🛑" },
    { id: "guide", name: "Guide", icon: "🛣️" },
  ];

  const filteredSigns = selectedCategory === "all" 
    ? roadSigns 
    : roadSigns.filter(sign => sign.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 shadow-xl">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  🚦 Road Signs Practice
                </h1>
                <p className="text-white/90 mt-1">
                  Learn US road signs for truck drivers - Click any sign to learn more
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowChat(!showChat)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {showChat ? "Hide" : "Show"} AI Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Signs Grid */}
          <div className={`${showChat ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            {/* Category Filter */}
            <Card className="p-4 bg-white/95 backdrop-blur">
              <p className="text-sm font-semibold mb-3 text-slate-700">Filter by Category:</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.icon} {cat.name}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Road Signs Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSigns.map((sign) => (
                <Card
                  key={sign.id}
                  className="group cursor-pointer overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  onClick={() => handleSignClick(sign)}
                >
                  <div className={`${sign.color} p-6 text-center transition-all duration-300 group-hover:p-8`}>
                    <div className="text-7xl mb-2 transition-transform duration-300 group-hover:scale-110">
                      {sign.emoji}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-white to-slate-50">
                    <h3 className="font-bold text-lg mb-1 text-slate-800">{sign.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{sign.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {sign.category.replace("-", " ")}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Info Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="text-xl font-bold mb-2">💡 Pro Tip</h3>
              <p className="text-white/90">
                Click on any road sign to ask the AI assistant detailed questions about it. 
                You can learn about what each sign means, when you'll see it, and how to respond as a truck driver.
              </p>
            </Card>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <Card className="sticky top-6 bg-white/95 backdrop-blur overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <h3 className="font-bold">AI Assistant</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowChat(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Click on any road sign to start learning!</p>
                    </div>
                  )}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[85%] ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-lg px-4 py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="m-4 mt-0">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about road signs..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadSigns;
