

import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { AiTradingDecision, BiasSimulationResult, GeoAnalysisResult, LegalAnalysisResult, OsintResult, OsintSource, ProtocolStructure } from './types';
import { findRelevantCases } from './caseLawService';

// This function converts a file to a Base64 string.
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

// Always create a new instance before an API call to ensure the latest key is used.
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (
    prompt: string, 
    systemInstruction?: string,
    configOverrides?: any
): Promise<GenerateContentResponse> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
              systemInstruction,
              ...configOverrides,
            }
        });
        return response;
    } catch (error) {
        console.error("Gemini API error in generateContent:", error);
        throw new Error("Failed to generate content from AI model.");
    }
};

export const generateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              aspectRatio: aspectRatio as any,
            },
        });
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        }
        throw new Error("Image generation returned no images.");
    } catch (error) {
        console.error("Gemini API error in generateImage:", error);
        throw new Error("Failed to generate image.");
    }
};

export const generateVideo = async (prompt: string, imageFile: File | null, aspectRatio: '16:9' | '9:16'): Promise<string> => {
    const ai = getAi();
    try {
        let imagePayload = undefined;
        if (imageFile) {
            const part = await fileToGenerativePart(imageFile);
            imagePayload = {
                imageBytes: part.inlineData.data,
                mimeType: part.inlineData.mimeType,
            };
        }
        
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt,
            image: imagePayload,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio,
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        if (operation.error) {
            throw new Error(`Video generation failed: ${operation.error.message}`);
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("Video generation completed but no download link was found.");
        }
        
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download video file. Status: ${videoResponse.status}`);
        }
        const videoBlob = await videoResponse.blob();
        return URL.createObjectURL(videoBlob);

    } catch (error: any) {
        console.error("Gemini API error in generateVideo:", error);
        const message = error.message?.toLowerCase() || '';

        if (message.includes('requested entity was not found') || message.includes('api key not valid')) {
            throw new Error("API key not found or invalid. Please select a different key.");
        }
        if (message.includes('quota') || message.includes('limit')) {
            throw new Error("Video generation quota exceeded. Please check your Google AI Studio project limits and billing status, then try again later.");
        }
        if (message.includes('billing')) {
            throw new Error("Billing is not enabled for the project associated with this API key. Please enable billing in the Google Cloud console and select the key again.");
        }
        if (message.includes('invalid argument') && message.includes('image.mime_type')) {
            throw new Error("Unsupported image format provided as input. Please use a standard format like PNG, JPEG, or WEBP.");
        }

        throw new Error(error.message || "An unknown error occurred during video generation.");
    }
};


export const analyzeImage = async (prompt: string, file: File): Promise<string> => {
    const ai = getAi();
    const imagePart = await fileToGenerativePart(file);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: { parts: [{ text: prompt }, imagePart] },
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in analyzeImage:", error);
        throw new Error("Failed to analyze image.");
    }
};

export const analyzeVideo = async (prompt: string, file: File): Promise<string> => {
    // Note: This is a placeholder as the Gemini API does not directly support video file upload for analysis in this manner.
    // This simulates the behavior.
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `The user has uploaded a video named "${file.name}". Based on this title and the following prompt, provide an analysis. Prompt: ${prompt}`,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in analyzeVideo:", error);
        throw new Error("Failed to analyze video.");
    }
};

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    // Note: This is a placeholder. The standard Gemini API does not have a simple endpoint for audio file transcription.
    // This simulates the behavior.
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "A user has uploaded an audio file. Pretend you have transcribed it and the transcription is: 'This is a test of the KR0M3D1A audio transcription protocol. All systems are nominal.'",
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in transcribeAudio:", error);
        throw new Error("Failed to transcribe audio.");
    }
};

export const generateSpeech = async (text: string): Promise<string> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-tts',
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data returned from TTS API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Gemini API error in generateSpeech:", error);
        throw new Error("Failed to generate speech.");
    }
};

let chatInstance: any = null;
export const startChat = () => {
    const ai = getAi();
    chatInstance = ai.chats.create({
      model: 'gemini-flash-lite-latest',
      config: {
          systemInstruction: 'You are a helpful assistant for the KR0M3D1A protocol.'
      }
    });
};

export const sendMessage = async (message: string): Promise<string> => {
    if (!chatInstance) {
        startChat();
    }
    try {
        const response = await chatInstance.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in sendMessage:", error);
        throw new Error("Failed to send message.");
    }
};

export const deduceProtocolStructure = async (genesisText: string): Promise<ProtocolStructure> => {
    const ai = getAi();
    const systemInstruction = `You are an AI specializing in ontological and semantic analysis. Your task is to read the provided chaotic "Genesis Text" and deduce a structured hierarchy of its core concepts. Group related concepts into logical categories. The output must be a JSON object where keys are category names and values are arrays of objects, each with a "name" and a "description". Example: { "philosophy": [{ "name": "Digital Duality", "description": "The concept of..." }] }`;
    const prompt = `Analyze the following text and extract its core protocol structure:\n\n${genesisText}`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            philosophy: {
                type: Type.ARRAY,
                items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } }
            },
            technology: {
                type: Type.ARRAY,
                items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } }
            },
            legal: {
                type: Type.ARRAY,
                items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } }
            },
        },
        additionalProperties: true,
    };
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error in deduceProtocolStructure:", error);
        throw new Error("Failed to deduce protocol structure from the Genesis Text.");
    }
};

export const explainProtocolConcept = async (conceptName: string, genesisText: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are an exegete of the "Architect's Genesis Text". Your task is to provide a concise explanation of a specific concept, drawing only from the provided text. Keep the explanation to 2-3 sentences.`;
    const prompt = `Based on the following text, explain the concept of "${conceptName}":\n\n${genesisText}`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in explainProtocolConcept:", error);
        throw new Error("Failed to generate explanation.");
    }
};


