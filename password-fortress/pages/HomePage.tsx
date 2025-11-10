
import React from 'react';
import { Link } from 'react-router-dom';

// Fix: Replaced JSX.Element with React.ReactNode to resolve namespace error.
const FeatureCard: React.FC<{ title: string, description: string, icon: React.ReactNode, linkTo: string }> = ({ title, description, icon, linkTo }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transform transition-all duration-300 border border-slate-700">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mt-2 text-base text-slate-400">{description}</p>
        <Link to={linkTo} className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 font-semibold">
            Learn More &rarr;
        </Link>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <div className="space-y-16">
            <section className="text-center py-16">
                <div 
                    className="absolute inset-0 top-16 -z-10 h-[500px] w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                    Fortify Your Digital Life.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    In the digital age, a strong password is your first line of defense. Use our AI-powered tools to analyze, generate, and manage passwords that keep you secure.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/checker" className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
                        Check a Password
                    </Link>
                    <Link to="/generator" className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-transform transform hover:scale-105">
                        Generate a Password
                    </Link>
                </div>
            </section>

            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Strength Checker"
                        description="Get instant, AI-driven feedback on your password's strength, identifying weaknesses and offering improvements."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        linkTo="/checker"
                    />
                    <FeatureCard
                        title="Secure Generator"
                        description="Create complex, unpredictable passwords with customizable criteria to meet any security requirement."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                        linkTo="/generator"
                    />
                    <FeatureCard
                        title="Best Practices"
                        description="Learn the essential do's and don'ts of password security to protect all your online accounts effectively."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        linkTo="/practices"
                    />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
