import React from 'react';
import { Sparkles, MapPin, Calendar, ShieldCheck, Ticket } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

interface GuidePageProps {
  onNavigate: (path: string) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Navratri 2026 Ahmedabad Garba Guide | Ultimate Festival Handbook"
        description="Comprehensive Navratri 2026 Garba Guide for Ahmedabad. Complete venue guide, pass pricing, traditional dress codes, parking information & gate entry rules."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>OFFICIAL FESTIVAL HANDBOOK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Navratri 2026 <span className="text-gold-gradient">Ahmedabad Garba Guide</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Everything you need to know about celebrating Navratri 2026 in Ahmedabad, Gujarat.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm leading-relaxed">
        
        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60 space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">1. Navratri 2026 Dates & Schedule</h2>
          <p>
            Navratri 2026 begins on <strong>Sunday, October 11, 2026</strong> and concludes with Vijayadashami (Dussehra) on <strong>Monday, October 19, 2026</strong>. Over these 9 nights, Ahmedabad transforms into the Garba capital of the world.
          </p>
        </div>

        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60 space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">2. Top Garba Hubs along SG Highway</h2>
          <p>
            SG Highway hosts the city's largest organized Garba grounds including YMCA International Club, Rajpath Club, Karnavati Club, Savvy Swaraaj Grounds, and GMDC Exhibition Ground.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/garba-pass-sg-highway')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs shadow-md"
            >
              Explore SG Highway Garba Passes →
            </button>
          </div>
        </div>

        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60 space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">3. Dress Code & Etiquette</h2>
          <p>
            Traditional Gujarati dress is mandatory for entry onto main dance floors across all major clubs:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
            <li><strong>Women:</strong> Authentic 3-piece Chaniya Choli with mirror work and traditional Kutchi dupattas.</li>
            <li><strong>Men:</strong> Traditional Kediyu & Kafni Pyjama or heavily embroidered Kurta Pyjama.</li>
          </ul>
        </div>

        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60 space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">4. Online Pass Booking & QR Gate Scan</h2>
          <p>
            Avoid buying unauthorized passes from street vendors. Book official verified passes through our website to receive an instant scannable digital QR code ticket delivered directly to your WhatsApp.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/events')}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg"
            >
              Book Official Passes Online Now
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};
