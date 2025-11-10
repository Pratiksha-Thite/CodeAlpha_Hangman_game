
import React, { useState, useEffect, useCallback } from 'react';
import { checkPasswordStrength } from '../services/geminiService';
import type { PasswordStrengthAnalysis } from '../types';
import StrengthMeter from '../components/StrengthMeter';

const EyeIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ExclamationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

const CheckerPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [analysis, setAnalysis] = useState<PasswordStrengthAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = useCallback((newPassword: string) => {
        setPassword(newPassword);
        setLoading(true);
    }, []);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (password === '') {
                setAnalysis(null);
                setLoading(false);
                return;
            }
            const result = await checkPasswordStrength(password);
            setAnalysis(result);
            setLoading(false);
        };
        
        const debounceTimer = setTimeout(() => {
            fetchAnalysis();
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [password]);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">Password Strength Checker</h1>
            <p className="text-slate-400 text-center mb-8">Enter a password to get an instant, AI-powered security analysis.</p>
            
            <div className="relative mb-4">
                <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Enter your password here"
                    className="w-full pl-4 pr-12 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                </button>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 space-y-4 min-h-[180px]">
                {loading && (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                    </div>
                )}

                {!loading && !analysis && (
                     <p className="text-center text-slate-400 pt-10">Start typing to analyze your password.</p>
                )}

                {!loading && analysis && (
                    <>
                        <StrengthMeter score={analysis.score} strengthText={analysis.strength} />
                        <div>
                            <h3 className="font-semibold mb-2 text-slate-200">AI Feedback:</h3>
                            <ul className="space-y-2">
                                {analysis.feedback.map((item, index) => (
                                    <li key={index} className="flex items-start text-slate-300">
                                        {analysis.score > 75 ? <CheckCircleIcon /> : <ExclamationIcon />}
                                        <span className="ml-2">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckerPage;
