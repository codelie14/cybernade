import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface IPInfo {
  ip: string;
  country_name: string;
  country_code: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  isp: string;
  timezone: string;
  org: string;
}

const IPLocator: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Correction pour les icônes Leaflet
  useEffect(() => {
    // Solution pour le problème d'icônes dans React-Leaflet
    const L = require('leaflet');
    
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ipAddress) {
      setError('Veuillez entrer une adresse IP');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Note: Dans un environnement de production, vous devriez utiliser votre propre API ou un service payant
      // Cet exemple utilise ipapi.co qui a des limites d'utilisation
      const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
      
      if (response.data.error) {
        throw new Error(response.data.reason || 'Erreur lors de la localisation de l\'IP');
      }
      
      setIpInfo({
        ip: response.data.ip,
        country_name: response.data.country_name,
        country_code: response.data.country_code,
        city: response.data.city,
        region: response.data.region,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        isp: response.data.org,
        timezone: response.data.timezone,
        org: response.data.org
      });
    } catch (err) {
      setError('Erreur lors de la localisation de l\'IP. Vérifiez l\'adresse et réessayez.');
      console.error(err);
      setIpInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Localisation d'Adresse IP</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse IP
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="ipAddress"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="Exemple: 8.8.8.8"
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 border"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded-r-md transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Recherche...' : 'Localiser'}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </form>
          </div>
          
          {ipInfo && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary text-white py-4 px-6">
                <h2 className="text-xl font-semibold">Informations sur {ipInfo.ip}</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Pays</h3>
                      <p className="mt-1 text-lg">{ipInfo.country_name} ({ipInfo.country_code})</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Ville</h3>
                      <p className="mt-1 text-lg">{ipInfo.city || 'Non disponible'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Région</h3>
                      <p className="mt-1 text-lg">{ipInfo.region || 'Non disponible'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">FAI / Organisation</h3>
                      <p className="mt-1 text-lg">{ipInfo.isp || 'Non disponible'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fuseau horaire</h3>
                      <p className="mt-1 text-lg">{ipInfo.timezone || 'Non disponible'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Coordonnées</h3>
                      <p className="mt-1 text-lg">
                        {ipInfo.latitude}, {ipInfo.longitude}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Carte OpenStreetMap avec Leaflet */}
                <div className="mt-6 h-64 rounded-lg overflow-hidden border border-gray-200">
                  <MapContainer 
                    center={[ipInfo.latitude, ipInfo.longitude]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[ipInfo.latitude, ipInfo.longitude]}>
                      <Popup>
                        <div>
                          <strong>{ipInfo.ip}</strong><br />
                          {ipInfo.city}, {ipInfo.country_name}<br />
                          {ipInfo.org}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
        </div>
      </div>
    </div>
  );
};

export default IPLocator; 