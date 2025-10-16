import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

// Compare texts and calculate accuracy
function analyzeTranscription(original: string, transcribed: string) {
  const originalWords = original.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const transcribedWords = transcribed.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  
  // Simple word-by-word comparison
  let correctWords = 0;
  const maxLength = Math.max(originalWords.length, transcribedWords.length);
  
  for (let i = 0; i < Math.min(originalWords.length, transcribedWords.length); i++) {
    if (originalWords[i] === transcribedWords[i]) {
      correctWords++;
    }
  }
  
  const accuracy = originalWords.length > 0 
    ? Math.round((correctWords / originalWords.length) * 100) 
    : 0;
  
  const missingWords = originalWords.length - transcribedWords.length;
  const extraWords = transcribedWords.length - originalWords.length;
  
  return {
    accuracy,
    correctWords,
    totalWords: originalWords.length,
    missingWords: missingWords > 0 ? missingWords : 0,
    extraWords: extraWords > 0 ? extraWords : 0,
    transcribedText: transcribed
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { audio, originalText } = await req.json();
    
    console.log('Received request with audio and originalText');
    
    if (!audio || !originalText) {
      throw new Error('Audio data and original text are required');
    }

    // Process audio in chunks
    const binaryAudio = processBase64Chunks(audio);
    console.log('Processed audio chunks, size:', binaryAudio.length);
    
    // Prepare form data for Whisper API
    const formData = new FormData();
    const blob = new Blob([binaryAudio], { type: 'audio/wav' });
    formData.append('file', blob, 'audio.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    console.log('Sending to OpenAI Whisper API');

    // Send to OpenAI Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const result = await response.json();
    console.log('Received transcription:', result.text);

    // Analyze the transcription against original text
    const analysis = analyzeTranscription(originalText, result.text);
    console.log('Analysis complete:', analysis);

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in analyze-recording:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to analyze recording'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});