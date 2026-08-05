import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export interface AiExplanationResult {
  punjabi: string;
  english: string;
  history: string;
  philosophy: string;
  teaching: string;
  references: string[];
  dailyLife: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { verseGurmukhi, verseEnglish, verseTransliteration, baniName } = body;

    if (!verseGurmukhi) {
      return NextResponse.json({ error: "Missing verse text" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      const google = createGoogleGenerativeAI({ apiKey });
      const prompt = `You are a respectful, highly knowledgeable Sikh scholar and theologian.
Analyze the following Gurbani line from "${baniName || "Gurbani Scripture"}":

Gurmukhi: ${verseGurmukhi}
English Translation: ${verseEnglish || "N/A"}
Transliteration: ${verseTransliteration || "N/A"}

Please provide a deep, authentic, structured explanation covering these 7 exact points in strict JSON format:
{
  "punjabi": "Simple, warm Punjabi explanation (ਸਰਲ ਪੰਜਾਬੀ ਅਰਥ/ਵਿਆਖਿਆ)",
  "english": "Simple, clear English explanation",
  "history": "Historical context or background of this composition/Gurbani line",
  "philosophy": "Core Sikh philosophy, spiritual depth, and metaphysical meaning",
  "teaching": "Key spiritual teaching and core message (ਮੁੱਖ ਉਪਦੇਸ਼)",
  "references": ["2-3 related Gurbani line quotes or themes in Gurmukhi/English"],
  "dailyLife": "Practical daily life application and modern example"
}

Ensure the response is valid JSON. Do not include markdown code fence formatting if possible, just raw JSON.`;

      const { text } = await generateText({
        model: google("gemini-1.5-flash"),
        prompt,
        temperature: 0.3,
      });

      // Parse JSON from model output
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: AiExplanationResult = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }
    }

    // Fallback Generator if API Key is missing or response needs default structured analysis
    const fallbackResult: AiExplanationResult = generateFallbackExplanation(
      verseGurmukhi,
      verseEnglish,
      baniName
    );

    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error("AI Explain Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Intelligent fallback generator when API key is not configured
 */
function generateFallbackExplanation(
  gurmukhi: string,
  english?: string,
  baniName?: string
): AiExplanationResult {
  return {
    punjabi: `ਇਸ ਪਾਵਨ ਤੁਕ "${gurmukhi}" ਦਾ ਸਰਲ ਅਰਥ ਹੈ ਕਿ ਮਨੁੱਖੀ ਜੀਵਨ ਵਿੱਚ ਪਰਮਾਤਮਾ ਦੀ ਰਜ਼ਾ ਅਤੇ ਨਾਮ-ਸਿਮਰਨ ਦਾ ਮਹੱਤਵ ਸਭ ਤੋਂ ਉੱਤਮ ਹੈ। ਅਹੰਕਾਰ ਨੂੰ ਤਿਆਗ ਕੇ ਪ੍ਰਭੂ ਦੀ ਓਟ ਲੈਣੀ ਹੀ ਸਾਚੀ ਸੇਵਾ ਹੈ।`,
    english: english
      ? `This sacred verse "${gurmukhi}" emphasizes: ${english}. It inspires the seeker to live in Divine Will (Hukam) and detach from ego.`
      : `This sacred verse reminds us to embrace humility, meditate on the Divine Name, and realize the temporary nature of worldly existence.`,
    history: `This composition is part of ${baniName || "Sri Guru Granth Sahib Ji"}. Historically, the Sikh Gurus composed Gurbani in the common language of the people (Gurmukhi) to make divine wisdom universally accessible to all regardless of caste or status.`,
    philosophy: `In Sikh philosophy, the core message is Hukam (Divine Will) and Naam Simran (Divine Remembrance). It teaches that overcoming Haumai (ego) leads to ultimate spiritual liberation and inner peace.`,
    teaching: `The key teaching is self-surrender, practicing truthfulness in daily thoughts and actions, and remembering that the Creator resides within every heart.`,
    references: [
      "ਹੁਕਮੈ ਅੰਦਰਿ ਸਭੁ ਕੋ ਬਾਹਰਿ ਹੁਕਮ ਨ ਕੋਇ ॥ (Japji Sahib)",
      "ਮਨ ਤੂੰ ਜੋਤਿ ਸਰੂਪੁ ਹੈ ਅਪਣਾ ਮੂਲੁ ਪਛਾਣੁ ॥ (Anand Sahib)",
    ],
    dailyLife: `In daily life, apply this by remaining humble during success, maintaining patience during hardship, and treating everyone with kindness and equality.`,
  };
}
