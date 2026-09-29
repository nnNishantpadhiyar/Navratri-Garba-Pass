import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PassesPage } from './pages/PassesPage';
import { SeasonPassesPage } from './pages/SeasonPassesPage';
import { GuidePage } from './pages/GuidePage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShareModal } from './components/social/ShareModal';
import { GARBA_EVENTS } from './data/garbaEvents';
import { GarbaEvent, PassTier, BookingDetails } from './types';
import { Search, X } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [eventsList, setEventsList] = useState<GarbaEvent[]>(GARBA_EVENTS);
  
  // Modal States
  const [shareTarget, setShareTarget] = useState<GarbaEvent | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [globalSearchInput, setGlobalSearchInput] = useState<string>('');

  // Central WhatsApp Booking Handler for number 916767676549
  const handleWhatsAppBook = (eventName?: string, venue?: string) => {
    const text = encodeURIComponent(
      `🪔 *NAVRATRI GARBA PASS BOOKING 2026*\n` +
      `Hi, I want to book Garba Passes for ${eventName ? `*${eventName}*` : 'Navratri 2026'} ${venue ? `at ${venue}` : 'in Ahmedabad'}.\n` +
      `Please share pass availability and payment details!`
    );
    window.open(`https://wa.me/916767676549?text=${text}`, '_blank');
  };

  // Initial Bookings Ledger state for Admin Dashboard
  const [bookingsLedger, setBookingsLedger] = useState<BookingDetails[]>([
    {
      bookingId: 'GB-2026-849201',
      eventId: 'evt-mirchi-rock-dhol-2026',
      eventName: 'Mirchi Rock & Dhol 2026',
      eventDate: '2026-10-11',
      venueName: 'YMCA International Club Grounds',
      address: 'SG Highway, Vejalpur, Ahmedabad',
      passTierId: 'pass-mrd-couple',
      passTierName: 'Couple Daily Pass',
      quantity: 1,
      unitPrice: 899,
      discountAmount: 90,
      totalPaid: 809,
      customerName: 'Harshil Shah',
      customerEmail: 'harshil@example.com',
      customerPhone: '916767676549',
      qrCodeData: '{"id":"GB-2026-849201","event":"Mirchi Rock & Dhol 2026"}',
      bookingTimestamp: '2026-09-25T14:30:00Z',
      paymentMethod: 'UPI',
      status: 'CONFIRMED'
    }
  ]);

  // Handle URL change
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Render main page content based on current route
  const renderCurrentView = () => {
    // 1. Individual Event Detail Page: /events/:slug
    if (currentPath.startsWith('/events/')) {
      const slug = currentPath.replace('/events/', '');
      const eventObj = eventsList.find(e => e.slug === slug);
      if (eventObj) {
        return (
          <EventDetailPage
            event={eventObj}
            onBookPass={(evt) => handleWhatsAppBook(evt.name, evt.venue)}
            onShareEvent={(evt) => setShareTarget(evt)}
            onNavigate={navigateTo}
          />
        );
      }
    }

    // 2. Blog Post Detail View: /blog/:slug
    if (currentPath.startsWith('/blog/')) {
      const blogSlug = currentPath.replace('/blog/', '');
      return <BlogPostPage slug={blogSlug} onNavigate={navigateTo} />;
    }

    // 3. Standard Top-Level Routes
    switch (currentPath) {
      case '/events':
      case '/garba-events-ahmedabad':
        return (
          <HomePage
            events={eventsList}
            onSelectEvent={(evt) => navigateTo(`/events/${evt.slug}`)}
            onBookPass={(evt) => handleWhatsAppBook(evt.name, evt.venue)}
            onShareEvent={(evt) => setShareTarget(evt)}
            onNavigate={navigateTo}
            onWhatsAppBook={handleWhatsAppBook}
          />
        );

      case '/garba-passes':
        return (
          <PassesPage
            events={eventsList}
            onBookPass={(evt) => handleWhatsAppBook(evt.name, evt.venue)}
            onNavigate={navigateTo}
          />
        );

      case '/season-passes':
        return (
          <SeasonPassesPage
            events={eventsList}
            onBookPass={(evt) => handleWhatsAppBook(evt.name, evt.venue)}
            onNavigate={navigateTo}
          />
        );

      case '/navratri-2026-guide':
        return <GuidePage onNavigate={navigateTo} />;

      case '/blog':
        return <BlogListPage onNavigate={navigateTo} />;

      case '/faq':
        return <FAQPage />;

      case '/contact':
        return <ContactPage />;

      case '/terms':
        return <LegalPage type="terms" />;

      case '/privacy':
        return <LegalPage type="privacy" />;

      case '/refund-policy':
        return <LegalPage type="refund" />;

      case '/admin':
        return (
          <AdminDashboard
            events={eventsList}
            bookings={bookingsLedger}
            onAddEvent={(newEvent) => setEventsList(prev => [newEvent, ...prev])}
            onUpdateEvent={(updated) => setEventsList(prev => prev.map(e => e.id === updated.id ? updated : e))}
          />
        );

      case '/':
      default:
        return (
          <HomePage
            events={eventsList}
            onSelectEvent={(evt) => navigateTo(`/events/${evt.slug}`)}
            onBookPass={(evt) => handleWhatsAppBook(evt.name, evt.venue)}
            onShareEvent={(evt) => setShareTarget(evt)}
            onNavigate={navigateTo}
            onWhatsAppBook={handleWhatsAppBook}
          />
        );
    }
  };

  return (
    <div className="min-h-screen text-[#f8fafc] flex flex-col font-sans selection:bg-[#facc15] selection:text-[#0a1128]" style={{background:'#0a1128'}}>
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
        onWhatsAppBook={() => handleWhatsAppBook()}
      />

      {/* Main Dynamic View */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* SEO Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Social Share Modal */}
      {shareTarget && (
        <ShareModal
          event={shareTarget}
          onClose={() => setShareTarget(null)}
        />
      )}

      {/* Global Quick Search Overlay */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl p-4 flex items-start justify-center pt-[10vh]"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchModalOpen(false); }}
        >
          <div className="glass border border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl shadow-black/50 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
              <div>
                <h3 className="text-base font-display font-bold text-white">Search Garba Events</h3>
                <p className="text-xs text-slate-500 mt-0.5">Find events by name, venue, artist or location</p>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="search-bar">
              <Search className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={globalSearchInput}
                onChange={(e) => setGlobalSearchInput(e.target.value)}
                placeholder="e.g. YMCA, Kinjal Dave, Bopal..."
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {eventsList
                .filter(e =>
                  !globalSearchInput ||
                  e.name.toLowerCase().includes(globalSearchInput.toLowerCase()) ||
                  e.venue.toLowerCase().includes(globalSearchInput.toLowerCase()) ||
                  e.locationName.toLowerCase().includes(globalSearchInput.toLowerCase())
                )
                .map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => { navigateTo(`/events/${evt.slug}`); setSearchModalOpen(false); }}
                    className="p-3.5 bg-blue-950/40 hover:bg-blue-900/40 rounded-xl border border-blue-800/40 hover:border-yellow-400/50 cursor-pointer flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors truncate">{evt.name}</p>
                      <p className="text-xs text-blue-200/60 truncate">{evt.venue} • {evt.locationName}</p>
                    </div>
                    <span className="text-sm font-black text-yellow-400 shrink-0">₹{evt.startingPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              {eventsList.filter(e =>
                !globalSearchInput ||
                e.name.toLowerCase().includes(globalSearchInput.toLowerCase()) ||
                e.venue.toLowerCase().includes(globalSearchInput.toLowerCase())
              ).length === 0 && (
                <p className="text-center text-sm text-slate-500 py-8">No events found for "{globalSearchInput}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916767676549?text=Hi%20I%20want%20to%20book%20a%20Navratri%20Garba%20Pass%202026%20in%20Ahmedabad"
        target="_blank"
        rel="noreferrer"
        className="fab-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Book on WhatsApp — +91 6767676549"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.97 0C5.367 0 0 5.367 0 11.97c0 2.1.55 4.07 1.5 5.77L.1 23.9l6.37-1.37A11.94 11.94 0 0011.97 24C18.573 24 24 18.633 24 12.03 24 5.427 18.573 0 11.97 0zm0 21.818a9.843 9.843 0 01-5.016-1.366l-.36-.214-3.729.977.995-3.638-.236-.375a9.847 9.847 0 01-1.515-5.232c0-5.446 4.43-9.876 9.876-9.876 5.445 0 9.875 4.43 9.875 9.876 0 5.445-4.43 9.848-9.875 9.848z"/>
        </svg>
      </a>

    </div>
  );
};

export default App;
