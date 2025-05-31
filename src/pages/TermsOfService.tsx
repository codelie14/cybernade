import React from 'react';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEO 
        title="Conditions d'utilisation | Cybernade"
        description="Conditions générales d'utilisation de la plateforme Cybernade. Lisez attentivement ces conditions avant d'utiliser nos services."
        keywords="conditions utilisation, CGU, termes service, cybernade, légal"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white py-6 px-8">
              <h1 className="text-3xl font-bold">Conditions d'utilisation</h1>
              <p className="mt-2 text-white/80">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2>1. Acceptation des conditions</h2>
                <p>
                  En accédant et en utilisant la plateforme Cybernade (ci-après dénommée "la Plateforme"), vous acceptez d'être lié par les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la Plateforme.
                </p>
                
                <h2>2. Description du service</h2>
                <p>
                  Cybernade est une plateforme éducative proposant des outils de cybersécurité, notamment pour la localisation d'adresses IP, le traçage de numéros de téléphone, et d'autres outils liés à la sécurité informatique. Ces outils sont fournis uniquement à des fins éducatives et de recherche en sécurité.
                </p>
                
                <h2>3. Utilisation autorisée</h2>
                <p>
                  Vous vous engagez à utiliser la Plateforme uniquement à des fins légales et conformément aux présentes conditions. En particulier, vous acceptez de :
                </p>
                <ul>
                  <li>Ne pas utiliser la Plateforme pour des activités illégales ou malveillantes</li>
                  <li>Ne pas tenter de compromettre la sécurité d'autres systèmes informatiques sans autorisation explicite</li>
                  <li>Ne pas utiliser les outils fournis pour harceler, intimider ou porter atteinte à la vie privée d'autrui</li>
                  <li>Ne pas collecter ou stocker des données personnelles sur d'autres utilisateurs</li>
                  <li>Obtenir toutes les autorisations nécessaires avant d'utiliser nos outils sur des systèmes ou des données qui ne vous appartiennent pas</li>
                </ul>
                
                <h2>4. Limitation de responsabilité</h2>
                <p>
                  La Plateforme est fournie "telle quelle" et "selon disponibilité", sans garantie d'aucune sorte. Nous ne garantissons pas que la Plateforme sera ininterrompue, exempte d'erreurs ou sécurisée. Vous utilisez la Plateforme à vos propres risques.
                </p>
                <p>
                  En aucun cas, Cybernade ne pourra être tenu responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser la Plateforme.
                </p>
                
                <h2>5. Propriété intellectuelle</h2>
                <p>
                  Tous les contenus présents sur la Plateforme, y compris mais sans s'y limiter, les textes, graphiques, logos, icônes, images, clips audio, téléchargements numériques et compilations de données, sont la propriété de Cybernade ou de ses fournisseurs de contenu et sont protégés par les lois sur la propriété intellectuelle.
                </p>
                
                <h2>6. Modifications des conditions</h2>
                <p>
                  Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur la Plateforme. Il est de votre responsabilité de consulter régulièrement ces conditions. Votre utilisation continue de la Plateforme après la publication des modifications constitue votre acceptation de ces modifications.
                </p>
                
                <h2>7. Résiliation</h2>
                <p>
                  Nous nous réservons le droit, à notre seule discrétion, de restreindre, suspendre ou résilier votre accès à tout ou partie de la Plateforme, à tout moment et pour quelque raison que ce soit, sans préavis ni responsabilité.
                </p>
                
                <h2>8. Droit applicable</h2>
                <p>
                  Les présentes conditions sont régies et interprétées conformément aux lois en vigueur, sans égard aux principes de conflits de lois. Tout litige découlant de ces conditions ou lié à celles-ci sera soumis à la compétence exclusive des tribunaux compétents.
                </p>
                
                <h2>9. Contact</h2>
                <p>
                  Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : contact@cybernade.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService; 