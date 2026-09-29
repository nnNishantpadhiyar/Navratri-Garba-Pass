import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Search, ArrowRight, ShieldCheck, Ticket, Star, ChevronDown, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { GarbaEvent, PassTier } from '../types';
import { EventCard } from '../components/events/EventCard';
import { EventFilter } from '../components/events/EventFilter';
import { BLOG_POSTS } from '../data/blogPosts';
import { FAQ_ITEMS } from '../data/faqData';
import { SEOHead } from '../components/seo/SEOHead';

interface HomePageProps {
  events: GarbaEvent[];
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent, pass?: PassTier) => void;
  onShareEvent: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
  onWhatsAppBook: (eventName?: string, venue?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  onSelectEvent,
  onBookPass,
  onShareEvent,
  onNavigate,
  onWhatsAppBook
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Simple search filter
  const filteredEvents = events.filter((evt) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = evt.name.toLowerCase().includes(q);
      const matchVenue = evt.venue.toLowerCase().includes(q);
      const matchLoc = evt.locationName.toLowerCase().includes(q);
      const matchArtist = evt.artistName.toLowerCase().includes(q);
      return matchName || matchVenue || matchLoc || matchArtist;
    }
    return true;
  });

  const trendingEvents = events.filter(e => e.badges.includes('Trending'));

  return (
    <div className="space-y-16 pb-16">
      
      <SEOHead 
        title="Navratri Garba Pass Ahmedabad 2026 | Garba Tickets & Events"
        description="Book Navratri Garba Passes and Tickets in Ahmedabad for 2026. Discover Garba events, venues, dates, prices and season passes. Book your pass on WhatsApp."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-hero-pattern">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 text-amber-300 text-xs font-extrabold px-4 py-2 rounded-full border border-amber-500/40 shadow-lg animate-float">
            <span className="text-base">🪔</span>
            <span>NAVRATRI GARBA PASS AHMEDABAD 2026 • WHATSAPP: +91 6767676549</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight">
              Navratri Garba Pass <br />
              <span className="text-gold-gradient">Ahmedabad 2026</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover Ahmedabad's best Garba nights, Navratri events and Dandiya experiences. Explore events, compare passes and book your Garba Pass directly via WhatsApp.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onWhatsAppBook()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white shadow-xl shadow-teal-950/60 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Buy Garba Pass via WhatsApp (+91 6767676549)</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('events-discovery');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-festive-card/90 border border-purple-600/50 hover:border-amber-400 text-purple-200 hover:text-white shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Explore Garba Events</span>
            </button>
          </div>

          {/* Core Info Badges */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs">
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHAT</p>
              <p className="font-bold text-white text-sm">Garba Events</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHERE</p>
              <p className="font-bold text-amber-400 text-sm">Ahmedabad</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHEN</p>
              <p className="font-bold text-rose-400 text-sm">Navratri 2026</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">ACTION</p>
              <p className="font-bold text-emerald-400 text-sm">Book Pass</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EVENT DISCOVERY & SEARCH SECTION (SIMPLIFIED: ONLY SEARCH INPUT BAR) */}
      <section id="events-discovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-black text-white">
            Search Garba Events in Ahmedabad
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Type to search by event name, venue, artist or location.
          </p>
        </div>

        {/* Simplified Search Input Bar ONLY */}
        <EventFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredEvents.length}
        />

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onSelectEvent={onSelectEvent}
                onBookPass={() => onWhatsAppBook(evt.name, evt.venue)}
                onShareEvent={onShareEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-festive-card/60 rounded-3xl border border-purple-900/50 space-y-3">
            <Search className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Garba events found matching "{searchQuery}"</h3>
            <p className="text-xs text-slate-400">Try searching for YMCA, Kinjal Dave, Bopal, SG Highway or Rajpath.</p>
          </div>
        )}
      </section>

      {/* 3. TRENDING GARBA EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-display font-extrabold text-white">
                Trending Garba Events 2026
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Popular Garba nights in Ahmedabad. Click Book Pass to redirect directly to WhatsApp.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/events')}
            className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingEvents.map((evt) => (
            <EventCard
              key={`trending-${evt.id}`}
              event={evt}
              onSelectEvent={onSelectEvent}
              onBookPass={() => onWhatsAppBook(evt.name, evt.venue)}
              onShareEvent={onShareEvent}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY BOOK WITH US (TRUST & CONVERSION SECTION) */}
      <section className="bg-gradient-to-r from-festive-purple via-rose-950 to-indigo-950 py-16 border-y border-purple-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-black text-white">
              Why Book Garba Passes With Us?
            </h2>
            <p className="text-xs text-purple-200">
              Instant WhatsApp pass booking & verified event information for Ahmedabad Navratri 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Verified Event Info</h3>
              <p className="text-xs text-slate-300">Direct partnership with YMCA, Rajpath & Karnavati organizers.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Direct WhatsApp Booking</h3>
              <p className="text-xs text-slate-300">Instant response on WhatsApp number <strong>+91 6767676549</strong>.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Instant Pass Confirmation</h3>
              <p className="text-xs text-slate-300">Receive digital pass details directly on your phone.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Easy Booking</h3>
              <p className="text-xs text-slate-300">Simple one-click WhatsApp pass request without complex forms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NAVRATRI 2026 GUIDE & BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/60 pb-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              Navratri 2026 Ahmedabad Guide & Articles
            </h2>
            <p className="text-xs text-slate-300">
              Expert advice on Garba pass selection, venue parking, dress codes, and artist schedules.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="bg-festive-card/80 rounded-3xl border border-purple-900/50 overflow-hidden cursor-pointer hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white hover:text-amber-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2 text-[11px] text-purple-300 flex items-center justify-between">
                  <span>{post.publishDate}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-extrabold text-white">
            What Garba Lovers Say About Us
          </h2>
          <p className="text-xs text-slate-300">
            Real feedback from Navratri attendees in SG Highway, Bopal, and Satellite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "Booking our YMCA passes on WhatsApp was super fast! Received instant response on 916767676549 within seconds."
            </p>
            <div className="pt-2 border-t border-purple-900/40">
              <p className="text-xs font-bold text-white">Jigar & Pooja Patel</p>
              <p className="text-[10px] text-purple-300">SG Highway, Ahmedabad</p>
            </div>
          </div>

          <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "We got 6 Season Passes for Rajpath Club over WhatsApp. Extremely smooth service!"
            </p>
            <div className="pt-2 border-t border-purple-900/40">
              <p className="text-xs font-bold text-white">Harshil Shah</p>
              <p className="text-[10px] text-purple-300">Satellite, Ahmedabad</p>
            </div>
          </div>

          <div className="bg-festive-card/80 p-6 rounded-3xl border border-purple-900/50 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "Best Garba pass portal in Gujarat. Direct WhatsApp support and zero hassle!"
            </p>
            <div className="pt-2 border-t border-purple-900/40">
              <p className="text-xs font-bold text-white">Neha Vora</p>
              <p className="text-[10px] text-purple-300">Bopal, Ahmedabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-300">
            Everything you need to know about buying Garba passes in Ahmedabad.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-festive-card/80 rounded-2xl border border-purple-900/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-3 hover:text-amber-300"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-purple-900/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
