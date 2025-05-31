import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [passwordEntropy, setPasswordEntropy] = useState<number>(0);

  // Générer un mot de passe au chargement initial
  useEffect(() => {
    generatePassword();
  }, []);

  // Recalculer la force du mot de passe lorsque celui-ci change
  useEffect(() => {
    if (password) {
      calculatePasswordStrength(password);
    }
  }, [password]);

  const generatePassword = () => {
    // Vérifier qu'au moins une option est sélectionnée
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setIncludeLowercase(true);
    }

    let charset = '';
    const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijkmnopqrstuvwxyz';
    const numberChars = '23456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Caractères similaires qui peuvent être confondus
    const similarChars = 'iIl1oO0';
    
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
    
    // Retirer les caractères similaires si l'option est activée
    if (excludeSimilar) {
      for (const char of similarChars) {
        charset = charset.replace(char, '');
      }
    }
    
    if (charset === '') {
      setPassword('Veuillez sélectionner au moins une option');
      return;
    }
    
    let newPassword = '';
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSymbol = false;
    
    // Générer un mot de passe qui respecte toutes les contraintes sélectionnées
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      const char = charset[randomIndex];
      newPassword += char;
      
      // Vérifier les types de caractères inclus
      if (/[A-Z]/.test(char)) hasUppercase = true;
      if (/[a-z]/.test(char)) hasLowercase = true;
      if (/[0-9]/.test(char)) hasNumber = true;
      if (/[^a-zA-Z0-9]/.test(char)) hasSymbol = true;
    }
    
    // Vérifier que le mot de passe contient tous les types de caractères demandés
    const isValid = 
      (!includeUppercase || hasUppercase) &&
      (!includeLowercase || hasLowercase) &&
      (!includeNumbers || hasNumber) &&
      (!includeSymbols || hasSymbol);
    
    // Si le mot de passe ne respecte pas toutes les contraintes, en générer un nouveau
    if (!isValid && length >= 4) {
      generatePassword();
      return;
    }
    
    setPassword(newPassword);
    setCopied(false);
  };

  const calculatePasswordStrength = (pwd: string) => {
    // Calculer l'entropie du mot de passe
    let charsetSize = 0;
    if (/[A-Z]/.test(pwd)) charsetSize += 26;
    if (/[a-z]/.test(pwd)) charsetSize += 26;
    if (/[0-9]/.test(pwd)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 33;
    
    // Entropie = log2(nombre de possibilités)
    const entropy = Math.log2(Math.pow(charsetSize, pwd.length));
    setPasswordEntropy(entropy);
    
    // Évaluer la force en fonction de l'entropie
    if (entropy < 40) {
      setPasswordStrength('Très faible');
    } else if (entropy < 60) {
      setPasswordStrength('Faible');
    } else if (entropy < 80) {
      setPasswordStrength('Moyen');
    } else if (entropy < 100) {
      setPasswordStrength('Fort');
    } else {
      setPasswordStrength('Très fort');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Très faible': return 'text-red-600';
      case 'Faible': return 'text-orange-500';
      case 'Moyen': return 'text-yellow-500';
      case 'Fort': return 'text-blue-500';
      case 'Très fort': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <>
      <SEO 
        title="Générateur de Mot de Passe | Cybernade"
        description="Générez des mots de passe forts et sécurisés avec notre outil gratuit. Personnalisez la longueur et les types de caractères pour créer un mot de passe unique."
        keywords="générateur mot de passe, mot de passe sécurisé, créer mot de passe, cybersécurité"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Générateur de Mot de Passe</h1>
            <p className="text-center text-gray-600 mb-8">
              Créez des mots de passe forts et aléatoires pour sécuriser vos comptes.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre mot de passe généré
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="password"
                    value={password}
                    readOnly
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 border"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 ${copied ? 'bg-green-500' : 'bg-primary'} text-white rounded-r-md transition-colors`}
                    aria-label="Copier le mot de passe"
                  >
                    {copied ? (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copié
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copier
                      </span>
                    )}
                  </button>
                </div>
                {passwordStrength && (
                  <p className="mt-2 text-sm">
                    Force : <span className={`font-medium ${getStrengthColor()}`}>{passwordStrength}</span>
                    {passwordEntropy > 0 && (
                      <span className="ml-2 text-xs text-gray-500">
                        (Entropie : {passwordEntropy.toFixed(2)} bits)
                      </span>
                    )}
                  </p>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                    Longueur du mot de passe : {length} caractères
                  </label>
                  <input
                    type="range"
                    id="length"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>8</span>
                    <span>16</span>
                    <span>32</span>
                    <span>48</span>
                    <span>64</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="uppercase"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">
                      Inclure des majuscules (A-Z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lowercase"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700">
                      Inclure des minuscules (a-z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="numbers"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">
                      Inclure des chiffres (0-9)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="symbols"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700">
                      Inclure des symboles (!@#$%^&*)
                    </label>
                  </div>
                  
                  <div className="flex items-center md:col-span-2">
                    <input
                      type="checkbox"
                      id="exclude-similar"
                      checked={excludeSimilar}
                      onChange={(e) => setExcludeSimilar(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="exclude-similar" className="ml-2 block text-sm text-gray-700">
                      Exclure les caractères similaires (i, l, 1, I, o, 0, O)
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <button
                    onClick={generatePassword}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Générer un nouveau mot de passe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Pourquoi utiliser des mots de passe forts ?</h2>
              
              <div className="space-y-4">
                <p>
                  Un mot de passe fort est votre première ligne de défense contre les accès non autorisés à vos comptes. 
                  Les cybercriminels utilisent des techniques de plus en plus sophistiquées pour tenter de deviner ou de 
                  craquer les mots de passe, notamment :
                </p>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Attaques par force brute</span> : Essai systématique de toutes les combinaisons possibles
                  </li>
                  <li>
                    <span className="font-medium">Attaques par dictionnaire</span> : Tentatives utilisant des listes de mots courants
                  </li>
                  <li>
                    <span className="font-medium">Ingénierie sociale</span> : Manipulation pour obtenir vos informations d'identification
                  </li>
                </ul>
                
                <p>
                  Notre générateur crée des mots de passe aléatoires difficiles à deviner, même pour des ordinateurs puissants. 
                  En utilisant des mots de passe uniques et complexes pour chaque compte, vous réduisez considérablement le risque 
                  de compromission de vos données personnelles.
                </p>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-blue-700">
                      Conseil : Utilisez un gestionnaire de mots de passe pour stocker en toute sécurité vos mots de passe complexes. 
                      Ainsi, vous n'aurez qu'à vous souvenir d'un seul mot de passe principal.
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

export default PasswordGenerator; 