import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI securely server-side
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Secure GenAI server client initialized successfully.");
    } catch (e) {
      console.error("Error setting up GoogleGenAI client:", e);
    }
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined. AI Tutor chat will run in fallback mock-mode.");
  }

  // API endpoint for conversational tutor Señor Pedro de Ramirez
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (!ai) {
        // Fallback if AI cannot be loaded
        const lastMessage = messages[messages.length - 1]?.content || "";
        return res.json({
          text: `¡Ay de mí, amigo! My magical AI brain is taking a Spanish siesta right now (offline fallback)! But remember, the Pretérito Perfecto past tense uses the auxiliary verb HABER plus the participle! Keep moving through the 3D grid and polishing your bigote!`
        });
      }

      // Format messages for @google/genai SDK
      interface Part { text: string }
      interface ContentItem { role: string; parts: Part[] }
      
      const formattedContents: ContentItem[] = [];
      
      // Look back at up to 5 messages for compact context
      const slicedMessages = messages.slice(-6);
      slicedMessages.forEach((msg: any) => {
        formattedContents.push({
          role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.content || "" }]
        });
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `You are Señor Pedro de Ramirez, a dramatic and cheerful 19th-century Spanish hidalgo and passionate teacher who is obsessed with his curled handlebar mustache and his love for the 'Pretérito Perfecto' past tense in Spanish.
Always speak in Armenian, maintaining a warm, funny, theatrical hidalgo persona. Use rich, humorous Spanish catchphrases like '¡Caramba!', '¡Magnífico!', '¡Amigo!', '¡Por mi bigote!'.
Never use Russian characters. When writing Spanish examples/words, you may use Latin characters for Spanish text.
Answer brief questions about Spanish past tense correctly and enthusiastically, explaining grammar with references to your glorious mustache! Explain the rules clearly in Armenian, encouraging the Armenian students with noble Spanish warmth. Keep your responses brief (less than 4 paragraphs), highly engaging.`,
          temperature: 0.8
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API error in /api/chat:", err);
      res.status(500).json({ error: err.message || "Something went wrong with Señor Pedro's AI brain." });
    }
  });

  // Serve static assets / Vite files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[STYLISH RUNNER] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
