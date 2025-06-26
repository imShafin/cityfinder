import axios from 'axios';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const fetchCountryInfo = async (countryName) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-8b-8192", // or "mixtral-8x7b-32768" etc. if available
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable assistant about countries."
          },
          {
            role: "user",
            content: `Tell me about the country "${countryName}" including geography, population, economy, and culture.`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error);
    return "Failed to load country info.";
  }
};
