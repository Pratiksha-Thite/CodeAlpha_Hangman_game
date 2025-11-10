
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto py-4 px-4 sm:px-6">
        <p className="text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Password Fortress. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
