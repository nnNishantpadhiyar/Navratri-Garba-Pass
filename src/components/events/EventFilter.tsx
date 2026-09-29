import React from 'react';
import { Search, X } from 'lucide-react';

interface EventFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalResults: number;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  searchQuery,
  onSearchChange,
  totalResults
}) => {
  return (
    <div className="bg-festive-card/80 border border-purple-900/60 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4">
      {/* Single Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Garba events, venues, artists or locations (e.g., Kinjal Dave, YMCA, Bopal)..."
          className="w-full bg-festive-dark/90 border border-purple-800/50 rounded-2xl pl-12 pr-10 py-4 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-amber-400 font-bold">{totalResults}</strong> Navratri Garba events in Ahmedabad
        </span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-amber-400 hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};
