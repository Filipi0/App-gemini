import axios from "axios";
import { GEMINI_API_KEY } from "./apiKey";

// Modelo: gemini-1.5-flash
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export async function fetchGeminiResponse(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error.response?.data || error.message);
    return "Erro ao obter resposta da IA.";
  }
}
