
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CheckerPage from './pages/CheckerPage';
import GeneratorPage from './pages/GeneratorPage';
import PracticesPage from './pages/PracticesPage';
import WhyItMattersPage from './pages/WhyItMattersPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-300 selection:text-cyan-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checker" element={<CheckerPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/practices" element={<PracticesPage />} />
            <Route path="/why-it-matters" element={<WhyItMattersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
