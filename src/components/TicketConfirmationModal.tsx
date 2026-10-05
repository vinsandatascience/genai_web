import React, { useState } from 'react';
import { CheckCircle2, Download, Calendar, MapPin, Share2, Ticket, QrCode, Smartphone, Sparkles, Navigation } from 'lucide-react';
import { Booking } from '../types/cinema';

interface TicketConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const TicketConfirmationModal: React.FC<TicketConfirmationModalProps> = ({
  booking,
  onClose,
  onViewAllBookings
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Calendar (.ics) Generator
  const handleAddToCalendar = () => {
    const title = `${booking.movieTitle} - Lumière Cinema (${booking.format})`;
    const description = `Seats: ${booking.seats.map(s => s.id).join(', ')}\\nAuditorium: ${booking.auditorium}\\nBooking Ref: ${booking.bookingRef}`;
    const location = `${booking.cinemaName}, ${booking.cinemaAddress}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${booking.date.replace(/-/g, '')}T${booking.time.replace(':', '')}00`,
      `DTEND:${booking.date.replace(/-/g, '')}T${(parseInt(booking.time.split(':')[0]) + 2).toString().padStart(2, '0')}${booking.time.split(':')[1]}00`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.movieTitle.replace(/\s+/g, '_')}_Ticket.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('Calendar invite downloaded successfully.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  // Download PDF / E-Ticket Simulation
  const handleDownloadTicket = () => {
    const textData = `
========================================
       LUMIÈRE CINEMA E-TICKET
========================================
Booking Ref: ${booking.bookingRef}
Movie: ${booking.movieTitle}
Format: ${booking.format}
Auditorium: ${booking.auditorium}
Date: ${booking.date}
Time: ${booking.time}
Cinema: ${booking.cinemaName}
Address: ${booking.cinemaAddress}
Seats: ${booking.seats.map(s => `${s.id} (${s.tier})`).join(', ')}
${booking.concessions.length > 0 ? `Concessions: ${booking.concessions.map(c => `${c.quantity}x ${c.item.name}`).join(', ')}` : ''}
Total Paid: $${booking.totalAmount.toFixed(2)}
Guest: ${booking.customerName} (${booking.customerEmail})
========================================
Scan QR code at turnstile for admission.
========================================
    `;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lumiere_Ticket_${booking.bookingRef}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('Digital ticket receipt downloaded.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-full max-w-3xl mx-auto px-4 py-8">
      {/* Success banner */}
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3 animate-bounce">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="font-cinematic text-3xl font-extrabold text-white">
          Booking Confirmed!
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Your reservation is locked. Confirmation & mobile boarding pass sent to <strong className="text-neutral-200">{booking.customerEmail}</strong>.
        </p>

        {downloadNotice && (
          <div className="mt-3 inline-block rounded-lg bg-emerald-950/60 border border-emerald-800 px-4 py-1 text-xs text-emerald-300">
            {downloadNotice}
          </div>
        )}
      </div>

      {/* Ticket Pass Aesthetic Card */}
      <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/95 overflow-hidden shadow-2xl">
        {/* Top Header Section */}
        <div className="relative p-6 sm:p-8 border-b border-dashed border-neutral-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-rose-400">
                Official Admission Pass
              </span>
              <h3 className="font-cinematic text-2xl font-bold text-white mt-0.5">
                {booking.movieTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                <span className="rounded bg-rose-600/30 text-rose-300 border border-rose-500/30 px-2 py-0.5 font-semibold text-[11px]">
                  {booking.format}
                </span>
                <span aria-hidden="true">·</span>
                <span>{booking.auditorium}</span>
              </div>
            </div>

            {/* Booking Ref */}
            <div className="rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-4 py-2 text-right">
              <div className="text-[10px] text-neutral-400 font-mono uppercase">Booking Reference</div>
              <div className="font-mono text-base font-bold text-white tracking-wider">
                {booking.bookingRef}
              </div>
            </div>
          </div>

          {/* Date, Time, Cinema Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-neutral-800/60 text-xs">
            <div>
              <div className="text-neutral-500 text-[11px]">Date</div>
              <div className="font-semibold text-white mt-0.5">{booking.date}</div>
            </div>

            <div>
              <div className="text-neutral-500 text-[11px]">Showtime</div>
              <div className="font-semibold text-white mt-0.5">{booking.time}</div>
            </div>

            <div>
              <div className="text-neutral-500 text-[11px]">Reserved Seats</div>
              <div className="font-bold text-rose-400 mt-0.5">
                {booking.seats.map(s => s.id).join(', ')}
              </div>
            </div>

            <div>
              <div className="text-neutral-500 text-[11px]">Total Paid</div>
              <div className="font-mono font-bold text-white mt-0.5 tabular-nums">
                {booking.currencySymbol || '$'}{booking.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Notches for perforated tear effect */}
        <div className="relative flex items-center justify-between px-3 -my-3 pointer-events-none z-10">
          <div className="h-6 w-6 rounded-full bg-[#08080a] border-r border-neutral-800 -ml-6" />
          <div className="h-6 w-6 rounded-full bg-[#08080a] border-l border-neutral-800 -mr-6" />
        </div>

        {/* Lower Ticket Stubs & QR Turnstile Admission */}
        <div className="p-6 sm:p-8 bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-xs text-neutral-300 w-full sm:w-auto">
            <div>
              <div className="text-neutral-500 text-[11px]">Theater Location</div>
              <div className="font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                <span>{booking.cinemaName}</span>
              </div>
              <p className="text-neutral-400 text-[11px] mt-0.5 pl-5">
                {booking.cinemaAddress}
              </p>
            </div>

            {booking.concessions.length > 0 && (
              <div className="rounded-lg bg-neutral-800/60 p-2.5 border border-neutral-700/60">
                <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                  <span>🍿 Concessions Ordered (Express Counter Pickup)</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-1">
                  {booking.concessions.map(c => `${c.quantity}x ${c.item.name}`).join(' · ')}
                </div>
              </div>
            )}
          </div>

          {/* QR Code Graphic for Gate Entrance */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-black shadow-lg">
            {/* High-Contrast SVG QR Pattern */}
            <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
              {/* Corner position squares */}
              <rect x="5" y="5" width="26" height="26" rx="2" fill="#000" />
              <rect x="8" y="8" width="20" height="20" rx="1" fill="#fff" />
              <rect x="12" y="12" width="12" height="12" fill="#000" />

              <rect x="69" y="5" width="26" height="26" rx="2" fill="#000" />
              <rect x="72" y="8" width="20" height="20" rx="1" fill="#fff" />
              <rect x="76" y="12" width="12" height="12" fill="#000" />

              <rect x="5" y="69" width="26" height="26" rx="2" fill="#000" />
              <rect x="8" y="72" width="20" height="20" rx="1" fill="#fff" />
              <rect x="12" y="76" width="12" height="12" fill="#000" />

              {/* Data matrix dots */}
              <rect x="36" y="10" width="6" height="6" fill="#000" />
              <rect x="48" y="12" width="5" height="5" fill="#000" />
              <rect x="58" y="8" width="6" height="6" fill="#000" />
              <rect x="38" y="24" width="7" height="6" fill="#000" />
              <rect x="50" y="22" width="6" height="6" fill="#000" />
              <rect x="10" y="38" width="6" height="6" fill="#000" />
              <rect x="22" y="44" width="7" height="5" fill="#000" />
              <rect x="35" y="36" width="6" height="6" fill="#000" />
              <rect x="45" y="45" width="10" height="10" rx="1" fill="#e11d48" />
              <rect x="62" y="38" width="6" height="6" fill="#000" />
              <rect x="75" y="44" width="8" height="6" fill="#000" />
              <rect x="88" y="38" width="6" height="6" fill="#000" />
              <rect x="36" y="56" width="7" height="6" fill="#000" />
              <rect x="48" y="62" width="6" height="6" fill="#000" />
              <rect x="60" y="54" width="6" height="6" fill="#000" />
              <rect x="72" y="64" width="6" height="6" fill="#000" />
              <rect x="85" y="58" width="6" height="6" fill="#000" />
              <rect x="36" y="75" width="6" height="6" fill="#000" />
              <rect x="52" y="78" width="7" height="6" fill="#000" />
              <rect x="65" y="72" width="6" height="6" fill="#000" />
              <rect x="45" y="88" width="8" height="6" fill="#000" />
              <rect x="75" y="86" width="6" height="6" fill="#000" />
              <rect x="88" y="78" width="6" height="6" fill="#000" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest font-bold text-neutral-800 mt-1 uppercase">
              SCAN AT TURNSTILE
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleDownloadTicket}
          className="flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4 text-rose-400" />
          <span>Download Ticket / Receipt</span>
        </button>

        <button
          onClick={handleAddToCalendar}
          className="flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <Calendar className="h-4 w-4 text-amber-400" />
          <span>Add to Calendar (.ics)</span>
        </button>

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(booking.cinemaName + ' ' + booking.cinemaAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <Navigation className="h-4 w-4 text-sky-400" />
          <span>Directions & Parking</span>
        </a>

        <button
          onClick={onViewAllBookings}
          className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30"
        >
          <Ticket className="h-4 w-4" />
          <span>View All My Tickets</span>
        </button>
      </div>
    </div>
  );
};
