import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceProductDescription = async (productName: string, currentDescription: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a cyberpunk market copywriter. 
      Write a short, punchy, high-tech, and alluring product description for an item named "${productName}".
      Current description context: "${currentDescription}".
      Keep it under 40 words. Focus on exclusivity and quality.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || currentDescription;
  } catch (error) {
    console.error("Failed to generate description:", error);
    return currentDescription; // Fallback to existing
  }
};

export const suggestPriceTiers = async (productName: string): Promise<Array<{ amount: string, price: number }>> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
          Suggest 3 pricing tiers for a product named "${productName}".
          Return ONLY a JSON array with objects containing 'amount' (string) and 'price' (number).
          Example: [{"amount": "1g", "price": 50}, {"amount": "5g", "price": 200}]
        `;
    
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
    
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text);
      } catch (error) {
        console.error("Failed to suggest prices:", error);
        return [];
      }
}

export const generateStealthPackaging = async (productName: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
          Suggest a creative, funny, or stealthy way to package "${productName}" so it doesn't look suspicious during shipping. 
          Be edgy and creative. Keep it to one short sentence.
          Example: "Hidden inside a hollowed-out scented candle labeled 'Grandma's Love'."
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        return response.text?.trim() || "Standard stealth shielding applied.";
    } catch (error) {
        console.error("Failed to generate stealth plan:", error);
        return "Double vacuum sealed in a decoy box.";
    }
}
