import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, Tag, CheckCircle2, AlertCircle, Smartphone, QrCode } from 'lucide-react';
import { Movie, Cinema, Showtime, Seat, ConcessionItem, Booking } from '../types/cinema';
import { formatPrice } from '../data/mockData';

interface CheckoutModalProps {
  movie: Movie;
  cinema: Cinema;
  showtime: Showtime;
  selectedSeats: Seat[];
  selectedConcessions: { item: ConcessionItem; quantity: number }[];
  onBack: () => void;
  onPaymentSuccess: (booking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  cinema,
  showtime,
  selectedSeats,
  selectedConcessions,
  onBack,
  onPaymentSuccess
}) => {
  // Form state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'upi' | 'gift_card'>('card');
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');

  // Card state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [saveCard, setSaveCard] = useState(true);

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState('');

  // 3D Secure simulation modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [show3DSecureModal, setShow3DSecureModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Financial calculations
  const ticketSubtotal = selectedSeats.reduce((sum, s) => sum + s.price * showtime.priceMultiplier, 0);
  const concessionsTotal = selectedConcessions.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const convenienceFee = selectedSeats.length * 1.50;
  const grossTotal = ticketSubtotal + concessionsTotal + convenienceFee;
  const discount = appliedPromo ? appliedPromo.discountAmount : 0;
  const taxableAmount = Math.max(0, grossTotal - discount);
  const tax = taxableAmount * 0.0825; // 8.25% entertainment & sales tax
  const grandTotal = Math.max(0, taxableAmount + tax);

  // Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'CINEMA20' || code === 'LUMIERE20') {
      const disc = grossTotal * 0.20;
      setAppliedPromo({ code, discountAmount: disc, label: '20% Special Premiere Discount' });
      setPromoCode('');
    } else if (code === 'POPCORNFREE') {
      setAppliedPromo({ code, discountAmount: 9.50, label: 'Complimentary Popcorn Voucher' });
      setPromoCode('');
    } else if (code === 'LUMIERE10') {
      setAppliedPromo({ code, discountAmount: 10.00, label: '$10 Off Celebration Pass' });
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "CINEMA20" for 20% off or "POPCORNFREE"');
    }
  };

  // Payment Submission Trigger
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (paymentMethod === 'card') {
      // Trigger authentic 3D Secure 2.0 flow
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShow3DSecureModal(true);
      }, 700);
    } else {
      // Instant processing for Apple Pay, Google Pay, UPI
      finalizeBooking();
    }
  };

  const finalizeBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShow3DSecureModal(false);

      // Generate booking reference e.g. LMR-7482-TX
      const randomRef = `LMR-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;

      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingRef: randomRef,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.posterUrl,
        movieBackdrop: movie.backdropUrl,
        cinemaId: cinema.id,
        cinemaName: cinema.name,
        cinemaAddress: cinema.address,
        showtimeId: showtime.id,
        date: showtime.date,
        time: showtime.time,
        format: showtime.format,
        auditorium: showtime.auditoriumName,
        seats: selectedSeats.map(s => ({
          id: s.id,
          row: s.row,
          number: s.number,
          tier: s.tier,
          price: s.price * showtime.priceMultiplier
        })),
        concessions: selectedConcessions,
        subtotal: ticketSubtotal,
        concessionsTotal,
        tax,
        convenienceFee,
        discount,
        totalAmount: grandTotal,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        paymentMethod,
        paymentCardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined,
        currency: cinema.currency,
        currencySymbol: cinema.currencySymbol,
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString(),
        qrCodeData: `https://lumierecinema.com/tickets/${randomRef}`
      };

      onPaymentSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-1 inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Concessions</span>
          </button>
          <h2 className="font-cinematic text-2xl font-bold text-white">
            Secure Checkout & Ticket Issuance
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="h-4 w-4" />
          <span>256-bit Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
        {/* Left Column: Payment Form & Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Contact */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">1. Contact Information for E-Ticket</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                  placeholder="e.g. Eleanor Vance"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Email (Ticket & QR Code sent here)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                  placeholder="eleanor@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1">Phone Number (For SMS reminders)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">2. Choose Payment Method</h3>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                  paymentMethod === 'card'
                    ? 'border-rose-500 bg-rose-950/30 text-white'
                    : 'border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:text-white'
                }`}
              >
                <CreditCard className="h-4 w-4 text-rose-400" />
                <span>Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-rose-500 bg-rose-950/30 text-white'
                    : 'border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="h-4 w-4 text-neutral-200" />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google_pay')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                  paymentMethod === 'google_pay'
                    ? 'border-rose-500 bg-rose-950/30 text-white'
                    : 'border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="font-bold text-sm">G Pay</span>
                <span>Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-rose-500 bg-rose-950/30 text-white'
                    : 'border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:text-white'
                }`}
              >
                <QrCode className="h-4 w-4 text-sky-400" />
                <span>UPI / QR Scan</span>
              </button>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleInitiatePayment} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm font-mono text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                      placeholder="4000 1234 5678 9010"
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                      <span>VISA / MC</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-mono text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Security Code (CVV)</label>
                    <div className="relative">
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-mono text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                        placeholder="•••"
                      />
                      <Lock className="absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="save-card"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-800 text-rose-600 focus:ring-rose-500 h-4 w-4"
                  />
                  <label htmlFor="save-card" className="text-xs text-neutral-300 cursor-pointer">
                    Save card securely for 1-click booking at Lumière Cinema
                  </label>
                </div>
              </form>
            )}

            {/* Apple Pay View */}
            {paymentMethod === 'apple_pay' && (
              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-800 text-center space-y-3">
                <p className="text-xs text-neutral-300">
                  Touch ID or Double Click side button to confirm payment via Apple Pay.
                </p>
                <button
                  type="button"
                  onClick={finalizeBooking}
                  className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Pay with Apple Pay</span>
                </button>
              </div>
            )}

            {/* Google Pay View */}
            {paymentMethod === 'google_pay' && (
              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-800 text-center space-y-3">
                <p className="text-xs text-neutral-300">
                  Instant authorization linked to your Google Account.
                </p>
                <button
                  type="button"
                  onClick={finalizeBooking}
                  className="w-full py-3 bg-neutral-800 border border-neutral-600 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay with G Pay</span>
                </button>
              </div>
            )}

            {/* UPI QR View */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-800 text-center space-y-3">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg bg-white p-2">
                  <QrCode className="h-28 w-28 text-black" />
                </div>
                <p className="text-xs text-neutral-300">
                  Scan with any payment app (Google Pay, PhonePe, Paytm, Banking App) to complete.
                </p>
                <button
                  type="button"
                  onClick={finalizeBooking}
                  className="w-full py-2.5 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-500 transition-colors cursor-pointer text-xs"
                >
                  Simulate UPI Payment Received
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Promo Code */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-3">Booking Summary</h3>

            {/* Movie Header in Summary */}
            <div className="flex items-start gap-3 pb-4 border-b border-neutral-800">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="h-16 w-12 rounded object-cover border border-neutral-800"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{movie.title}</h4>
                <div className="text-xs text-neutral-400 mt-0.5">{cinema.name.split('—')[0]}</div>
                <div className="text-xs text-neutral-400">
                  {showtime.date} · {showtime.time} ({showtime.format})
                </div>
              </div>
            </div>

            {/* Seats line item */}
            <div className="py-3 border-b border-neutral-800/80 text-xs">
              <div className="flex justify-between text-neutral-300 font-medium">
                <span>Selected Seats ({selectedSeats.length})</span>
                <span className="font-mono tabular-nums">{formatPrice(ticketSubtotal, cinema)}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedSeats.map(s => (
                  <span key={s.id} className="rounded bg-neutral-800 px-1.5 py-0.5 text-[11px] text-neutral-300">
                    {s.id} ({s.tier})
                  </span>
                ))}
              </div>
            </div>

            {/* Concessions line item */}
            {selectedConcessions.length > 0 && (
              <div className="py-3 border-b border-neutral-800/80 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-300 font-medium">
                  <span>Concessions & Snacks</span>
                  <span className="font-mono tabular-nums">{formatPrice(concessionsTotal, cinema)}</span>
                </div>
                {selectedConcessions.map(c => (
                  <div key={c.item.id} className="flex justify-between text-[11px] text-neutral-400">
                    <span>{c.quantity}x {c.item.name}</span>
                    <span className="font-mono tabular-nums">{formatPrice(c.item.price * c.quantity, cinema)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Input */}
            <div className="py-3 border-b border-neutral-800/80">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try CINEMA20)"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs text-white placeholder-neutral-500 uppercase focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="mt-2 flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 rounded p-1.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{appliedPromo.label}</span>
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-neutral-400 hover:text-white text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <div className="mt-1.5 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{promoError}</span>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="py-3 text-xs space-y-1.5 border-b border-neutral-800">
              <div className="flex justify-between text-neutral-400">
                <span>Convenience Fee</span>
                <span className="font-mono tabular-nums">{formatPrice(convenienceFee, cinema)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount ({appliedPromo.code})</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discount, cinema)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Estimated Local Entertainment Taxes</span>
                <span className="font-mono tabular-nums">{formatPrice(tax, cinema)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">Total Payable ({cinema.currency})</div>
                <div className="text-xs text-neutral-500">Includes all local taxes & fees</div>
              </div>
              <div className="font-cinematic text-2xl font-bold text-white font-mono tabular-nums">
                {formatPrice(grandTotal, cinema)}
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="button"
              onClick={handleInitiatePayment}
              disabled={isProcessing}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-all cursor-pointer disabled:opacity-50"
            >
              <Lock className="h-4 w-4" />
              <span>{isProcessing ? 'Securing Transaction...' : `Confirm & Pay ${formatPrice(grandTotal, cinema)}`}</span>
            </button>

            {/* Trust note */}
            <p className="mt-3 text-center text-[11px] text-neutral-500">
              Tickets can be cancelled for full refund up to 2 hours before showtime.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Secure 2.0 Simulation Modal */}
      {show3DSecureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-rose-500">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-bold tracking-wider uppercase">Bank 3D-Secure 2.0</span>
              </div>
              <span className="text-xs text-neutral-400">Identity Check</span>
            </div>

            <div className="my-4 text-xs text-neutral-300 space-y-2">
              <p>
                A 6-digit one-time authorization code has been sent to your bank-registered mobile number ending in <strong className="text-white">•••8901</strong>.
              </p>
              <div className="rounded-lg bg-neutral-800/80 p-3 flex justify-between items-center text-xs">
                <span>Merchant: <strong className="text-white">Lumière Cinema Group</strong></span>
                <span>Amount: <strong className="text-rose-400 font-mono">${grandTotal.toFixed(2)}</strong></span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs text-neutral-400">Enter One-Time Verification Passcode</label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="6-digit OTP code"
                className="w-full text-center text-xl font-mono tracking-widest rounded-lg border border-neutral-700 bg-neutral-800 py-2.5 text-white focus:border-rose-500 focus:outline-none"
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setOtpCode('894210')}
                  className="text-rose-400 hover:text-rose-300 underline font-medium"
                >
                  ⚡ Simulate Autofill (894210)
                </button>
                <span className="text-neutral-500">Expires in 02:45</span>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShow3DSecureModal(false)}
                  className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={finalizeBooking}
                  disabled={!otpCode && otpCode.length < 4}
                  className="flex-1 rounded-lg bg-rose-600 py-2.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30 disabled:opacity-50"
                >
                  Authorize Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
