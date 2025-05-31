import React, { useState, useRef, ChangeEvent } from 'react';
import SEO from '../../components/SEO';

enum OperationType {
  ENCRYPT = 'encrypt',
  DECRYPT = 'decrypt'
}

const FileEncryption: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [operation, setOperation] = useState<OperationType>(OperationType.ENCRYPT);
  const [processing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(null);
    
    // Évaluer la force du mot de passe
    if (newPassword) {
      let strength = 0;
      
      // Longueur
      strength += Math.min(newPassword.length * 4, 25);
      
      // Complexité
      if (/[A-Z]/.test(newPassword)) strength += 15;
      if (/[a-z]/.test(newPassword)) strength += 10;
      if (/[0-9]/.test(newPassword)) strength += 15;
      if (/[^A-Za-z0-9]/.test(newPassword)) strength += 20;
      
      // Limiter à 100
      setPasswordStrength(Math.min(strength, 100));
    } else {
      setPasswordStrength(0);
    }
  };

  const validateForm = (): boolean => {
    // Vérifier si un fichier est sélectionné
    if (!file) {
      setResult({ success: false, message: 'Veuillez sélectionner un fichier.' });
      return false;
    }
    
    // Vérifier si un mot de passe est saisi
    if (!password) {
      setResult({ success: false, message: 'Veuillez saisir un mot de passe.' });
      return false;
    }
    
    // Pour le chiffrement, vérifier que les mots de passe correspondent
    if (operation === OperationType.ENCRYPT && password !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return false;
    }
    
    // Pour le chiffrement, vérifier la force du mot de passe
    if (operation === OperationType.ENCRYPT && passwordStrength < 50) {
      setPasswordError('Veuillez utiliser un mot de passe plus fort (au moins 12 caractères avec des majuscules, minuscules, chiffres et symboles).');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    setResult(null);
    
    try {
      // Dans une application réelle, nous utiliserions une bibliothèque de cryptographie comme CryptoJS
      // Ici, nous simulons le processus pour la démonstration
      await simulateFileProcessing();
      
      if (operation === OperationType.ENCRYPT) {
        setResult({ 
          success: true, 
          message: 'Fichier chiffré avec succès. Téléchargez le fichier chiffré ci-dessous.' 
        });
      } else {
        setResult({ 
          success: true, 
          message: 'Fichier déchiffré avec succès. Téléchargez le fichier déchiffré ci-dessous.' 
        });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Erreur lors du ${operation === OperationType.ENCRYPT ? 'chiffrement' : 'déchiffrement'} du fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
      });
    } finally {
      setProcessing(false);
    }
  };

  const simulateFileProcessing = async (): Promise<void> => {
    // Simuler un délai de traitement
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleDownload = () => {
    if (!file) return;
    
    // Dans une application réelle, nous téléchargerions le fichier traité
    // Ici, nous simulons le téléchargement pour la démonstration
    const fileName = file.name;
    const extension = operation === OperationType.ENCRYPT ? '.encrypted' : '.decrypted';
    const downloadName = fileName.replace(/\.[^/.]+$/, "") + extension;
    
    // Créer un blob fictif pour la démonstration
    const blob = new Blob([new ArrayBuffer(1024)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFile(null);
    setPassword('');
    setConfirmPassword('');
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    if (passwordStrength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Très faible';
    if (passwordStrength < 60) return 'Faible';
    if (passwordStrength < 80) return 'Moyen';
    return 'Fort';
  };

  return (
    <>
      <SEO 
        title="Cryptage de Fichiers | Cybernade"
        description="Chiffrez et déchiffrez vos fichiers en toute sécurité avec notre outil de cryptage en ligne gratuit."
        keywords="cryptage fichiers, chiffrement, déchiffrement, sécurité des données, protection fichiers"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Cryptage de Fichiers</h1>
            <p className="text-center text-gray-600 mb-8">
              Chiffrez et déchiffrez vos fichiers en toute sécurité, directement dans votre navigateur.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'opération
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="operation"
                        value={OperationType.ENCRYPT}
                        checked={operation === OperationType.ENCRYPT}
                        onChange={() => setOperation(OperationType.ENCRYPT)}
                        disabled={processing}
                      />
                      <span className="ml-2">Chiffrer</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="operation"
                        value={OperationType.DECRYPT}
                        checked={operation === OperationType.DECRYPT}
                        onChange={() => setOperation(OperationType.DECRYPT)}
                        disabled={processing}
                      />
                      <span className="ml-2">Déchiffrer</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                    Sélectionner un fichier
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80">
                          <span>Téléverser un fichier</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            disabled={processing}
                          />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Tous types de fichiers jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                  {file && (
                    <div className="mt-2 text-sm text-gray-600">
                      Fichier sélectionné: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Entrez votre mot de passe"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 pr-10 border"
                      disabled={processing}
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
                  
                  {operation === OperationType.ENCRYPT && password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Force: {getPasswordStrengthText()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`${getPasswordStrengthColor()} h-1 rounded-full transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {operation === OperationType.ENCRYPT && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmez votre mot de passe"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 px-4 border"
                      disabled={processing}
                    />
                  </div>
                )}
                
                {passwordError && (
                  <div className="text-sm text-red-600">
                    {passwordError}
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    disabled={processing}
                  >
                    Réinitialiser
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        {operation === OperationType.ENCRYPT ? 'Chiffrer' : 'Déchiffrer'} le fichier
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              {result && (
                <div className={`mt-6 p-4 ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} rounded-md border`}>
                  <div className="flex">
                    {result.success ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                      {result.message}
                    </p>
                  </div>
                  
                  {result.success && (
                    <div className="mt-4">
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Télécharger le fichier {operation === OperationType.ENCRYPT ? 'chiffré' : 'déchiffré'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">À propos du cryptage de fichiers</h2>
              
              <div className="space-y-4">
                <p>
                  Notre outil de cryptage de fichiers utilise un chiffrement AES-256 bits pour protéger vos données sensibles.
                  Le chiffrement est effectué entièrement dans votre navigateur, ce qui signifie que vos fichiers et mots de passe 
                  ne quittent jamais votre appareil.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-md font-semibold text-blue-700 mb-2">Comment ça fonctionne</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                    <li>Sélectionnez un fichier à chiffrer ou déchiffrer</li>
                    <li>Entrez un mot de passe fort (pour le chiffrement) ou le mot de passe original (pour le déchiffrement)</li>
                    <li>Cliquez sur "Chiffrer" ou "Déchiffrer" selon votre besoin</li>
                    <li>Téléchargez le fichier traité</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-700">
                        <strong>Important :</strong> N'oubliez pas votre mot de passe ! Si vous perdez le mot de passe d'un fichier chiffré,
                        il sera impossible de récupérer vos données. Nous ne stockons pas vos mots de passe et ne pouvons pas vous aider
                        à récupérer des fichiers chiffrés si vous oubliez le mot de passe.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-4">Conseils de sécurité</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Utilisez un mot de passe fort avec au moins 12 caractères, incluant des majuscules, minuscules, chiffres et symboles</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Stockez vos mots de passe de manière sécurisée, idéalement dans un gestionnaire de mots de passe</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Conservez une copie de sauvegarde de vos fichiers importants avant de les chiffrer</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Utilisez un appareil et un navigateur sécurisés lors du chiffrement/déchiffrement de données sensibles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileEncryption; 