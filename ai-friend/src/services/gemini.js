import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function generateContent(message,personality) {
    console.log("Personality" + personality)
    if (!personality || personality == " " || personality == null){
        const personality= "Normal";
        console.log("my new personality"+ personality)
    }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: "The user sent you a message:"+ message+ " respond with the following personality, if theres multiple blend them together, dont tell the user you're playing a personality"+ personality,
  });
  return response.text;
}

export default generateContent