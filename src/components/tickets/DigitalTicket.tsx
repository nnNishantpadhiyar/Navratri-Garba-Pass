import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, PhoneCall, Mail, ShieldCheck, MapPin, Calendar, Ticket, Printer } from 'lucide-react';
import { BookingDetails } from '../../types';

interface DigitalTicketProps {
  booking: BookingDetails;
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({ booking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        booking.qrCodeData || booking.bookingId,
        {
          width: 180,
          margin: 1,
          color: {
            dark: '#1C0A35',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error("QR Code Error:", error);
        }
      );
    }
  }, [booking]);

  const handlePrintTicket = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `🪔 *NAVRATRI GARBA PASS 2026 CONFIRMED*\n` +
      `Booking ID: ${booking.bookingId}\n` +
      `Event: ${booking.eventName}\n` +
      `Venue: ${booking.venueName}\n` +
      `Date: ${booking.eventDate}\n` +
      `Pass Tier: ${booking.passTierName} (${booking.quantity} Pass)\n` +
      `Pass Holder: ${booking.customerName}\n\n` +
      `Show QR code at gate for entry!`
    );
    window.open(`https://wa.me/91${booking.customerPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-purple-950 via-festive-dark to-festive-card border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪔</span>
          <div>
            <h4 className="font-display font-extrabold text-white text-base">
              OFFICIAL GARBA ENTRY PASS
            </h4>
            <p className="text-[11px] text-amber-400 font-mono font-bold">
              ID: {booking.bookingId}
            </p>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/40">
          CONFIRMED & VALID
        </span>
      </div>

      {/* Main Ticket Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* QR Code Block */}
        <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg border-2 border-amber-400/50">
          <canvas ref={canvasRef} className="w-40 h-40" />
          <p className="text-[10px] text-purple-950 font-bold mt-1 uppercase tracking-wider">
            Scan at Entrance Gate
          </p>
        </div>

        {/* Ticket Details */}
        <div className="md:col-span-2 space-y-3 text-xs">
          
          <div>
            <p className="text-[10px] text-purple-300 uppercase font-semibold">Event Name</p>
            <h3 className="text-lg font-display font-extrabold text-white">{booking.eventName}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-festive-dark/80 p-3 rounded-xl border border-purple-900/50">
            <div>
              <p className="text-[10px] text-slate-400">Date & Timing</p>
              <p className="font-bold text-amber-300">{booking.eventDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Pass Category</p>
              <p className="font-bold text-rose-300">{booking.passTierName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-festive-dark/80 p-3 rounded-xl border border-purple-900/50">
            <div>
              <p className="text-[10px] text-slate-400">Pass Holder Name</p>
              <p className="font-bold text-white">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Quantity & Paid</p>
              <p className="font-bold text-white">{booking.quantity} Pass • ₹{booking.totalPaid}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{booking.venueName}, {booking.address}</span>
          </div>

        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 border-t border-purple-900/60 flex flex-wrap gap-2 justify-center sm:justify-end">
        <button
          onClick={handleSendWhatsApp}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Send via WhatsApp</span>
        </button>

        <button
          onClick={handlePrintTicket}
          className="px-4 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 border border-purple-600/40"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Download / Print Ticket</span>
        </button>
      </div>

    </div>
  );
};
