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
const NotFound = lazy(() => import('./pages/NotFound'));

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
              {/* Les routes pour les outils spécifiques seront ajoutées ultérieurement */}
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
