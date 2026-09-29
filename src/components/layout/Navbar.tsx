import React, { useState } from 'react';
import { Sparkles, Ticket, MapPin, Search, ShieldCheck, Menu, X, PhoneCall, LayoutDashboard } from 'lucide-react';
import { LocationSlug } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  selectedLocation: LocationSlug | 'all';
  onLocationChange: (loc: LocationSlug | 'all') => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  selectedLocation,
  onLocationChange,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Garba Events', path: '/events' },
    { label: 'Pass Types', path: '/garba-passes' },
    { label: 'Season Passes', path: '/season-passes' },
    { label: 'Locations', path: '/locations' },
    { label: '2026 Guide', path: '/navratri-2026-guide' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-festive-darker/90 backdrop-blur-md border-b border-purple-900/40 transition-all">
      {/* Top Festival Banner Announcement Bar */}
      <div className="bg-gradient-to-r from-festive-purple via-rose-700 to-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Navratri 2026 Official Garba Passes Now Live in Ahmedabad! Use code <span className="font-bold underline tracking-wide">GARBA2026</span> for 10% Off Early Bird Passes</span>
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

          {/* Location Quick Switcher */}
          <div className="hidden lg:flex items-center gap-2 bg-festive-card/80 border border-purple-800/40 px-3 py-1.5 rounded-full text-xs text-purple-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value as LocationSlug | 'all')}
              className="bg-transparent border-none text-slate-100 font-medium focus:outline-none cursor-pointer pr-2"
            >
              <option value="all" className="bg-festive-dark text-white">All Locations (Ahmedabad)</option>
              <option value="sg-highway" className="bg-festive-dark text-white">SG Highway</option>
              <option value="bopal" className="bg-festive-dark text-white">Bopal & South Bopal</option>
              <option value="satellite" className="bg-festive-dark text-white">Satellite</option>
              <option value="prahlad-nagar" className="bg-festive-dark text-white">Prahlad Nagar</option>
              <option value="thaltej" className="bg-festive-dark text-white">Thaltej & GMDC</option>
              <option value="gota" className="bg-festive-dark text-white">Gota</option>
              <option value="gandhinagar" className="bg-festive-dark text-white">Gandhinagar</option>
              <option value="vadodara" className="bg-festive-dark text-white">Vadodara</option>
              <option value="surat" className="bg-festive-dark text-white">Surat</option>
            </select>
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

            {/* Primary CTA: Book Pass */}
            <button
              onClick={() => onNavigate('/events')}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white shadow-lg shadow-rose-950/50 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Explore Passes</span>
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
          <div className="flex items-center gap-2 bg-festive-card p-2.5 rounded-xl border border-purple-800/40">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-purple-200">Location:</span>
            <select
              value={selectedLocation}
              onChange={(e) => {
                onLocationChange(e.target.value as LocationSlug | 'all');
                setMobileMenuOpen(false);
              }}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none w-full"
            >
              <option value="all" className="bg-festive-dark">All Ahmedabad Locations</option>
              <option value="sg-highway" className="bg-festive-dark">SG Highway</option>
              <option value="bopal" className="bg-festive-dark">Bopal & South Bopal</option>
              <option value="satellite" className="bg-festive-dark">Satellite</option>
              <option value="prahlad-nagar" className="bg-festive-dark">Prahlad Nagar</option>
              <option value="thaltej" className="bg-festive-dark">Thaltej & GMDC</option>
              <option value="gota" className="bg-festive-dark">Gota</option>
              <option value="gandhinagar" className="bg-festive-dark">Gandhinagar</option>
              <option value="vadodara" className="bg-festive-dark">Vadodara</option>
              <option value="surat" className="bg-festive-dark">Surat</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
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
                onNavigate('/events');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white shadow-lg text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Garba Pass Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
