import React, { useEffect } from 'react';
import { GarbaEvent } from '../../types';
import { FAQ_ITEMS } from '../../data/faqData';

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
    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string, create: () => HTMLMetaElement) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = create();
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };
    const canonical = new URL(canonicalUrl, window.location.origin);
    if (!canonicalUrl || canonical.pathname === '/') canonical.pathname = window.location.pathname;
    canonical.search = '';
    canonical.hash = '';
    const canonicalHref = canonical.href;

    setMeta('meta[name="description"]', 'content', description, () => Object.assign(document.createElement('meta'), { name: 'description' }));
    setMeta('meta[property="og:type"]', 'content', 'website', () => Object.assign(document.createElement('meta'), { property: 'og:type' }));
    setMeta('meta[property="og:title"]', 'content', title, () => Object.assign(document.createElement('meta'), { property: 'og:title' }));
    setMeta('meta[property="og:description"]', 'content', description, () => Object.assign(document.createElement('meta'), { property: 'og:description' }));
    setMeta('meta[property="og:url"]', 'content', canonicalHref, () => Object.assign(document.createElement('meta'), { property: 'og:url' }));
    setMeta('meta[property="og:image"]', 'content', ogImage, () => Object.assign(document.createElement('meta'), { property: 'og:image' }));
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', () => Object.assign(document.createElement('meta'), { name: 'twitter:card' }));
    setMeta('meta[name="twitter:title"]', 'content', title, () => Object.assign(document.createElement('meta'), { name: 'twitter:title' }));
    setMeta('meta[name="twitter:description"]', 'content', description, () => Object.assign(document.createElement('meta'), { name: 'twitter:description' }));
    setMeta('meta[name="twitter:image"]', 'content', ogImage, () => Object.assign(document.createElement('meta'), { name: 'twitter:image' }));
    setLink('canonical', canonicalHref);

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
        "url": new URL('/', canonical.origin).href
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

    if (faqSchema) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      });
    }

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, canonicalUrl, ogImage, eventSchema, faqSchema]);

  return null;
};
