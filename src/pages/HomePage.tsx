import React, { useState } from 'react';
import {
  Sparkles, Calendar, MapPin, Search, ArrowRight, ShieldCheck,
  Ticket, Star, ChevronDown, MessageSquare, CheckCircle2,
  Zap, Award, TrendingUp, Users, Phone
} from 'lucide-react';
import { GarbaEvent, PassTier } from '../types';
import { EventCard } from '../components/events/EventCard';
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

const TRUST_ITEMS = [
  '🪔 5,000+ Passes Sold',
  '⭐ 4.9★ Rated Service',
  '💬 WhatsApp Reply in 2 Min',
  '🛡️ 100% Verified Events',
  '🎉 Ahmedabad\'s #1 Garba Portal',
  '🎊 9 Nights of Garba 2026',
  '🪔 5,000+ Passes Sold',
  '⭐ 4.9★ Rated Service',
  '💬 WhatsApp Reply in 2 Min',
  '🛡️ 100% Verified Events',
  '🎉 Ahmedabad\'s #1 Garba Portal',
  '🎊 9 Nights of Garba 2026',
];

const STATS = [
  { value: '5,000+', label: 'Passes Sold',    icon: Ticket,   color: '#F59E0B' },
  { value: '12+',    label: 'Event Venues',   icon: MapPin,   color: '#F43F5E' },
  { value: '4.9★',   label: 'Avg Rating',     icon: Star,     color: '#FDE047' },
  { value: '2 Min',  label: 'WA Reply Time',  icon: Zap,      color: '#10B981' },
];

const WHY_US = [
  {
    emoji: '🛡️',
    title: 'Verified Event Info',
    desc: 'Direct partnership with YMCA, Rajpath & Karnavati organizers. Zero fake listings.',
    gradient: 'from-amber-500/15 to-amber-500/5',
    border: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.1)',
  },
  {
    emoji: '💬',
    title: 'Instant WhatsApp Booking',
    desc: 'Get your pass confirmed in minutes on +91 6767676549. No app downloads needed.',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
    border: 'rgba(16,185,129,0.25)',
    glow: 'rgba(16,185,129,0.1)',
  },
  {
    emoji: '🎟️',
    title: 'Instant Digital Pass',
    desc: 'Digital pass sent directly to your phone. Show QR at gate — zero hassle entry.',
    gradient: 'from-rose-500/15 to-rose-500/5',
    border: 'rgba(244,63,94,0.25)',
    glow: 'rgba(244,63,94,0.1)',
  },
  {
    emoji: '👑',
    title: 'VIP & Season Passes',
    desc: 'Exclusive VIP zones, front rows & 9-night full season passes at the best prices.',
    gradient: 'from-purple-500/15 to-purple-500/5',
    border: 'rgba(168,85,247,0.25)',
    glow: 'rgba(168,85,247,0.1)',
  },
];

