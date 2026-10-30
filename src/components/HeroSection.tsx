import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowDown, Bookmark, Eye, ShieldCheck, Truck, Sparkles, Gauge, Zap } from 'lucide-react';

interface HeroSectionProps {
  featuredProduct?: Product | null;
  onInspectProduct: (product: Product) => void;
  onExploreGrid: () => void;
  onViewLimitedEdition: () => void;
  onViewSaved: () => void;
  savedCount: number;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  currency: 'USD' | 'BDT';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredProduct,
  onInspectProduct,
  onExploreGrid,
  onViewLimitedEdition,
  onViewSaved,
  savedCount,
  isSaved,
  onToggleSave,
  currency,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const priceDisplay = featuredProduct
    ? currency === 'USD'
      ? `$${featuredProduct.priceUSD}`
      : `৳${featuredProduct.priceBDT.toLocaleString()}`
    : '';

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:py-16 overflow-hidden bg-[#0b0e14]">
      {/* Background speed grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Telemetry Header Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 font-mono tracking-wider mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-red-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              APEX RACING LAB
            </span>
            <span aria-hidden="true" className="text-gray-600">›</span>
            <span className="text-gray-300">Motorsport Division</span>
            <span aria-hidden="true" className="text-gray-600">›</span>
            <span className="text-white font-bold">{featuredProduct?.carMaker || 'Supercar'} Series</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span className="font-semibold text-white">480–520 GSM French Terry</span>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <span className="text-red-400 font-mono">TRACK SPEC // PRE-SHRUNK</span>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Racing Manifesto & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded">
                <Gauge className="w-3.5 h-3.5 text-red-500" />
                <span>ONE THINK · ONE GOAL // CIRCUIT BRED</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight text-white font-heading uppercase leading-[1.05] text-balance">
                Armor for Racers, Tuners & Apex Pursuers.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Engineered from trackside telemetry to mountain canyon apexes. Built with 480–520 GSM
              loopback French Terry, wind-tunnel double-layered hoods, and high-tensile flexible inks
              that survive high-RPM paddock heat and relentless wash cycles.
            </p>

            {/* Racing Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="border border-white/10 p-3 rounded-lg bg-white/5 backdrop-blur-xs">
                <div className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-bold">
                  Weight Class
                </div>
                <div className="font-bold text-white text-sm mt-0.5">480–520 GSM</div>
                <div className="text-gray-400 text-[11px]">Dense Loopback Fleece</div>
              </div>

              <div className="border border-white/10 p-3 rounded-lg bg-white/5 backdrop-blur-xs">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                  Chassis Cut
                </div>
                <div className="font-bold text-white text-sm mt-0.5">Boxy Drop-Shoulder</div>
                <div className="text-gray-400 text-[11px]">Wind-Tunnel Contour</div>
              </div>

              <div className="border border-white/10 p-3 rounded-lg bg-white/5 backdrop-blur-xs col-span-2 sm:col-span-1">
                <div className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                  Durability
                </div>
                <div className="font-bold text-white text-sm mt-0.5">Pre-Shrunk Ink</div>
                <div className="text-gray-400 text-[11px]">High-Tensile Print</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreGrid}
                className="px-6 py-3.5 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-all flex items-center gap-2 shadow-lg shadow-red-950/60 uppercase tracking-wider"
              >
                <span>Explore Racing Grid</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onViewLimitedEdition}
                className="px-5 py-3.5 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-600/60 rounded-lg hover:bg-amber-900/60 transition-all flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Limited Colorways</span>
              </button>

              {featuredProduct && (
                <button
                  onClick={() => onInspectProduct(featuredProduct)}
                  className="px-5 py-3.5 text-xs font-bold text-gray-200 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Inspect Telemetry</span>
                </button>
              )}
            </div>

            {/* Adjacency Trust Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-red-500" />
                <span>Free Paddock Delivery over $60 / ৳1,000</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Race-Proven Fit Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Graphic with Massive Watermark */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Giant Speed Italic Background Typography */}
            <div
              aria-hidden="true"
              className="absolute select-none pointer-events-none text-[8.5rem] sm:text-[11rem] md:text-[13rem] lg:text-[14rem] font-black italic font-display text-white/[0.04] tracking-tighter leading-none z-0 text-center uppercase"
            >
              RACING
            </div>

            {featuredProduct && (
              <div className="relative z-10 w-full max-w-md mx-auto aspect-3/4 sm:aspect-4/5 rounded-2xl bg-[#121622] border border-white/15 shadow-2xl overflow-hidden flex items-center justify-center p-4 group">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Hotspot buttons */}
                {featuredProduct.hotspots.map((spot, idx) => (
                  <div
                    key={idx}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      onMouseEnter={() => setActiveHotspot(idx)}
                      className="relative flex items-center justify-center w-7 h-7 rounded-full bg-red-600 text-white text-xs font-mono font-bold shadow-lg hover:scale-125 transition-transform ring-2 ring-white/30"
                      aria-label={`View telemetry hotspot: ${spot.title}`}
                    >
                      <span>{idx + 1}</span>
                    </button>

                    {activeHotspot === idx && (
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-56 p-3 bg-gray-950/95 text-white rounded-lg shadow-2xl border border-red-500/40 text-left z-30 pointer-events-auto backdrop-blur-md">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                          Telemetry #{idx + 1}
                        </div>
                        <div className="text-xs font-bold text-white mb-1">{spot.title}</div>
                        <div className="text-[11px] text-gray-300 leading-snug">{spot.text}</div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Bottom Card Telemetry Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-gray-950/90 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xl">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span>{featuredProduct.name}</span>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400">
                      {featuredProduct.engineSpec}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-white font-mono tabular-nums">
                      {priceDisplay}
                    </div>
                    <button
                      onClick={() => onInspectProduct(featuredProduct)}
                      className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
                    >
                      Inspect Specs ›
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
