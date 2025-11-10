
import React from 'react';

const RiskCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
        <p className="text-slate-300">{children}</p>
    </div>
);

const WhyItMattersPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">Why Strong Passwords Matter</h1>
            <p className="text-slate-400 text-center mb-12">In our interconnected world, your password is the key to your digital kingdom. Understanding the risks of weak passwords is the first step to better protection.</p>
            
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">The Digital Domino Effect</h2>
                    <p className="text-slate-300">
                        Think of your online accounts—email, social media, banking, shopping—as a line of dominos. A single weak or reused password is like a wobbly domino at the start of the line. If it falls, it can trigger a chain reaction, giving an attacker access to one account after another. This is how a small breach on an insignificant website can lead to major financial loss or identity theft.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <RiskCard title="Identity Theft">
                        Your email is often the hub of your digital life. If an attacker gets in, they can reset passwords for your other accounts, access personal documents, and steal enough information to impersonate you, apply for credit in your name, or access your financial accounts.
                    </RiskCard>
                    <RiskCard title="Financial Loss">
                        Direct access to your banking, investment, or shopping accounts can lead to immediate financial theft. Attackers can transfer money, make fraudulent purchases, or steal your payment information for use on the dark web.
                    </RiskCard>
                    <RiskCard title="Reputation Damage">
                        Compromised social media or email accounts can be used to send spam, scams, or malicious content to your contacts. This can damage your personal and professional reputation, and spread malware to friends, family, and colleagues.
                    </RiskCard>
                    <RiskCard title="Data Ransom & Blackmail">
                        Attackers can steal sensitive personal photos, documents, or messages and then threaten to release them publicly unless you pay a ransom. A strong password is a critical barrier against this kind of digital extortion.
                    </RiskCard>
                </div>
                
                <div className="bg-cyan-900/20 border border-cyan-500/30 p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-white">Your Security is in Your Hands</h3>
                    <p className="mt-2 text-slate-300 max-w-2xl mx-auto">
                        The good news is that protecting yourself is straightforward. By using the tools and knowledge on this site—creating unique, complex passwords for each account and storing them securely—you build a strong fortress around your digital life. It's a small effort for a massive increase in personal security and peace of mind.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyItMattersPage;
