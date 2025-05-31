import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
          <p className="text-gray-600 mb-6">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Page précédente
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Vous pourriez être intéressé par :</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/ip-locator" className="text-accent hover:text-primary transition-colors">
                Localisation IP
              </Link>
            </li>
            <li>
              <Link to="/phone-tracker" className="text-accent hover:text-primary transition-colors">
                Traçage Téléphone
              </Link>
            </li>
            <li>
              <Link to="/security-tools" className="text-accent hover:text-primary transition-colors">
                Outils de Sécurité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 