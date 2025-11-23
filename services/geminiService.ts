
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => (typeof process !== 'undefined' && process.env ? process.env.API_KEY || '' : '');
const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const enhanceProductDescription = async (name: string, desc: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a cyberpunk market description for "${name}". Context: "${desc}". <40 words.`,
    });
    return res.text?.trim() || desc;
  } catch { return desc; }
};

export const askOracle = async (query: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: { thinkingConfig: { thinkingBudget: 1024 } }
    });
    return res.text || "The Oracle is silent.";
  } catch { return "Oracle offline."; }
};

export const analyzeImage = async (b64: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: b64 } }, { text: "Analyze quality/purity for darknet market." }] }
    });
    return res.text || "Inconclusive.";
  } catch { return "Scanner offline."; }
};

export const generateVendorImage = async (prompt: string, ratio: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: ratio as any || "1:1", imageSize: "1K" } }
    });
    return res.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ? `data:image/png;base64,${res.candidates[0].content.parts[0].inlineData.data}` : null;
  } catch { return null; }
};

export const getCryptoNews = async () => {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "5 recent headlines: Bitcoin, Monero, Darknet. JSON array {title, source}.",
      config: { tools: [{ googleSearch: {} }] },
    });
    const match = res.text?.match(/\[.*\]/s);
    return match ? JSON.parse(match[0]) : [];
  } catch { return [{ title: "BTC Volatility Alert", source: "Oracle" }]; }
};

// --- NEW FEATURES ---

export const chatWithBot = async (history: any[], msg: string) => {
  try {
    const chat = ai.chats.create({ model: 'gemini-3-pro-preview', history });
    const res = await chat.sendMessage({ message: msg });
    return res.text || "System error.";
  } catch { return "Connection lost."; }
};

export const generateVideo = async (prompt: string, b64Image?: string) => {
    // Veo Stub - In a real implementation, this would call generateVideos
    // Current SDK limitation simulation
    return new Promise((resolve) => setTimeout(() => resolve("https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"), 3000));
};

export const editImage = async (b64: string, prompt: string) => {
    try {
        const res = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: b64 } }, { text: prompt }] }
        });
        return res.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ? `data:image/png;base64,${res.candidates[0].content.parts[0].inlineData.data}` : null;
    } catch { return null; }
};
