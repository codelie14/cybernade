import React, { useState } from 'react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ShareButtons from '../components/ShareButtons';

type TrackerType = 'phone' | 'imei';

interface PhoneInfo {
  number?: string;
  imei?: string;
  country_name?: string;
  country_code?: string;
  carrier?: string;
  line_type?: string;
  location?: string;
  valid?: boolean;
  device_details?: {
    brand?: string;
    model?: string;
    manufacture_date?: string;
  };
}

const PhoneTracker: React.FC = () => {
  const [trackerType, setTrackerType] = useState<TrackerType>('phone');
  const [inputValue, setInputValue] = useState('');
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue) {
      setError(`Veuillez entrer un ${trackerType === 'phone' ? 'numéro de téléphone' : 'IMEI'}`);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Note: Ceci est une simulation car nous n'avons pas d'API réelle pour cette fonctionnalité
      // Dans un environnement de production, vous devriez utiliser une API appropriée
      
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (trackerType === 'phone') {
        // Simulation de données pour un numéro de téléphone
        setPhoneInfo({
          number: inputValue,
          country_name: 'France',
          country_code: 'FR',
          carrier: 'Orange',
          line_type: 'Mobile',
          location: 'Paris',
          valid: true
        });
      } else {
        // Simulation de données pour un IMEI
        setPhoneInfo({
          imei: inputValue,
          device_details: {
            brand: 'Samsung',
            model: 'Galaxy S21',
            manufacture_date: '2021-01-15'
          },
          valid: true
        });
      }

      // Ajouter à l'historique de recherche
      if (!searchHistory.includes(inputValue)) {
        setSearchHistory(prev => [inputValue, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(`Erreur lors de la recherche. Vérifiez le ${trackerType === 'phone' ? 'numéro' : 'IMEI'} et réessayez.`);
      console.error(err);
      setPhoneInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Données structurées pour le SEO
  const schemaData = {
    '@type': 'WebApplication',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    }
  };

  return (
    <>
      <SEO 
        title={`${trackerType === 'phone' ? 'Traçage de Numéro de Téléphone' : 'Vérification d\'IMEI'} | Cybernade`}
        description={`Outil gratuit pour ${trackerType === 'phone' ? 'localiser un numéro de téléphone et obtenir des informations sur son propriétaire' : 'vérifier un numéro IMEI et obtenir des détails sur l\'appareil'}.`}
        keywords={`${trackerType === 'phone' ? 'traçage téléphone, localisation numéro, géolocalisation téléphone' : 'vérification IMEI, validité IMEI, information appareil'}, cybersécurité, outil gratuit`}
        schemaType="WebApplication"
        schemaData={schemaData}
      />

      <div className="min-h-screen bg-gray-50 py-12 fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              {trackerType === 'phone' ? 'Traçage de Numéro de Téléphone' : 'Vérification d\'IMEI'}
            </h1>
            
            <p className="text-center text-gray-600 mb-8">
              {trackerType === 'phone' 
                ? 'Obtenez des informations détaillées sur un numéro de téléphone, y compris la localisation et l\'opérateur.'
                : 'Vérifiez si un appareil mobile est authentique, volé ou perdu grâce à son numéro IMEI.'}
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => setTrackerType('phone')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                      trackerType === 'phone'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    aria-label="Sélectionner le traçage par numéro de téléphone"
                  >
                    Numéro de Téléphone
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackerType('imei')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                      trackerType === 'imei'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    aria-label="Sélectionner la vérification par IMEI"
                  >
                    IMEI
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700 mb-1">
                    {trackerType === 'phone' ? 'Numéro de Téléphone' : 'Numéro IMEI'}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="inputValue"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={trackerType === 'phone' ? 'Ex: +33612345678' : 'Ex: 123456789012345'}
                      className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 border"
                      aria-describedby="input-help"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-l-none rounded-r-md"
                    >
                      {loading ? 'Recherche...' : 'Rechercher'}
                    </Button>
                  </div>
                  <p id="input-help" className="mt-1 text-xs text-gray-500">
                    {trackerType === 'phone' 
                      ? 'Format international recommandé, ex: +33612345678' 
                      : 'L\'IMEI est généralement composé de 15 chiffres et peut être trouvé en composant *#06#'}
                  </p>
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
              </form>
              
              {/* Historique de recherche */}
              {searchHistory.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recherches récentes :</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(item)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 flex justify-center">
                <LoadingSpinner size="large" text={`Recherche d'informations en cours...`} />
              </div>
            ) : phoneInfo && phoneInfo.valid ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary text-white py-4 px-6">
                  <h2 className="text-xl font-semibold">
                    {trackerType === 'phone' 
                      ? `Informations sur ${phoneInfo.number}` 
                      : `Informations sur l'IMEI ${phoneInfo.imei}`}
                  </h2>
                </div>
                
                <div className="p-6">
                  {trackerType === 'phone' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Pays</h3>
                          <p className="mt-1 text-lg">{phoneInfo.country_name} ({phoneInfo.country_code})</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Opérateur</h3>
                          <p className="mt-1 text-lg">{phoneInfo.carrier || 'Non disponible'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Type de Ligne</h3>
                          <p className="mt-1 text-lg">{phoneInfo.line_type || 'Non disponible'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Localisation</h3>
                          <p className="mt-1 text-lg">{phoneInfo.location || 'Non disponible'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Marque</h3>
                          <p className="mt-1 text-lg">{phoneInfo.device_details?.brand || 'Non disponible'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Modèle</h3>
                          <p className="mt-1 text-lg">{phoneInfo.device_details?.model || 'Non disponible'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Date de Fabrication</h3>
                          <p className="mt-1 text-lg">{phoneInfo.device_details?.manufacture_date || 'Non disponible'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                          <p className="mt-1 text-lg flex items-center">
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Appareil valide
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Note d'information */}
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          {trackerType === 'phone' 
                            ? 'Note: Ces informations sont basées sur les données publiques disponibles et peuvent ne pas être à jour.' 
                            : 'Note: La vérification IMEI permet de savoir si un appareil a été déclaré volé ou perdu.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            {phoneInfo && phoneInfo.valid && (
              <div className="mt-4 flex justify-end">
                <ShareButtons 
                  title={`Résultats ${trackerType === 'phone' ? 'du traçage de numéro' : 'de la vérification IMEI'} | Cybernade`}
                  description={`Découvrez les informations sur ${trackerType === 'phone' ? `le numéro ${phoneInfo.number}` : `l'IMEI ${phoneInfo.imei}`}`}
                />
              </div>
            )}
            
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Cet outil est fourni à des fins éducatives uniquement. L'utilisation de cet outil pour traquer des individus sans leur consentement peut être illégale dans certaines juridictions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">FAQ - Questions fréquentes</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Comment fonctionne le traçage de numéro de téléphone ?</h3>
                  <p className="mt-1 text-gray-600">
                    Notre outil utilise des bases de données publiques pour identifier le pays, l'opérateur et la région approximative d'un numéro de téléphone. Cette technologie ne permet pas de géolocalisation précise en temps réel.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Qu'est-ce qu'un numéro IMEI ?</h3>
                  <p className="mt-1 text-gray-600">
                    L'IMEI (International Mobile Equipment Identity) est un numéro unique de 15 chiffres attribué à chaque appareil mobile. Il permet d'identifier de manière unique un téléphone et peut être utilisé pour le bloquer en cas de vol.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Ces informations sont-elles fiables à 100% ?</h3>
                  <p className="mt-1 text-gray-600">
                    Non, les informations fournies sont basées sur des données publiques qui peuvent ne pas être à jour. Les résultats doivent être considérés comme indicatifs et non comme une source de vérité absolue.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-medium mb-3">Partagez cet outil</h3>
              <div className="flex justify-center">
                <ShareButtons 
                  title={`${trackerType === 'phone' ? 'Traçage de Numéro de Téléphone' : 'Vérification d\'IMEI'} | Cybernade`}
                  description={`Outil gratuit pour ${trackerType === 'phone' ? 'localiser un numéro de téléphone' : 'vérifier un numéro IMEI'}`}
                />
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                Note: Dans cette démo, les données affichées sont simulées. Dans une application réelle, 
                ces informations seraient obtenues via des API spécialisées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneTracker; 