import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';
import { SEOHead } from '../components/seo/SEOHead';

export const FAQPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredFaqs = FAQ_ITEMS.filter(f => 
    f.question.toLowerCase().includes(filterQuery.toLowerCase()) || 
    f.answer.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="FAQ | Navratri Garba Pass Ahmedabad 2026 Questions & Answers"
        description="Find answers to frequently asked questions about Garba passes in Ahmedabad for Navratri 2026. Prices, season passes, refunds, and gate QR entry."
        faqSchema
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Frequently Asked <span className="text-gold-gradient">Questions</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Clear answers about buying Garba passes online, gate entry rules, and refund policies.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search FAQ */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
          <input 
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search FAQ questions (e.g. price, season pass, refund, gate entry)..."
            className="w-full bg-festive-card border border-purple-800/60 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div key={faq.id} className="bg-festive-card/80 rounded-2xl border border-purple-900/50 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-3 hover:text-amber-300"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-purple-900/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
