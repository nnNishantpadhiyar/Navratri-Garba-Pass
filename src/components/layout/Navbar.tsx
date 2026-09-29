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
            ? 'rgba(10, 17, 40, 0.95)'
            : 'linear-gradient(180deg, rgba(10, 17, 40, 0.92) 0%, rgba(10, 17, 40, 0.0) 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(250, 204, 21, 0.15)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(2, 6, 23, 0.5)' : 'none',
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
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-md shadow-blue-900/40"
                style={{ background: 'linear-gradient(135deg, #facc15, #1d4ed8)' }}
              >
                🪔
              </div>
              <div className="hidden sm:block text-left">
                <span
                  className="font-bold text-base leading-none text-white block"
                  style={{ fontFamily: 'Libre Baskerville, serif' }}
                >
                  Garba Pass
                </span>
                <div
                  className="text-xs font-bold mt-0.5 leading-none tracking-wider"
                  style={{ color: '#facc15', fontFamily: 'DM Sans, sans-serif' }}
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
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center transition-all hover:border-yellow-400/50 hover:text-yellow-300"
                style={{
                  background: 'rgba(30, 58, 138, 0.25)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: 'rgba(248, 250, 252, 0.75)',
                }}
                aria-label="Search events"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* WhatsApp CTA Button in Festive Yellow */}
              <button
                onClick={onWhatsAppBook}
                className="btn-primary text-xs sm:text-sm px-4 py-2 rounded-xl font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Pass
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex w-9 h-9 rounded-xl items-center justify-center transition-all"
                style={{
                  background: 'rgba(30, 58, 138, 0.3)',
                  border: '1px solid rgba(250, 204, 21, 0.25)',
                  color: '#facc15',
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
          style={{ background: 'rgba(6, 11, 28, 0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 animate-slide-up"
            style={{
              background: '#0c1736',
              borderBottom: '1px solid rgba(250, 204, 21, 0.2)',
              boxShadow: '0 20px 40px rgba(2, 6, 23, 0.7)',
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
                    background: isActive(path) ? 'rgba(250, 204, 21, 0.14)' : 'transparent',
                    color: isActive(path) ? '#facc15' : 'rgba(248, 250, 252, 0.8)',
                    border: isActive(path) ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid transparent',
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
                    background: 'rgba(30, 58, 138, 0.3)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    color: '#f8fafc',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <Search className="w-4 h-4 text-yellow-400" /> Search
                </button>
                <button
                  onClick={() => { onWhatsAppBook(); setMobileOpen(false); }}
                  className="btn-primary flex-1 justify-center py-3 text-sm font-bold"
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
