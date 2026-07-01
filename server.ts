import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GoogleGenAI client lazily to prevent crashing on boot if the key is missing.
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("La variable de entorno GEMINI_API_KEY es requerida para el análisis socio-financiero. Por favor agréguela en Configuración > Secretos.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // API endpoint for analyzing socio-financial relationship
  app.post("/api/analyze-profile", async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Se requieren las respuestas en un formato de arreglo válido." });
      }

      const formattedAnswers = answers.map((ans: any, idx: number) => {
        return `Pregunta ${idx + 1}: ${ans.questionText}\nRespuesta elegida: ${ans.selectedOptionText}`;
      }).join("\n\n");

      const prompt = `Analiza detalladamente las siguientes respuestas de una autoevaluación de la relación socio-financiera con el dinero.
La filosofía de FINET establece que:
- No vendemos inversiones tradicionales ni garantizamos ganancias mágicas.
- Ayudamos a construir independencia financiera modificando de raíz la relación de la persona con el dinero.
- El tiempo, la educación, la templanza emocional y romper las inercias inconscientes de consumo son los pilares fundamentales.
- Vemos la volatilidad no como riesgo, sino como el precio de admisión del crecimiento.
- Comparamos la cartera de inversiones con un inmueble de renta: no llamás al tasador cada 5 minutos, sos dueño de activos reales y buscas ingresos sostenibles a largo plazo.

Respuestas seleccionadas por el usuario:
${formattedAnswers}

Por favor, genera un informe de perfil socio-financiero estructurado en español argentino/neutro, que sea inspirador, libre de tecnicismos intimidatorios, empático y profundamente filosófico. Retorna el resultado estructurado de acuerdo con el esquema JSON provisto.`;

      const ai = getGenAI();
      const systemInstruction = "Sos el mentor socio-financiero principal de FINET. Tu objetivo es analizar el nivel de madurez financiera, los sesgos cognitivos y los miedos del usuario para darle claridad sobre su relación con el dinero. El tono debe ser reflexivo, amigable, maduro e intelectual. Evitá frases clichés o discursos motivacionales vacíos; dale sustancia y analogías ricas (bosques, raíces, inmuebles).";
      const schema = {
        type: Type.OBJECT,
        properties: {
          archetype: {
            type: Type.STRING,
            description: "Nombre sofisticado y humano para este arquetipo financiero (ej. 'El Protector Reticente', 'El Optimista de Corto Plazo', 'El Buscador Autónomo')."
          },
          subtitle: {
            type: Type.STRING,
            description: "Una frase metafórica de 1 sola línea sobre su relación actual con el capital."
          },
          summary: {
            type: Type.STRING,
            description: "Análisis comprensivo de 3-4 oraciones detallando cómo influyen sus temores o impulsos en su toma de decisiones."
          },
          strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactamente 3 virtudes o aspectos positivos identificados en su perfil."
          },
          challenges: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactamente 3 desafíos mentales, emocionales o prácticos a superar."
          },
          philosophicalReflection: {
            type: Type.STRING,
            description: "Un párrafo de 4-5 oraciones de alta calidad literaria, que reencuadre el dinero como tiempo e independencia y le hable directo a su mentalidad."
          },
          nextSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactamente 3 recomendaciones de educación y desarrollo de hábitos con la mirada de largo plazo de FINET."
          }
        },
        required: ["archetype", "subtitle", "summary", "strengths", "challenges", "philosophicalReflection", "nextSteps"]
      };

      // Try multiple models to ensure high availability and bypass temporary high load errors
      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"];
      const maxRetriesPerModel = 2;
      let lastError: any = null;
      let response: any = null;

      for (const modelName of modelsToTry) {
        for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
          try {
            console.log(`[FINET Server] Intentando generar perfil con modelo: ${modelName} (Intento ${attempt}/${maxRetriesPerModel})...`);
            response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema
              }
            });

            if (response && response.text) {
              console.log(`[FINET Server] Éxito con el modelo ${modelName} en el intento ${attempt}.`);
              break;
            }
          } catch (err: any) {
            lastError = err;
            console.warn(`[FINET Server] Error con ${modelName} (Intento ${attempt}/${maxRetriesPerModel}):`, err.message || err);
            
            // Wait with backoff before next attempt
            if (attempt < maxRetriesPerModel) {
              const backoffDelay = attempt * 800;
              await new Promise(resolve => setTimeout(resolve, backoffDelay));
            }
          }
        }
        // If we got a successful response, stop trying other models
        if (response && response.text) {
          break;
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("No se pudo obtener una respuesta válida del servicio de Inteligencia Artificial.");
      }

      const responseText = response.text;
      const report = JSON.parse(responseText.trim());
      res.json(report);
    } catch (error: any) {
      console.error("Error en /api/analyze-profile:", error);
      res.status(500).json({ error: error.message || "Error al procesar el perfil socio-financiero." });
    }
  });

  // Contact/Meeting booking API route
  app.post("/api/book-meeting", (req, res) => {
    try {
      const { name, email, phone, message, origin } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "El nombre y el correo electrónico son obligatorios." });
      }

      // Return a professional success response
      res.json({
        success: true,
        message: `¡Hola ${name}! Recibimos tu solicitud para agendar una reunión desde '${origin}'. Un asesor socio-financiero de nuestro equipo te contactará por email (${email}) en el transcurso del día para coordinar un encuentro en calma.`
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error al registrar la solicitud." });
    }
  });

  // Vite development vs production asset handling
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FINET Server] Ejecutándose en el puerto ${PORT}`);
  });
}

startServer();