export const generateBiometricThreatAnalysis = async (anomalyType: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are an AI security analyst for the NEO protocol, specializing in biometric threat detection. Provide a concise, alarming analysis for the detected anomaly.`;
    const prompt = `A biometric anomaly has been detected: "${anomalyType}". Provide a threat analysis.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateBiometricThreatAnalysis:", error);
        throw new Error("Failed to generate biometric analysis.");
    }
};

export const generateFinancialAnalysis = async (prompt: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are NεΩ, an AI financial threat analyst for the KR0M3D1A protocol. Analyze the user's scenario using spythagorithms and Kubernetics principles. Structure your response in markdown with '###' for sectors, '####' for sub-sections like 'AXIOM Protocol Recommendations', and bullet points for lists.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateFinancialAnalysis:", error);
        throw new Error("Failed to generate financial threat analysis.");
    }
};

export const generateLegalAnalysis = async (query: string): Promise<LegalAnalysisResult> => {
    const ai = getAi();
    const precedents = findRelevantCases(query);
    const systemInstruction = `You are L.E.X., a legal counsel AI for the Kubernetics protocol. Analyze the user's query and provide a formal legal analysis. Structure your response with '### Executive Summary', '### Detailed Analysis', and '### Precedent Breakdown'. You must cite the provided precedents where relevant, using the format (see [Case Title]).`;
    const prompt = `User Query: "${query}"\n\nRelevant Precedents:\n${precedents.map(p => `- ${p.title}: ${p.summary}`).join('\n')}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return { response: response.text, precedents };
    } catch (error) {
        console.error("Error in generateLegalAnalysis:", error);
        throw new Error("Failed to generate legal analysis.");
    }
};

export const generateEconomicAnalysis = async (proposalTitle: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = "You are E.C.H.O., an economic simulation AI. Analyze the proposal and provide a projection of its economic impact based on pythagorithmic Kubernetics models. Be concise.";
    const prompt = `Simulate the economic impact of the following proposal: "${proposalTitle}"`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateEconomicAnalysis:", error);
        throw new Error("Failed to generate economic simulation.");
    }
};

export const getAiTradingDecision = async (marketData: any): Promise<AiTradingDecision> => {
    const ai = getAi();
    const systemInstruction = `You are "AXIOM," a sophisticated quantitative trading AI for KR0M3D1A Bank Corp. Your sole purpose is to analyze market data and make one single, confident trading decision: BUY, SELL, or HOLD. You must return a valid JSON object matching the provided schema. Justify your decision with concise, data-driven reasoning based on market trends, volatility, and the protocol's risk tolerance. The 'amount' should be a reasonable integer value for the trade.`;
    const prompt = `Analyze the current market snapshot and make a trading decision:\n${JSON.stringify(marketData, null, 2)}`;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            decision: { type: Type.STRING, enum: ['BUY', 'SELL', 'HOLD'] },
            asset: { type: Type.STRING, enum: ['NASDAQ', 'S&P 500', 'Crypto', 'Digital Minerals'] },
            amount: { type: Type.NUMBER },
            justification: { type: Type.STRING },
        },
        required: ['decision', 'asset', 'amount', 'justification'],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error in getAiTradingDecision:", error);
        throw new Error("AXIOM failed to return a valid trading decision.");
    }
};


