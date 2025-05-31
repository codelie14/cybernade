import React, { useState } from 'react';
import SEO from '../../components/SEO';

interface SSLCertificate {
  domain: string;
  validFrom: string;
  validTo: string;
  issuer: string;
  subject: string;
  serialNumber: string;
  version: string;
  signatureAlgorithm: string;
  keyStrength: number;
  daysRemaining: number;
  isValid: boolean;
  isExpired: boolean;
  isAboutToExpire: boolean;
  sans: string[];
  hasSecureConfiguration: boolean;
  securityIssues: string[];
}

const SSLCertManager: React.FC = () => {
  const [domain, setDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [certInfo, setCertInfo] = useState<SSLCertificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Fonction pour valider le format du domaine
  const validateDomain = (domain: string): boolean => {
    const re = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return re.test(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setError(null);
    setCertInfo(null);
    setShowDetails(false);
    
    // Valider le domaine
    if (!domain) {
      setError('Veuillez entrer un nom de domaine');
      return;
    }
    
    // Nettoyer le domaine (enlever http:// ou https://)
    let cleanDomain = domain.trim();
    cleanDomain = cleanDomain.replace(/^https?:\/\//i, '');
    cleanDomain = cleanDomain.split('/')[0]; // Enlever tout chemin après le domaine
    
    if (!validateDomain(cleanDomain)) {
      setError('Veuillez entrer un nom de domaine valide (ex: exemple.com)');
      return;
    }
    
    setLoading(true);
    
    try {
      // Dans une application réelle, nous ferions une requête à une API pour obtenir les informations du certificat SSL
      // Ici, nous simulons une réponse pour la démonstration
      const certData = await simulateSSLCheck(cleanDomain);
      setCertInfo(certData);
    } catch (err) {
      console.error('Erreur lors de la vérification du certificat SSL:', err);
      setError('Une erreur est survenue lors de la vérification du certificat SSL. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const simulateSSLCheck = async (domain: string): Promise<SSLCertificate> => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Générer des dates aléatoires pour la validité du certificat
    const now = new Date();
    const validFrom = new Date(now);
    validFrom.setMonth(validFrom.getMonth() - Math.floor(Math.random() * 6)); // 0-6 mois dans le passé
    
    // Déterminer si le certificat est expiré ou sur le point d'expirer
    const isExpired = Math.random() < 0.1; // 10% de chance d'être expiré
    const isAboutToExpire = !isExpired && Math.random() < 0.2; // 20% de chance d'être sur le point d'expirer
    
    let validTo = new Date(now);
    if (isExpired) {
      validTo.setDate(validTo.getDate() - Math.floor(Math.random() * 30)); // Expiré depuis 0-30 jours
    } else if (isAboutToExpire) {
      validTo.setDate(validTo.getDate() + Math.floor(Math.random() * 30)); // Expire dans 0-30 jours
    } else {
      validTo.setMonth(validTo.getMonth() + Math.floor(Math.random() * 12) + 6); // Expire dans 6-18 mois
    }
    
    const daysRemaining = isExpired ? 0 : Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simuler des problèmes de sécurité
    const securityIssues: string[] = [];
    const hasWeakCipher = Math.random() < 0.2;
    const hasOldTLSVersion = Math.random() < 0.3;
    const hasInsecureRenegotiation = Math.random() < 0.1;
    
    if (hasWeakCipher) {
      securityIssues.push('Utilisation de suites de chiffrement faibles (RC4, DES)');
    }
    
    if (hasOldTLSVersion) {
      securityIssues.push('Protocole TLS 1.0/1.1 activé (obsolète)');
    }
    
    if (hasInsecureRenegotiation) {
      securityIssues.push('Renégociation insécurisée activée');
    }
    
    if (isExpired) {
      securityIssues.push('Certificat expiré');
    } else if (isAboutToExpire) {
      securityIssues.push('Certificat proche de l\'expiration');
    }
    
    // Générer des sous-domaines aléatoires
    const subdomains = ['www', 'mail', 'api', 'shop', 'blog', 'app', 'dev', 'stage'];
    const selectedSubdomains = subdomains
      .filter(() => Math.random() > 0.5)
      .map(sub => `${sub}.${domain}`);
    selectedSubdomains.push(domain);
    
    // Simuler un certificat SSL
    return {
      domain: domain,
      validFrom: validFrom.toISOString().split('T')[0],
      validTo: validTo.toISOString().split('T')[0],
      issuer: ['DigiCert Inc', 'Let\'s Encrypt', 'Comodo CA', 'GlobalSign', 'Sectigo'][Math.floor(Math.random() * 5)],
      subject: `CN=${domain}`,
      serialNumber: Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase(),
      version: 'v3',
      signatureAlgorithm: Math.random() > 0.2 ? 'SHA256withRSA' : 'SHA1withRSA',
      keyStrength: [2048, 4096][Math.floor(Math.random() * 2)],
      daysRemaining: daysRemaining,
      isValid: !isExpired,
      isExpired: isExpired,
      isAboutToExpire: isAboutToExpire,
      sans: selectedSubdomains,
      hasSecureConfiguration: securityIssues.length === 0,
      securityIssues: securityIssues
    };
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (!certInfo) return '';
    
    if (certInfo.isExpired) {
      return 'bg-red-100 text-red-800';
    } else if (certInfo.isAboutToExpire) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = () => {
    if (!certInfo) return '';
    
    if (certInfo.isExpired) {
      return 'Expiré';
    } else if (certInfo.isAboutToExpire) {
      return 'Expire bientôt';
    } else {
      return 'Valide';
    }
  };

  const getSecurityBadgeColor = () => {
    if (!certInfo) return '';
    
    if (certInfo.securityIssues.length === 0) {
      return 'bg-green-100 text-green-800';
    } else if (certInfo.securityIssues.length <= 2) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const getSecurityText = () => {
    if (!certInfo) return '';
    
    if (certInfo.securityIssues.length === 0) {
      return 'Sécurisé';
    } else if (certInfo.securityIssues.length <= 2) {
      return 'Améliorations possibles';
    } else {
      return 'Problèmes de sécurité';
    }
  };

  return (
    <>
      <SEO 
        title="Gestionnaire de Certificats SSL | Cybernade"
        description="Vérifiez et analysez les certificats SSL de n'importe quel site web. Obtenez des informations détaillées sur la validité et la sécurité des certificats."
        keywords="certificat SSL, vérification SSL, analyse SSL, sécurité web, TLS, HTTPS"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Gestionnaire de Certificats SSL</h1>
            <p className="text-center text-gray-600 mb-8">
              Vérifiez et analysez les certificats SSL de n'importe quel site web.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de domaine
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="exemple.com"
                      className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 border"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-r-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Vérification...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Vérifier
                        </>
                      )}
                    </button>
                  </div>
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  <p className="mt-1 text-xs text-gray-500">
                    Entrez un nom de domaine sans http:// ou https:// (ex: exemple.com)
                  </p>
                </div>
              </form>
            </div>
            
            {certInfo && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Certificat SSL pour {certInfo.domain}</h2>
                    <p className="text-sm text-gray-500">Émis par {certInfo.issuer}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSecurityBadgeColor()}`}>
                      {getSecurityText()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Validité</h3>
                      <div className="mt-1 flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">De</p>
                          <p className="font-medium">{formatDate(certInfo.validFrom)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">À</p>
                          <p className="font-medium">{formatDate(certInfo.validTo)}</p>
                        </div>
                      </div>
                      {certInfo.isValid && !certInfo.isAboutToExpire && (
                        <p className="mt-2 text-sm text-green-600">
                          Expire dans {certInfo.daysRemaining} jours
                        </p>
                      )}
                      {certInfo.isAboutToExpire && (
                        <p className="mt-2 text-sm text-yellow-600">
                          ⚠️ Expire dans {certInfo.daysRemaining} jours. Pensez à renouveler votre certificat.
                        </p>
                      )}
                      {certInfo.isExpired && (
                        <p className="mt-2 text-sm text-red-600">
                          ⚠️ Ce certificat est expiré. Veuillez le renouveler immédiatement.
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Informations techniques</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Algorithme de signature</span>
                          <span className="text-sm font-medium">{certInfo.signatureAlgorithm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Force de la clé</span>
                          <span className="text-sm font-medium">{certInfo.keyStrength} bits</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Version</span>
                          <span className="text-sm font-medium">{certInfo.version}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Noms alternatifs du sujet (SAN)</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {certInfo.sans.map((san, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {san}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Problèmes de sécurité détectés</h3>
                      <div className="mt-1">
                        {certInfo.securityIssues.length === 0 ? (
                          <p className="text-sm text-green-600">Aucun problème détecté. Configuration sécurisée.</p>
                        ) : (
                          <ul className="space-y-1">
                            {certInfo.securityIssues.map((issue, index) => (
                              <li key={index} className="text-sm text-red-600 flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                  >
                    {showDetails ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Masquer les détails techniques
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Afficher les détails techniques
                      </>
                    )}
                  </button>
                  
                  {showDetails && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h3 className="text-md font-medium mb-2">Détails du certificat</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Sujet</p>
                            <p className="text-sm font-mono break-all">{certInfo.subject}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Émetteur</p>
                            <p className="text-sm font-mono break-all">CN={certInfo.issuer}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Numéro de série</p>
                          <p className="text-sm font-mono break-all">{certInfo.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Empreinte SHA-256</p>
                          <p className="text-sm font-mono break-all">
                            {Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">À propos des certificats SSL</h2>
              
              <div className="space-y-4">
                <p>
                  Les certificats SSL (Secure Sockets Layer) sont des fichiers de données numériques qui lient 
                  cryptographiquement une clé cryptographique aux informations d'une organisation. Lorsqu'ils sont 
                  installés sur un serveur web, ils activent le protocole HTTPS et permettent des connexions 
                  sécurisées entre un navigateur web et le serveur.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Pourquoi les certificats SSL sont importants</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Ils chiffrent les données transmises entre le navigateur et le serveur</li>
                      <li>Ils vérifient l'identité du site web que vous visitez</li>
                      <li>Ils renforcent la confiance des utilisateurs</li>
                      <li>Ils améliorent le référencement sur les moteurs de recherche</li>
                      <li>Ils sont nécessaires pour se conformer aux réglementations sur la protection des données</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Bonnes pratiques pour les certificats SSL</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Utiliser des certificats émis par des autorités de certification reconnues</li>
                      <li>Renouveler les certificats avant leur expiration</li>
                      <li>Utiliser des algorithmes de chiffrement forts (SHA-256, RSA 2048+ bits)</li>
                      <li>Configurer correctement les protocoles TLS (TLS 1.2 ou 1.3)</li>
                      <li>Mettre en place HSTS (HTTP Strict Transport Security)</li>
                      <li>Vérifier régulièrement la configuration SSL avec des outils d'analyse</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-blue-700">
                      Notre outil vérifie uniquement les informations de base du certificat SSL. Pour une analyse 
                      complète de la configuration SSL/TLS d'un site web, nous recommandons d'utiliser des outils 
                      spécialisés comme SSL Labs ou des outils d'audit de sécurité professionnels.
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

export default SSLCertManager; 