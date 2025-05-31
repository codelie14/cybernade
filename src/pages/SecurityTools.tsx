import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  category: string;
}

const SecurityTools: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const tools: Tool[] = [
    {
      id: 1,
      title: 'Analyseur de Mot de Passe',
      description: 'Vérifiez la force de vos mots de passe et identifiez les vulnérabilités potentielles.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      link: '/security-tools/password-analyzer',
      category: 'authentication'
    },
    {
      id: 2,
      title: 'Générateur de Mot de Passe',
      description: 'Créez des mots de passe forts et aléatoires pour sécuriser vos comptes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      link: '/security-tools/password-generator',
      category: 'authentication'
    },
    {
      id: 3,
      title: 'Vérificateur de Fuite de Données',
      description: 'Vérifiez si vos informations personnelles ont été compromises dans des fuites de données connues.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      link: '/security-tools/data-breach-checker',
      category: 'privacy'
    },
    {
      id: 4,
      title: 'Analyseur de Vulnérabilités',
      description: 'Identifiez les vulnérabilités potentielles dans votre système ou votre réseau.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/security-tools/vulnerability-scanner',
      category: 'network'
    },
    {
      id: 5,
      title: 'Cryptage de Fichiers',
      description: 'Chiffrez vos fichiers sensibles pour les protéger contre les accès non autorisés.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      link: '/security-tools/file-encryption',
      category: 'encryption'
    },
    {
      id: 6,
      title: 'Gestionnaire de Certificats SSL',
      description: 'Vérifiez et gérez les certificats SSL pour sécuriser vos connexions web.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      link: '/security-tools/ssl-certificate-manager',
      category: 'encryption'
    },
    {
      id: 7,
      title: 'Analyseur de Trafic Réseau',
      description: 'Surveillez et analysez le trafic réseau pour détecter les activités suspectes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/security-tools/network-traffic-analyzer',
      category: 'network'
    },
    {
      id: 8,
      title: 'Scanner de Malware',
      description: 'Détectez et supprimez les logiciels malveillants de votre système.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      link: '/security-tools/malware-scanner',
      category: 'antivirus'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'authentication', name: 'Authentification' },
    { id: 'privacy', name: 'Confidentialité' },
    { id: 'network', name: 'Réseau' },
    { id: 'encryption', name: 'Chiffrement' },
    { id: 'antivirus', name: 'Antivirus' }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Outils de Sécurité Informatique</h1>
        
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-primary mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Link to={tool.link} className="text-accent hover:text-primary font-medium flex items-center">
                  Accéder à l'outil
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coming Soon Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-6">Bientôt Disponible</h2>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">
              Nous travaillons constamment à l'ajout de nouveaux outils pour renforcer votre sécurité informatique.
              Revenez bientôt pour découvrir nos dernières fonctionnalités.
            </p>
            <div className="flex justify-center space-x-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Firewall Personnel</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">VPN Sécurisé</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Gestionnaire de Mots de Passe</span>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Ces outils sont fournis à des fins éducatives et de protection personnelle uniquement. 
                Assurez-vous de respecter toutes les lois et réglementations applicables lors de leur utilisation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTools; 