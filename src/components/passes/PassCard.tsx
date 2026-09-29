import React from 'react';
import { CheckCircle2, Ticket, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { PassTier } from '../../types';

interface PassCardProps {
  pass: PassTier;
  eventName?: string;
  onBookNow: (pass: PassTier) => void;
}

export const PassCard: React.FC<PassCardProps> = ({ pass, eventName, onBookNow }) => {
  return (
    <div className={`relative bg-festive-card/90 rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between h-full ${
      pass.isPopular 
        ? 'border-amber-400/80 shadow-2xl shadow-amber-500/10 bg-gradient-to-b from-purple-950/90 to-festive-card' 
        : 'border-purple-900/50 hover:border-purple-500/50'
    }`}>
      
      {/* Popular Tag */}
      {pass.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          <span>Most Popular Choice</span>
        </div>
      )}

      <div className="space-y-4">
        
        {/* Header Title & Validity */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xl font-display font-extrabold text-white">
              {pass.name}
            </h4>
            <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2.5 py-1 rounded-full border border-purple-700/40">
              {pass.validity}
            </span>
          </div>
          {eventName && (
            <p className="text-xs text-amber-400 font-medium mt-1 truncate">
              Event: {eventName}
            </p>
          )}
          <p className="text-xs text-slate-300 mt-2 line-clamp-2">
            {pass.description}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="bg-festive-dark/70 p-4 rounded-2xl border border-purple-900/40">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-extrabold text-amber-400">
              ₹{pass.price}
            </span>
            {pass.originalPrice && (
              <span className="text-sm line-through text-slate-500 font-medium">
                ₹{pass.originalPrice}
              </span>
            )}
            {pass.originalPrice && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Save ₹{pass.originalPrice - pass.price}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-purple-300">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Pass Availability: <strong className="text-amber-300">{pass.availableCount} passes remaining</strong></span>
          </div>
        </div>

        {/* Included Benefits List */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-wide">Included Benefits:</p>
          <ul className="space-y-2">
            {pass.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Book CTA Action Button */}
      <div className="pt-6 mt-4 border-t border-purple-900/40">
        <button
          onClick={() => onBookNow(pass)}
          className={`w-full py-3 px-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
            pass.isPopular
              ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-amber-500/20 hover:scale-[1.02]'
              : 'bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-white hover:border-amber-400'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Book {pass.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
