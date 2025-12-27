//need to run this command - npm install @google/genai
import { GoogleGenAI } from "@google/genai";

export const generateAIContent = async (prompt) => {
    const myKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const ai = new GoogleGenAI({apiKey : myKey});
    const response = await ai.models.generateContent({
        //model: "gemini-2.5-flash",
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });

    return response.text.trim();
}
