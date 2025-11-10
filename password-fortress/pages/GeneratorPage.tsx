
import React, { useState, useCallback } from 'react';
import { generatePassword } from '../services/geminiService';

const ClipboardIcon = ({ ...props }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>;
const CheckIcon = ({ ...props }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;

const GeneratorPage: React.FC = () => {
    const [options, setOptions] = useState({
        length: 16,
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSymbols: true,
    });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = useCallback(async () => {
        setLoading(true);
        setPassword('');
        const newPassword = await generatePassword(options);
        setPassword(newPassword);
        setLoading(false);
        setCopied(false);
    }, [options]);
    
    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">Secure Password Generator</h1>
            <p className="text-slate-400 text-center mb-8">Create strong, random passwords to protect your accounts.</p>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 space-y-6">
                <div className="relative">
                    <input 
                        type="text"
                        readOnly
                        value={loading ? 'Generating...' : password}
                        placeholder="Your secure password will appear here"
                        className="w-full text-lg pl-4 pr-12 py-3 bg-slate-900 border-2 border-slate-700 rounded-lg text-white font-mono"
                    />
                    <button onClick={handleCopy} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-cyan-400 disabled:opacity-50 disabled:hover:text-slate-400" disabled={!password || loading}>
                        {copied ? <CheckIcon className="h-6 w-6 text-green-400" /> : <ClipboardIcon className="h-6 w-6"/>}
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="length" className="text-slate-300">Password Length</label>
                        <span className="text-cyan-400 font-bold text-lg">{options.length}</span>
                    </div>
                    <input 
                        type="range"
                        id="length"
                        min="8"
                        max="64"
                        value={options.length}
                        onChange={e => setOptions({ ...options, length: parseInt(e.target.value, 10)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors">
                        <input type="checkbox" checked={options.useLowercase} onChange={e => setOptions({...options, useLowercase: e.target.checked})} className="h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-600 focus:ring-cyan-500"/>
                        <span className="text-slate-300">Lowercase (a-z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors">
                        <input type="checkbox" checked={options.useUppercase} onChange={e => setOptions({...options, useUppercase: e.target.checked})} className="h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-600 focus:ring-cyan-500"/>
                        <span className="text-slate-300">Uppercase (A-Z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors">
                        <input type="checkbox" checked={options.useNumbers} onChange={e => setOptions({...options, useNumbers: e.target.checked})} className="h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-600 focus:ring-cyan-500"/>
                        <span className="text-slate-300">Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors">
                        <input type="checkbox" checked={options.useSymbols} onChange={e => setOptions({...options, useSymbols: e.target.checked})} className="h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-600 focus:ring-cyan-500"/>
                        <span className="text-slate-300">Symbols (!@#$)</span>
                    </label>
                </div>
                
                <button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    {loading ? 'Generating...' : 'Generate Password'}
                </button>
            </div>
        </div>
    );
};

export default GeneratorPage;
