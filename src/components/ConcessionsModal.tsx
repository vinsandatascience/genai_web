import React, { useState } from 'react';
import { Plus, Minus, Popcorn, ShoppingBag } from 'lucide-react';
import { ConcessionItem } from '../types/cinema';
import { CONCESSIONS } from '../data/mockData';

interface ConcessionsModalProps {
  selectedConcessions: { item: ConcessionItem; quantity: number }[];
  onUpdateQuantity: (item: ConcessionItem, delta: number) => void;
  onProceedToCheckout: () => void;
  onBackToSeats: () => void;
  ticketSubtotal: number;
}

export const ConcessionsModal: React.FC<ConcessionsModalProps> = ({
  selectedConcessions,
  onUpdateQuantity,
  onProceedToCheckout,
  onBackToSeats,
  ticketSubtotal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages', 'Desserts'];

  const filteredItems = activeCategory === 'All'
    ? CONCESSIONS
    : CONCESSIONS.filter(c => c.category === activeCategory);

  const concessionsSubtotal = selectedConcessions.reduce(
    (sum, cur) => sum + cur.item.price * cur.quantity,
    0
  );

  const getItemQuantity = (id: string) => {
    const found = selectedConcessions.find(c => c.item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <button
            onClick={onBackToSeats}
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-1 inline-flex items-center gap-1"
          >
            &larr; Back to Seat Selection
          </button>
          <h2 className="font-cinematic text-2xl font-bold text-white flex items-center gap-2">
            <span>Gourmet Concessions & Treats</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Delivered hot to your seat before opening credits or ready for quick express counter pickup.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Concessions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {filteredItems.map(item => {
          const qty = getItemQuantity(item.id);

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                qty > 0
                  ? 'border-rose-500/60 bg-rose-950/20 shadow-md'
                  : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={item.name}>
                      {item.imageEmoji}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <span className="font-mono text-rose-400 font-semibold tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.calories}</span>
                      </div>
                    </div>
                  </div>

                  {item.popular && (
                    <span className="rounded bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                      Top Pick
                    </span>
                  )}
                </div>

                <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Quantity</span>

                <div className="flex items-center gap-2">
                  {qty > 0 && (
                    <button
                      onClick={() => onUpdateQuantity(item, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                      title="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {qty > 0 && (
                    <span className="w-6 text-center text-xs font-bold text-white font-mono tabular-nums">
                      {qty}
                    </span>
                  )}

                  <button
                    onClick={() => onUpdateQuantity(item, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-sm"
                    title="Add item"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Checkout Action Bar */}
      <div className="sticky bottom-4 z-30 mt-auto rounded-xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-rose-400">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">
                {selectedConcessions.length === 0
                  ? 'No snacks added (Optional)'
                  : `${selectedConcessions.reduce((acc, c) => acc + c.quantity, 0)} items in snack bag`}
              </div>
              <div className="text-sm font-semibold text-white">
                Tickets: <span className="font-mono tabular-nums">${ticketSubtotal.toFixed(2)}</span>
                {concessionsSubtotal > 0 && (
                  <> + Snacks: <span className="font-mono text-rose-400 tabular-nums">${concessionsSubtotal.toFixed(2)}</span></>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onProceedToCheckout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-all cursor-pointer active:scale-95"
            >
              <span>{concessionsSubtotal > 0 ? 'Proceed to Secure Checkout' : 'Skip & Proceed to Payment'}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
