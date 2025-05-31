import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';

const PasswordAnalyzer: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<number>(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [timeToHack, setTimeToHack] = useState<string>('');

  useEffect(() => {
    if (password) {
      analyzePassword(password);
    } else {
      setStrength(0);
      setFeedback([]);
      setTimeToHack('');
    }
  }, [password]);

  const analyzePassword = (pwd: string) => {
    let score = 0;
    const issues: string[] = [];

    // Longueur du mot de passe
    if (pwd.length < 8) {
      issues.push('Le mot de passe est trop court (minimum 8 caractères)');
    } else {
      score += pwd.length * 0.5; // 0.5 point par caractère
    }

    // Présence de chiffres
    if (/\d/.test(pwd)) {
      score += 10;
    } else {
      issues.push('Ajoutez des chiffres pour renforcer votre mot de passe');
    }

    // Présence de lettres minuscules
    if (/[a-z]/.test(pwd)) {
      score += 10;
    } else {
      issues.push('Ajoutez des lettres minuscules pour renforcer votre mot de passe');
    }

    // Présence de lettres majuscules
    if (/[A-Z]/.test(pwd)) {
      score += 10;
    } else {
      issues.push('Ajoutez des lettres majuscules pour renforcer votre mot de passe');
    }

    // Présence de caractères spéciaux
    if (/[^a-zA-Z0-9]/.test(pwd)) {
      score += 15;
    } else {
      issues.push('Ajoutez des caractères spéciaux pour renforcer votre mot de passe');
    }

    // Séquences répétitives
    if (/(.)\1{2,}/.test(pwd)) {
      score -= 10;
      issues.push('Évitez les séquences répétitives (ex: "aaa", "111")');
    }

    // Séquences communes
    const commonSequences = ['123', '234', '345', '456', '567', '678', '789', 'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij'];
    for (const seq of commonSequences) {
      if (pwd.toLowerCase().includes(seq)) {
        score -= 5;
        issues.push('Évitez les séquences communes (ex: "123", "abc")');
        break;
      }
    }

    // Mots courants
    const commonWords = ['password', 'motdepasse', 'azerty', 'qwerty', 'admin', '123456', 'welcome', 'bonjour'];
    for (const word of commonWords) {
      if (pwd.toLowerCase().includes(word)) {
        score -= 15;
        issues.push('Évitez d\'utiliser des mots courants ou faciles à deviner');
        break;
      }
    }

    // Normaliser le score entre 0 et 100
    score = Math.max(0, Math.min(100, score));
    
    // Estimer le temps nécessaire pour craquer le mot de passe
    const timeEstimate = estimateHackingTime(pwd);

    setStrength(score);
    setFeedback(issues);
    setTimeToHack(timeEstimate);
  };

  const estimateHackingTime = (pwd: string): string => {
    // Calcul très simplifié du temps de craquage
    // En réalité, cela dépend de nombreux facteurs (méthode utilisée, puissance de calcul, etc.)
    
    let combinations = 0;
    const length = pwd.length;
    
    // Calculer la taille de l'espace de recherche
    let charsetSize = 0;
    if (/[a-z]/.test(pwd)) charsetSize += 26;
    if (/[A-Z]/.test(pwd)) charsetSize += 26;
    if (/\d/.test(pwd)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 33; // Estimation pour les caractères spéciaux courants
    
    // Si aucun caractère n'est détecté (cas improbable), on utilise une valeur par défaut
    if (charsetSize === 0) charsetSize = 26;
    
    // Nombre de combinaisons possibles
    combinations = Math.pow(charsetSize, length);
    
    // Supposons 10 milliards de tentatives par seconde (attaque par force brute moderne)
    const attemptsPerSecond = 10000000000;
    
    const seconds = combinations / attemptsPerSecond;
    
    // Convertir en unité de temps appropriée
    if (seconds < 60) {
      return `${seconds.toFixed(2)} secondes`;
    } else if (seconds < 3600) {
      return `${(seconds / 60).toFixed(2)} minutes`;
    } else if (seconds < 86400) {
      return `${(seconds / 3600).toFixed(2)} heures`;
    } else if (seconds < 31536000) {
      return `${(seconds / 86400).toFixed(2)} jours`;
    } else if (seconds < 31536000 * 100) {
      return `${(seconds / 31536000).toFixed(2)} ans`;
    } else if (seconds < 31536000 * 1000) {
      return `${(seconds / 31536000 / 100).toFixed(2)} siècles`;
    } else {
      return `${(seconds / 31536000 / 1000).toFixed(2)} millénaires`;
    }
  };

  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 60) return 'bg-yellow-500';
    if (strength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 30) return 'Très faible';
    if (strength < 60) return 'Faible';
    if (strength < 80) return 'Moyen';
    if (strength < 95) return 'Fort';
    return 'Très fort';
  };

  return (
    <>
      <SEO 
        title="Analyseur de Mot de Passe | Cybernade"
        description="Vérifiez la force de vos mots de passe et identifiez les vulnérabilités potentielles avec notre outil gratuit d'analyse de mot de passe."
        keywords="analyseur mot de passe, force mot de passe, sécurité mot de passe, cybersécurité"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Analyseur de Mot de Passe</h1>
            <p className="text-center text-gray-600 mb-8">
              Vérifiez la force de vos mots de passe et identifiez les vulnérabilités potentielles.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Entrez un mot de passe à analyser
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 pr-10 border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Note: Votre mot de passe est analysé localement et n'est jamais envoyé à nos serveurs.
                </p>
              </div>
              
              {password && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Force du mot de passe: <span className="font-semibold">{getStrengthText()}</span>
                    </label>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out`}
                        style={{ width: `${strength}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {timeToHack && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-md">
                      <h3 className="text-md font-semibold mb-1">Temps estimé pour craquer ce mot de passe</h3>
                      <p className="text-lg font-bold text-primary">{timeToHack}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Estimation basée sur une attaque par force brute avec du matériel moderne.
                      </p>
                    </div>
                  )}
                  
                  {feedback.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-md font-semibold mb-2">Recommandations pour améliorer votre mot de passe :</h3>
                      <ul className="space-y-1">
                        {feedback.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {strength >= 80 && feedback.length === 0 && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-700">Excellent ! Votre mot de passe est fort et sécurisé.</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Conseils pour créer un mot de passe sécurisé</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Utilisez au moins 12 caractères, idéalement plus</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Combinez lettres majuscules, minuscules, chiffres et caractères spéciaux</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Évitez d'utiliser des informations personnelles identifiables</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>N'utilisez pas le même mot de passe pour plusieurs comptes</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Changez régulièrement vos mots de passe, surtout pour les comptes sensibles</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-700">
                    Conseil pro : Envisagez d'utiliser un gestionnaire de mots de passe pour générer et stocker des mots de passe complexes uniques pour chaque site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordAnalyzer; 