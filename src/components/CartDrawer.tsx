import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, MessageCircle, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { openWhatsAppMessage } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: 'PKR' | 'USD';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency
}) => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 3000;
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  const formattedSubtotal = currency === 'PKR' ? `Rs. ${subtotal.toLocaleString()}` : `$${(subtotal / 280).toFixed(0)}`;
  const formattedShipping = shippingFee === 0 ? 'FREE' : currency === 'PKR' ? `Rs. ${shippingFee}` : `$1`;
  const formattedGrandTotal = currency === 'PKR' ? `Rs. ${grandTotal.toLocaleString()}` : `$${(grandTotal / 280).toFixed(0)}`;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      alert('Your bag is empty. Please add a product before placing an order.');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setCheckoutModalOpen(true);
      alert('Please enter your name, mobile number, and delivery address first.');
      return;
    }

    let orderDetails = '';
    items.forEach((item, idx) => {
      orderDetails += `\n${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n   - Frame: ${item.selectedFrame.toUpperCase()}\n   - Size: ${item.selectedSize}\n   - Price: Rs. ${(item.price * item.quantity).toLocaleString()}`;
      if (item.customDetails?.brideName || item.customDetails?.groomName) {
        orderDetails += `\n   - Names: ${item.customDetails.groomName || ''} & ${item.customDetails.brideName || ''}`;
      }
      if (item.customDetails?.eventDate) {
        orderDetails += `\n   - Date: ${item.customDetails.eventDate}`;
      }
      if (item.customDetails?.graduateName) {
        orderDetails += `\n   - Graduate: ${item.customDetails.graduateName} (${item.customDetails.degreeTitle || ''})`;
      }
    });

    const message = (
      `Assalam o Alaikum Hafsa / Admire Designs,\n` +
      `I would like to place an order from your website:\n` +
      `---------------------------------` +
      `${orderDetails}\n` +
      `---------------------------------\n` +
      `Subtotal: ${formattedSubtotal}\n` +
      `Delivery: ${formattedShipping}\n` +
      `*Grand Total: ${formattedGrandTotal}*\n\n` +
      (customerName ? `Customer Name: ${customerName}\n` : '') +
      (customerPhone ? `Contact Number: ${customerPhone}\n` : '') +
      (shippingAddress ? `Delivery Address: ${shippingAddress}, ${city}\n` : '') +
      `Payment: ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer'}\n` +
      (orderNotes ? `Notes: ${orderNotes}\n` : '') +
      `\nPlease verify my order and share the digital proof schedule.`
    );

    openWhatsAppMessage(message);
  };

  const handleStandardSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) {
      alert('Please fill in your name, contact number, and delivery address.');
      return;
    }
    handleWhatsAppCheckout();
    setOrderConfirmed(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#0A192F]" />
                    <h2 className="font-cinzel text-lg font-bold text-[#0A192F]">
                      Your Keepsake Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Free Shipping Progress bar */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600">
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Free Express Delivery unlocked!
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-[#0A192F]">Rs. {(freeShippingThreshold - subtotal).toLocaleString()}</strong> for Free Delivery
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Rs. 6,000</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A192F] transition-all duration-500 rounded-full"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Item List */}
                <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                        <ShoppingBag className="h-8 w-8 stroke-[1.4]" />
                      </div>
                      <h3 className="font-cinzel text-base font-bold text-[#0A192F] mb-1">
                        Your bag is empty
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs mb-6">
                        Explore our handcrafted Nikkahnama marriage contracts and graduation frames.
                      </p>
                      <button
                        onClick={onClose}
                        className="rounded-md bg-[#0A192F] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#102A4C] transition-colors"
                      >
                        Start Browsing
                      </button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-cinzel text-sm font-bold text-[#0A192F] truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                                title="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                              <div>Frame: <span className="capitalize font-medium text-slate-700">{item.selectedFrame}</span> · {item.selectedSize}</div>
                              {item.customDetails?.brideName && (
                                <div className="text-[#C5A059] truncate font-medium">
                                  {item.customDetails.groomName} & {item.customDetails.brideName}
                                </div>
                              )}
                              {item.customDetails?.graduateName && (
                                <div className="text-[#C5A059] truncate font-medium">
                                  Graduate: {item.customDetails.graduateName}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                            <div className="flex items-center rounded border border-slate-200 bg-slate-50">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-[#0A192F] tabular-nums">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-cinzel text-sm font-bold text-[#0A192F] tabular-nums">
                              {currency === 'PKR' ? `Rs. ${(item.price * item.quantity).toLocaleString()}` : `$${((item.price * item.quantity) / 280).toFixed(0)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Checkout Bar */}
                {items.length > 0 && (
                  <div className="border-t border-slate-200 p-6 bg-slate-50/70 space-y-4">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 tabular-nums">{formattedSubtotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Delivery (All Over Pakistan: 6 to 8 Days)</span>
                        <span className="font-semibold text-slate-900 tabular-nums">{formattedShipping}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#0A192F] pt-2 border-t border-slate-200">
                        <span>Total Due</span>
                        <span className="font-cinzel text-base tabular-nums">{formattedGrandTotal}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {/* WhatsApp Instant Checkout */}
                      <button
                        onClick={handleWhatsAppCheckout}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#1fae54] transition-all shadow-md cursor-pointer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Order via WhatsApp Direct</span>
                      </button>

                      {/* Standard Site Checkout */}
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#102A4C] transition-all shadow-sm cursor-pointer"
                      >
                        <span>Standard Checkout (COD / Bank)</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>Free digital draft proof provided before final printing</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Standard Checkout / COD Form Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8"
            >
              {!orderConfirmed ? (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-cinzel text-xl font-bold text-[#0A192F]">
                        Complete Your Order
                      </h3>
                      <p className="text-xs text-slate-500">
                        Cash on Delivery (COD) & Online Bank Transfer available
                      </p>
                    </div>
                    <button
                      onClick={() => setCheckoutModalOpen(false)}
                      className="text-slate-400 hover:text-slate-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleStandardSubmitOrder} className="mt-5 space-y-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Umer Farooq"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          WhatsApp / Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          City *
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F] bg-white"
                        >
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Other / Overseas">Other / Overseas</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Complete Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="House / Flat #, Street, Sector / Area"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Payment Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cod')}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                            paymentMethod === 'cod' ? 'border-[#0A192F] bg-slate-50 font-bold text-[#0A192F]' : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          Cash on Delivery (COD)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                            paymentMethod === 'bank' ? 'border-[#0A192F] bg-slate-50 font-bold text-[#0A192F]' : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          Bank Transfer / Nayapay
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Order Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Event deadline, urgent handling, or special instructions"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-500">Total Payable:</div>
                        <div className="font-cinzel text-lg font-bold text-[#0A192F] tabular-nums">{formattedGrandTotal}</div>
                      </div>

                      <button
                        type="submit"
                        className="rounded-lg bg-[#0A192F] px-6 py-3 font-bold uppercase tracking-wider text-white hover:bg-[#102A4C] transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold text-[#0A192F] mb-2">
                    Order Received!
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0A192F]">{customerName}</strong>. Order <strong className="text-[#0A192F]">#AD-{Math.floor(1000 + Math.random() * 9000)}</strong> has been registered.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1 mb-6 text-slate-700">
                    <div><strong>City:</strong> {city}</div>
                    <div><strong>Contact:</strong> {customerPhone}</div>
                    <div><strong>Total:</strong> {formattedGrandTotal} ({paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'})</div>
                    <div><strong>Next Step:</strong> Hafsa from our studio will contact your WhatsApp to share the digital draft.</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#1fae54] transition-all shadow-md"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send Order Summary to Hafsa on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        onClearCart();
                        setCheckoutModalOpen(false);
                        setOrderConfirmed(false);
                        onClose();
                      }}
                      className="py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Return to Store
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
