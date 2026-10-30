import React, { useState } from 'react';
import { Product, ColorOption } from '../types';
import { X, Bookmark, ShoppingBag, Check, Gauge, Truck, Star, Sparkles, Zap } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: ColorOption) => void;
  onOrderNow: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: ColorOption) => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  currency: 'USD' | 'BDT';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderNow,
  isSaved,
  onToggleSave,
  currency,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const priceDisplay =
    currency === 'USD' ? `$${product.priceUSD}` : `৳${product.priceBDT.toLocaleString()}`;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleOrder = () => {
    onOrderNow(product, selectedSize, selectedColor);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#111622] rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-auto animate-scale-up text-gray-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0f17]">
          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
            <span className="font-bold text-red-500 uppercase tracking-widest">
              {product.carMaker}
            </span>
            <span aria-hidden="true" className="text-gray-600">/</span>
            <span className="text-white">{product.carModel}</span>
            <span aria-hidden="true" className="text-gray-600">/</span>
            <span className="text-cyan-400 font-semibold">{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {product.isLimitedEdition && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/50 px-2 py-0.5 rounded">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>LIMITED RUN</span>
              </span>
            )}

            <button
              onClick={() => onToggleSave(product)}
              className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-amber-500 text-black border-amber-400'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title={isSaved ? 'In Vault' : 'Save in Vault'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'In Vault' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 max-h-[82vh] overflow-y-auto">
          {/* Left: Garment Diagram & Telemetry Callouts */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between bg-[#0e121b]">
            <div className="relative aspect-4/5 rounded-xl bg-[#080b10] border border-white/10 p-6 flex items-center justify-center overflow-hidden">
              {/* Massive background watermark font */}
              <div
                aria-hidden="true"
                className="absolute text-7xl font-black italic font-display text-white/[0.03] select-none uppercase tracking-tighter"
              >
                APEX
              </div>

              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
              />

              {/* Hotspots */}
              {product.hotspots.map((spot, idx) => {
                const isSelected = activeHotspotIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveHotspotIndex(idx)}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold transition-all shadow-lg ${
                      isSelected
                        ? 'bg-red-600 text-white scale-125 ring-2 ring-red-400'
                        : 'bg-black/90 text-gray-200 border border-white/30 hover:scale-110'
                    }`}
                    title={spot.title}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Selected Hotspot Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#141926] border border-white/10 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
                <span className="font-bold text-red-500 uppercase tracking-widest">
                  Telemetry Spec #{activeHotspotIndex + 1}
                </span>
                <span className="text-[10px] text-gray-500">Tap numbers on hoodie to inspect</span>
              </div>
              <div className="text-sm font-bold text-white">
                {product.hotspots[activeHotspotIndex]?.title}
              </div>
              <div className="text-xs text-gray-300 mt-1 leading-relaxed">
                {product.hotspots[activeHotspotIndex]?.text}
              </div>
            </div>
          </div>

          {/* Right: Telemetry Specs, Size, Color, Buy */}
          <div className="md:col-span-6 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1 font-mono">
                  <span className="text-red-400 font-bold uppercase">{product.carMaker}</span>
                  <span aria-hidden="true" className="text-gray-600">·</span>
                  <span className="text-white font-semibold">{product.gsm} GSM Combed Cotton</span>
                  <span aria-hidden="true" className="text-gray-600">·</span>
                  <span className="text-cyan-400 font-mono">{product.colorTone}</span>
                </div>

                <h3 className="text-2xl font-black italic font-heading text-white uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
                  {product.engineSpec}
                </p>
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 py-2 border-y border-white/10">
                <span className="text-2xl font-black text-white font-mono tabular-nums">
                  {priceDisplay}
                </span>
                {currency === 'USD' ? (
                  <span className="text-xs text-gray-400 font-mono">
                    (≈ ৳{product.priceBDT.toLocaleString()} BDT)
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 font-mono">(≈ ${product.priceUSD} USD)</span>
                )}
                <span className="text-[11px] text-emerald-400 font-mono font-bold ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Paddock Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed">{product.description}</p>

              {/* Colorway Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase">Livery Colorway:</span>
                  <span className="text-cyan-400 font-mono">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        c.border ? 'border border-gray-600' : ''
                      } ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#111622] scale-110'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase">Select Driver Size:</span>
                  <span className="text-gray-400 text-[11px]">Track Boxy Fit · True to Size</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Terms Box */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-red-500" />
                  <span>Grand Prix Delivery SLA</span>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-400">
                  Free Trackside Delivery on all orders of $60 / 1,000 BDT or more. Fast dispatched
                  with reinforced protective parceling.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {addedNotice && (
                <div className="p-2 bg-emerald-950/80 text-emerald-300 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 border border-emerald-500/50">
                  <Check className="w-3.5 h-3.5" />
                  <span>Added {product.name} ({selectedSize}) to Pit Bag!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="py-3 px-4 text-xs font-bold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleOrder}
                  className="py-3 px-4 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 uppercase tracking-wider"
                >
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
