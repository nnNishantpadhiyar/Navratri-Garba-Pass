import React from 'react';
import { Ticket, Sparkles } from 'lucide-react';
import { GarbaEvent } from '../types';
import { EventCard } from '../components/events/EventCard';
import { SEOHead } from '../components/seo/SEOHead';

interface PassesPageProps {
  events: GarbaEvent[];
  onBookPass: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
}

export const PassesPage: React.FC<PassesPageProps> = ({ events, onBookPass, onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Navratri Garba Passes Ahmedabad 2026 | Official Events & Tickets"
        description="Book Garba Passes in Ahmedabad on WhatsApp (+91 6767676549). Official daily entry passes, couple passes, season passes & VIP lounge passes available."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-4 py-1 rounded-full border border-amber-500/30">
          <Ticket className="w-3.5 h-3.5" />
          <span>AHMEDABAD GARBA PASSES 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Navratri <span className="text-gold-gradient">Garba Events & Passes</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Explore Garba events in Ahmedabad and click Book Pass to request tickets directly via WhatsApp.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              onSelectEvent={(e) => onNavigate(`/events/${e.slug}`)}
              onBookPass={() => onBookPass(evt)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
