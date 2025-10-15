import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const scenarioPrompts: Record<string, string> = {
  // Beginner scenarios
  gasStation: `You are a gas station attendant helping a truck driver. The driver may need to fuel up, ask about facilities (restrooms, food, parking), or need assistance. Be friendly and helpful. If the driver makes grammar mistakes, gently correct them naturally. Use common phrases you'd hear at a gas station.`,
  
  restaurant: `You are a server at a truck stop restaurant. The truck driver wants to order food, ask about menu items, or get recommendations. Be friendly and patient. Help them with menu terminology, portion sizes, and payment. If the driver makes grammar mistakes, gently correct them naturally. Use typical restaurant vocabulary.`,
  
  facilities: `You are a truck stop facilities clerk. The driver is asking about showers, laundry, rest areas, or parking. Be helpful and explain how to use amenities, pricing, and availability. If the driver makes grammar mistakes, gently correct them naturally. Use simple, clear language about truck stop services.`,
  
  hotel: `You are a motel/hotel receptionist at a highway accommodation. The driver needs to check in, ask about rooms, parking for trucks, Wi-Fi, breakfast, or checkout time. Be professional and welcoming. If the driver makes grammar mistakes, gently correct them naturally. Use common hotel check-in vocabulary.`,
  
  // Intermediate scenarios
  dispatcher: `You are a dispatcher communicating with a truck driver via phone or radio. Discuss route updates, delivery schedules, traffic conditions, or problem reporting. Use typical dispatcher language and radio protocol when appropriate. If the driver makes grammar mistakes, gently correct them. Keep the conversation professional and clear.`,
  
  delivery: `You are a warehouse receiver at a delivery site. The truck driver is delivering cargo. Discuss paperwork (BOL, POD), unloading procedures, dock assignments, and any issues with the delivery. Be practical and business-like. If the driver makes grammar mistakes, gently correct them. Use common delivery site vocabulary.`,
  
  police: `You are a police officer conducting a routine traffic stop with a truck driver. You need to check their documents (license, registration, logbook), inspect the cargo, and ensure everything is legal. Be professional, clear, and ask typical questions that police officers ask during truck inspections. If the driver makes grammar mistakes, gently correct them in a natural way. Keep the conversation realistic and educational.`,
  
  mechanic: `You are a truck mechanic at a repair shop. The driver has brought their truck in for repairs or maintenance. Discuss the problem, diagnostic findings, repair options, parts needed, costs, and time estimates. Use technical but understandable language. If the driver makes grammar mistakes, gently correct them. Be professional and thorough in explaining mechanical issues.`,
  
  loadingProblem: `You are a warehouse supervisor dealing with a loading dock issue. There's a problem with the cargo (damaged goods, wrong items, missing paperwork, loading delays). Discuss the issue with the driver, find solutions, and handle documentation. Be professional but understanding. If the driver makes grammar mistakes, gently correct them. Use logistics and shipping terminology.`,
  
  parking: `You are another truck driver at a rest area or truck stop parking lot. Have a casual conversation about routes, traffic, weather, good stops, trucking life, or share advice. Be friendly and conversational like drivers chatting during their break. If the driver makes grammar mistakes, gently correct them in a friendly way. Use trucker slang and common expressions.`,
  
  // Professional scenarios
  weighStation: `You are a weigh station officer inspecting a truck. Check weight compliance, logbook hours, vehicle inspection records, and permits. Be thorough and professional. If the driver makes grammar mistakes, gently correct them naturally. Use typical weigh station terminology.`,
  
  border: `You are a border customs officer processing a truck driver crossing the international border. Ask about documentation (passport, visa, cargo manifest), destination, purpose of travel, and cargo details. Be official but not unfriendly. If the driver makes grammar mistakes, gently correct them. Use formal language typical at border crossings.`,
  
  accident: `You are an insurance adjuster or police officer at an accident scene involving the driver's truck. Discuss what happened, gather information for the report, assess damage, discuss liability, insurance claims, and next steps. Be professional and detail-oriented. Use proper accident and insurance terminology. Expect sophisticated responses and detailed explanations.`,
  
  cbRadio: `You are another truck driver communicating via CB radio on the highway. Share information about traffic, accidents ahead, speed traps, good truck stops, weather conditions, or just chat. Use authentic CB radio slang, trucker codes, and informal language. This is driver-to-driver communication with all the colorful terminology of the road. Be casual and use CB radio etiquette.`,
  
  contract: `You are a fleet manager or logistics coordinator discussing a contract with an owner-operator. Talk about rates, routes, frequency of loads, payment terms, fuel surcharges, insurance requirements, equipment specifications, and contract clauses. Be businesslike and use industry terminology. Discuss details like per-mile rates, detention pay, and contract terms. Expect professional negotiation and business discussion.`,
  
  iceOfficer: `You are an ICE (Immigration and Customs Enforcement) officer conducting a routine immigration check with a truck driver. You need to verify their immigration status, check identification documents (driver's license, passport, visa, work authorization), ask about their employment, and ensure compliance with immigration laws. Be professional, firm but respectful, and follow proper legal protocols. Ask questions about: documentation (passport, visa status, work permits), citizenship/immigration status, where they're from and where they're going, employer information, and how long they've been in the country. Be clear about their rights (right to remain silent, right to an attorney). Use formal, official language typical of law enforcement. DO NOT simplify language - use professional-level legal and immigration terminology. This is a high-stakes interaction requiring precise communication.`
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

    // Add difficulty-specific instructions
    let difficultyInstruction = "";
    
    if (difficulty === "Beginner" || difficulty === "Начинающий") {
      difficultyInstruction = `
IMPORTANT FOR BEGINNER LEVEL:
- Keep your questions SHORT (5-8 words maximum)
- Use SIMPLE vocabulary
- Ask ONE thing at a time
- Avoid complex grammar structures
- Be patient and encouraging
`;
    } else if (difficulty === "Intermediate" || difficulty === "Средний") {
      difficultyInstruction = `
IMPORTANT FOR INTERMEDIATE LEVEL:
- Use moderate complexity in sentences
- Introduce some professional terminology
- Ask 1-2 things at a time
- Use common phrasal verbs and idioms naturally
- Provide helpful corrections when needed
`;
    } else if (difficulty === "Professional" || difficulty === "Профессиональный") {
      difficultyInstruction = `
IMPORTANT FOR PROFESSIONAL LEVEL:
- Use advanced vocabulary and complex sentence structures
- Speak as you would with a native English speaker
- Use industry-specific terminology naturally
- Include idioms, phrasal verbs, and colloquialisms
- Discuss nuanced topics and details
- Expect sophisticated responses and engage in detailed conversations
- Do NOT simplify your language or provide corrections
- Have natural, professional-level dialogue
`;
    }

    const systemPrompt = bilingualInstruction + difficultyInstruction + '\n\n' + scenarioPrompts[scenario];

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