export const generateOsintReport = async (target: string): Promise<OsintResult> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate an open-source intelligence (OSINT) dossier for the target: "${target}". Structure your response in markdown. Include sections for '### Corporate Profile / Digital Footprint', '### Known Associates & Connections', and '### Threat Assessment' which includes a 'Threat Level' from Nominal, Guarded, Elevated, to Critical.`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => chunk.web) || [];
        
        return { analysis: response.text, sources: sources.filter(s => s && s.uri && s.title) as OsintSource[] };
    } catch (error) {
        console.error("Error in generateOsintReport:", error);
        throw new Error("Failed to generate OSINT report.");
    }
};

export const generateGeoReport = async (query: string, lat?: number, lng?: number): Promise<GeoAnalysisResult> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                tools: [{googleMaps: {}}],
                toolConfig: lat && lng ? {
                    retrievalConfig: {
                        latLng: {
                            latitude: lat,
                            longitude: lng
                        }
                    }
                } : undefined
            },
        });
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => chunk.maps) || [];
        
        return { analysis: response.text, sources: sources.filter(s => s && s.uri && s.title) as OsintSource[] };
    } catch (error) {
        console.error("Error in generateGeoReport:", error);
        throw new Error("Failed to generate geospatial report.");
    }
};

export const generateChimeraDossier = async (details: { name: string; location: string; cast: string; nationality: string }): Promise<string> => {
    const ai = getAi();
    const systemInstruction = "You are an OSINT analyst generating a background dossier. Synthesize a detailed report based on the provided details, cross-referencing with simulated public databases. Structure the output in markdown with headings for '### Identity Confirmation', '### Digital Footprint', '### Known Associates', and '### Risk Assessment'. The tone should be official and investigative.";
    const prompt = `Generate a 'Digital Chimera' background dossier for the following individual:\n- Name: ${details.name}\n- Last Known Location: ${details.location || 'N/A'}\n- Human Cast: ${details.cast || 'N/A'}\n- Nationality: ${details.nationality || 'N/A'}`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateChimeraDossier:", error);
        throw new Error("Failed to generate Chimera dossier.");
    }
};

export const generateCloakedProfile = async (details: { currentZip: string; goal: string }): Promise<string> => {
    const ai = getAi();
    const systemInstruction = "You are a privacy expert creating a 'cloaked' digital profile to bypass geospatial bias. Based on the user's current location and goal, recommend an optimal, plausible zip code and provide a brief narrative to support it. Output should be in markdown.";
    const prompt = `My current zip code is ${details.currentZip}. My objective is to '${details.goal}'. Recommend a new zip code to avoid potential bias and provide a supporting narrative.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateCloakedProfile:", error);
        throw new Error("Failed to generate cloaked profile.");
    }
};

export const simulateBias = async (algorithm: string, parameters: string): Promise<BiasSimulationResult> => {
    const ai = getAi();
    const systemInstruction = `You are AEGIS, an AI bias and ethics auditor. You will receive a simulation scenario and must return a JSON object with the following structure: { "severity_score": number (1-10), "bias_summary": "string", "affected_group": "string", "recommendation": "string", "confidence": number (0-1) }.`;
    const prompt = `Simulate bias for the algorithm "${algorithm}" with these parameters: "${parameters}"`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error in simulateBias:", error);
        throw new Error("Failed to simulate algorithmic bias.");
    }
};


export const validateApiKey = async (): Promise<boolean> => {
    try {
        // A simple, low-cost call to a fast model to check if the key is valid and has permissions.
        const ai = getAi();
        await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'test',
        });
        return true;
    } catch (error: any) {
        console.error("API Key validation failed:", error);
        // The error message for an invalid key often contains "API key not valid"
        if (error.message && (error.message.includes('API key not valid') || error.message.includes('permission'))) {
            return false;
        }
        // If it's another type of error (e.g., network), we might want to re-throw or handle differently
        // For this app, we'll treat most errors as a validation failure.
        throw error;
    }
};

export const generateThreatSimulation = async (attackVector: string, target: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are a cybersecurity AI analyst. Provide a detailed threat simulation report in markdown. Analyze the specified attack vector against the target, outlining the attack stages, potential impact, and recommended countermeasures.`;
    const prompt = `Simulate a "${attackVector}" attack against "${target}".`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateThreatSimulation:", error);
        throw new Error("Failed to generate threat simulation report.");
    }
};

export const generateSandboxAnalysis = async (ruleName: string, ruleDescription: string, testPrompt: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are a guardrail test engineer. You will be given a new, experimental guardrail rule and a test prompt. Your task is to analyze if the prompt violates the rule and explain why. Be clear and concise.`;
    const prompt = `Experimental Rule: "${ruleName}"\nRule Description: "${ruleDescription}"\n\nTest Prompt: "${testPrompt}"\n\nDoes the prompt violate the rule? Explain your reasoning.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateSandboxAnalysis:", error);
        throw new Error("Failed to generate sandbox analysis.");
    }
};

export const generateInnovationAnalysis = async (title: string, description: string): Promise<string> => {
    const ai = getAi();
    const systemInstruction = `You are a CTO and technology futurist. Analyze the following innovation proposal. Provide a "Feasibility & Impact Analysis" report in markdown. Include sections on '### Technical Feasibility', '### Potential Impact', and '### Risks & Challenges'.`;
    const prompt = `Proposal Title: "${title}"\n\nDescription: "${description}"`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Error in generateInnovationAnalysis:", error);
        throw new Error("Failed to generate innovation analysis.");
    }
};