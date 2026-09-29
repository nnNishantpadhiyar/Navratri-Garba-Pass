import React from 'react';
import { Calendar, MapPin, Clock, Star, Ticket, Share2, Users, ArrowRight } from 'lucide-react';
import { GarbaEvent, EventBadge } from '../../types';

interface EventCardProps {
  event: GarbaEvent;
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent) => void;
  onShareEvent?: (event: GarbaEvent) => void;
}

const BADGE_CONFIG: Record<EventBadge | string, { icon: string; color: string }> = {
  'Trending':        { icon: '🔥', color: 'rgba(217,87,59,0.25)'  },
  'Early Bird':      { icon: '🐦', color: 'rgba(239,171,56,0.2)'  },
  'Limited Passes':  { icon: '⚡', color: 'rgba(249,241,223,0.1)' },
  'Almost Sold Out': { icon: '🚨', color: 'rgba(217,87,59,0.3)'   },
  'VIP Exclusive':   { icon: '👑', color: 'rgba(239,171,56,0.18)' },
};

export const EventCard: React.FC<EventCardProps> = ({
  event, onSelectEvent, onBookPass, onShareEvent,
}) => {
  // Derive capacity from passes array
  const totalAvail  = event.passes.reduce((s, p) => s + (p.availableCount ?? 0), 0);
  const totalEst    = Math.max(totalAvail * 3, 300);
  const soldPercent = Math.min(90, Math.round(((totalEst - totalAvail) / totalEst) * 100));

  const barColor =
    soldPercent >= 75 ? '#d9573b' :
    soldPercent >= 45 ? '#efab38' : '#10b981';

  return (
    <article
      className="card-event group flex flex-col h-full"
      role="article"
      aria-label={`Event: ${event.name}`}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: '13rem', overflow: 'hidden', borderRadius: '1.25rem 1.25rem 0 0' }}>
        <img
          src={event.featuredImage}
          alt={event.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          loading="lazy"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,50,0.9) 0%, rgba(26,24,50,0.2) 55%, transparent 100%)' }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.375rem', flexWrap: 'wrap', zIndex: 10 }}>
          {event.badges.slice(0, 2).map((badge) => {
            const cfg = BADGE_CONFIG[badge] ?? { icon: '✨', color: 'rgba(239,171,56,0.2)' };
            return (
              <span
                key={badge}
                style={{
                  background: cfg.color,
                  border: '1px solid rgba(249,241,223,0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#f9f1df',
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                }}
              >
                {cfg.icon} {badge}
              </span>
            );
          })}
        </div>

        {/* Share + Rating */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10 }}>
          {onShareEvent && (
            <button
              onClick={(e) => { e.stopPropagation(); onShareEvent(event); }}
              style={{
                width: '2rem', height: '2rem', borderRadius: '50%',
                background: 'rgba(26,24,50,0.7)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(249,241,223,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(249,241,223,0.6)', cursor: 'pointer',
              }}
              title="Share Event"
            >
              <Share2 style={{ width: '0.875rem', height: '0.875rem' }} />
            </button>
          )}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            background: 'rgba(26,24,50,0.7)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(239,171,56,0.25)',
            borderRadius: '999px', padding: '0.25rem 0.625rem',
            color: '#efab38', fontSize: '0.75rem', fontWeight: 700,
          }}>
            <Star style={{ width: '0.8rem', height: '0.8rem', fill: '#efab38' }} />
            {event.rating}
          </div>
        </div>

        {/* Price Tag */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 10 }}>
          <div style={{
            background: 'rgba(26,24,50,0.8)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(239,171,56,0.3)',
            borderRadius: '0.75rem', padding: '0.375rem 0.75rem',
          }}>
            <p style={{ fontSize: '0.6rem', color: 'rgba(239,171,56,0.75)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>Starting From</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 800, color: '#efab38', lineHeight: 1.2, fontFamily: 'Libre Baskerville, serif' }}>
              ₹{event.startingPrice.toLocaleString('en-IN')}
              <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'rgba(249,241,223,0.5)', marginLeft: '0.25rem', fontFamily: 'DM Sans, sans-serif' }}>/pass</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Content Body ── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem', gap: '0.875rem' }}>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <MapPin style={{ width: '0.875rem', height: '0.875rem', color: '#efab38', flexShrink: 0 }} />
          <span style={{ fontSize: '0.75rem', color: '#efab38', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {event.venue}, {event.locationName}
          </span>
        </div>

        {/* Title */}
        <div style={{ gap: '0.375rem' }}>
          <h3
            onClick={() => onSelectEvent(event)}
            style={{
              fontSize: '1.05rem', fontWeight: 700, color: '#f9f1df',
              cursor: 'pointer', lineHeight: 1.3,
              fontFamily: 'Libre Baskerville, serif',
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[#efab38]"
          >
            {event.name}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(249,241,223,0.5)', lineHeight: 1.5, marginTop: '0.25rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {event.description}
          </p>
        </div>

        {/* Date & Time */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'rgba(249,241,223,0.04)', border: '1px solid rgba(249,241,223,0.07)',
          borderRadius: '0.75rem', padding: '0.5rem 0.75rem', fontSize: '0.72rem',
          color: 'rgba(249,241,223,0.55)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Calendar style={{ width: '0.8rem', height: '0.8rem', color: '#d9573b' }} />
            <span style={{ color: 'rgba(249,241,223,0.8)', fontWeight: 500 }}>{event.dates}</span>
          </span>
          <span style={{ color: 'rgba(249,241,223,0.2)' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Clock style={{ width: '0.8rem', height: '0.8rem', color: '#d9573b' }} />
            <span style={{ color: 'rgba(249,241,223,0.8)', fontWeight: 500 }}>{event.startTime} – {event.endTime}</span>
          </span>
        </div>

        {/* Capacity bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgba(249,241,223,0.5)' }}>
              <Users style={{ width: '0.75rem', height: '0.75rem' }} />
              {totalAvail} passes left
            </span>
            <span style={{ fontWeight: 700, color: barColor }}>{soldPercent}% filled</span>
          </div>
          <div style={{ height: '5px', background: 'rgba(249,241,223,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${soldPercent}%`, background: barColor, borderRadius: '999px', transition: 'width 0.7s ease' }} />
          </div>
        </div>

        {/* Artist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', paddingTop: '0.25rem', borderTop: '1px solid rgba(249,241,223,0.07)' }}>
          <img
            src={event.artistImage}
            alt={event.artistName}
            style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(239,171,56,0.4)', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(249,241,223,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.artistName}</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(239,171,56,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.artistRole}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.625rem', paddingTop: '0.25rem' }}>
          <button
            onClick={() => onSelectEvent(event)}
            style={{
              flex: 1, padding: '0.625rem', borderRadius: '0.75rem', fontSize: '0.75rem',
              fontWeight: 600, border: '1px solid rgba(249,241,223,0.12)',
              color: 'rgba(249,241,223,0.7)', background: 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
              transition: 'all 0.2s ease',
              fontFamily: 'DM Sans, sans-serif',
            }}
            className="hover:border-[rgba(239,171,56,0.3)] hover:text-[#f9f1df]"
          >
            Details <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
          </button>
          <button
            onClick={() => onBookPass(event)}
            className="btn-whatsapp"
            style={{ flex: 1.6, padding: '0.625rem', borderRadius: '0.75rem', fontSize: '0.75rem', justifyContent: 'center', gap: '0.375rem' }}
          >
            <Ticket style={{ width: '0.875rem', height: '0.875rem' }} />
            Book Pass
          </button>
        </div>

      </div>
    </article>
  );
};
