import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund & Cancellation Policy'
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title={`${titles[type]} | Navratri Garba Pass Ahmedabad 2026`}
        description={`Official ${titles[type]} for online ticket booking on GarbaPassAhmedabad2026.com.`}
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          {titles[type]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Official ticketing policies for Navratri 2026 Garba events in Ahmedabad, Gujarat.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-festive-card/80 p-8 rounded-3xl border border-purple-900/60 space-y-6 text-slate-300 text-xs leading-relaxed">
        {type === 'refund' && (
          <>
            <h2 className="text-lg font-bold text-white">1. Ticket Cancellation Policy</h2>
            <p>
              Daily entry passes can be cancelled up to 48 hours prior to the event date for a 90% refund (10% processing fee retained). Cancellations within 48 hours of the event start time are non-refundable.
            </p>
            <h2 className="text-lg font-bold text-white">2. Season Pass Transfers</h2>
            <p>
              Season passes can be transferred to immediate family members prior to Day 1 of Navratri. Once scanned on Night 1, season passes become non-transferable.
            </p>
            <h2 className="text-lg font-bold text-white">3. Event Postponement / Weather Rules</h2>
            <p>
              In the event of weather rain interruptions, organizers will announce rescheduled arrangements or issue partial credit vouchers.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <h2 className="text-lg font-bold text-white">1. Official Pass Validity</h2>
            <p>
              Only passes bought directly from GarbaPassAhmedabad2026.com or authorized venue booking counters are valid for entrance.
            </p>
            <h2 className="text-lg font-bold text-white">2. Traditional Attire Requirement</h2>
            <p>
              Traditional Gujarati dress is mandatory for all dancers on the main Garba arena lawns. Venue security reserves the right to decline entry to non-costumed attendees.
            </p>
          </>
        )}

        {type === 'privacy' && (
          <>
            <h2 className="text-lg font-bold text-white">1. Data Protection</h2>
            <p>
              We collect customer phone numbers and email addresses solely for sending QR entry tickets and event updates via WhatsApp/Email. We never sell your personal information to third parties.
            </p>
          </>
        )}
      </section>
    </div>
  );
};
