
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 009 2.056 11.955 11.955 0 009-2.056c0-1.896-.36-3.732-.982-5.464z" />
    </svg>
);


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const activeLinkClasses = "bg-slate-700 text-white";
    const inactiveLinkClasses = "text-slate-300 hover:bg-slate-800 hover:text-white";

    const getNavLinkClass = ({ isActive }: {isActive: boolean}) => 
        `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;
    
    const navLinks = (
        <>
            <NavLink to="/" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/checker" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Checker</NavLink>
            <NavLink to="/generator" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Generator</NavLink>
            <NavLink to="/practices" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Best Practices</NavLink>
            <NavLink to="/why-it-matters" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Why It Matters</NavLink>
        </>
    );

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <ShieldIcon />
                            <span className="text-xl font-bold text-white">Password Fortress</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
