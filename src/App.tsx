import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import CookieConsent from './components/CookieConsent';
import Analytics from './components/Analytics';
import UserInfoBar from './components/UserInfoBar';
import './App.css';

// Chargement différé des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home'));
const IPLocator = lazy(() => import('./pages/IPLocator'));
const PhoneTracker = lazy(() => import('./pages/PhoneTracker'));
const SecurityTools = lazy(() => import('./pages/SecurityTools'));
const Pentest = lazy(() => import('./pages/Pentest'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Outils de sécurité
const PasswordAnalyzer = lazy(() => import('./pages/tools/PasswordAnalyzer'));
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator'));
const DataBreachChecker = lazy(() => import('./pages/tools/DataBreachChecker'));
const VulnerabilityScanner = lazy(() => import('./pages/tools/VulnerabilityScanner'));
const FileEncryption = lazy(() => import('./pages/tools/FileEncryption'));
const SSLCertManager = lazy(() => import('./pages/tools/SSLCertManager'));
const NetworkAnalyzer = lazy(() => import('./pages/tools/NetworkAnalyzer'));
const MalwareScanner = lazy(() => import('./pages/tools/MalwareScanner'));

function App() {
  return (
    <Router>
      {/* Composant d'analyse */}
      <Analytics 
        googleAnalyticsId="G-XXXXXXXXXX" 
        facebookPixelId="XXXXXXXXXX" 
      />
      
      <div className="flex flex-col min-h-screen">
        <UserInfoBar />
        <Header />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <LoadingSpinner size="large" text="Chargement de la page..." />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ip-locator" element={<IPLocator />} />
              <Route path="/phone-tracker" element={<PhoneTracker />} />
              <Route path="/security-tools" element={<SecurityTools />} />
              <Route path="/pentest" element={<Pentest />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              
              {/* Routes pour les outils de sécurité */}
              <Route path="/security-tools/password-analyzer" element={<PasswordAnalyzer />} />
              <Route path="/security-tools/password-generator" element={<PasswordGenerator />} />
              <Route path="/security-tools/data-breach-checker" element={<DataBreachChecker />} />
              <Route path="/security-tools/vulnerability-scanner" element={<VulnerabilityScanner />} />
              <Route path="/security-tools/file-encryption" element={<FileEncryption />} />
              <Route path="/security-tools/ssl-cert-manager" element={<SSLCertManager />} />
              <Route path="/security-tools/network-analyzer" element={<NetworkAnalyzer />} />
              <Route path="/security-tools/malware-scanner" element={<MalwareScanner />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      
      {/* Composant de consentement aux cookies */}
      <CookieConsent />
    </Router>
  );
}

export default App;
