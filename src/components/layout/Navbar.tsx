import React, { useState } from 'react';
import { Sparkles, Ticket, Search, Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onWhatsAppBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onWhatsAppBook
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Garba Events', path: '/events' },
    { label: 'Pass Types', path: '/garba-passes' },
    { label: 'Season Passes', path: '/season-passes' },
    { label: '2026 Guide', path: '/navratri-2026-guide' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-festive-darker/90 backdrop-blur-md border-b border-purple-900/40 transition-all">
      {/* Top Festival Banner Announcement Bar */}
      <div className="bg-gradient-to-r from-festive-purple via-rose-700 to-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Navratri 2026 Official Garba Passes Now Live in Ahmedabad! WhatsApp Support: <a href="https://wa.me/916767676549" target="_blank" rel="noreferrer" className="underline font-bold">+91 6767676549</a></span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-700 p-0.5 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-festive-dark rounded-[10px] flex items-center justify-center">
                <span className="text-2xl">🪔</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  GARBA PASS
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 font-medium tracking-wide">
                AHMEDABAD • GUJARAT
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                    isActive ? 'text-amber-400 font-bold border-b-2 border-amber-400 py-1' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-300 hover:text-white bg-festive-card/60 hover:bg-festive-card border border-purple-800/40 rounded-xl transition-all"
              title="Search Events"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin Dashboard Quick Link */}
            <button
              onClick={() => onNavigate('/admin')}
              className={`p-2.5 text-xs font-semibold flex items-center gap-1.5 rounded-xl border transition-all ${
                currentPath === '/admin'
                  ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                  : 'bg-festive-card/60 text-slate-300 border-purple-800/40 hover:text-white'
              }`}
              title="Organizers Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 text-rose-400" />
              <span className="hidden xl:inline">Organizers</span>
            </button>

            {/* Primary CTA: Direct WhatsApp Booking */}
            <button
              onClick={onWhatsAppBook}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white shadow-lg shadow-teal-950/50 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Pass via WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 bg-festive-card rounded-lg border border-purple-800/40"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-amber-400 bg-festive-card rounded-lg border border-purple-800/40"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-festive-darker border-b border-purple-900/60 px-4 pt-4 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-2.5 px-3 rounded-lg font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'bg-festive-card/40 text-slate-300 hover:bg-festive-card'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('/admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-festive-card border border-purple-800/40 text-purple-200 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-rose-400" />
              <span>Organizers & Admin Portal</span>
            </button>

            <button
              onClick={() => {
                onWhatsAppBook();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white shadow-lg text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Pass via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
