import React from 'react';
import { Ticket, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { GarbaEvent, PassTier } from '../types';
import { SEOHead } from '../components/seo/SEOHead';

interface SeasonPassesPageProps {
  events: GarbaEvent[];
  onBookPass: (event: GarbaEvent, pass?: PassTier) => void;
  onNavigate: (path: string) => void;
}

export const SeasonPassesPage: React.FC<SeasonPassesPageProps> = ({ events, onBookPass, onNavigate }) => {
  // Filter season passes
  const eventsWithSeasonPasses = events.map(e => ({
    ...e,
    seasonPasses: e.passes.filter(p => p.name.toLowerCase().includes('season') || p.validity.includes('9 Nights'))
  })).filter(e => e.seasonPasses.length > 0);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Season Garba Pass Ahmedabad 2026 | Full 9-Night Passes"
        description="Book Full 9-Night Season Garba Passes in Ahmedabad for Navratri 2026. Enjoy unlimited 9-day access, VIP express entry, and priority parking."
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
          Save up to 45% with a 9-Day Unlimited Season Pass. Skip long gate queues with dedicated VIP entry.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsWithSeasonPasses.map((evt) => (
            <div key={evt.id} className="bg-festive-card/90 rounded-3xl border border-purple-900/60 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <img src={evt.featuredImage} alt={evt.name} className="w-full h-40 object-cover rounded-2xl" />
                <h3 className="text-lg font-display font-extrabold text-white">{evt.name}</h3>
                <p className="text-xs text-amber-400">{evt.venue}</p>

                {evt.seasonPasses.map((sp) => (
                  <div key={sp.id} className="bg-festive-dark/80 p-4 rounded-2xl border border-purple-800/40 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-white text-sm">{sp.name}</span>
                      <span className="text-xl font-bold text-amber-400">₹{sp.price}</span>
                    </div>
                    <p className="text-xs text-slate-300">{sp.description}</p>
                    <ul className="space-y-1 pt-1">
                      {sp.benefits.map((b, i) => (
                        <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onBookPass(evt, sp)}
                      className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold shadow-md"
                    >
                      Book 9-Day Season Pass
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
