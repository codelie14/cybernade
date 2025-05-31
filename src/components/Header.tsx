import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-secondary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-accent">Cybernade</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
          <Link to="/ip-locator" className="hover:text-accent transition-colors">Localisation IP</Link>
          <Link to="/phone-tracker" className="hover:text-accent transition-colors">Traçage Téléphone</Link>
          <Link to="/security-tools" className="hover:text-accent transition-colors">Outils de Sécurité</Link>
          <Link to="/pentest" className="hover:text-accent transition-colors">Pentesting</Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-secondary border-t border-gray-700 px-4 py-2">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-accent transition-colors py-2">Accueil</Link>
            <Link to="/ip-locator" className="hover:text-accent transition-colors py-2">Localisation IP</Link>
            <Link to="/phone-tracker" className="hover:text-accent transition-colors py-2">Traçage Téléphone</Link>
            <Link to="/security-tools" className="hover:text-accent transition-colors py-2">Outils de Sécurité</Link>
            <Link to="/pentest" className="hover:text-accent transition-colors py-2">Pentesting</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header; 