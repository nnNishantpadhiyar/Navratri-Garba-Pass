import React from 'react';
import { Ticket, Sparkles } from 'lucide-react';
import { GarbaEvent } from '../types';
import { EventCard } from '../components/events/EventCard';
import { SEOHead } from '../components/seo/SEOHead';

interface SeasonPassesPageProps {
  events: GarbaEvent[];
  onBookPass: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
}

export const SeasonPassesPage: React.FC<SeasonPassesPageProps> = ({ events, onBookPass, onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Season Garba Pass Ahmedabad 2026 | Full 9-Night Passes"
        description="Book Full 9-Night Season Garba Passes in Ahmedabad for Navratri 2026 on WhatsApp (+91 6767676549). Enjoy unlimited 9-day access, VIP express entry, and priority parking."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>FULL 9-NIGHT UNLIMITED ACCESS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Season Garba Pass <span className="text-gold-gradient">Ahmedabad 2026</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Save up to 45% with a 9-Day Unlimited Season Pass. Request season pass details directly on WhatsApp (+91 6767676549).
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
