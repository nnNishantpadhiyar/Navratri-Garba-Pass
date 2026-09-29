import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Search, ArrowRight, ShieldCheck, Ticket, Star, ChevronDown, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { GarbaEvent, LocationSlug, PassTier } from '../types';
import { EventCard } from '../components/events/EventCard';
import { EventFilter } from '../components/events/EventFilter';
import { PassCard } from '../components/passes/PassCard';
import { LOCATION_DATA } from '../data/locationData';
import { BLOG_POSTS } from '../data/blogPosts';
import { FAQ_ITEMS } from '../data/faqData';
import { SEOHead } from '../components/seo/SEOHead';

interface HomePageProps {
  events: GarbaEvent[];
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent, pass?: PassTier) => void;
  onShareEvent: (event: GarbaEvent) => void;
  onNavigate: (path: string) => void;
  selectedLocation: LocationSlug | 'all';
  onLocationChange: (loc: LocationSlug | 'all') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  onSelectEvent,
  onBookPass,
  onShareEvent,
  onNavigate,
  selectedLocation,
  onLocationChange
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedPassType, setSelectedPassType] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Filter events
  const filteredEvents = events.filter((evt) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = evt.name.toLowerCase().includes(q);
      const matchVenue = evt.venue.toLowerCase().includes(q);
      const matchLoc = evt.locationName.toLowerCase().includes(q);
      const matchArtist = evt.artistName.toLowerCase().includes(q);
      if (!matchName && !matchVenue && !matchLoc && !matchArtist) return false;
    }

    // Location
    if (selectedLocation !== 'all' && evt.locationSlug !== selectedLocation) {
      return false;
    }

    // Price
    if (evt.startingPrice > maxPrice) {
      return false;
    }

    // Pass Type
    if (selectedPassType !== 'all') {
      const hasPass = evt.passes.some(p => p.name === selectedPassType);
      if (!hasPass) return false;
    }

    // Badge
    if (selectedBadge !== 'all') {
      if (!evt.badges.includes(selectedBadge as any)) return false;
    }

    return true;
  });

  const trendingEvents = events.filter(e => e.badges.includes('Trending'));

  // Dedicated sample pass types for global display
  const samplePassTypes: PassTier[] = [
    {
      id: 'p-daily',
      name: 'Daily Entry Pass',
      price: 499,
      originalPrice: 699,
      description: 'General single-night admission to main dance ground and food courts',
      validity: 'Single Night (Choose Date)',
      benefits: ['Main Garba Ground Entry', 'Access to 30+ Food Stalls', 'General Parking Access'],
      availableCount: 45
    },
    {
      id: 'p-couple',
      name: 'Couple Daily Pass',
      price: 899,
      originalPrice: 1199,
      description: 'Single night admission for 1 Male + 1 Female pair',
      validity: 'Single Night Couple Access',
      benefits: ['Fast-track Couple Entry Gate', 'Welcome Snack Coupon', 'Complimentary Mineral Water'],
      availableCount: 30,
      isPopular: true
    },
    {
      id: 'p-season',
      name: 'Full 9-Day Season Pass',
      price: 3499,
      originalPrice: 4499,
      description: 'Unlimited 9-night access for the complete Navratri 2026 festival',
      validity: 'All 9 Nights (Oct 11 - Oct 19)',
      benefits: ['Access all 9 Nights', 'Express VIP Gate Access', 'Personalized RFID Wristband', 'Priority Parking Slot'],
      availableCount: 15
    },
    {
      id: 'p-vip',
      name: 'VIP Lounge Pass',
      price: 6999,
      originalPrice: 8999,
      description: 'Exclusive elevated VIP lounge viewing with complimentary gourmet beverages',
      validity: 'All 9 Nights VIP Lounge',
      benefits: ['Elevated Stage View', 'Air-Conditioned VIP Lounge', 'Valet Parking Pass', 'Meet & Greet Celebrities'],
      availableCount: 5
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      <SEOHead 
        title="Navratri Garba Pass Ahmedabad 2026 | Official Tickets & Events"
        description="Book Navratri Garba Passes and Tickets in Ahmedabad for 2026. Discover SG Highway Garba events, Rajpath Club, YMCA, Bopal season passes, prices & digital QR tickets."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-hero-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Festive Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 text-amber-300 text-xs font-extrabold px-4 py-2 rounded-full border border-amber-500/40 shadow-lg animate-float">
            <span className="text-base">🪔</span>
            <span>OFFICIAL NAVRATRI GARBA PASS PORTAL • AHMEDABAD 2026</span>
          </div>

          {/* H1 Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight">
              Navratri Garba Pass <br />
              <span className="text-gold-gradient">Ahmedabad 2026</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover Ahmedabad's best Garba nights, Navratri events and Dandiya experiences. Explore events along SG Highway, Bopal & Satellite, compare passes and book your official Garba Pass online with instant QR ticket delivery.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('events-discovery');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white shadow-xl shadow-rose-950/60 hover:shadow-amber-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Explore Garba Events</span>
            </button>

            <button
              onClick={() => onNavigate('/garba-passes')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-festive-card/90 border border-purple-600/50 hover:border-amber-400 text-purple-200 hover:text-white shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Buy Season Garba Pass</span>
            </button>
          </div>

          {/* Core Info Badges: WHAT / WHERE / WHEN / ACTION */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs">
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHAT</p>
              <p className="font-bold text-white text-sm">Garba Events & Passes</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHERE</p>
              <p className="font-bold text-amber-400 text-sm">Ahmedabad, Gujarat</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">WHEN</p>
              <p className="font-bold text-rose-400 text-sm">Navratri 2026 (Oct 11-19)</p>
            </div>
            <div className="bg-festive-card/70 p-3 rounded-2xl border border-purple-900/50 text-center">
              <p className="text-[10px] text-purple-300 uppercase font-semibold">ACTION</p>
              <p className="font-bold text-emerald-400 text-sm">Instant Digital Pass</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EVENT DISCOVERY & FILTER SECTION */}
      <section id="events-discovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-black text-white">
            Discover Garba Events in Ahmedabad
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Search by venue, date, location, or price. All passes sold on our platform are 100% verified with instant gate QR codes.
          </p>
        </div>

        {/* Multi-Filter Bar */}
        <EventFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLocation={selectedLocation}
          onLocationChange={onLocationChange}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          selectedPassType={selectedPassType}
          onPassTypeChange={setSelectedPassType}
          selectedBadge={selectedBadge}
          onBadgeChange={setSelectedBadge}
          onResetFilters={() => {
            setSearchQuery('');
            onLocationChange('all');
            setMaxPrice(2000);
            setSelectedPassType('all');
            setSelectedBadge('all');
          }}
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
                onBookPass={onBookPass}
                onShareEvent={onShareEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-festive-card/60 rounded-3xl border border-purple-900/50 space-y-3">
            <Search className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Garba events found matching filters</h3>
            <p className="text-xs text-slate-400">Try adjusting your location or price range filter.</p>
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
              Highest selling Garba nights in Ahmedabad with Kinjal Dave, Aishwarya Majmudar, and 100+ Dhol troupes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/events')}
            className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All 50+ Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingEvents.map((evt) => (
            <EventCard
              key={`trending-${evt.id}`}
              event={evt}
              onSelectEvent={onSelectEvent}
              onBookPass={onBookPass}
              onShareEvent={onShareEvent}
            />
          ))}
        </div>
      </section>

      {/* 4. GARBA EVENTS BY LOCATION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-black text-white">
            Explore Garba Passes by Location
          </h2>
          <p className="text-xs text-slate-300">
            Find Garba passes near your neighborhood in Ahmedabad, Gandhinagar, Vadodara & Surat.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.values(LOCATION_DATA).map((loc) => (
            <div
              key={loc.slug}
              onClick={() => onNavigate(`/garba-pass-${loc.slug}`)}
              className="group relative bg-festive-card/80 p-4 rounded-2xl border border-purple-900/50 hover:border-amber-400/80 cursor-pointer transition-all duration-300 space-y-2 overflow-hidden hover:scale-[1.03]"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                {loc.name}
              </h3>
              <p className="text-[11px] text-purple-300 truncate">
                {loc.topVenues.length} Garba Venues
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DEDICATED PASS TYPES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-black text-white">
            Navratri Pass Types & Pricing Breakdown
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Choose the pass that best fits your Navratri plans. From single-night daily passes to full 9-night VIP season passes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {samplePassTypes.map((pass) => (
            <PassCard
              key={pass.id}
              pass={pass}
              onBookNow={() => onNavigate('/events')}
            />
          ))}
        </div>
      </section>

      {/* 6. WHY BOOK WITH US (TRUST & CONVERSION SECTION) */}
      <section className="bg-gradient-to-r from-festive-purple via-rose-950 to-indigo-950 py-16 border-y border-purple-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-black text-white">
              Why Book Garba Passes With Us?
            </h2>
            <p className="text-xs text-purple-200">
              Trusted by over 50,000+ Garba lovers across Gujarat for safe, instant online ticket bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Verified Organizer Passes</h3>
              <p className="text-xs text-slate-300">Direct partnership with official YMCA, Rajpath & Karnavati venue committees.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Instant Digital QR Ticket</h3>
              <p className="text-xs text-slate-300">Receive your scannable QR pass on your phone instantly via WhatsApp and Email.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">100% Secure Payments</h3>
              <p className="text-xs text-slate-300">Encrypted UPI (GPay, PhonePe, Paytm), Debit/Credit Cards & Netbanking options.</p>
            </div>

            <div className="bg-festive-dark/70 p-6 rounded-3xl border border-purple-800/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">24x7 WhatsApp Helpdesk</h3>
              <p className="text-xs text-slate-300">Dedicated customer support for ticket inquiries, parking guidance & pass transfers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NAVRATRI 2026 GUIDE & BLOG PREVIEW */}
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

      {/* 8. CUSTOMER REVIEWS & TESTIMONIALS */}
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
              "Booking our YMCA Mirchi Rock & Dhol passes on this portal was so smooth! Received the QR code on WhatsApp in under 30 seconds."
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
              "We bought 6 Season Passes for Rajpath Club. The VIP express gate entry saved us over 40 minutes of queue time every single night!"
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
              "Best online Garba pass portal in Gujarat. Transparent prices, no hidden fees, and great customer support on WhatsApp!"
            </p>
            <div className="pt-2 border-t border-purple-900/40">
              <p className="text-xs font-bold text-white">Neha Vora</p>
              <p className="text-[10px] text-purple-300">Bopal, Ahmedabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-300">
            Everything you need to know about buying Garba passes online in Ahmedabad.
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
