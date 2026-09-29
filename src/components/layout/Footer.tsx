import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ShieldCheck, Heart, Send } from 'lucide-react';
import { LocationSlug } from '../../types';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-festive-darker border-t border-purple-900/60 pt-16 pb-12 text-slate-300 relative overflow-hidden">
      {/* Glow decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter & WhatsApp Opt-in CTA */}
        <div className="bg-gradient-to-r from-festive-purple via-rose-950 to-indigo-950 p-8 rounded-3xl border border-rose-500/30 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant WhatsApp Alerts</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">
              Get Early Bird Garba Pass Alerts & VIP Discounts
            </h3>
            <p className="text-xs text-purple-200">
              Be the first to know when YMCA, Rajpath & Karnavati Garba passes open for Navratri 2026.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="tel"
              placeholder="Enter WhatsApp Number (+91)"
              className="bg-festive-dark/90 border border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 w-full sm:w-72"
            />
            <button 
              onClick={() => alert("Thank you! You have been subscribed to WhatsApp Garba alerts.")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <span>Join WhatsApp VIP</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-700 p-0.5 flex items-center justify-center shadow-lg">
                <span className="text-xl">🪔</span>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                GARBA PASS <span className="text-amber-400 text-lg">2026</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Ahmedabad's premier online ticket portal for Navratri Garba 2026. Discover authentic events, compare pass tiers, buy season tickets online, and receive instant digital QR code passes.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-purple-300">
              <span className="flex items-center gap-1.5 bg-purple-950/80 border border-purple-800/40 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Events</span>
              </span>
              <span className="flex items-center gap-1.5 bg-purple-950/80 border border-purple-800/40 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Instant QR Gate Pass</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-purple-900/60 pb-2">
              Garba Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/events')} className="hover:text-amber-400 transition-colors">All Garba Events 2026</button></li>
              <li><button onClick={() => onNavigate('/garba-passes')} className="hover:text-amber-400 transition-colors">Daily Pass Booking</button></li>
              <li><button onClick={() => onNavigate('/season-passes')} className="hover:text-amber-400 transition-colors">Full 9-Night Season Passes</button></li>
              <li><button onClick={() => onNavigate('/garba-passes')} className="hover:text-amber-400 transition-colors">Couple & VIP Passes</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-ahmedabad')} className="hover:text-amber-400 transition-colors">Ahmedabad Garba Tickets</button></li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-purple-900/60 pb-2">
              Popular Locations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/garba-pass-sg-highway')} className="hover:text-amber-400 transition-colors">Garba Pass SG Highway</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-bopal')} className="hover:text-amber-400 transition-colors">Garba Pass Bopal & South Bopal</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-satellite')} className="hover:text-amber-400 transition-colors">Garba Pass Satellite</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-prahlad-nagar')} className="hover:text-amber-400 transition-colors">Garba Pass Prahlad Nagar</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-thaltej')} className="hover:text-amber-400 transition-colors">Garba Pass Thaltej & GMDC</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-gota')} className="hover:text-amber-400 transition-colors">Garba Pass Gota</button></li>
              <li><button onClick={() => onNavigate('/garba-pass-gandhinagar')} className="hover:text-amber-400 transition-colors">Garba Pass Gandhinagar</button></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-purple-900/60 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/navratri-2026-guide')} className="hover:text-amber-400 transition-colors">Navratri 2026 Guide</button></li>
              <li><button onClick={() => onNavigate('/faq')} className="hover:text-amber-400 transition-colors">Frequently Asked Questions</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-amber-400 transition-colors">Contact Support</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-amber-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/refund-policy')} className="hover:text-amber-400 transition-colors">Refund & Cancellation Policy</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Navratri Garba Pass Ahmedabad. Official Booking Partner. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Gujarat Navratri
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
