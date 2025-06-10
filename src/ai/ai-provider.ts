import { getConfig } from '../config/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AiSuggestion {
  suggestion: string;
  explanation: string;
}

export interface AiProvider {
  getSuggestion(context: string): Promise<AiSuggestion>;
}

// Real Gemini API integration using official SDK
export class GeminiProvider implements AiProvider {
  async getSuggestion(context: string): Promise<AiSuggestion> {
    const config = getConfig();
    const apiKey = config.apiKey;
    if (!apiKey) {
      return Promise.reject(new Error('Gemini API key is not set. Please set it using --set-api-key.'));
    }
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Use the latest available Gemini model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(context);
      const answer = result.response.text() || 'No answer received.';
      return {
        suggestion: answer,
        explanation: ''
      };
    } catch (err: any) {
      return Promise.reject(new Error('Gemini API error: ' + (err.message || err.toString())));
    }
  }
}

// Placeholder implementation for ChatGPT
export class ChatGptProvider implements AiProvider {
  async getSuggestion(context: string): Promise<AiSuggestion> {
    if (!context) {
      return Promise.reject(new Error('Context is required for ChatGptProvider'));
    }
    // TODO: Integrate with ChatGPT API
    // Example: Call ChatGPT API with context and return suggestion
    // const response = await chatGptApi.getSuggestion(context);
    // return response;
    return {
      suggestion: 'ls -la',
      explanation: 'List all files and directories in the current directory with details.'
    };
  }
}
