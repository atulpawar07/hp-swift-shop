import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO = ({ title, description, canonical }: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.skenterpriseuae.com';
  const defaultTitle = 'SK Enterprise UAE - IT Solutions, Hardware & Networking Equipment';
  const defaultDescription = 'Leading supplier of IT solutions in UAE. Computers, laptops, printers, networking equipment, UPS systems from top brands like HP, Dell, Canon, Brother, APC. Dubai based.';

  useEffect(() => {
    // Update title
    document.title = title || defaultTitle;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || defaultDescription);

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('og:title', title || defaultTitle);
    updateMetaTag('og:description', description || defaultDescription);
    updateMetaTag('og:url', canonicalUrl);

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:title', title || defaultTitle);
    updateTwitterTag('twitter:description', description || defaultDescription);
    updateTwitterTag('twitter:url', canonicalUrl);
  }, [title, description, canonical, location.pathname]);

  return null;
};

export default SEO;
