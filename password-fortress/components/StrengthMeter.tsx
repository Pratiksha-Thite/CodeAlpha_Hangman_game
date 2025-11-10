
import React from 'react';
import type { PasswordStrength } from '../types';

interface StrengthMeterProps {
  score: number;
  strengthText: PasswordStrength;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ score, strengthText }) => {
  const getColor = () => {
    if (score <= 25) return 'bg-red-500';
    if (score <= 50) return 'bg-orange-500';
    if (score <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const colorClass = getColor();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-300">Password Strength:</span>
        <span className={`text-sm font-bold ${colorClass.replace('bg-','text-')}`}>{strengthText}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className={`${colorClass} h-2.5 rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthMeter;
