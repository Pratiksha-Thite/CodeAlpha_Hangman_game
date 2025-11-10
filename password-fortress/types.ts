
export type PasswordStrength = 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';

export interface PasswordStrengthAnalysis {
  strength: PasswordStrength;
  feedback: string[];
  score: number; // 0-100
}
