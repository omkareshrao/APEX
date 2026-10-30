import React from 'react';
import { ShoppingBag, Bookmark, Flame, Sparkles } from 'lucide-react';
import { RacingCategory } from '../types';

interface NavbarProps {
  savedCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onViewSaved: () => void;
  onSelectCategory: (cat: RacingCategory) => void;
  currency: 'USD' | 'BDT';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  cartCount,
  onOpenCart,
  onViewSaved,
  onSelectCategory,
  currency,
  onToggleCurrency,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0e14]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Top red racing speed line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-amber-500 to-cyan-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark with racing emblem */}
        <button
          onClick={() => {
            onSelectCategory('All Racing Hoodies');
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase font-display whitespace-nowrap shrink-0 hover:text-red-500 transition-colors flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded bg-red-600 text-white flex items-center justify-center font-bold text-sm not-italic shadow-xs group-hover:bg-red-500 transition-colors">
            ▲
          </div>
          <span className="tracking-tight">APEX</span>
          <span className="text-[11px] font-mono not-italic font-semibold text-red-500 tracking-wider">
            // GT LAB
          </span>
        </button>

        {/* Zone 2: Clean single-line nav links for racing categories */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-300">
          <button
            onClick={() => onSelectCategory('Formula 1 & Grand Prix')}
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0"
          >
            F1 Grand Prix
          </button>
          <button
            onClick={() => onSelectCategory('Supercars & Hypercars')}
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0"
          >
            Supercars
          </button>
          <button
            onClick={() => onSelectCategory('JDM & Tuner Legends')}
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0"
          >
            JDM Legends
          </button>
          <button
            onClick={() => onSelectCategory('Track & Muscle')}
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0"
          >
            Track & Muscle
          </button>
          <button
            onClick={() => onSelectCategory('Limited Edition')}
            className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 font-extrabold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Run</span>
          </button>
          <button
            onClick={onViewSaved}
            className="hover:text-white text-gray-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Vault</span>
            {savedCount > 0 && (
              <span className="text-[10px] font-mono tabular-nums text-white bg-red-600 px-1.5 py-0.2 rounded font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleCurrency}
            className="text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors px-2.5 py-1.5 rounded border border-white/10 hover:border-white/30 whitespace-nowrap shrink-0 bg-white/5"
            title="Toggle USD / BDT Currency"
          >
            {currency === 'USD' ? 'USD ($)' : 'BDT (৳)'}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Pit Bag"
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-all whitespace-nowrap shrink-0 shadow-lg shadow-red-950/40"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Pit Bag</span>
            <span className="font-mono tabular-nums text-xs bg-black/40 px-1.5 py-0.5 rounded text-white font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
