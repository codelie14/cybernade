import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const SecurityTools: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'password-analyzer',
      title: 'Analyseur de Mot de Passe',
      description: 'Vérifiez la force de vos mots de passe et obtenez des recommandations pour les améliorer.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/password-analyzer'
    },
    {
      id: 'password-generator',
      title: 'Générateur de Mot de Passe',
      description: 'Créez des mots de passe forts et sécurisés avec des options personnalisables.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/password-generator'
    },
    {
      id: 'data-breach-checker',
      title: 'Vérificateur de Fuite de Données',
      description: 'Vérifiez si votre adresse e-mail a été compromise dans des fuites de données connues.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/data-breach-checker'
    },
    {
      id: 'vulnerability-scanner',
      title: 'Analyseur de Vulnérabilités',
      description: 'Analysez les vulnérabilités de sécurité potentielles d\'un site web ou d\'une application.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/vulnerability-scanner'
    },
    {
      id: 'file-encryption',
      title: 'Cryptage de Fichiers',
      description: 'Chiffrez et déchiffrez vos fichiers en toute sécurité, directement dans votre navigateur.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M8 11a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/file-encryption'
    },
    {
      id: 'ssl-cert-manager',
      title: 'Gestionnaire de Certificats SSL',
      description: 'Vérifiez et analysez les certificats SSL de n\'importe quel site web.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/ssl-cert-manager'
    },
    {
      id: 'network-analyzer',
      title: 'Analyseur de Trafic Réseau',
      description: 'Analysez votre connexion réseau et identifiez les problèmes potentiels.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/network-analyzer'
    },
    {
      id: 'malware-scanner',
      title: 'Scanner de Malware',
      description: 'Analysez vos fichiers pour détecter les logiciels malveillants et protégez votre système.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
        </svg>
      ),
      link: '/security-tools/malware-scanner'
    }
  ];

  return (
    <>
      <SEO 
        title="Outils de Sécurité | Cybernade"
        description="Découvrez nos outils de sécurité informatique gratuits pour protéger vos données et renforcer votre sécurité en ligne."
        keywords="outils sécurité, cybersécurité, protection données, sécurité en ligne, outils gratuits"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Outils de Sécurité</h1>
            <p className="text-center text-gray-600 mb-8">
              Des outils gratuits pour vous aider à protéger vos données et renforcer votre sécurité en ligne.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <Link 
                  key={tool.id}
                  to={tool.link}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex"
                >
                  <div className="mr-4 flex-shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Pourquoi la sécurité informatique est-elle importante ?</h2>
              
              <div className="space-y-4">
                <p>
                  La sécurité informatique est devenue un enjeu majeur dans notre monde numérique. 
                  Avec l'augmentation des cyberattaques et des violations de données, il est essentiel 
                  de prendre des mesures pour protéger vos informations personnelles et professionnelles.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Menaces courantes</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Phishing et ingénierie sociale</li>
                      <li>Logiciels malveillants (malware)</li>
                      <li>Rançongiciels (ransomware)</li>
                      <li>Vol d'identité</li>
                      <li>Fuites de données</li>
                      <li>Attaques par force brute</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Bonnes pratiques</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Utilisez des mots de passe forts et uniques</li>
                      <li>Activez l'authentification à deux facteurs</li>
                      <li>Mettez à jour régulièrement vos logiciels</li>
                      <li>Soyez vigilant face aux emails suspects</li>
                      <li>Chiffrez vos données sensibles</li>
                      <li>Effectuez des sauvegardes régulières</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-4">
                  Nos outils de sécurité sont conçus pour vous aider à mettre en œuvre ces bonnes pratiques 
                  et à renforcer votre sécurité en ligne. Ils sont gratuits, faciles à utiliser et ne 
                  nécessitent pas d'installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityTools; 