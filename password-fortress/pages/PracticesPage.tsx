
import React from 'react';

const PracticeItem: React.FC<{ title: string, children: React.ReactNode, isGood: boolean }> = ({ title, children, isGood }) => {
    const icon = isGood ?
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> :
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
    
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-slate-400">{children}</p>
            </div>
        </div>
    );
};

const PracticesPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">Password Security Best Practices</h1>
            <p className="text-slate-400 text-center mb-12">Follow these guidelines to create and maintain strong passwords that protect your digital identity.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 bg-slate-800/40 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-2xl font-bold text-green-400 border-b-2 border-green-400/30 pb-2">The Do's</h2>
                    <PracticeItem title="Go for Length and Complexity" isGood={true}>
                        Aim for at least 12-16 characters. A strong password is a mix of uppercase letters, lowercase letters, numbers, and symbols.
                    </PracticeItem>
                    <PracticeItem title="Use a Password Manager" isGood={true}>
                        These tools generate, store, and auto-fill unique, complex passwords for every site, so you only have to remember one master password.
                    </PracticeItem>
                    <PracticeItem title="Enable Two-Factor Authentication (2FA)" isGood={true}>
                        2FA adds a crucial second layer of security. Even if someone steals your password, they can't access your account without your phone or other device.
                    </PracticeItem>
                    <PracticeItem title="Change Passwords After a Breach" isGood={true}>
                        If you hear a service you use has been compromised, change your password there immediately, and on any other site where you used the same one.
                    </PracticeItem>
                </div>

                <div className="space-y-6 bg-slate-800/40 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-2xl font-bold text-red-400 border-b-2 border-red-400/30 pb-2">The Don'ts</h2>
                    <PracticeItem title="Don't Reuse Passwords" isGood={false}>
                        Using the same password across multiple websites is a major risk. If one site is breached, attackers will try that password everywhere.
                    </PracticeItem>
                    <PracticeItem title="Don't Use Personal Information" isGood={false}>
                        Avoid names, birthdays, anniversaries, pet names, or addresses. This information is often public and easy for attackers to guess.
                    </PracticeItem>
                    <PracticeItem title="Don't Use Common Words or Patterns" isGood={false}>
                        Hackers use "dictionary attacks" with lists of common words and substitutions (like 'p@ssw0rd'). Avoid sequential characters ('12345') or keyboard patterns ('qwerty').
                    </PracticeItem>
                     <PracticeItem title="Don't Share Your Passwords" isGood={false}>
                        Never send passwords via email, text, or messenger. If you need to share access, use a password manager's secure sharing feature.
                    </PracticeItem>
                </div>
            </div>
        </div>
    );
};

export default PracticesPage;
