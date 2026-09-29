import React from 'react';
import { Search, MapPin, Calendar, DollarSign, Filter, X, RefreshCw } from 'lucide-react';
import { LocationSlug } from '../../types';

interface EventFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLocation: LocationSlug | 'all';
  onLocationChange: (loc: LocationSlug | 'all') => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  selectedPassType: string;
  onPassTypeChange: (type: string) => void;
  selectedBadge: string;
  onBadgeChange: (badge: string) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  maxPrice,
  onPriceChange,
  selectedPassType,
  onPassTypeChange,
  selectedBadge,
  onBadgeChange,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="bg-festive-card/80 border border-purple-900/60 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
      
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Garba events, venues, artists or locations (e.g., Kinjal Dave, YMCA, Bopal)..."
          className="w-full bg-festive-dark/90 border border-purple-800/50 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Multi Filter Options Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Location Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Location Zone</span>
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value as LocationSlug | 'all')}
            className="w-full bg-festive-dark border border-purple-800/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Ahmedabad Areas</option>
            <option value="sg-highway">SG Highway</option>
            <option value="bopal">Bopal & South Bopal</option>
            <option value="satellite">Satellite</option>
            <option value="prahlad-nagar">Prahlad Nagar</option>
            <option value="thaltej">Thaltej & GMDC</option>
            <option value="gota">Gota</option>
            <option value="gandhinagar">Gandhinagar</option>
            <option value="vadodara">Vadodara</option>
            <option value="surat">Surat</option>
          </select>
        </div>

        {/* Pass Type Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-rose-400" />
            <span>Pass Type</span>
          </label>
          <select
            value={selectedPassType}
            onChange={(e) => onPassTypeChange(e.target.value)}
            className="w-full bg-festive-dark border border-purple-800/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Pass Tiers</option>
            <option value="Daily Entry Pass">Daily Entry Pass</option>
            <option value="Couple Daily Pass">Couple Daily Pass</option>
            <option value="Full 9-Day Season Pass">Full 9-Day Season Pass</option>
            <option value="VIP Season Pass + Lounge">VIP Lounge Pass</option>
          </select>
        </div>

        {/* Badge / Status Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Offer Badge</span>
          </label>
          <select
            value={selectedBadge}
            onChange={(e) => onBadgeChange(e.target.value)}
            className="w-full bg-festive-dark border border-purple-800/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Offers</option>
            <option value="Trending">Trending Events</option>
            <option value="Early Bird">Early Bird Specials</option>
            <option value="Limited Passes">Limited Inventory</option>
            <option value="Almost Sold Out">Almost Sold Out</option>
          </select>
        </div>

        {/* Price Filter Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Max Starting Price</span>
            </span>
            <span className="text-amber-400">Up to ₹{maxPrice}</span>
          </div>
          <input 
            type="range" 
            min="200" 
            max="2000" 
            step="50"
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-purple-950 rounded-lg"
          />
        </div>

      </div>

      {/* Filter Status & Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-purple-900/40 text-xs">
        <span className="text-slate-400">
          Showing <span className="text-amber-400 font-bold">{totalResults}</span> Navratri events in Ahmedabad
        </span>
        
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 text-purple-300 hover:text-amber-400 font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  );
};
