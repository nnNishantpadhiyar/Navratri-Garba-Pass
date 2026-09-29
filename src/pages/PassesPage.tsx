import React from 'react';
import { Ticket, Sparkles, CheckCircle2 } from 'lucide-react';
import { GarbaEvent, PassTier } from '../types';
import { PassCard } from '../components/passes/PassCard';
import { SEOHead } from '../components/seo/SEOHead';

interface PassesPageProps {
  events: GarbaEvent[];
  onBookPass: (event: GarbaEvent, pass?: PassTier) => void;
  onNavigate: (path: string) => void;
}

export const PassesPage: React.FC<PassesPageProps> = ({ events, onBookPass, onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Navratri Garba Passes Ahmedabad 2026 | Daily, Couple & VIP Passes"
        description="Compare and book Garba Passes in Ahmedabad. Daily Pass, Couple Pass, Family Pass, Season Pass & VIP Lounge Passes available for Navratri 2026."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-4 py-1 rounded-full border border-amber-500/30">
          <Ticket className="w-3.5 h-3.5" />
          <span>GARBA PASS MATRIX 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Navratri <span className="text-gold-gradient">Pass Tiers & Pricing</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Explore all pass categories available for Navratri 2026 events in Ahmedabad.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {events.map((evt) => (
          <div key={evt.id} className="bg-festive-card/60 p-6 rounded-3xl border border-purple-900/50 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/60 pb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-white">{evt.name}</h3>
                <p className="text-xs text-amber-400">{evt.venue} • {evt.dates}</p>
              </div>
              <button
                onClick={() => onNavigate(`/events/${evt.slug}`)}
                className="text-xs font-bold text-purple-300 hover:text-white"
              >
                View Full Event Details →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {evt.passes.map((pass) => (
                <PassCard
                  key={pass.id}
                  pass={pass}
                  eventName={evt.name}
                  onBookNow={(p) => onBookPass(evt, p)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
