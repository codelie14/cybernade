import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Cybernade</h3>
            <p className="text-sm text-gray-300">
              Plateforme de cybersécurité offrant des outils pour les professionnels 
              et les passionnés de sécurité informatique.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link to="/ip-locator" className="hover:text-accent transition-colors">Localisation IP</Link></li>
              <li><Link to="/phone-tracker" className="hover:text-accent transition-colors">Traçage Téléphone</Link></li>
              <li><Link to="/security-tools" className="hover:text-accent transition-colors">Outils de Sécurité</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Mentions Légales</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-accent transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/disclaimer" className="hover:text-accent transition-colors">Avertissement</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cybernade. Tous droits réservés.</p>
          <p className="mt-2">Cette plateforme est conçue uniquement à des fins éducatives et professionnelles.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 