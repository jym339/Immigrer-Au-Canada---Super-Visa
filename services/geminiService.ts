
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVisaAssistantResponse = async (userPrompt: string) => {
  try {
    // Using gemini-3-pro-preview as it is better suited for complex text tasks like immigration expertise
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Tu es un expert en immigration canadienne pour l'agence 'IMMIGRER AU CANADA'. Ta spécialité est le Super Visa pour les parents et grands-parents de la RDC. Réponds de manière professionnelle, chaleureuse et précise en français. Mentionne toujours que le Super Visa permet de rester jusqu'à 5 ans et que les délais pour la RDC sont d'environ 1 mois.",
        temperature: 0.7,
      },
    });
    // Use .text property directly to access generated content as per latest SDK guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, je rencontre une petite difficulté technique. Veuillez nous contacter directement via WhatsApp pour une réponse rapide.";
  }
};
