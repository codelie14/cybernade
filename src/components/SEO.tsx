import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemaType?: 'WebSite' | 'WebPage' | 'Article' | 'Organization' | 'Product' | 'Service' | 'WebApplication';
  schemaData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl = window.location.href,
  keywords = '',
  ogType = 'website',
  ogImage = '/og-image.jpg',
  schemaType = 'WebSite',
  schemaData = {}
}) => {
  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = title;
    
    // Mettre à jour les meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'og:title': title,
      'og:description': description,
      'og:type': ogType,
      'og:url': canonicalUrl,
      'og:image': ogImage,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage
    };

    // Mettre à jour ou créer les meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      
      // Vérifier si la meta tag existe déjà
      let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      
      if (!metaTag) {
        // Créer la meta tag si elle n'existe pas
        metaTag = document.createElement('meta');
        if (name.startsWith('og:')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      // Mettre à jour le contenu
      metaTag.setAttribute('content', content);
    });
    
    // Gérer le lien canonique
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Nettoyer lors du démontage du composant
    return () => {
      // Nous ne supprimons pas les meta tags pour éviter des problèmes de rendu
    };
  }, [title, description, canonicalUrl, keywords, ogType, ogImage]);

  return null; // Ce composant ne rend rien dans le DOM
};

export default SEO; 