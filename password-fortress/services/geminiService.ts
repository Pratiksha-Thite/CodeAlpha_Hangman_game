
import { GoogleGenAI, Type } from '@google/genai';
import type { PasswordStrengthAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const passwordStrengthSchema = {
  type: Type.OBJECT,
  properties: {
    strength: {
      type: Type.STRING,
      description: 'A strength rating from "Very Weak", "Weak", "Medium", "Strong", or "Very Strong".'
    },
    feedback: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'An array of specific, actionable feedback points to improve the password. E.g., "Add special characters", "Too short", "Contains a common word".'
    },
    score: {
      type: Type.NUMBER,
      description: 'A numerical score from 0 to 100 representing the password strength.'
    }
  },
  required: ['strength', 'feedback', 'score']
};

export const checkPasswordStrength = async (password: string): Promise<PasswordStrengthAnalysis> => {
    if (!password) {
        return {
            strength: 'Very Weak',
            feedback: ['Start typing to see your password strength.'],
            score: 0
        };
    }

    const prompt = `Analyze the strength of the following password: "${password}". 
    Evaluate it based on length (ideal > 12), complexity (mix of uppercase, lowercase, numbers, special characters), and avoidance of common patterns (like '1234', 'password', sequences). 
    Do not mention the password itself in the feedback. 
    Provide a strength rating, a numerical score from 0 to 100, and an array of actionable feedback points.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: passwordStrengthSchema,
                temperature: 0.1,
            },
        });

        const jsonString = response.text.trim();
        const analysis = JSON.parse(jsonString);
        
        // Clamp score to be within 0-100
        analysis.score = Math.max(0, Math.min(100, analysis.score));

        return analysis as PasswordStrengthAnalysis;
    } catch (error) {
        console.error('Error checking password strength:', error);
        return {
            strength: 'Very Weak',
            feedback: ['An error occurred while analyzing the password. Please try again.'],
            score: 0
        };
    }
};

export const generatePassword = async (options: { length: number; useNumbers: boolean; useSymbols: boolean; useUppercase: boolean; useLowercase: boolean }): Promise<string> => {
    let characterTypes = [];
    if (options.useLowercase) characterTypes.push('lowercase letters (a-z)');
    if (options.useUppercase) characterTypes.push('uppercase letters (A-Z)');
    if (options.useNumbers) characterTypes.push('numbers (0-9)');
    if (options.useSymbols) characterTypes.push('special characters (e.g., !@#$%^&*)');
    
    if (characterTypes.length === 0) {
        return "Select at least one character type.";
    }

    const prompt = `Generate a single, secure, random password with the following criteria:
- Exact Length: ${options.length} characters.
- Must include: ${characterTypes.join(', ')}.
The password must be completely random and not contain any common words, names, or easy-to-guess patterns. 
Return ONLY the generated password string, with no other text, explanation, or formatting.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 1.0,
            },
        });
        return response.text.trim().slice(0, options.length);
    } catch (error) {
        console.error('Error generating password:', error);
        return 'error-generating-password';
    }
};
