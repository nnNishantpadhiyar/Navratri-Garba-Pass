import React, { useState, useEffect } from 'react';
import { Search, X, Menu, Phone } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onWhatsAppBook: () => void;
}

const NAV_LINKS = [
  { label: 'Events',        path: '/events' },
  { label: 'Garba Passes',  path: '/garba-passes' },
  { label: 'Season Passes', path: '/season-passes' },
  { label: 'Blog',          path: '/blog' },
  { label: 'FAQ',           path: '/faq' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath, onNavigate, onOpenSearch, onWhatsAppBook,
}) => {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(26,24,50,0.97)'
            : 'linear-gradient(180deg, rgba(26,24,50,0.92) 0%, rgba(26,24,50,0.0) 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(249,241,223,0.08)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ── */}
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #efab38, #d9573b)' }}
              >
                🪔
              </div>
              <div className="hidden sm:block">
                <span
                  className="font-bold text-base leading-none"
                  style={{ color: '#f9f1df', fontFamily: 'Libre Baskerville, serif' }}
                >
                  Garba Pass
                </span>
                <div
                  className="text-xs font-semibold mt-0.5 leading-none"
                  style={{ color: '#efab38', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.12em' }}
                >
                  AHMEDABAD 2026
                </div>
              </div>
            </button>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => handleNav(path)}
                  className={`nav-link text-sm ${isActive(path) ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center transition-all"
                style={{
                  background: 'rgba(249,241,223,0.07)',
                  border: '1px solid rgba(249,241,223,0.12)',
                  color: 'rgba(249,241,223,0.65)',
                }}
                aria-label="Search events"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* WhatsApp CTA */}
              <button
                onClick={onWhatsAppBook}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: '#efab38',
                  color: '#262346',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <Phone className="w-3.5 h-3.5" />
                Book Pass
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex w-9 h-9 rounded-xl items-center justify-center transition-all"
                style={{
                  background: 'rgba(249,241,223,0.07)',
                  border: '1px solid rgba(249,241,223,0.12)',
                  color: 'rgba(249,241,223,0.8)',
                }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 animate-slide-up"
            style={{
              background: '#1a1832',
              borderBottom: '1px solid rgba(249,241,223,0.10)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => handleNav(path)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: isActive(path) ? 'rgba(239,171,56,0.12)' : 'transparent',
                    color: isActive(path) ? '#efab38' : 'rgba(249,241,223,0.75)',
                    border: isActive(path) ? '1px solid rgba(239,171,56,0.25)' : '1px solid transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {label}
                </button>
              ))}

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => { onOpenSearch(); setMobileOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(249,241,223,0.07)',
                    border: '1px solid rgba(249,241,223,0.12)',
                    color: 'rgba(249,241,223,0.75)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <Search className="w-4 h-4" /> Search
                </button>
                <button
                  onClick={() => { onWhatsAppBook(); setMobileOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
                  style={{
                    background: '#efab38',
                    color: '#262346',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <Phone className="w-4 h-4" /> Book Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
