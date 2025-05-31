import React, { useState, useEffect } from 'react';
import Button from './Button';

interface ConsentSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    necessary: true,
    functional: false,
    analytics: false,
    advertising: false
  });

  useEffect(() => {
    // Vérifier si le consentement est déjà stocké
    const savedConsent = localStorage.getItem('cybernade_consent');
    if (!savedConsent) {
      // Si pas de consentement stocké, afficher la bannière après un court délai
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000); // Délai plus long pour éviter les problèmes au chargement initial
      return () => clearTimeout(timer);
    } else {
      try {
        // Si le consentement est stocké, charger les paramètres
        setConsentSettings(JSON.parse(savedConsent));
      } catch (e) {
        console.error('Erreur lors de la lecture du consentement:', e);
        // Ne pas afficher la bannière en cas d'erreur pour éviter les problèmes
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent: ConsentSettings = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true
    };
    saveConsent(allConsent);
  };

  const handleAcceptSelected = () => {
    saveConsent(consentSettings);
  };

  const handleRejectAll = () => {
    const minimalConsent: ConsentSettings = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false
    };
    saveConsent(minimalConsent);
  };

  const saveConsent = (settings: ConsentSettings) => {
    try {
      // Enregistrer les paramètres dans le localStorage
      localStorage.setItem('cybernade_consent', JSON.stringify(settings));
      
      // Mettre à jour la variable globale si elle existe
      if (typeof window !== 'undefined' && window.cybernade_consent) {
        window.cybernade_consent = settings;
      }
    } catch (e) {
      console.error('Erreur lors de l\'enregistrement du consentement:', e);
    }
    
    // Fermer la bannière et le modal
    setShowBanner(false);
    setShowModal(false);
  };

  const handleToggleSetting = (key: keyof ConsentSettings) => {
    if (key === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setConsentSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Version simplifiée du rendu pour éviter les problèmes potentiels
  if (!showBanner && !showModal) {
    return (
      <button 
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="Paramètres des cookies"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  if (showBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Nous respectons votre vie privée</h3>
              <p className="text-gray-600 text-sm">
                Nous utilisons des cookies pour améliorer votre expérience.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="small" onClick={() => setShowModal(true)}>
                Paramètres
              </Button>
              <Button variant="outline" size="small" onClick={handleRejectAll}>
                Refuser
              </Button>
              <Button size="small" onClick={handleAcceptAll}>
                Accepter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Version simplifiée du modal
  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Paramètres des cookies</h2>
            
            <div className="flex flex-wrap gap-2 justify-end pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button variant="outline" onClick={handleRejectAll}>
                Refuser tout
              </Button>
              <Button onClick={handleAcceptAll}>
                Accepter tout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CookieConsent;

// Étendre l'interface Window pour TypeScript
declare global {
  interface Window {
    cybernade_consent?: {
      necessary: boolean;
      functional: boolean;
      analytics: boolean;
      advertising: boolean;
    };
  }
} 