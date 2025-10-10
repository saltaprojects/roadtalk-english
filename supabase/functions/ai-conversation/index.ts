import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const scenarioPrompts: Record<string, string> = {
  police: `You are a police officer conducting a routine traffic stop with a truck driver. You need to check their documents (license, registration, logbook), inspect the cargo, and ensure everything is legal. Be professional, clear, and ask typical questions that police officers ask during truck inspections. If the driver makes grammar mistakes, gently correct them in a natural way. Keep the conversation realistic and educational.`,
  
  gasStation: `You are a gas station attendant helping a truck driver. The driver may need to fuel up, ask about facilities (restrooms, food, parking), or need assistance. Be friendly and helpful. If the driver makes grammar mistakes, gently correct them naturally. Use common phrases you'd hear at a gas station.`,
  
  dispatcher: `You are a dispatcher communicating with a truck driver via phone or radio. Discuss route updates, delivery schedules, traffic conditions, or problem reporting. Use typical dispatcher language and radio protocol when appropriate. If the driver makes grammar mistakes, gently correct them. Keep the conversation professional and clear.`,
  
  border: `You are a border customs officer processing a truck driver crossing the international border. Ask about documentation (passport, visa, cargo manifest), destination, purpose of travel, and cargo details. Be official but not unfriendly. If the driver makes grammar mistakes, gently correct them. Use formal language typical at border crossings.`,
  
  weighStation: `You are a weigh station officer inspecting a truck. Check weight compliance, logbook hours, vehicle inspection records, and permits. Be thorough and professional. If the driver makes grammar mistakes, gently correct them naturally. Use typical weigh station terminology.`,
  
  delivery: `You are a warehouse receiver at a delivery site. The truck driver is delivering cargo. Discuss paperwork (BOL, POD), unloading procedures, dock assignments, and any issues with the delivery. Be practical and business-like. If the driver makes grammar mistakes, gently correct them. Use common delivery site vocabulary.`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, scenario, language = 'en', difficulty } = await req.json();
    
    if (!scenario || !scenarioPrompts[scenario]) {
      return new Response(
        JSON.stringify({ error: "Invalid scenario specified" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const bilingualInstruction = `
CRITICAL INSTRUCTION: You MUST provide your response in BOTH English and Russian.
Format your response EXACTLY like this:

[EN] Your English response here
[RU] Ваш русский ответ здесь

Always include both [EN] and [RU] sections in every response. This is mandatory.
`;

    // Add beginner-specific instructions
    const beginnerInstruction = difficulty === "Beginner" || difficulty === "Начинающий" ? `

IMPORTANT FOR BEGINNER LEVEL:
- Keep your questions SHORT (5-8 words maximum)
- Use SIMPLE vocabulary
- Ask ONE thing at a time
- Avoid complex grammar structures
- Be patient and encouraging
` : "";

    const systemPrompt = bilingualInstruction + beginnerInstruction + '\n\n' + scenarioPrompts[scenario];

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
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits needed. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-conversation error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
