import React, { useState, useMemo } from 'react';
import { Product, ColorOption, RacingCategory, CarMaker, ColorTone } from '../types';
import {
  Bookmark,
  Eye,
  ShoppingBag,
  Search,
  Check,
  Star,
  SlidersHorizontal,
  X,
  Sparkles,
  Zap,
  Gauge,
} from 'lucide-react';

interface ProductGridSectionProps {
  products: Product[];
  savedProductIds: string[];
  onToggleSave: (product: Product) => void;
  onInspectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: ColorOption) => void;
  currency: 'USD' | 'BDT';
  activeCategory: RacingCategory | 'Saved Vault';
  setActiveCategory: (cat: RacingCategory | 'Saved Vault') => void;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  products,
  savedProductIds,
  onToggleSave,
  onInspectProduct,
  onAddToCart,
  currency,
  activeCategory,
  setActiveCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaker, setSelectedMaker] = useState<CarMaker>('All Makers');
  const [selectedColor, setSelectedColor] = useState<ColorTone>('All Colors');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'gsm'>(
    'featured'
  );
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories: (RacingCategory | 'Saved Vault')[] = [
    'All Racing Hoodies',
    'Limited Edition',
    'Formula 1 & Grand Prix',
    'Supercars & Hypercars',
    'JDM & Tuner Legends',
    'Track & Muscle',
    'Saved Vault',
  ];

  const makers: CarMaker[] = [
    'All Makers',
    'Ferrari',
    'McLaren',
    'Porsche',
    'BMW',
    'Nissan',
    'Toyota',
    'Lamborghini',
    'Mercedes-AMG',
    'Bugatti',
    'Shelby',
    'Audi',
    'Honda',
  ];

  const colorTones: ColorTone[] = [
    'All Colors',
    'White & Cream',
    'Black & Charcoal',
    'Silver & Grey',
    'Papaya & Yellow',
    'Sakura Pink',
    'Lavender Lilac',
    'Verde Lime',
  ];

  // Filtering
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Main Category filter
    if (activeCategory === 'Saved Vault') {
      list = list.filter((p) => savedProductIds.includes(p.id));
    } else if (activeCategory === 'Limited Edition') {
      list = list.filter((p) => p.isLimitedEdition);
    } else if (activeCategory !== 'All Racing Hoodies') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Car Maker filter
    if (selectedMaker !== 'All Makers') {
      list = list.filter((p) => p.carMaker === selectedMaker);
    }

    // Color tone filter
    if (selectedColor !== 'All Colors') {
      list = list.filter((p) => p.colorTone === selectedColor);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.carMaker.toLowerCase().includes(q) ||
          p.carModel.toLowerCase().includes(q) ||
          p.engineSpec.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'gsm':
        list.sort((a, b) => b.gsm - a.gsm);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, savedProductIds, activeCategory, selectedMaker, selectedColor, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 'L', product.colors[0]);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2400);
  };

  const limitedCount = products.filter((p) => p.isLimitedEdition).length;

  return (
    <section id="grid" className="py-14 border-t border-white/10 bg-[#0c1018]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>CIRCUIT CATALOG // 2026 RACE EDITIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black italic font-heading text-white uppercase tracking-tight">
              {activeCategory === 'Saved Vault'
                ? 'Your Saved Racing Vault'
                : activeCategory === 'Limited Edition'
                ? 'Limited Run & Rare Colorways'
                : 'Paddock Hoodie Grid'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 max-w-md">
            Showing {filteredProducts.length} high-octane machines. Filter by manufacturer, color
            palette, or explore limited editions built with heavy 480–520 GSM loopback cotton.
          </p>
        </div>

        {/* Added Feedback Toast */}
        {addedNotice && (
          <div className="mb-6 p-3 bg-red-600 text-white text-xs font-bold rounded-lg flex items-center justify-between shadow-xl animate-fade-in border border-red-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Added size L of &quot;{addedNotice}&quot; to your Pit Bag.</span>
            </div>
            <span className="text-[10px] text-red-100 uppercase tracking-wider">Pit Bag Ready</span>
          </div>
        )}

        {/* Primary Racing Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none mb-6">
          {categories.map((cat) => {
            const isSaved = cat === 'Saved Vault';
            const isLimited = cat === 'Limited Edition';
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? isLimited
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/50'
                      : 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                    : isLimited
                    ? 'text-amber-400 hover:bg-amber-950/40 border border-amber-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isLimited && <Sparkles className="w-3.5 h-3.5 text-current" />}
                {isSaved && <Bookmark className="w-3.5 h-3.5 text-current" />}
                <span>{cat}</span>

                {isLimited && (
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-black">
                    {limitedCount}
                  </span>
                )}
                {isSaved && (
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-bold">
                    {savedProductIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Maker, Color, Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8 p-3 rounded-xl bg-white/5 border border-white/10">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search car (e.g. Supra, GT3 RS, Ferrari, R34)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#0b0e14] border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Car Maker Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedMaker}
              onChange={(e) => setSelectedMaker(e.target.value as CarMaker)}
              className="w-full bg-[#0b0e14] border border-white/15 text-gray-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 font-semibold"
            >
              {makers.map((m) => (
                <option key={m} value={m}>
                  {m === 'All Makers' ? 'All Car Makers' : `${m}`}
                </option>
              ))}
            </select>
          </div>

          {/* Color Tone Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value as ColorTone)}
              className="w-full bg-[#0b0e14] border border-white/15 text-gray-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 font-semibold"
            >
              {colorTones.map((c) => (
                <option key={c} value={c}>
                  {c === 'All Colors' ? 'All Colors' : `Color: ${c}`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#0b0e14] border border-white/15 text-gray-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 font-semibold"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="gsm">Heaviest (GSM)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/20 rounded-2xl bg-white/5 p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mx-auto">
              <Zap className="w-7 h-7 text-gray-400" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                Paddock Query Empty
              </div>
              <h3 className="text-lg font-bold font-heading text-white uppercase">
                No Racing Hoodies Found
              </h3>
            </div>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              No hoodies matched your current filter criteria. Try resetting your car manufacturer,
              color tone, or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Racing Hoodies');
                setSelectedMaker('All Makers');
                setSelectedColor('All Colors');
                setSearchQuery('');
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isSaved = savedProductIds.includes(product.id);
              const priceDisplay =
                currency === 'USD' ? `$${product.priceUSD}` : `৳${product.priceBDT.toLocaleString()}`;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[#121622] border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/5 bg-[#0f131d] p-5 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Bookmark / Save to Vault Button */}
                    <button
                      onClick={() => onToggleSave(product)}
                      aria-label={isSaved ? 'Remove from vault' : 'Save to vault'}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                        isSaved
                          ? 'bg-amber-500 text-black hover:bg-amber-400'
                          : 'bg-black/70 text-gray-300 hover:text-white hover:bg-black/90 border border-white/10'
                      }`}
                      title={isSaved ? 'In Vault! Click to remove' : 'Save in Vault'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Limited Edition Badge */}
                    {product.isLimitedEdition && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase text-amber-300 bg-amber-950/80 border border-amber-500/60 backdrop-blur-md px-2 py-0.5 rounded shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>LIMITED RUN</span>
                      </div>
                    )}

                    {/* Quick Hover Overlay */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <button
                        onClick={() => onInspectProduct(product)}
                        className="flex-1 py-2 text-xs font-bold text-white bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg hover:bg-black flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Inspect Telemetry</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Car Maker & GSM spec */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1 font-mono">
                        <span className="font-bold text-red-500 uppercase tracking-wider">
                          {product.carMaker}
                        </span>
                        <span className="text-gray-300 font-semibold">{product.gsm} GSM</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm font-bold text-white font-heading leading-snug group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Engine Spec Line */}
                      <p className="text-[11px] font-mono text-cyan-400 mt-1 truncate">
                        {product.engineSpec}
                      </p>
                    </div>

                    {/* Color Swatches and Price */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c, i) => (
                          <span
                            key={i}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`w-3.5 h-3.5 rounded-full inline-block ${
                              c.border ? 'border border-gray-600' : ''
                            }`}
                          />
                        ))}
                        <span className="text-[10px] font-mono text-gray-400 ml-1">
                          {product.colorTone}
                        </span>
                      </div>

                      <div className="text-sm font-black text-white font-mono tabular-nums">
                        {priceDisplay}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onInspectProduct(product)}
                        className="py-2 px-3 text-xs font-bold text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center truncate uppercase tracking-wider"
                      >
                        Telemetry
                      </button>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="py-2 px-3 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center gap-1.5 truncate shadow-sm uppercase tracking-wider"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Pit Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
