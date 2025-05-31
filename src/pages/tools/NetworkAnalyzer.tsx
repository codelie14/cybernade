import React, { useState } from 'react';
import SEO from '../../components/SEO';

interface NetworkStats {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  packetLoss: number;
  jitter: number;
  connectionType: string;
}

interface NetworkRequest {
  url: string;
  method: string;
  status: number;
  size: number;
  type: string;
  duration: number;
  timestamp: Date;
}

const NetworkAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showRequests, setShowRequests] = useState<boolean>(false);
  const [analysisTime, setAnalysisTime] = useState<number>(0);
  const [filterType, setFilterType] = useState<string>('all');

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    setNetworkStats(null);
    setNetworkRequests([]);
    setAnalysisTime(0);
    
    try {
      // Simuler une analyse réseau
      // Dans une application réelle, nous utiliserions des API comme Navigator.connection, 
      // Performance API ou des appels à un serveur pour mesurer les performances réseau
      await simulateNetworkAnalysis();
    } catch (err) {
      console.error('Erreur lors de l\'analyse réseau:', err);
      setError('Une erreur est survenue lors de l\'analyse réseau. Veuillez réessayer plus tard.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const simulateNetworkAnalysis = async (): Promise<void> => {
    // Simuler une analyse qui prend du temps
    const startTime = Date.now();
    const totalDuration = 5000; // 5 secondes
    const updateInterval = 100; // 100ms
    
    // Mettre à jour le temps d'analyse toutes les 100ms
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < totalDuration) {
        setAnalysisTime(Math.floor((elapsed / totalDuration) * 100));
      } else {
        clearInterval(intervalId);
        setAnalysisTime(100);
      }
    }, updateInterval);
    
    // Simuler une attente pour l'analyse
    await new Promise(resolve => setTimeout(resolve, totalDuration));
    
    // Générer des statistiques réseau simulées
    const stats: NetworkStats = {
      downloadSpeed: Math.random() * 100 + 20, // 20-120 Mbps
      uploadSpeed: Math.random() * 50 + 5, // 5-55 Mbps
      latency: Math.random() * 100 + 10, // 10-110 ms
      packetLoss: Math.random() * 2, // 0-2%
      jitter: Math.random() * 15, // 0-15 ms
      connectionType: ['WiFi', '4G', 'Ethernet', 'Fibre'][Math.floor(Math.random() * 4)]
    };
    
    // Générer des requêtes réseau simulées
    const requests: NetworkRequest[] = [];
    const domains = ['api.example.com', 'cdn.example.com', 'analytics.example.com', 'fonts.googleapis.com', 'example-images.s3.amazonaws.com'];
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const types = ['xhr', 'fetch', 'document', 'script', 'stylesheet', 'image', 'font', 'other'];
    
    for (let i = 0; i < 20; i++) {
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const path = ['/', '/users', '/products', '/api/v1/data', '/images/logo.png', '/styles.css', '/app.js'][Math.floor(Math.random() * 7)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const status = [200, 200, 200, 200, 201, 204, 400, 404, 500][Math.floor(Math.random() * 9)];
      
      const now = new Date();
      now.setSeconds(now.getSeconds() - Math.floor(Math.random() * 60));
      
      requests.push({
        url: `https://${domain}${path}`,
        method,
        status,
        size: Math.floor(Math.random() * 1000000),
        type,
        duration: Math.floor(Math.random() * 2000),
        timestamp: now
      });
    }
    
    setNetworkStats(stats);
    setNetworkRequests(requests);
    clearInterval(intervalId);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) {
      return `${ms.toFixed(0)} ms`;
    }
    return `${(ms / 1000).toFixed(2)} s`;
  };

  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) {
      return 'text-green-600';
    } else if (status >= 300 && status < 400) {
      return 'text-blue-600';
    } else if (status >= 400 && status < 500) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  const getQualityRating = (stats: NetworkStats): { text: string; color: string } => {
    // Évaluer la qualité de la connexion basée sur plusieurs facteurs
    const downloadScore = stats.downloadSpeed > 50 ? 3 : stats.downloadSpeed > 20 ? 2 : 1;
    const uploadScore = stats.uploadSpeed > 20 ? 3 : stats.uploadSpeed > 10 ? 2 : 1;
    const latencyScore = stats.latency < 30 ? 3 : stats.latency < 70 ? 2 : 1;
    const packetLossScore = stats.packetLoss < 0.5 ? 3 : stats.packetLoss < 1 ? 2 : 1;
    const jitterScore = stats.jitter < 5 ? 3 : stats.jitter < 10 ? 2 : 1;
    
    const totalScore = downloadScore + uploadScore + latencyScore + packetLossScore + jitterScore;
    
    if (totalScore >= 13) {
      return { text: 'Excellente', color: 'text-green-600' };
    } else if (totalScore >= 10) {
      return { text: 'Bonne', color: 'text-blue-600' };
    } else if (totalScore >= 7) {
      return { text: 'Moyenne', color: 'yellow-600' };
    } else {
      return { text: 'Faible', color: 'text-red-600' };
    }
  };

  const filteredRequests = networkRequests.filter(req => {
    if (filterType === 'all') return true;
    return req.type === filterType;
  });

  return (
    <>
      <SEO 
        title="Analyseur de Trafic Réseau | Cybernade"
        description="Analysez votre trafic réseau, mesurez les performances de votre connexion et identifiez les problèmes potentiels."
        keywords="analyseur réseau, trafic réseau, performance réseau, latence, débit, cybersécurité"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Analyseur de Trafic Réseau</h1>
            <p className="text-center text-gray-600 mb-8">
              Analysez votre connexion réseau et identifiez les problèmes potentiels.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-center mb-6">
                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Démarrer l'analyse réseau
                    </>
                  )}
                </button>
              </div>
              
              {isAnalyzing && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progression de l'analyse</span>
                    <span className="text-sm font-medium text-gray-700">{analysisTime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${analysisTime}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Analyse de votre connexion réseau en cours... Veuillez patienter.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
            </div>
            
            {networkStats && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Résultats de l'analyse réseau</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Performance de la connexion</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Vitesse de téléchargement</span>
                            <span className="text-sm font-medium text-blue-600">{networkStats.downloadSpeed.toFixed(2)} Mbps</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min(networkStats.downloadSpeed / 1.5, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Vitesse d'envoi</span>
                            <span className="text-sm font-medium text-green-600">{networkStats.uploadSpeed.toFixed(2)} Mbps</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${Math.min(networkStats.uploadSpeed * 2, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Latence</span>
                            <span className="text-sm font-medium text-yellow-600">{networkStats.latency.toFixed(2)} ms</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-600 h-2 rounded-full"
                              style={{ width: `${Math.min(networkStats.latency / 2, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <h3 className="text-lg font-medium mb-4">Qualité de la connexion</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Type de connexion</span>
                          <span className="text-sm font-medium">{networkStats.connectionType}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Perte de paquets</span>
                          <span className="text-sm font-medium">{networkStats.packetLoss.toFixed(2)}%</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Gigue (Jitter)</span>
                          <span className="text-sm font-medium">{networkStats.jitter.toFixed(2)} ms</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-sm text-gray-600">Évaluation globale</span>
                          <span className={`text-sm font-bold ${getQualityRating(networkStats).color}`}>
                            {getQualityRating(networkStats).text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Requêtes réseau</h3>
                    <button
                      onClick={() => setShowRequests(!showRequests)}
                      className="text-primary hover:text-primary/80 text-sm flex items-center"
                    >
                      {showRequests ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Masquer les requêtes
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Afficher les requêtes
                        </>
                      )}
                    </button>
                  </div>
                  
                  {showRequests && (
                    <>
                      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                        <button
                          onClick={() => setFilterType('all')}
                          className={`px-3 py-1 text-xs rounded-full ${
                            filterType === 'all' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Tous
                        </button>
                        {['xhr', 'fetch', 'document', 'script', 'stylesheet', 'image', 'font'].map(type => (
                          <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1 text-xs rounded-full ${
                              filterType === type 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                URL
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Méthode
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Taille
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Durée
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map((request, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                                  {request.url}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {request.method}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                  <span className={getStatusColor(request.status)}>
                                    {request.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {request.type}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {formatBytes(request.size)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {formatTime(request.duration)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">À propos de l'Analyseur de Trafic Réseau</h2>
              
              <div className="space-y-4">
                <p>
                  L'Analyseur de Trafic Réseau vous permet d'évaluer les performances de votre connexion Internet 
                  et d'identifier les problèmes potentiels qui pourraient affecter votre expérience en ligne.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Métriques mesurées</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        <span className="font-medium">Vitesse de téléchargement :</span> La vitesse à laquelle les données sont téléchargées depuis Internet vers votre appareil.
                      </li>
                      <li>
                        <span className="font-medium">Vitesse d'envoi :</span> La vitesse à laquelle les données sont envoyées depuis votre appareil vers Internet.
                      </li>
                      <li>
                        <span className="font-medium">Latence :</span> Le temps nécessaire pour qu'un paquet de données voyage de votre appareil à un serveur et revienne.
                      </li>
                      <li>
                        <span className="font-medium">Perte de paquets :</span> Le pourcentage de paquets de données qui n'atteignent pas leur destination.
                      </li>
                      <li>
                        <span className="font-medium">Gigue (Jitter) :</span> La variation de la latence au fil du temps.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Comment améliorer votre connexion</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Utilisez une connexion filaire (Ethernet) plutôt que Wi-Fi si possible</li>
                      <li>Placez votre routeur Wi-Fi dans un endroit central, loin des interférences</li>
                      <li>Mettez à jour le firmware de votre routeur</li>
                      <li>Fermez les applications et onglets inutilisés qui consomment de la bande passante</li>
                      <li>Contactez votre fournisseur d'accès Internet si les problèmes persistent</li>
                      <li>Envisagez d'utiliser un VPN de qualité pour améliorer la sécurité de votre connexion</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-yellow-700">
                      Note : Cet outil est limité par les capacités du navigateur et ne peut pas fournir une analyse 
                      aussi complète qu'un logiciel dédié. Pour une analyse plus approfondie, envisagez d'utiliser 
                      des outils spécialisés comme Wireshark ou des services de test de vitesse professionnels.
                    </p>
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

export default NetworkAnalyzer; 