import React, { useEffect } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({
  googleAnalyticsId,
  facebookPixelId
}) => {
  useEffect(() => {
    // Initialiser le consentement RGPD
    if (typeof window !== 'undefined') {
      window.cybernade_consent = window.cybernade_consent || {
        analytics: false,
        advertising: false,
        functional: true,
        necessary: true
      };
      
      // Vérifier si l'utilisateur a déjà donné son consentement
      const savedConsent = localStorage.getItem('cybernade_consent');
      if (savedConsent) {
        try {
          window.cybernade_consent = JSON.parse(savedConsent);
        } catch (e) {
          console.error('Erreur lors de la lecture du consentement:', e);
        }
      }
    }
    
    // Note: Nous n'initialisons pas Google Analytics ou Facebook Pixel ici
    // pour éviter les problèmes. Ces scripts seront ajoutés ultérieurement
    // lorsque l'application sera stable.
  }, []);
  
  return null; // Ce composant ne rend rien dans le DOM
};

export default Analytics;

/* Version originale commentée pour déboguer
const OriginalAnalytics: React.FC<AnalyticsProps> = ({
  googleAnalyticsId,
  facebookPixelId
}) => {
  return (
    <Helmet>
      {googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', { 'anonymize_ip': true });
            `}
          </script>
        </>
      )}

      {facebookPixelId && (
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </script>
      )}

      <script>
        {`
          // Script de gestion du consentement RGPD
          // Ce script devrait être remplacé par une solution complète de gestion du consentement
          window.cybernade_consent = {
            analytics: false,
            advertising: false,
            functional: true,
            necessary: true
          };
          
          // Vérifier si l'utilisateur a déjà donné son consentement
          const savedConsent = localStorage.getItem('cybernade_consent');
          if (savedConsent) {
            try {
              window.cybernade_consent = JSON.parse(savedConsent);
            } catch (e) {
              console.error('Erreur lors de la lecture du consentement:', e);
            }
          }
        `}
      </script>
    </Helmet>
  );
};
*/ 