const TESTIMONIALS = [
  {
    rating: 5,
    text: 'Booking our YMCA passes was super smooth! Got instant response on WhatsApp within seconds. Best Garba pass service in Ahmedabad!',
    name: 'Jigar & Pooja Patel',
    location: 'SG Highway, Ahmedabad',
    initials: 'JP',
    color: 'from-purple-600 to-rose-600',
  },
  {
    rating: 5,
    text: 'Got 6 Season Passes for Rajpath Club over WhatsApp. Extremely smooth service and very prompt delivery of digital passes!',
    name: 'Harshil Shah',
    location: 'Satellite, Ahmedabad',
    initials: 'HS',
    color: 'from-amber-600 to-orange-600',
  },
  {
    rating: 5,
    text: 'Best Garba pass portal in Gujarat. Direct WhatsApp support and zero hassle. Danced all 9 nights stress-free. 100% recommended!',
    name: 'Neha Vora',
    location: 'Bopal, Ahmedabad',
    initials: 'NV',
    color: 'from-teal-600 to-emerald-600',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  events, onSelectEvent, onShareEvent, onNavigate, onWhatsAppBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const filteredEvents = events.filter((evt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      evt.name.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.locationName.toLowerCase().includes(q) ||
      evt.artistName.toLowerCase().includes(q)
    );
  });

  const trendingEvents = events.filter((e) => e.badges.includes('Trending'));

  return (
    <div className="pb-24">
      <SEOHead
        title="Navratri Garba Pass Ahmedabad 2026 | Garba Tickets & Events"
        description="Book Navratri Garba Passes and Tickets in Ahmedabad for 2026. Discover Garba events, venues, dates, prices and season passes. Book your pass on WhatsApp."
      />

      {/* ══════════════════════════════════════════
          HERO SECTION — with background image
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* ── Real Background Image ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        {/* ── Dark gradient overlays for readability ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#07030F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        {/* Purple tint overlay for brand feel */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(88,28,135,0.3) 0%, transparent 70%)' }} />

        {/* ── Floating particles ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {['🪔','✨','🌸','💫','🪔','✨'].map((e, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-float opacity-50"
              style={{
                left: `${10 + i * 16}%`,
                top: `${15 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* ── Hero Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12 space-y-8">

          {/* Pill label */}
          <div className="flex justify-center">
            <div
              className="section-label"
              style={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.35)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              NAVRATRI 2026 • AHMEDABAD • OFFICIAL BOOKING
            </div>
          </div>

          {/* Main Heading */}
          <div>
            <h1
              className="font-display font-black leading-[0.92] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
            >
              Navratri Garba
              <br />
              <span className="text-gradient-aurora">Pass Ahmedabad</span>
              <br />
              <span
                className="text-gradient-gold font-black"
                style={{ fontSize: '0.65em' }}
              >
                2026
              </span>
            </h1>
          </div>

          {/* Sub text */}
          <p className="text-base sm:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover Ahmedabad's best Garba nights, Navratri events & Dandiya experiences.
            <br className="hidden sm:block" />
            <span className="text-amber-300 font-bold">Book your Garba Pass instantly on WhatsApp.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onWhatsAppBook()}
              className="btn-primary w-full sm:w-auto text-base px-8 py-4 rounded-2xl"
              style={{ fontSize: '1rem' }}
            >
              <span className="text-xl">💬</span>
              Book Pass on WhatsApp
            </button>
            <button
              onClick={() => { document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary w-full sm:w-auto text-base px-8 py-4 rounded-2xl"
            >
              <Sparkles className="w-5 h-5" />
              Explore Garba Events
            </button>
          </div>


        </div>

        {/* ── Scrolling Trust Strip ── */}
        <div
          className="relative py-3 overflow-hidden border-y"
          style={{
            background: 'rgba(7,3,15,0.85)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {TRUST_ITEMS.map((text, i) => (
              <div key={i} className="trust-item shrink-0 text-sm">{text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTS SEARCH SECTION
      ══════════════════════════════════════════ */}
      <section id="events-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <span className="section-label"><Search className="w-3.5 h-3.5" /> Search Garba Events</span>
          </div>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Find Your Perfect Garba Night
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Search by event name, venue, artist or location. All events are 100% verified.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="search-bar">
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <input
              type="search"
              placeholder="Search YMCA, Kinjal Dave, SG Highway, Rajpath..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Garba events"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-500 hover:text-white transition-colors font-bold text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-xs text-slate-500 mt-2">
              {filteredEvents.length} result{filteredEvents.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div
            className="text-center py-20 rounded-3xl space-y-4"
            style={{ background: 'rgba(14,8,32,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-display font-bold text-white">
              No events found for "{searchQuery}"
            </h3>
            <p className="text-sm text-slate-400">Try searching YMCA, Kinjal Dave, Bopal or SG Highway.</p>
            <button onClick={() => setSearchQuery('')} className="btn-secondary text-sm px-6 py-2.5 mt-2">
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          TRENDING EVENTS — with event-bg image
      ══════════════════════════════════════════ */}
      {trendingEvents.length > 0 && (
        <section className="relative overflow-hidden py-20">
          {/* Background image for this section */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: "url('/event-bg.jpg')" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #07030F 0%, rgba(7,3,15,0.7) 50%, #07030F 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(225,29,72,0.08) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <span className="section-label"><TrendingUp className="w-3.5 h-3.5" /> Hot Right Now</span>
                <h2
                  className="font-display font-black text-white"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                >
                  Trending Garba Events 2026
                </h2>
                <p className="text-slate-400 text-sm">Ahmedabad's most popular Garba nights — filling up fast!</p>
              </div>
              <button
                onClick={() => onNavigate('/events')}
                className="flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-white transition-colors group shrink-0"
              >
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingEvents.map((evt) => (
                <EventCard
                  key={`tr-${evt.id}`}
                  event={evt}
                  onSelectEvent={onSelectEvent}
                  onBookPass={() => onWhatsAppBook(evt.name, evt.venue)}
                  onShareEvent={onShareEvent}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          WHY BOOK WITH US
      ══════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(42,8,92,0.08) 0%, rgba(7,3,15,0) 100%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="section-label"><ShieldCheck className="w-3.5 h-3.5" /> Why Choose Us</span>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Why Book Garba Passes With Us?
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Instant WhatsApp booking & verified event info for Ahmedabad Navratri 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map(({ emoji, title, desc, gradient, border, glow }) => (
              <div
                key={title}
                className={`glass-hover relative p-6 rounded-2xl space-y-4 bg-gradient-to-br ${gradient}`}
                style={{ border: `1px solid ${border}` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: glow, border: `1px solid ${border}` }}
                >
                  {emoji}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button onClick={() => onWhatsAppBook()} className="btn-whatsapp text-base px-10 py-4 rounded-2xl">
              <span className="text-xl">💬</span>
              Chat on WhatsApp — +91 6767676549
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOG / GUIDE ARTICLES
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="section-label"><Calendar className="w-3.5 h-3.5" /> Navratri 2026 Guide</span>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Garba Guides & Articles
            </h2>
            <p className="text-slate-400 text-sm">Expert tips on passes, venues, dress codes & artist schedules.</p>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-white transition-colors group shrink-0"
          >
            Read All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} onClick={() => onNavigate(`/blog/${post.slug}`)} className="blog-card group">
              <div className="blog-card-img-wrap">
                <img src={post.coverImage} alt={post.title} loading="lazy" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,3,15,0.7) 0%, transparent 60%)' }}
                />
              </div>
              <div className="p-5 space-y-3">
                <span
                  className="inline-block text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
                >
                  {post.category}
                </span>
                <h3 className="text-sm font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div
                  className="flex items-center justify-between text-xs text-slate-500 pt-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span>{post.publishDate}</span>
                  <span>📖 {post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="text-center space-y-4">
          <span className="section-label"><Star className="w-3.5 h-3.5" /> Customer Reviews</span>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            What Garba Lovers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ rating, text, name, location, initials, color }) => (
            <div key={name} className="testimonial-card">
              {/* Quote mark */}
              <div
                className="text-6xl font-display font-black leading-none mb-4 select-none"
                style={{ color: 'rgba(245,158,11,0.2)' }}
              >
                "
              </div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">"{text}"</p>
              <div
                className="mt-5 pt-4 flex items-center gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="text-xs text-purple-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 p-8 rounded-2xl max-w-xl mx-auto"
          style={{ background: 'rgba(14,8,32,0.7)', border: '1px solid rgba(245,158,11,0.15)' }}
        >
          <div className="text-center">
            <p className="text-6xl font-display font-black text-gradient-gold">4.9</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
          </div>
          <div className="w-px h-14 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg">5,000+ Happy Customers</p>
            <p className="text-sm text-slate-400 mt-0.5">Based on WhatsApp & Google reviews</p>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">All Reviews Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <div className="text-center space-y-4">
          <span className="section-label"><MessageSquare className="w-3.5 h-3.5" /> FAQ</span>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-bold text-white leading-snug">{faq.question}</span>
                  <ChevronDown
                    className="w-4 h-4 text-amber-400 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-sm text-slate-400 leading-relaxed pt-3 animate-fade-in"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button onClick={() => onWhatsAppBook()} className="btn-whatsapp inline-flex text-sm px-7 py-3 rounded-xl">
            <span className="text-lg">💬</span>
            Ask on WhatsApp
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative overflow-hidden rounded-3xl p-10 text-center space-y-6">
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.85) 0%, rgba(157,23,77,0.7) 50%, rgba(120,53,15,0.6) 100%)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)' }} />

          <div className="relative z-10 space-y-6">
            <div className="text-5xl animate-float">🎉</div>
            <div className="space-y-3">
              <h2
                className="font-display font-black text-white leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                Ready to Dance All 9 Nights?
                <br />
                <span className="text-gradient-gold">Book Your Garba Pass Now!</span>
              </h2>
              <p className="text-slate-200 text-sm max-w-xl mx-auto">
                Limited passes available. Don't miss Ahmedabad's biggest Navratri events of 2026!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => onWhatsAppBook()} className="btn-primary text-base px-10 py-4 rounded-2xl w-full sm:w-auto">
                <span className="text-xl">💬</span>
                Book on WhatsApp Now
              </button>
              <button onClick={() => onNavigate('/events')} className="btn-secondary text-base px-10 py-4 rounded-2xl w-full sm:w-auto">
                View All Events <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-emerald-400" />
              <a href="tel:+916767676549" className="text-emerald-400 font-bold hover:text-white transition-colors">
                +91 6767676549
              </a>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">WhatsApp 9AM – 10PM Daily</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
