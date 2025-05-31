import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEO 
        title="Politique de confidentialité | Cybernade"
        description="Politique de confidentialité de Cybernade. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles."
        keywords="politique confidentialité, protection données, RGPD, vie privée, cybernade"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white py-6 px-8">
              <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
              <p className="mt-2 text-white/80">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2>Introduction</h2>
                <p>
                  Chez Cybernade, nous accordons une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre plateforme.
                </p>
                
                <h2>1. Informations que nous collectons</h2>
                <p>Nous pouvons collecter les types d'informations suivants :</p>
                
                <h3>1.1 Informations que vous nous fournissez</h3>
                <p>
                  Lorsque vous utilisez nos outils, vous pouvez nous fournir volontairement certaines informations, telles que des adresses IP, des numéros de téléphone ou d'autres identifiants pour effectuer des recherches.
                </p>
                
                <h3>1.2 Informations collectées automatiquement</h3>
                <p>
                  Lorsque vous accédez à notre plateforme, nous pouvons collecter automatiquement certaines informations, notamment :
                </p>
                <ul>
                  <li>Informations sur l'appareil : type d'appareil, système d'exploitation, navigateur web</li>
                  <li>Informations de connexion : adresse IP, localisation géographique approximative, fournisseur d'accès Internet</li>
                  <li>Informations d'utilisation : pages visitées, temps passé sur la plateforme, actions effectuées</li>
                  <li>Cookies et technologies similaires : nous utilisons des cookies et des technologies similaires pour améliorer votre expérience</li>
                </ul>
                
                <h2>2. Comment nous utilisons vos informations</h2>
                <p>Nous utilisons les informations collectées pour :</p>
                <ul>
                  <li>Fournir, maintenir et améliorer notre plateforme</li>
                  <li>Traiter les recherches et les demandes que vous effectuez via nos outils</li>
                  <li>Comprendre comment vous utilisez notre plateforme afin de l'améliorer</li>
                  <li>Détecter, prévenir et résoudre les problèmes techniques ou de sécurité</li>
                  <li>Se conformer aux obligations légales</li>
                </ul>
                
                <h2>3. Partage de vos informations</h2>
                <p>
                  Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les circonstances suivantes :
                </p>
                <ul>
                  <li>Avec des fournisseurs de services qui nous aident à exploiter notre plateforme</li>
                  <li>Pour se conformer à la loi, à une procédure judiciaire ou à une demande gouvernementale</li>
                  <li>Pour protéger nos droits, notre propriété ou notre sécurité, ou ceux de nos utilisateurs</li>
                  <li>Dans le cadre d'une fusion, acquisition ou vente d'actifs</li>
                </ul>
                
                <h2>4. Sécurité de vos informations</h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre tout accès, altération, divulgation ou destruction non autorisés. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
                </p>
                
                <h2>5. Vos droits concernant vos données</h2>
                <p>
                  Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos informations personnelles, notamment :
                </p>
                <ul>
                  <li>Le droit d'accéder à vos informations personnelles</li>
                  <li>Le droit de rectifier ou de mettre à jour vos informations inexactes ou incomplètes</li>
                  <li>Le droit de supprimer vos informations personnelles</li>
                  <li>Le droit de restreindre ou de vous opposer au traitement de vos informations</li>
                  <li>Le droit à la portabilité des données</li>
                  <li>Le droit de retirer votre consentement</li>
                </ul>
                <p>
                  Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée dans la section "Contact" ci-dessous.
                </p>
                
                <h2>6. Conservation des données</h2>
                <p>
                  Nous conservons vos informations personnelles aussi longtemps que nécessaire pour atteindre les objectifs décrits dans cette politique de confidentialité, sauf si une période de conservation plus longue est requise ou permise par la loi.
                </p>
                
                <h2>7. Enfants</h2>
                <p>
                  Notre plateforme n'est pas destinée aux enfants de moins de 16 ans, et nous ne collectons pas sciemment des informations personnelles auprès d'enfants de moins de 16 ans. Si vous êtes un parent ou un tuteur et que vous pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter.
                </p>
                
                <h2>8. Modifications de cette politique</h2>
                <p>
                  Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "dernière mise à jour".
                </p>
                
                <h2>9. Contact</h2>
                <p>
                  Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : privacy@cybernade.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 