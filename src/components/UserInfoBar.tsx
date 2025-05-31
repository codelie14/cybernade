import React, { useState, useEffect } from 'react';

interface UserInfoBarProps {
  className?: string;
}

const UserInfoBar: React.FC<UserInfoBarProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userIP, setUserIP] = useState<string>('Chargement...');
  const [userLocation, setUserLocation] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Mettre à jour l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Surveiller l'état de connexion
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Récupérer l'adresse IP et la localisation de l'utilisateur
  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIP(data.ip);
        
        // Une fois que nous avons l'IP, récupérer la localisation
        fetchUserLocation(data.ip);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP:', error);
        setUserIP('Non disponible');
      }
    };

    const fetchUserLocation = async (ip: string) => {
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.reason);
        }
        
        const locationStr = `${data.city || ''}, ${data.country_name || ''}`;
        setUserLocation(locationStr);
      } catch (error) {
        console.error('Erreur lors de la récupération de la localisation:', error);
        setUserLocation('Non disponible');
      }
    };

    fetchUserIP();
  }, []);

  // Formater la date et l'heure
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(currentTime);

  return (
    <div className={`bg-gray-800 text-white text-xs py-1 px-4 ${className}`}>
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <span className="font-medium">{formattedDate}</span> | <span>{formattedTime}</span>
          </div>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-gray-400 mr-1">IP:</span> {userIP}
          </div>
          {userLocation && (
            <div>
              <span className="text-gray-400 mr-1">Localisation:</span> {userLocation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoBar; 