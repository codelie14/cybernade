import React from 'react';
import SEO from '../components/SEO';

const Disclaimer: React.FC = () => {
  return (
    <>
      <SEO 
        title="Avertissement légal | Cybernade"
        description="Avertissement légal concernant l'utilisation de la plateforme Cybernade et de ses outils de cybersécurité."
        keywords="avertissement légal, disclaimer, cybernade, cybersécurité, utilisation responsable"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white py-6 px-8">
              <h1 className="text-3xl font-bold">Avertissement légal</h1>
              <p className="mt-2 text-white/80">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important :</strong> Veuillez lire attentivement cet avertissement avant d'utiliser la plateforme Cybernade et ses outils.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h2>Finalité éducative</h2>
                <p>
                  Cybernade est une plateforme conçue exclusivement à des fins éducatives et de sensibilisation à la cybersécurité. Les outils fournis sont destinés à aider les utilisateurs à comprendre les concepts de sécurité informatique, à tester leurs propres systèmes, et à se protéger contre d'éventuelles menaces.
                </p>
                
                <h2>Utilisation responsable</h2>
                <p>
                  En utilisant Cybernade, vous vous engagez à utiliser nos outils de manière responsable et légale. L'utilisation de ces outils pour des activités malveillantes, illégales ou non autorisées est strictement interdite et peut entraîner des poursuites judiciaires.
                </p>
                
                <h2>Restrictions d'utilisation</h2>
                <p>
                  Il est strictement interdit d'utiliser les outils de Cybernade pour :
                </p>
                <ul>
                  <li>Accéder sans autorisation à des systèmes, réseaux ou données appartenant à des tiers</li>
                  <li>Effectuer des tests d'intrusion sur des systèmes sans autorisation explicite</li>
                  <li>Collecter des informations personnelles sur des individus sans leur consentement</li>
                  <li>Harceler, intimider ou porter atteinte à la vie privée d'autrui</li>
                  <li>Toute activité qui viole les lois locales, nationales ou internationales</li>
                </ul>
                
                <h2>Absence de garantie</h2>
                <p>
                  Les outils et informations fournis par Cybernade sont proposés "tels quels", sans garantie d'aucune sorte, expresse ou implicite. Nous ne garantissons pas l'exactitude, la fiabilité ou l'exhaustivité des informations fournies par nos outils.
                </p>
                
                <h2>Limitation de responsabilité</h2>
                <p>
                  Cybernade et ses développeurs ne pourront en aucun cas être tenus responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser nos outils, même si nous avons été informés de la possibilité de tels dommages.
                </p>
                
                <h2>Conformité légale</h2>
                <p>
                  Il est de votre responsabilité de vous assurer que votre utilisation de Cybernade est conforme à toutes les lois et réglementations applicables dans votre juridiction. Les lois concernant la sécurité informatique, la vie privée et la protection des données varient selon les pays et les régions.
                </p>
                
                <h2>Signalement d'abus</h2>
                <p>
                  Si vous avez connaissance d'une utilisation abusive de notre plateforme, veuillez nous en informer immédiatement à l'adresse suivante : abuse@cybernade.com. Nous prendrons les mesures appropriées pour remédier à la situation.
                </p>
                
                <h2>Modifications de cet avertissement</h2>
                <p>
                  Nous nous réservons le droit de modifier cet avertissement à tout moment. Les modifications entreront en vigueur dès leur publication sur la plateforme. Il est de votre responsabilité de consulter régulièrement cet avertissement pour prendre connaissance des éventuelles modifications.
                </p>
                
                <h2>Contact</h2>
                <p>
                  Pour toute question concernant cet avertissement légal, veuillez nous contacter à l'adresse suivante : legal@cybernade.com
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Rappel :</strong> L'utilisation de nos outils sur des systèmes ou des données qui ne vous appartiennent pas sans autorisation explicite est illégale et peut entraîner des sanctions pénales sévères.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer; 