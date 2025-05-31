import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface UserInfoCardProps {
  className?: string;
}

interface UserInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string; // Fournisseur d'accès Internet
  asn: string; // Autonomous System Number
  browser: string;
  os: string;
  device: string;
  isMobile: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ className = '' }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        
        // Récupérer l'adresse IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        // Récupérer les informations de localisation
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoResponse.json();
        
        if (geoData.error) {
          throw new Error(geoData.reason);
        }
        
        // Détecter le navigateur et l'OS
        const userAgent = navigator.userAgent;
        const browserInfo = detectBrowser(userAgent);
        const osInfo = detectOS(userAgent);
        const deviceInfo = detectDevice(userAgent);
        
        setUserInfo({
          ip,
          city: geoData.city || 'Non disponible',
          region: geoData.region || 'Non disponible',
          country_name: geoData.country_name || 'Non disponible',
          postal: geoData.postal || 'Non disponible',
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          timezone: geoData.timezone || 'Non disponible',
          org: geoData.org || 'Non disponible',
          asn: geoData.asn || 'Non disponible',
          browser: browserInfo,
          os: osInfo,
          device: deviceInfo,
          isMobile: /Mobi|Android/i.test(userAgent)
        });
      } catch (err) {
        console.error('Erreur lors de la récupération des informations utilisateur:', err);
        setError('Impossible de récupérer vos informations. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Fonction pour détecter le navigateur
  const detectBrowser = (userAgent: string): string => {
    if (userAgent.indexOf("Firefox") > -1) return "Mozilla Firefox";
    if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Internet";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    if (userAgent.indexOf("Edge") > -1) return "Microsoft Edge (Legacy)";
    if (userAgent.indexOf("Edg") > -1) return "Microsoft Edge (Chromium)";
    if (userAgent.indexOf("Chrome") > -1) return "Google Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Apple Safari";
    return "Navigateur inconnu";
  };

  // Fonction pour détecter l'OS
  const detectOS = (userAgent: string): string => {
    if (userAgent.indexOf("Windows NT 10.0") > -1) return "Windows 10/11";
    if (userAgent.indexOf("Windows NT 6.3") > -1) return "Windows 8.1";
    if (userAgent.indexOf("Windows NT 6.2") > -1) return "Windows 8";
    if (userAgent.indexOf("Windows NT 6.1") > -1) return "Windows 7";
    if (userAgent.indexOf("Windows NT 6.0") > -1) return "Windows Vista";
    if (userAgent.indexOf("Windows NT 5.1") > -1) return "Windows XP";
    if (userAgent.indexOf("Windows NT 5.0") > -1) return "Windows 2000";
    if (userAgent.indexOf("Mac") > -1) return "MacOS";
    if (userAgent.indexOf("X11") > -1) return "UNIX";
    if (userAgent.indexOf("Linux") > -1) return "Linux";
    if (userAgent.indexOf("Android") > -1) return "Android";
    if (userAgent.indexOf("iPhone") > -1) return "iOS";
    if (userAgent.indexOf("iPad") > -1) return "iPadOS";
    return "Système d'exploitation inconnu";
  };

  // Fonction pour détecter le type d'appareil
  const detectDevice = (userAgent: string): string => {
    if (userAgent.indexOf("iPhone") > -1) return "iPhone";
    if (userAgent.indexOf("iPad") > -1) return "iPad";
    if (userAgent.indexOf("Android") > -1 && userAgent.indexOf("Mobile") > -1) return "Smartphone Android";
    if (userAgent.indexOf("Android") > -1 && userAgent.indexOf("Mobile") === -1) return "Tablette Android";
    if (/Windows NT/.test(userAgent) || /Macintosh/.test(userAgent) || /X11/.test(userAgent) || /Linux/.test(userAgent)) return "Ordinateur";
    return "Appareil inconnu";
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <LoadingSpinner size="medium" text="Récupération de vos informations..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-primary text-white py-4 px-6">
        <h2 className="text-xl font-semibold">Vos Informations</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations sur l'appareil */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Informations Système</h3>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Navigateur</p>
              <p className="font-medium">{userInfo.browser}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Système d'exploitation</p>
              <p className="font-medium">{userInfo.os}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Type d'appareil</p>
              <p className="font-medium">{userInfo.device}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Résolution d'écran</p>
              <p className="font-medium">{window.screen.width} x {window.screen.height} pixels</p>
            </div>
          </div>
          
          {/* Informations de connexion */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Informations de Connexion</h3>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Adresse IP</p>
              <p className="font-medium">{userInfo.ip}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Fournisseur d'accès</p>
              <p className="font-medium">{userInfo.org}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">ASN</p>
              <p className="font-medium">{userInfo.asn}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Fuseau horaire</p>
              <p className="font-medium">{userInfo.timezone}</p>
            </div>
          </div>
        </div>
        
        {/* Informations de localisation */}
        <div className="mt-6">
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Localisation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pays</p>
                <p className="font-medium">{userInfo.country_name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Région</p>
                <p className="font-medium">{userInfo.region}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Ville</p>
                <p className="font-medium">{userInfo.city}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Code postal</p>
                <p className="font-medium">{userInfo.postal}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Coordonnées</p>
                <p className="font-medium">
                  {userInfo.latitude}, {userInfo.longitude}
                </p>
              </div>
              
              {/* Lien Google Maps */}
              <div>
                <a 
                  href={`https://www.google.com/maps?q=${userInfo.latitude},${userInfo.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-primary transition-colors"
                >
                  <span>Voir sur Google Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Note d'information */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Ces informations sont celles que les sites web peuvent potentiellement collecter à votre sujet. 
                Utilisez des outils comme les VPN ou les navigateurs privés pour protéger votre vie privée en ligne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard; 