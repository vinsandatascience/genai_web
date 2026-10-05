import React, { useState } from 'react';
import { X, Ticket, Calendar, MapPin, QrCode, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Booking } from '../types/cinema';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onViewTicket: (booking: Booking) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onViewTicket
}) => {
  const [cancelCandidate, setCancelCandidate] = useState<Booking | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmCancel = () => {
    if (!cancelCandidate) return;
    onCancelBooking(cancelCandidate.id);
    setCancelSuccessMsg(`Booking ${cancelCandidate.bookingRef} cancelled. $${cancelCandidate.totalAmount.toFixed(2)} refunded to original payment method.`);
    setCancelCandidate(null);
    setTimeout(() => setCancelSuccessMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 text-rose-400 mb-1">
          <Ticket className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Your Cinema Wallet
          </span>
        </div>
        <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white">
          My Reserved Tickets
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Access your digital admission passes, QR codes for gate turnstiles, and booking management.
        </p>

        {cancelSuccessMsg && (
          <div className="mt-4 rounded-xl border border-emerald-800 bg-emerald-950/60 p-3.5 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{cancelSuccessMsg}</span>
          </div>
        )}

        {/* List of Bookings */}
        <div className="mt-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="py-16 text-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 p-6">
              <Ticket className="h-10 w-10 text-neutral-600 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-neutral-300">No active bookings found</h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Explore now showing movies and select your luxury seats in IMAX or Dolby Atmos.
              </p>
            </div>
          ) : (
            bookings.map(booking => {
              const isCancelled = booking.bookingStatus === 'cancelled';

              return (
                <div
                  key={booking.id}
                  className={`rounded-xl border p-5 transition-all ${
                    isCancelled
                      ? 'border-neutral-800 bg-neutral-950/40 opacity-60'
                      : 'border-neutral-700 bg-neutral-950/80 hover:border-neutral-600 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.moviePoster}
                        alt={booking.movieTitle}
                        referrerPolicy="no-referrer"
                        className="h-20 w-14 rounded-lg object-cover border border-neutral-800 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 ${
                            isCancelled
                              ? 'bg-neutral-800 text-neutral-400'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                          }`}>
                            {isCancelled ? 'Cancelled' : booking.format}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            {booking.bookingRef}
                          </span>
                        </div>

                        <h4 className="font-cinematic text-lg font-bold text-white mt-1">
                          {booking.movieTitle}
                        </h4>

                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                          <span>{booking.cinemaName.split('—')[0]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-200 font-medium">{booking.date} at {booking.time}</span>
                        </div>

                        <div className="text-xs text-rose-300 font-semibold mt-1">
                          Seats: {booking.seats.map(s => s.id).join(', ')} ({booking.auditorium})
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                      <div className="text-sm font-bold text-white font-mono tabular-nums">
                        {booking.currencySymbol || '$'}{booking.totalAmount.toFixed(2)}
                      </div>

                      {!isCancelled && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onClose();
                              onViewTicket(booking);
                            }}
                            className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-sm"
                          >
                            <QrCode className="h-3.5 w-3.5" />
                            <span>View Boarding Pass</span>
                          </button>

                          <button
                            onClick={() => setCancelCandidate(booking)}
                            className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cancellation Confirmation Sub-Modal */}
        {cancelCandidate && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl">
              <div className="flex items-center gap-2.5 text-amber-400 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-base font-bold text-white">Cancel Reservation?</h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Are you sure you want to cancel booking <strong className="text-white">{cancelCandidate.bookingRef}</strong> for <strong className="text-white">{cancelCandidate.movieTitle}</strong>?
              </p>
              <div className="my-3 rounded-lg bg-neutral-800 p-3 text-xs text-neutral-300">
                Refund Amount: <strong className="text-emerald-400 font-mono">${cancelCandidate.totalAmount.toFixed(2)}</strong> (100% full refund to original payment card).
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelCandidate(null)}
                  className="rounded-lg border border-neutral-700 px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
                >
                  Yes, Cancel & Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
