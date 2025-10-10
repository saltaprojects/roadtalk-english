import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scenario, aiMessage, language, type = "responses" } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = type === "questions" 
      ? `You are helping an intermediate truck driver practice English conversations. 
Given the context of a ${scenario} scenario, generate 3-4 relevant questions that an intermediate-level truck driver might want to ask next.

The questions should be:
- Relevant to the ${scenario} scenario
- Appropriate for intermediate English level
- Natural and conversational
- Useful follow-up questions a driver would ask
- Varied in topic

CRITICAL: Return ONLY a JSON array of objects with "en" and "ru" fields for English and Russian translations.
Format: [{"en": "English question", "ru": "Russian question"}, ...]

Example for gas station:
[
  {"en": "Where can I park my truck?", "ru": "Где я могу припарковать свой грузовик?"},
  {"en": "Do you have a restroom?", "ru": "У вас есть туалет?"},
  {"en": "How much for diesel?", "ru": "Сколько стоит дизель?"}
]`
      : `You are helping a beginner truck driver practice English conversations. 
Given the AI's message in a ${scenario} scenario, generate 3-4 simple, appropriate response options that a beginner truck driver could choose from.

The responses should be:
- Simple and natural
- Appropriate for the scenario
- Grammatically correct
- Varied (don't make them all similar)
- Realistic things a driver would actually say

CRITICAL: Return ONLY a JSON array of objects with "en" and "ru" fields for English and Russian translations.
Format: [{"en": "English text", "ru": "Russian text"}, ...]

Example:
[
  {"en": "Yes, here are my documents", "ru": "Да, вот мои документы"},
  {"en": "I have my license and registration", "ru": "У меня есть права и регистрация"},
  {"en": "Let me get those for you", "ru": "Сейчас достану их для вас"}
]`;

    const userPrompt = type === "questions"
      ? `Context: ${scenario} scenario. Last user message: "${aiMessage}"\n\nGenerate 3-4 relevant questions the driver might ask next.`
      : `AI said: "${aiMessage}"\n\nGenerate 3-4 appropriate response options for a beginner driver.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON array from the response
    let suggestions: Array<{en: string, ru: string}> = [];
    try {
      // Try to extract JSON array from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Error parsing suggestions:", parseError);
      suggestions = [
        {en: "I understand", ru: "Я понимаю"},
        {en: "Could you repeat that?", ru: "Не могли бы вы повторить?"},
        {en: "Yes, of course", ru: "Да, конечно"}
      ];
    }

    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-suggestions error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
