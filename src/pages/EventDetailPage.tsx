import React from 'react';
import { Calendar, Clock, MapPin, Star, Ticket, Share2, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GarbaEvent } from '../types';
import { SEOHead } from '../components/seo/SEOHead';

interface EventDetailPageProps {
  event: GarbaEvent;
  onBookPass: (event: GarbaEvent) => void;
  onShareEvent: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBookPass,
  onShareEvent,
  onNavigate
}) => {
  return (
    <div className="space-y-12 pb-24">
      
      <SEOHead 
        title={`${event.name} Ahmedabad 2026 | Garba Pass & Tickets`}
        description={`Book official Garba Passes for ${event.name} at ${event.venue} Ahmedabad. Dates: ${event.dates}. Artist: ${event.artistName}. Starting price ₹${event.startingPrice}.`}
        eventSchema={event}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-purple-300">
          <button onClick={() => onNavigate('/')} className="hover:text-amber-400">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('/events')} className="hover:text-amber-400">Garba Events</button>
          <span>/</span>
          <span className="text-white font-semibold truncate">{event.name}</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-900/60 shadow-2xl bg-festive-card">
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={event.featuredImage} 
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-festive-darker via-festive-dark/50 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {event.badges.map((b) => (
                <span key={b} className="text-xs bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full shadow-md">
                  {b}
                </span>
              ))}
            </div>

            {/* Share Button Overlay */}
            <button
              onClick={() => onShareEvent(event)}
              className="absolute top-4 right-4 p-3 rounded-full bg-festive-dark/80 hover:bg-festive-dark text-white border border-purple-500/40 backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-bold"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share Event</span>
            </button>

            {/* Hero Event Details Header */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}, {event.locationName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white">
                {event.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {event.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2-Column Main Info */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Facts Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-festive-card/80 p-4 rounded-2xl border border-purple-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
                <Calendar className="w-4 h-4" />
                <span>Event Dates</span>
              </div>
              <p className="text-sm font-bold text-white">{event.dates}</p>
            </div>

            <div className="bg-festive-card/80 p-4 rounded-2xl border border-purple-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>Daily Timing</span>
              </div>
              <p className="text-sm font-bold text-white">{event.startTime} - {event.endTime}</p>
            </div>

            <div className="bg-festive-card/80 p-4 rounded-2xl border border-purple-900/50 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <Star className="w-4 h-4 fill-emerald-400" />
                <span>Rating & Reviews</span>
              </div>
              <p className="text-sm font-bold text-white">{event.rating} / 5.0 ({event.reviewCount})</p>
            </div>
          </div>

          {/* Artist Spotlight */}
          <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={event.artistImage} 
              alt={event.artistName}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl flex-shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-extrabold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
                Lead Performer
              </span>
              <h3 className="text-xl font-display font-extrabold text-white">{event.artistName}</h3>
              <p className="text-xs text-purple-200">{event.artistRole}</p>
            </div>
          </div>

          {/* Description & Event Highlights */}
          <div className="space-y-4 bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50">
            <h3 className="text-lg font-bold text-white font-display">About The Event</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {event.description}
            </p>

            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">Event Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-festive-dark/60 p-2.5 rounded-xl border border-purple-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Pass Booking Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-purple-950 p-6 rounded-3xl border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Ticket className="w-5 h-5" />
              <span>OFFICIAL WHATSAPP TICKET DESK</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">Book Passes for {event.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get instant pass availability, dates, group discount offers, and QR ticket delivery directly on WhatsApp at <strong>+91 6767676549</strong>.
            </p>
            <button
              onClick={() => onBookPass(event)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white font-extrabold text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Book Pass via WhatsApp (+91 6767676549)</span>
            </button>
          </div>

          {/* Parking & Dress Code Entry Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dress Code Policy</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.dressCode}</p>
            </div>

            <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Parking & Valet Info</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.parkingInfo}</p>
            </div>
          </div>

          {/* Entry Rules List */}
          <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Entrance & Gate Rules</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {event.entryRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Maps Location Embed */}
          {event.googleMapsEmbedUrl && (
            <div className="space-y-3 bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50">
              <h4 className="text-sm font-bold text-white">Venue Map Location</h4>
              <div className="h-64 rounded-2xl overflow-hidden border border-purple-800/40">
                <iframe 
                  src={event.googleMapsEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-festive-card/90 p-6 rounded-3xl border-2 border-emerald-500/80 shadow-2xl space-y-6">
            
            <div>
              <p className="text-xs text-purple-300 font-semibold uppercase">Official Pass Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-extrabold text-amber-400">
                  From ₹{event.startingPrice}
                </span>
                <span className="text-xs text-slate-400">/ person</span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-1 font-semibold">✓ WhatsApp Direct Pass Confirmation</p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onBookPass(event)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-white font-extrabold text-base shadow-xl shadow-teal-950/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Book Pass via WhatsApp</span>
            </button>

            <div className="text-[11px] text-purple-300 space-y-1 text-center border-t border-purple-900/60 pt-4">
              <p>📲 WhatsApp Number: <strong>+91 6767676549</strong></p>
              <p>📱 Scannable Gate QR Pass</p>
            </div>

          </div>
        </div>

      </section>

      {/* MOBILE STICKY BOTTOM BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-festive-darker/95 border-t border-purple-800/80 p-3.5 backdrop-blur-md flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-[10px] text-purple-300 uppercase">Starting From</p>
          <p className="text-lg font-display font-extrabold text-amber-400">
            ₹{event.startingPrice}
          </p>
        </div>

        <button
          onClick={() => onBookPass(event)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5"
        >
          <Ticket className="w-4 h-4" />
          <span>Book Pass via WhatsApp</span>
        </button>
      </div>

    </div>
  );
};
