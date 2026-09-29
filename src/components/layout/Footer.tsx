import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ShieldCheck, Heart, Send, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative overflow-hidden bg-[#060b1c] border-t border-yellow-400/15 pt-20 pb-10">
      {/* Background ambient royal blue glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── WhatsApp CTA Strip in Yellow & Blue ── */}
        <div className="relative overflow-hidden rounded-3xl mb-16 p-8 sm:p-10 border border-yellow-400/25 shadow-xl shadow-blue-950/60">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-950/90 to-[#0a1128]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-3 max-w-md">
              <div className="section-label inline-flex shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Early Bird Alerts
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                Get VIP Garba Pass Alerts <br className="hidden sm:block" />
                <span className="text-gradient-gold">Before Anyone Else</span>
              </h3>
              <p className="text-sm text-blue-100/75">
                Join our WhatsApp VIP list for YMCA, Rajpath & Karnavati passes — Navratri 2026.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder="Your WhatsApp number (+91)"
                className="input-festive lg:w-64"
              />
              <button
                onClick={() => alert('Thank you! You have been subscribed to WhatsApp Garba alerts.')}
                className="btn-primary whitespace-nowrap py-3 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Join VIP List</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer Columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
                <span className="text-xl">🪔</span>
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">GARBA PASS</span>
                <span className="ml-2 text-yellow-400 font-black">2026</span>
                <p className="text-[10px] text-blue-200/60 uppercase tracking-widest font-semibold">Ahmedabad • Gujarat</p>
              </div>
            </div>

            <p className="text-xs text-blue-200/60 leading-relaxed max-w-sm">
              Ahmedabad's premier online ticket portal for Navratri Garba 2026. Discover authentic events, compare pass tiers, and receive instant digital QR code passes.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="trust-item text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Verified
              </span>
              <span className="trust-item text-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Instant QR Pass
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://wa.me/916767676549"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-emerald-400 hover:text-yellow-300 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold">+91 6767676549</span>
              </a>
              <a
                href="mailto:info@garbapassahmedabad.com"
                className="flex items-center gap-2.5 text-sm text-blue-200/60 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-900/30 border border-blue-700/30 flex items-center justify-center group-hover:bg-blue-800/40 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <span>info@garbapassahmedabad.com</span>
              </a>
            </div>
          </div>

          {/* Garba Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-display">
              Garba Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'All Garba Events 2026',       path: '/events' },
                { label: 'Daily Pass Booking',          path: '/garba-passes' },
                { label: 'Full 9-Night Season Passes',  path: '/season-passes' },
                { label: 'Couple & VIP Passes',         path: '/garba-passes' },
                { label: 'Ahmedabad Garba Tickets',     path: '/garba-pass-ahmedabad' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => onNavigate(path)}
                    className="text-blue-200/60 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-yellow-400" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-display">
              Popular Locations
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Garba Pass SG Highway',          path: '/garba-pass-sg-highway' },
                { label: 'Garba Pass Bopal & South Bopal', path: '/garba-pass-bopal' },
                { label: 'Garba Pass Satellite',           path: '/garba-pass-satellite' },
                { label: 'Garba Pass Prahlad Nagar',       path: '/garba-pass-prahlad-nagar' },
                { label: 'Garba Pass Thaltej & GMDC',      path: '/garba-pass-thaltej' },
                { label: 'Garba Pass Gandhinagar',         path: '/garba-pass-gandhinagar' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => onNavigate(path)}
                    className="text-blue-200/60 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-yellow-400" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-display">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Navratri 2026 Guide',       path: '/navratri-2026-guide' },
                { label: 'FAQ',                        path: '/faq' },
                { label: 'Contact Support',            path: '/contact' },
                { label: 'Terms of Service',           path: '/terms' },
                { label: 'Privacy Policy',             path: '/privacy' },
                { label: 'Refund & Cancellation',      path: '/refund-policy' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => onNavigate(path)}
                    className="text-blue-200/60 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-yellow-400" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 border-t border-yellow-400/10 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/50 gap-3">
          <p>© 2026 Navratri Garba Pass Ahmedabad. Official Booking Partner. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>for Gujarat Navratri</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
