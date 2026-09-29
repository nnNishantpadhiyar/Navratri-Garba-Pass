import React from 'react';
import { MapPin, Ticket, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { LocationInfo, GarbaEvent, PassTier } from '../types';
import { EventCard } from '../components/events/EventCard';
import { SEOHead } from '../components/seo/SEOHead';

interface LocationPageProps {
  locationInfo: LocationInfo;
  events: GarbaEvent[];
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent, pass?: PassTier) => void;
  onShareEvent: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  locationInfo,
  events,
  onSelectEvent,
  onBookPass,
  onShareEvent,
  onNavigate
}) => {
  const locationEvents = events.filter(e => e.locationSlug === locationInfo.slug || locationInfo.slug === 'ahmedabad');

  return (
    <div className="space-y-12 pb-16">
      
      <SEOHead 
        title={locationInfo.metaTitle}
        description={locationInfo.metaDescription}
      />

      {/* Hero Location Banner */}
      <section className="relative pt-12 pb-16 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>NAVRATRI 2026 GARBA LOCATION HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
            Garba Pass <span className="text-gold-gradient">{locationInfo.name}</span> 2026
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {locationInfo.areaDescription}
          </p>
        </div>
      </section>

      {/* Top Venues & Landmarks Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Top Garba Grounds in {locationInfo.name}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {locationInfo.topVenues.map((v, i) => (
              <span key={i} className="text-xs bg-purple-950 text-purple-200 px-3 py-1.5 rounded-xl border border-purple-800/40 font-semibold">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Key Area Landmarks & Highways</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {locationInfo.landmarks.map((l, i) => (
              <span key={i} className="text-xs bg-festive-dark text-slate-300 px-3 py-1.5 rounded-xl border border-purple-900/40">
                {l}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* Location Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-purple-900/60 pb-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              Available Garba Events in {locationInfo.name}
            </h2>
            <p className="text-xs text-slate-300">
              Showing {locationEvents.length} official Garba passes available online.
            </p>
          </div>
        </div>

        {locationEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locationEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onSelectEvent={onSelectEvent}
                onBookPass={onBookPass}
                onShareEvent={onShareEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-festive-card/60 rounded-3xl border border-purple-900/50 space-y-3">
            <p className="text-sm text-slate-300">No specific events listed for this exact zone right now.</p>
            <button
              onClick={() => onNavigate('/events')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Explore All Ahmedabad Events
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
