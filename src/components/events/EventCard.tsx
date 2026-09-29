import React from 'react';
import { Calendar, MapPin, Clock, Star, ArrowRight, ShieldCheck, Ticket, Share2 } from 'lucide-react';
import { GarbaEvent, EventBadge } from '../../types';

interface EventCardProps {
  event: GarbaEvent;
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent) => void;
  onShareEvent?: (event: GarbaEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onBookPass,
  onShareEvent
}) => {

  const getBadgeStyle = (badge: EventBadge) => {
    switch (badge) {
      case 'Trending':
        return 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold border-rose-400/40';
      case 'Early Bird':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold border-amber-400/40';
      case 'Limited Passes':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border-purple-400/40';
      case 'Almost Sold Out':
        return 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold animate-pulse border-red-400/40';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="group relative bg-festive-card/90 rounded-3xl border border-purple-900/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/40 hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full">
      
      {/* Event Header Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.featuredImage} 
          alt={event.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-festive-card via-festive-card/40 to-transparent" />

        {/* Dynamic Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {event.badges.map((badge) => (
            <span 
              key={badge}
              className={`text-[11px] px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border ${getBadgeStyle(badge)}`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Rating & Share Button */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {onShareEvent && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShareEvent(event);
              }}
              className="p-2 rounded-full bg-festive-dark/70 hover:bg-festive-dark text-white border border-purple-500/40 backdrop-blur-md transition-colors"
              title="Share Event"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center gap-1 bg-festive-dark/80 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/30 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{event.rating}</span>
            <span className="text-slate-400 text-[10px]">({event.reviewCount})</span>
          </div>
        </div>

        {/* Starting Price Tag Ribbon */}
        <div className="absolute bottom-3 left-3 bg-festive-dark/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-lg">
          <p className="text-[10px] text-purple-300 uppercase font-semibold">Starting From</p>
          <p className="text-lg font-display font-extrabold text-amber-400">
            ₹{event.startingPrice} <span className="text-xs font-normal text-slate-300">/ pass</span>
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{event.venue}, {event.locationName}</span>
          </div>

          {/* Event Title */}
          <h3 
            onClick={() => onSelectEvent(event)}
            className="text-xl font-display font-extrabold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
          >
            {event.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Key Event Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-festive-dark/60 p-3 rounded-2xl border border-purple-900/40">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="truncate font-medium">{event.dates}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="truncate font-medium">{event.startTime} - {event.endTime}</span>
          </div>
        </div>

        {/* Artist Highlight */}
        <div className="flex items-center gap-3 pt-1 border-t border-purple-900/40">
          <img 
            src={event.artistImage} 
            alt={event.artistName}
            className="w-9 h-9 rounded-full object-cover border border-amber-400/50 flex-shrink-0"
          />
          <div className="truncate">
            <p className="text-xs font-bold text-slate-200 truncate">{event.artistName}</p>
            <p className="text-[10px] text-purple-300 truncate">{event.artistRole}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectEvent(event)}
            className="w-1/2 py-2.5 px-3 rounded-xl text-xs font-bold border border-purple-700/60 text-purple-200 hover:bg-purple-900/40 hover:border-purple-500 transition-all text-center"
          >
            View Details
          </button>
          
          <button
            onClick={() => onBookPass(event)}
            className="w-1/2 py-2.5 px-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-md shadow-rose-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Book Pass</span>
          </button>
        </div>

      </div>
    </div>
  );
};
