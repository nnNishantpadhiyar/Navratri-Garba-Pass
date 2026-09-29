import React, { useState } from 'react';
import { LayoutDashboard, Ticket, Plus, Search, CheckCircle2, AlertTriangle, QrCode, DollarSign, Users, RefreshCw, Edit3, Trash2 } from 'lucide-react';
import { GarbaEvent, BookingDetails } from '../../types';

interface AdminDashboardProps {
  events: GarbaEvent[];
  bookings: BookingDetails[];
  onAddEvent: (newEvent: GarbaEvent) => void;
  onUpdateEvent: (updatedEvent: GarbaEvent) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  bookings,
  onAddEvent,
  onUpdateEvent
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'bookings' | 'scanner'>('overview');
  const [scanInput, setScanInput] = useState<string>('');
  const [scanResult, setScanResult] = useState<{ status: 'VALID' | 'INVALID' | 'USED'; message: string; data?: BookingDetails } | null>(null);

  // Stats calculation
  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPaid, 0);
  const totalTicketsSold = bookings.reduce((acc, b) => acc + b.quantity, 0);
  const scannedTicketsCount = bookings.filter(b => b.status === 'USED').length;

  const handleTestScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    let searchCode = scanInput.trim();
    try {
      if (searchCode.startsWith('{')) {
        const parsed = JSON.parse(searchCode);
        searchCode = parsed.id;
      }
    } catch (e) {
      // Keep literal code
    }

    const matchedBooking = bookings.find(b => b.bookingId === searchCode || b.qrCodeData.includes(searchCode));

    if (matchedBooking) {
      if (matchedBooking.status === 'USED') {
        setScanResult({
          status: 'USED',
          message: `ALREADY SCANNED! Ticket ${matchedBooking.bookingId} was scanned previously at Gate 2.`,
          data: matchedBooking
        });
      } else {
        matchedBooking.status = 'USED';
        setScanResult({
          status: 'VALID',
          message: `ACCESS GRANTED! Valid ${matchedBooking.passTierName} for ${matchedBooking.customerName} (${matchedBooking.quantity} Person).`,
          data: matchedBooking
        });
      }
    } else {
      setScanResult({
        status: 'INVALID',
        message: `INVALID TICKET! No booking record found for code: "${scanInput}".`
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-festive-card/90 p-6 rounded-3xl border border-purple-900/60 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl font-display font-extrabold text-white">
              Organizers Admin Dashboard
            </h1>
          </div>
          <p className="text-xs text-purple-200 mt-1">
            Manage Navratri 2026 Garba events, ticket inventory, booking sales, and gate QR entry scanners.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 bg-festive-dark/80 p-1.5 rounded-2xl border border-purple-800/40 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'events' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Manage Events ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'bookings' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'scanner' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            QR Gate Scanner
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-festive-card/90 p-5 rounded-3xl border border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Pass Revenue</span>
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-display font-extrabold text-amber-400">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-400">↑ 24% vs last week</p>
            </div>

            <div className="bg-festive-card/90 p-5 rounded-3xl border border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Tickets Sold</span>
                <Ticket className="w-5 h-5 text-rose-400" />
              </div>
              <p className="text-3xl font-display font-extrabold text-white">
                {totalTicketsSold}
              </p>
              <p className="text-[11px] text-purple-300">Across {events.length} Ahmedabad venues</p>
            </div>

            <div className="bg-festive-card/90 p-5 rounded-3xl border border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Gate Scanned Passes</span>
                <QrCode className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-display font-extrabold text-emerald-400">
                {scannedTicketsCount}
              </p>
              <p className="text-[11px] text-slate-400">Validated at entry gates</p>
            </div>

            <div className="bg-festive-card/90 p-5 rounded-3xl border border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Garba Events</span>
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-display font-extrabold text-white">
                {events.length}
              </p>
              <p className="text-[11px] text-amber-300">100% Live & Available</p>
            </div>

          </div>

          {/* Quick Recent Bookings Ledger Table */}
          <div className="bg-festive-card/90 rounded-3xl p-6 border border-purple-900/60 space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Recent Online Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-festive-dark text-amber-300 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Event & Venue</th>
                    <th className="p-3">Pass Tier</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/40">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.bookingId} className="hover:bg-purple-950/40">
                      <td className="p-3 font-mono font-bold text-amber-400">{b.bookingId}</td>
                      <td className="p-3 font-bold text-white">{b.customerName}</td>
                      <td className="p-3">{b.eventName}</td>
                      <td className="p-3">{b.passTierName} ({b.quantity})</td>
                      <td className="p-3 font-bold text-emerald-400">₹{b.totalPaid}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'USED' ? 'bg-emerald-950 text-emerald-400' : 'bg-purple-900 text-purple-200'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* EVENTS MANAGEMENT TAB */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Active Navratri Garba Events</h3>
            <button
              onClick={() => alert("Event Creator Modal: In production backend, allows organizers to post new venues & pass prices.")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Garba Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-festive-card/90 p-5 rounded-3xl border border-purple-900/60 flex gap-4">
                <img src={evt.featuredImage} alt={evt.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-white text-base truncate">{evt.name}</h4>
                  <p className="text-xs text-amber-400 font-medium">{evt.venue}</p>
                  <p className="text-xs text-slate-300">Passes: {evt.passes.length} Tiers • Starting ₹{evt.startingPrice}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <button className="px-3 py-1 bg-purple-900 text-purple-200 text-xs font-semibold rounded-lg hover:bg-purple-800">
                      Edit Pass Inventory
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKINGS LEDGER TAB */}
      {activeTab === 'bookings' && (
        <div className="bg-festive-card/90 p-6 rounded-3xl border border-purple-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">All Booking Transactions</h3>
            <span className="text-xs text-amber-400 font-bold">{bookings.length} Total Passes Issued</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-festive-dark text-amber-300 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Pass Tier</th>
                  <th className="p-3">Paid</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/40">
                {bookings.map((b) => (
                  <tr key={b.bookingId} className="hover:bg-purple-950/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{b.bookingId}</td>
                    <td className="p-3 font-bold text-white">{b.customerName}</td>
                    <td className="p-3 text-purple-300">{b.customerPhone}</td>
                    <td className="p-3">{b.eventName}</td>
                    <td className="p-3 text-amber-300">{b.eventDate}</td>
                    <td className="p-3">{b.passTierName} ({b.quantity})</td>
                    <td className="p-3 font-bold text-emerald-400">₹{b.totalPaid}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'USED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QR GATE SCANNER TAB */}
      {activeTab === 'scanner' && (
        <div className="bg-festive-card/90 p-8 rounded-3xl border border-purple-900/60 max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              Gate Ticket QR Validator
            </h3>
            <p className="text-xs text-slate-300">
              Scan customer ticket QR code or paste Booking ID (e.g. GB-2026-XXXX) to validate entry:
            </p>
          </div>

          <form onSubmit={handleTestScan} className="space-y-3">
            <input 
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Scan QR or enter Booking ID (e.g. GB-2026-1001)..."
              className="w-full bg-festive-dark border border-purple-800/60 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            />
            
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white font-extrabold text-sm shadow-lg hover:scale-[1.01] transition-all"
            >
              Validate Ticket Pass
            </button>
          </form>

          {scanResult && (
            <div className={`p-4 rounded-2xl border space-y-2 text-xs font-semibold ${
              scanResult.status === 'VALID' 
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' 
                : scanResult.status === 'USED' 
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                : 'bg-rose-950/80 border-rose-500/60 text-rose-300'
            }`}>
              <div className="flex items-center gap-2">
                {scanResult.status === 'VALID' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {scanResult.status !== 'VALID' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
                <span className="text-sm font-bold uppercase">{scanResult.status} TICKET</span>
              </div>
              <p>{scanResult.message}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
