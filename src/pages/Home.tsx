import React from 'react';
import { Link } from 'react-router-dom';
import UserInfoCard from '../components/UserInfoCard';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Localisation IP',
      description: 'Localisez et obtenez des informations détaillées sur n\'importe quelle adresse IP.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/ip-locator'
    },
    {
      id: 2,
      title: 'Traçage Téléphone',
      description: 'Obtenez des informations sur un numéro de téléphone ou un IMEI.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      link: '/phone-tracker'
    },
    {
      id: 3,
      title: 'Outils de Sécurité',
      description: 'Suite d\'outils pour analyser et renforcer la sécurité de vos systèmes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      link: '/security-tools'
    },
    {
      id: 4,
      title: 'Pentesting',
      description: 'Outils pour effectuer des tests de pénétration et évaluer la sécurité.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      link: '/pentest'
    }
  ];

  return (
    <>
      <SEO 
        title="Cybernade - Plateforme de Cybersécurité"
        description="Cybernade est une plateforme complète d'outils de cybersécurité pour la localisation IP, le traçage téléphonique et l'analyse de sécurité."
        keywords="cybersécurité, localisation IP, traçage téléphone, outils sécurité, pentesting"
      />
      
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bienvenue sur Cybernade</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Votre plateforme complète d'outils de cybersécurité pour la localisation, 
              l'analyse et le renforcement de la sécurité informatique.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/ip-locator" className="bg-accent hover:bg-accent/80 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Commencer
              </Link>
              <Link to="/about" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg border border-white transition-colors">
                En savoir plus
              </Link>
            </div>
          </div>
        </section>

        {/* User Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Vos Informations en Temps Réel</h2>
            <UserInfoCard className="max-w-5xl mx-auto" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Fonctionnalités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map(feature => (
                <div key={feature.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-accent hover:text-primary font-medium flex items-center">
                    Explorer
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à renforcer votre sécurité ?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explorez nos outils de cybersécurité et commencez à protéger vos systèmes dès aujourd'hui.
            </p>
            <Link to="/security-tools" className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Découvrir les outils
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-2">Avertissement</h3>
              <p className="text-gray-700">
                Cette plateforme est conçue uniquement à des fins éducatives et professionnelles. 
                L'utilisation des outils fournis doit se faire dans le respect des lois en vigueur 
                et avec l'autorisation appropriée. Les développeurs ne sont pas responsables de 
                toute utilisation abusive de cette plateforme.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 