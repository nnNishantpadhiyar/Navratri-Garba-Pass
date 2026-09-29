import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, Facebook, Twitter, Send } from 'lucide-react';
import { GarbaEvent } from '../../types';

interface ShareModalProps {
  event: GarbaEvent;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ event, onClose }) => {
  const [copied, setCopied] = useState(false);
  const eventUrl = `${window.location.origin}/events/${event.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🪔 Join me for *${event.name}* at ${event.venue} Ahmedabad! Book passes online here: ${eventUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Book Garba passes for ${event.name} Ahmedabad 2026! 🪔`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-festive-card border border-purple-800/60 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-display font-bold text-white">Share Garba Event</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-festive-dark p-3 rounded-2xl border border-purple-900/50">
            <img src={event.featuredImage} alt={event.name} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <h4 className="font-bold text-white text-sm line-clamp-1">{event.name}</h4>
              <p className="text-xs text-amber-400 truncate">{event.venue}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleShareFacebook}
              className="p-3 bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
            >
              <Facebook className="w-5 h-5 text-blue-400" />
              <span>Facebook</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="p-3 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 text-sky-300 rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
            >
              <Twitter className="w-5 h-5 text-sky-400" />
              <span>X / Twitter</span>
            </button>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Direct Event Link</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={eventUrl}
                className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-3 py-2 text-xs text-slate-300 truncate"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold hover:bg-amber-500/30 flex items-center gap-1 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
