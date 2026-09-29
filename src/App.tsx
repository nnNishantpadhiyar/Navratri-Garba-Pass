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
    <div className="min-h-screen bg-festive-dark text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-start justify-center pt-20">
          <div className="bg-festive-card border border-purple-800/60 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
              <h3 className="text-base font-bold text-white">Search Garba Events</h3>
              <button onClick={() => setSearchModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input 
                type="text"
                autoFocus
                value={globalSearchInput}
                onChange={(e) => setGlobalSearchInput(e.target.value)}
                placeholder="Type event name, artist, venue or location..."
                className="w-full bg-festive-dark border border-purple-800/60 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {eventsList
                .filter(e => e.name.toLowerCase().includes(globalSearchInput.toLowerCase()) || e.venue.toLowerCase().includes(globalSearchInput.toLowerCase()))
                .map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      navigateTo(`/events/${evt.slug}`);
                      setSearchModalOpen(false);
                    }}
                    className="p-3 bg-festive-dark/60 hover:bg-festive-dark rounded-xl border border-purple-900/40 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{evt.name}</p>
                      <p className="text-[11px] text-amber-400">{evt.venue}</p>
                    </div>
                    <span className="font-bold text-amber-300">From ₹{evt.startingPrice}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
