import { localApiOnly } from './local-api-guard.mjs';
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use('/api', localApiOnly(() => PORT));
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/brand/generate", async (req, res) => {
  const { mission, companyName } = req.body;

  if (!mission) {
    return res.status(400).json({ error: "Mission is required" });
  }

  try {
    const prompt = `
      You are an expert brand strategist. Generate a comprehensive brand identity bible for a company with the following mission: "${mission}" ${companyName ? `and name: "${companyName}"` : ""}.
      
      Return a JSON object with:
      1. name: A short, memorable company name (either use the provided one or suggest a better one).
      2. mission: A refined, professional mission statement (1-2 sentences).
      3. voice: A description of the brand's tone and personality (e.g., "Minimalist, Bold, Approachable").
      4. palette: An array of 5 colors, each with:
         - hex: The hex code (e.g., "#FF5733").
         - name: A creative color name.
         - usage: What this color should be used for (e.g., "Primary Action", "Soft Background").
      5. typography: A font pairing with:
         - heading: { family: "Google Font Name", weight: "700", styles: ["normal"] }
         - body: { family: "Google Font Name", weight: "400", styles: ["normal"] }
         - visualDescription: Why these fonts work together.
      6. logoPrompts: Descriptions for generating SVG graphics:
         - primary: Description for a high-quality primary logo (abstract/symbolic).
         - secondary: A simplified version or mark.
         - icon: A tiny favicon-style icon.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            mission: { type: Type.STRING },
            voice: { type: Type.STRING },
            palette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  name: { type: Type.STRING },
                  usage: { type: Type.STRING }
                },
                required: ["hex", "name", "usage"]
              }
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                heading: {
                  type: Type.OBJECT,
                  properties: {
                    family: { type: Type.STRING },
                    weight: { type: Type.STRING },
                    styles: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                body: {
                  type: Type.OBJECT,
                  properties: {
                    family: { type: Type.STRING },
                    weight: { type: Type.STRING },
                    styles: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                visualDescription: { type: Type.STRING }
              }
            },
            logoPrompts: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                icon: { type: Type.STRING }
              }
            }
          },
          required: ["name", "mission", "voice", "palette", "typography", "logoPrompts"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error: any) {
    console.error("Brand Generation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/brand/generate-svg", async (req, res) => {
  const { prompt, brandName, colors } = req.body;

  try {
    const svgPrompt = `
      Generate a professional, minimalist SVG logo code for a brand named "${brandName}".
      Description: ${prompt}
      Primary colors to use: ${colors.join(", ")}.
      
      Requirements:
      - Clean, modern vector graphics.
      - Scalable and responsive (use viewBox).
      - No background unless specified.
      - Valid XML SVG code only.
      - Return ONLY the SVG code.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: svgPrompt,
    });

    const svgMatch = response.text.match(/<svg[\s\S]*<\/svg>/);
    const svgCode = svgMatch ? svgMatch[0] : "";

    res.json({ svg: svgCode });
  } catch (error: any) {
    console.error("SVG Generation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite/Static Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
