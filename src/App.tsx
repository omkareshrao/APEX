/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ColorOption, RacingCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGridSection } from './components/ProductGridSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SpecsSection } from './components/SpecsSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);

  // Saved hoodies IDs persisted in localStorage
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hoodie_saved_ids');
      const validIds = PRODUCTS.map((p) => p.id);
      if (stored) {
        const parsed = JSON.parse(stored);
        const filtered = Array.isArray(parsed) ? parsed.filter((id) => validIds.includes(id)) : [];
        return filtered.length > 0
          ? filtered
          : ['hoodie-ferrari-f1', 'hoodie-porsche-gt3rs', 'hoodie-gtr-sakura'];
      }
      return ['hoodie-ferrari-f1', 'hoodie-porsche-gt3rs', 'hoodie-gtr-sakura'];
    } catch {
      return ['hoodie-ferrari-f1', 'hoodie-porsche-gt3rs', 'hoodie-gtr-sakura'];
    }
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('hoodie_cart_items');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<RacingCategory | 'Saved Vault'>(
    'All Racing Hoodies'
  );
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  // Sync saved products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hoodie_saved_ids', JSON.stringify(savedProductIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedProductIds]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hoodie_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Toggle saving a product in the vault
  const handleToggleSave = (product: Product) => {
    setSavedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  // Add to cart
  const handleAddToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    color: ColorOption
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id && item.size === size && item.color.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${color.name}-${Date.now()}`,
          productId: product.id,
          product,
          size,
          color,
          quantity: 1,
        };
        return [...prev, newItem];
      }
    });
  };

  // Direct "Order Now" action
  const handleOrderNow = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    color: ColorOption
  ) => {
    handleAddToCart(product, size, color);
    setInspectingProduct(null);
    setIsCartOpen(true);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove single item from cart
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Category navigation handlers
  const handleSelectCategory = (cat: RacingCategory) => {
    setActiveCategory(cat);
    document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewSaved = () => {
    setActiveCategory('Saved Vault');
    document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const featuredProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 selection:bg-red-600 selection:text-white flex flex-col font-sans">
      {/* Top Bar with Racing Division styling */}
      <Navbar
        savedCount={savedProductIds.length}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onViewSaved={handleViewSaved}
        onSelectCategory={handleSelectCategory}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'USD' ? 'BDT' : 'USD'))}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section: Circuit-bred racing theme */}
        <HeroSection
          featuredProduct={featuredProduct}
          onInspectProduct={(prod) => setInspectingProduct(prod)}
          onExploreGrid={() => {
            setActiveCategory('All Racing Hoodies');
            document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewLimitedEdition={() => handleSelectCategory('Limited Edition')}
          onViewSaved={handleViewSaved}
          savedCount={savedProductIds.length}
          isSaved={featuredProduct ? savedProductIds.includes(featuredProduct.id) : false}
          onToggleSave={handleToggleSave}
          currency={currency}
        />

        {/* Product Grid: Filterable by car maker, color tone, category, and limited edition */}
        <ProductGridSection
          products={products}
          savedProductIds={savedProductIds}
          onToggleSave={handleToggleSave}
          onInspectProduct={(prod) => setInspectingProduct(prod)}
          onAddToCart={handleAddToCart}
          currency={currency}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* 4 Paddock Craftsmanship Specs */}
        <SpecsSection />
      </main>

      {/* Telemetry Inspection Modal */}
      <ProductDetailModal
        product={inspectingProduct}
        onClose={() => setInspectingProduct(null)}
        onAddToCart={handleAddToCart}
        onOrderNow={handleOrderNow}
        isSaved={inspectingProduct ? savedProductIds.includes(inspectingProduct.id) : false}
        onToggleSave={handleToggleSave}
        currency={currency}
      />

      {/* Pit Bag & Checkout Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Racing Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onViewSaved={handleViewSaved}
        savedCount={savedProductIds.length}
      />
    </div>
  );
}
