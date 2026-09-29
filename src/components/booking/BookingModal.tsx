import React, { useState } from 'react';
import { X, Calendar, Ticket, User, CreditCard, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, QrCode, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GarbaEvent, PassTier, BookingDetails } from '../../types';
import { DigitalTicket } from '../tickets/DigitalTicket';

interface BookingModalProps {
  event: GarbaEvent;
  initialPass?: PassTier;
  onClose: () => void;
  onBookingComplete: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  event,
  initialPass,
  onClose,
  onBookingComplete
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPass, setSelectedPass] = useState<PassTier>(initialPass || event.passes[0]);
  const [selectedDate, setSelectedDate] = useState<string>(event.startDate);
  const [quantity, setQuantity] = useState<number>(1);
  
  // Add-ons
  const [includeValet, setIncludeValet] = useState<boolean>(false);
  const [includeDandiya, setIncludeDandiya] = useState<boolean>(false);

  // Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('GARBA2026');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<BookingDetails | null>(null);

  // Calculation
  const subtotal = selectedPass.price * quantity;
  const valetPrice = includeValet ? 250 : 0;
  const dandiyaPrice = includeDandiya ? (150 * quantity) : 0;
  const grandTotal = Math.max(0, subtotal + valetPrice + dandiyaPrice - discountAmount);

  const handleApplyCoupon = () => {
    if (promoCode.trim().toUpperCase() === 'GARBA2026') {
      const disc = Math.round(subtotal * 0.10);
      setDiscountAmount(disc);
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try 'GARBA2026' for 10% Off!");
    }
  };

  const handleSimulatePayment = () => {
    if (!customerName || !customerPhone || !customerEmail) {
      alert("Please enter all customer details (Name, Phone, Email)");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      
      const newBookingId = `GB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const qrData = JSON.stringify({
        id: newBookingId,
        event: event.name,
        pass: selectedPass.name,
        name: customerName,
        qty: quantity,
        date: selectedDate
      });

      const addOnsList = [];
      if (includeValet) addOnsList.push({ name: 'VIP Valet Parking', price: 250 });
      if (includeDandiya) addOnsList.push({ name: 'Dandiya Sticks Pair', price: 150 * quantity });

      const bookingObj: BookingDetails = {
        bookingId: newBookingId,
        eventId: event.id,
        eventName: event.name,
        eventDate: selectedDate,
        venueName: event.venue,
        address: event.address,
        passTierId: selectedPass.id,
        passTierName: selectedPass.name,
        quantity: quantity,
        unitPrice: selectedPass.price,
        discountAmount: discountAmount,
        totalPaid: grandTotal,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        addOns: addOnsList,
        qrCodeData: qrData,
        bookingTimestamp: new Date().toISOString(),
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'CONFIRMED'
      };

      setCompletedBooking(bookingObj);
      onBookingComplete(bookingObj);
      setStep(6);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log("Confetti triggered");
      }

    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-festive-card border border-purple-800/60 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-festive-purple via-rose-950 to-festive-dark p-6 border-b border-purple-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 flex items-center justify-center shadow-lg">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white truncate max-w-xs sm:max-w-md">
                {event.name}
              </h3>
              <p className="text-xs text-purple-200">
                Step {step} of 6 • {event.venue}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-festive-dark/60 rounded-full border border-purple-800/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-festive-dark/90 px-6 py-3 border-b border-purple-900/40 flex items-center justify-between text-xs font-semibold text-purple-300">
          <span className={step >= 1 ? 'text-amber-400 font-bold' : ''}>1. Date</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-amber-400 font-bold' : ''}>2. Pass Tier</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-amber-400 font-bold' : ''}>3. Add-ons</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-amber-400 font-bold' : ''}>4. Details</span>
          <span>→</span>
          <span className={step >= 5 ? 'text-amber-400 font-bold' : ''}>5. Payment</span>
          <span>→</span>
          <span className={step === 6 ? 'text-amber-400 font-bold' : ''}>6. Ticket</span>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* STEP 1: DATE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                <Calendar className="w-4 h-4" />
                <span>Select Event Date</span>
              </div>
              
              <p className="text-xs text-slate-300">
                Choose the night of Navratri 2026 you want to attend at {event.venue}:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18', '2026-10-19'].map((dateStr, idx) => (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedDate === dateStr
                        ? 'bg-gradient-to-r from-amber-500/20 to-rose-600/20 border-amber-400 text-white font-bold'
                        : 'bg-festive-dark/60 border-purple-900/50 text-slate-300 hover:border-purple-500'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-amber-300 font-semibold">Night {idx + 1}</p>
                      <p className="text-sm font-bold">{dateStr}</p>
                    </div>
                    {selectedDate === dateStr && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <span>Next: Choose Pass Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PASS TIER SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                <Ticket className="w-4 h-4" />
                <span>Select Pass Tier</span>
              </div>

              <div className="space-y-3">
                {event.passes.map((pass) => (
                  <div
                    key={pass.id}
                    onClick={() => setSelectedPass(pass)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPass.id === pass.id
                        ? 'bg-purple-950/80 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-festive-dark/60 border-purple-900/50 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white">{pass.name}</h4>
                        <p className="text-xs text-slate-300">{pass.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-amber-400">₹{pass.price}</span>
                        {pass.originalPrice && (
                          <p className="text-xs line-through text-slate-500">₹{pass.originalPrice}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-purple-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <span>Next: Quantity & Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: QUANTITY & ADD-ONS */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Quantity Counter */}
              <div className="bg-festive-dark/80 p-4 rounded-2xl border border-purple-900/50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Pass Quantity</h4>
                  <p className="text-xs text-slate-400">Maximum 10 passes per booking</p>
                </div>

                <div className="flex items-center gap-3 bg-festive-card border border-purple-700/60 px-3 py-1.5 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-purple-900/60 hover:bg-purple-800 font-bold text-white text-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-amber-400 px-2">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-purple-900/60 hover:bg-purple-800 font-bold text-white text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">Optional Event Add-ons</h4>

                <label className="flex items-center justify-between p-3.5 bg-festive-dark/60 rounded-xl border border-purple-900/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={includeValet}
                      onChange={(e) => setIncludeValet(e.target.checked)}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Reserved VIP Valet Parking</p>
                      <p className="text-[11px] text-slate-400">Guaranteed valet slot at main entrance gate</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+₹250</span>
                </label>

                <label className="flex items-center justify-between p-3.5 bg-festive-dark/60 rounded-xl border border-purple-900/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={includeDandiya}
                      onChange={(e) => setIncludeDandiya(e.target.checked)}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Traditional Wooden Dandiya Sticks Pair</p>
                      <p className="text-[11px] text-slate-400">Collect polished Gujarati Dandiya pair at entrance booth</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+₹150 x {quantity}</span>
                </label>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-purple-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER CONTACT DETAILS & COUPON */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                <User className="w-4 h-4" />
                <span>Customer Information & QR Delivery</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-purple-200 block mb-1">Full Name (As on Govt Photo ID) *</label>
                  <input 
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Jigar Patel"
                    className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-purple-200 block mb-1">WhatsApp Mobile Number *</label>
                    <input 
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98980 00000"
                      className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-purple-200 block mb-1">Email Address *</label>
                    <input 
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="jigar@example.com"
                      className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* Promo Code Coupon */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-amber-300 block mb-1">Promo Code / Discount Coupon</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="GARBA2026"
                      className="w-full bg-festive-dark border border-purple-800/60 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all flex-shrink-0"
                    >
                      {couponApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-400 mt-1 font-semibold">✓ Coupon GARBA2026 Applied: 10% Discount Saved!</p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-purple-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => {
                    if (!customerName || !customerPhone || !customerEmail) {
                      alert("Please fill in Name, Phone and Email");
                      return;
                    }
                    setStep(5);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SIMULATED PAYMENT */}
          {step === 5 && (
            <div className="space-y-6">
              
              {/* Order Summary Box */}
              <div className="bg-festive-dark/90 p-4 rounded-2xl border border-purple-800/60 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pass Tier ({quantity}x {selectedPass.name}):</span>
                  <span className="font-bold text-white">₹{subtotal}</span>
                </div>
                {includeValet && (
                  <div className="flex justify-between text-slate-300">
                    <span>VIP Valet Parking:</span>
                    <span className="font-bold text-white">₹250</span>
                  </div>
                )}
                {includeDandiya && (
                  <div className="flex justify-between text-slate-300">
                    <span>Dandiya Sticks Pair ({quantity}x):</span>
                    <span className="font-bold text-white">₹{150 * quantity}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promo Coupon Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-purple-900/60 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-white">Grand Total Payable:</span>
                  <span className="text-xl font-display font-extrabold text-amber-400">₹{grandTotal}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-purple-200 block">Select Secure Payment Gateway</label>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-festive-dark border-purple-900 text-slate-400'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-amber-400" />
                    <span>UPI / QR Scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-festive-dark border-purple-900 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-rose-400" />
                    <span>Debit/Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-festive-dark border-purple-900 text-slate-400'
                    }`}
                  >
                    <Lock className="w-5 h-5 text-emerald-400" />
                    <span>Netbanking</span>
                  </button>
                </div>
              </div>

              {/* UPI Simulated QR Code Display */}
              {paymentMethod === 'upi' && (
                <div className="bg-festive-dark p-4 rounded-2xl border border-amber-500/30 text-center space-y-2">
                  <p className="text-xs text-slate-300">Scan UPI QR code using GPay / PhonePe / Paytm:</p>
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                    {/* Simulated UPI QR Canvas */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=garbapass@icici%26pn=GarbaPassAhmedabad%26am=${grandTotal}`}
                      alt="UPI QR Code" 
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[11px] text-purple-300 font-mono">UPI ID: garbapass2026@icici</p>
                </div>
              )}

              {/* Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 rounded-xl border border-purple-800 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>

                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 text-white font-extrabold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Payment...</span>
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Complete Payment ₹{grandTotal}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 6: DIGITAL QR TICKET & CONFIRMATION */}
          {step === 6 && completedBooking && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">Booking Confirmed Successfully!</p>
                  <p>Your digital QR entry ticket has been issued and sent to WhatsApp {completedBooking.customerPhone}.</p>
                </div>
              </div>

              {/* Digital Pass Ticket View */}
              <DigitalTicket booking={completedBooking} />

              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
