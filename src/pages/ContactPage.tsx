import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Contact Support | Navratri Garba Pass Ahmedabad 2026"
        description="Contact our 24x7 customer support team for Garba pass inquiries, organizer event listings, and corporate season ticket bookings in Ahmedabad."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Contact <span className="text-gold-gradient">Customer Support</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Need help with your Garba pass booking? Have questions about parking or venue rules? Our team is available 24x7.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Info Column */}
        <div className="space-y-6 bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60">
          <h2 className="text-2xl font-display font-bold text-white">Get In Touch</h2>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Customer Helpline</p>
                <p className="text-purple-300">+91 79 4000 2026</p>
                <p className="text-[11px] text-slate-400">Available 9:00 AM - 12:00 Midnight daily</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Instant WhatsApp Support</p>
                <p className="text-emerald-400">+91 98980 20260</p>
                <p className="text-[11px] text-slate-400">Scan QR or click WhatsApp button in footer</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Email Inquiries</p>
                <p className="text-purple-300">support@garbapassahmedabad2026.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Ahmedabad Headquarters</p>
                <p className="text-slate-300">SG Highway, Satellite, Ahmedabad, Gujarat 380054</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-300">Our customer support representative will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-display font-bold text-white">Send Us a Message</h3>
              
              <div>
                <label className="text-xs font-semibold text-purple-200 block mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Jigar Patel"
                  className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-purple-200 block mb-1">Mobile Number *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98980 00000"
                  className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-purple-200 block mb-1">Message / Inquiry *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell us how we can help with your Garba pass booking..."
                  className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
};
