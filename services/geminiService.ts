import { GoogleGenAI, Type } from "@google/genai";
import { RegistryData, AnalysisResult } from "../types";

const parseJsonClean = (text: string) => {
  try {
    const cleanText = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Invalid JSON response from AI");
  }
};

export const analyzeRegistryData = async (data: RegistryData): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set it in the environment.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as an advanced actuarial AI and sociologist. Analyze the following "registry data" for an individual to predict future life events with high accuracy based on statistical probabilities and socio-economic patterns.
    
    Subject Data:
    - Age: ${data.age}
    - Gender: ${data.gender}
    - Education: ${data.education}
    - Marital Status: ${data.maritalStatus}
    - Annual Income: $${data.income}
    - Employment: ${data.employmentStatus}
    - Residence: ${data.residenceType} (${data.yearsAtResidence} years)
    - Health Condition: ${data.healthCondition || "None declared"}
    - Dependents: ${data.dependents}

    Task:
    1. Provide a brief executive summary of their current demographic profile.
    2. Predict 4-6 specific major life events (e.g., Job Change, Relocation, Marriage, Health Incident, Retirement, Further Education, Financial Audit, etc.) likely to occur in the next 5 years.
    3. Assign a probability percentage (0-100) to each.
    4. Provide specific risk factors derived from the data (e.g., "High income but unstable employment type").
    5. Provide actionable recommendations.

    Return the response in strict JSON format.
  `;

  // We define the schema for type safety and reliable parsing
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      overview: { type: Type.STRING, description: "Executive summary of the profile." },
      predictions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            eventName: { type: Type.STRING },
            probability: { type: Type.NUMBER, description: "Probability percentage 0-100" },
            timeframe: { type: Type.STRING, description: "Expected timeframe (e.g., '6-12 months')" },
            reasoning: { type: Type.STRING, description: "Why this event is predicted based on the data." },
            impactLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
          },
          required: ["eventName", "probability", "timeframe", "reasoning", "impactLevel"]
        }
      },
      riskFactors: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of identified risks."
      },
      recommendations: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of strategic recommendations."
      }
    },
    required: ["overview", "predictions", "riskFactors", "recommendations"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Lower temperature for more analytical/consistent results
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return parseJsonClean(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
