import React, { useEffect } from 'react';
import { GarbaEvent } from '../../types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  eventSchema?: GarbaEvent;
  faqSchema?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Navratri Garba Pass Ahmedabad 2026 | Garba Tickets & Events",
  description = "Book Navratri Garba Passes and Tickets in Ahmedabad for 2026. Discover Garba events, venues, dates, prices and season passes. Book your pass online.",
  canonicalUrl = "https://garbapassahmedabad2026.com/",
  ogImage = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  eventSchema,
  faqSchema = false
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // 3. Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', ogImage);

    // 4. Inject JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    let schemaData: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Navratri Garba Pass Ahmedabad 2026",
        "url": canonicalUrl,
        "logo": "https://garbapassahmedabad2026.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-79-4000-2026",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "gu", "hi"]
        }
      }
    ];

    if (eventSchema) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": eventSchema.name,
        "description": eventSchema.description,
        "startDate": `${eventSchema.startDate}T19:30:00+05:30`,
        "endDate": `${eventSchema.endDate}T01:30:00+05:30`,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": eventSchema.venue,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": eventSchema.address,
            "addressLocality": eventSchema.city,
            "addressRegion": "Gujarat",
            "postalCode": "380015",
            "addressCountry": "IN"
          }
        },
        "image": [eventSchema.featuredImage],
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": eventSchema.startingPrice,
          "highPrice": Math.max(...eventSchema.passes.map(p => p.price)),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": window.location.href
        },
        "organizer": {
          "@type": "Organization",
          "name": eventSchema.organizerName
        },
        "performer": {
          "@type": "PerformingGroup",
          "name": eventSchema.artistName
        }
      });
    }

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, canonicalUrl, ogImage, eventSchema]);

  return null;
};
