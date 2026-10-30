import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Check, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: 'USD' | 'BDT';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'inside-dhaka' | 'outside-dhaka' | 'international'>(
    'inside-dhaka'
  );
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  if (!isOpen) return null;

  const totalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const totalBDT = cart.reduce((acc, item) => acc + item.product.priceBDT * item.quantity, 0);

  const isFreeDelivery = totalUSD >= 60 || totalBDT >= 1000;
  const deliveryFeeUSD = deliveryZone === 'outside-dhaka' && !isFreeDelivery ? 2 : 0;
  const deliveryFeeBDT = deliveryZone === 'outside-dhaka' && !isFreeDelivery ? 100 : 0;

  const grandTotalUSD = totalUSD + deliveryFeeUSD;
  const grandTotalBDT = totalBDT + deliveryFeeBDT;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      return;
    }
    const orderNum = 'APX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderConfirmed(orderNum);
    onClearCart();
  };

  const handleReset = () => {
    setOrderConfirmed(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#111622] text-gray-200 h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-hidden animate-slide-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0f17]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-white uppercase font-heading tracking-wider">
              {orderConfirmed
                ? 'Pit Order Confirmed'
                : isCheckingOut
                ? 'Paddock Delivery & Payment'
                : `Pit Bag (${cart.reduce((sum, i) => sum + i.quantity, 0)})`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-black italic font-heading text-white uppercase">
                  Telemetry Order Logged
                </h4>
                <div className="text-xs font-mono text-gray-400 mt-1">
                  Dispatch ID: <span className="font-bold text-cyan-400">{orderConfirmed}</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
                Thank you, <strong>{customerName}</strong>! Your order has been placed. We have sent
                confirmation to <strong>{customerPhone}</strong>. Preparing shipment to{' '}
                <strong>{customerAddress}</strong>.
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 text-left space-y-1">
                <div className="font-bold text-white">Payment Mode:</div>
                <div>{paymentMethod === 'cod' ? 'Cash on Delivery (Pay at Arrival)' : 'Online Card Authorized'}</div>
                <div className="font-bold text-white mt-2">Delivery SLA:</div>
                <div>Express Trackside: 24–48 Hours</div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-500 transition-colors uppercase tracking-wider shadow-lg shadow-red-950/60"
              >
                Return to Pit Lane
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="text-xs text-gray-400 mb-2">
                Enter delivery coordinates to dispatch your racing hoodies.
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1 uppercase tracking-wider">
                  Driver Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Senna"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b0e14] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1 uppercase tracking-wider">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1700 000000 or phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b0e14] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1 uppercase tracking-wider">
                  Dispatch Region *
                </label>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#0b0e14] border border-white/15 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="inside-dhaka">Inside Dhaka City (Free Delivery)</option>
                  <option value="outside-dhaka">
                    Outside Dhaka City ({isFreeDelivery ? 'Free Delivery' : '+100 BDT'})
                  </option>
                  <option value="international">International Courier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1 uppercase tracking-wider">
                  Track / Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street / Paddock / Apt..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b0e14] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1 uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-lg border font-bold text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-white/5 text-gray-300 border-white/15'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-lg border font-bold text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-white/5 text-gray-300 border-white/15'
                    }`}
                  >
                    Card / Digital
                  </button>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1.5 pt-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">
                    {currency === 'USD' ? `$${totalUSD}` : `৳${totalBDT.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Track Delivery:</span>
                  <span className="font-mono text-white">
                    {isFreeDelivery
                      ? 'FREE'
                      : currency === 'USD'
                      ? `$${deliveryFeeUSD}`
                      : `৳${deliveryFeeBDT}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due:</span>
                  <span className="font-mono text-sm text-red-400">
                    {currency === 'USD'
                      ? `$${grandTotalUSD}`
                      : `৳${grandTotalBDT.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 py-3 text-xs font-bold text-gray-300 bg-white/10 rounded-xl hover:bg-white/15 transition-colors uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-500 transition-all uppercase tracking-wider shadow-lg shadow-red-950/60"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-gray-500 mx-auto" />
              <div className="text-sm font-bold text-white uppercase">Pit Bag is Empty</div>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our circuit-bred hoodies and add pieces to your bag or save them to your
                vault.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors uppercase tracking-wider"
              >
                Browse Machines
              </button>
            </div>
          ) : (
            /* Cart Items */
            <div className="space-y-4">
              {/* Free Delivery Bar */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-white text-[11px]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-red-500" />
                    <span>Free Delivery Threshold</span>
                  </span>
                  <span className="font-mono text-cyan-400">{isFreeDelivery ? 'UNLOCKED' : '$60 / ৳1,000'}</span>
                </div>
                {isFreeDelivery ? (
                  <div className="text-[11px] text-emerald-400 font-mono font-bold">
                    ✓ You qualify for Free Trackside Delivery!
                  </div>
                ) : (
                  <div className="text-[11px] text-gray-400">
                    Add{' '}
                    {currency === 'USD'
                      ? `$${Math.max(0, 60 - totalUSD)}`
                      : `৳${Math.max(0, 1000 - totalBDT)}`}{' '}
                    more for Free Delivery.
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-white/10">
                {cart.map((item) => {
                  const price =
                    currency === 'USD'
                      ? `$${item.product.priceUSD * item.quantity}`
                      : `৳${(item.product.priceBDT * item.quantity).toLocaleString()}`;

                  return (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      <div className="w-16 h-20 rounded-lg bg-[#0b0e14] border border-white/10 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-2">
                          <span>Size: {item.size}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <span
                              style={{ backgroundColor: item.color.hex }}
                              className="w-2.5 h-2.5 rounded-full inline-block border border-gray-600"
                            />
                            <span>{item.color.name}</span>
                          </span>
                        </div>
                        <div className="text-xs font-black text-cyan-400 font-mono tabular-nums">
                          {price}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-white/15 rounded-md bg-[#0b0e14]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-400 hover:text-white rounded-l"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-gray-400 hover:text-white rounded-r"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {!orderConfirmed && !isCheckingOut && cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0c0f17] space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-white">
                  {currency === 'USD' ? `$${totalUSD}` : `৳${totalBDT.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Trackside Delivery</span>
                <span className="font-mono font-bold text-cyan-400">
                  {isFreeDelivery ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 uppercase tracking-wider"
            >
              <span>Proceed to Pit Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
