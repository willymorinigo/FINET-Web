import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  // enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido. Utilizar POST." });
  }

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "La variable de entorno GEMINI_API_KEY no está configurada en la plataforma de despliegue (ej. Vercel). Por favor agréguela en las variables de entorno de su proyecto Vercel." 
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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

    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"];
    const maxRetriesPerModel = 2;
    let lastError: any = null;
    let aiResponse: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
        try {
          aiResponse = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction: systemInstruction,
              responseMimeType: "application/json",
              responseSchema: schema
            }
          });

          if (aiResponse && aiResponse.text) {
            break;
          }
        } catch (err: any) {
          lastError = err;
          if (attempt < maxRetriesPerModel) {
            const backoffDelay = attempt * 800;
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
          }
        }
      }
      if (aiResponse && aiResponse.text) {
        break;
      }
    }

    if (!aiResponse || !aiResponse.text) {
      throw lastError || new Error("No se pudo obtener una respuesta válida del servicio de Inteligencia Artificial.");
    }

    const parsedData = JSON.parse(aiResponse.text.trim());
    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ 
      error: `Error interno al procesar el perfil: ${error.message || error}` 
    });
  }
}
