import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, ShoppingBag, MessageCircle, Truck, Sparkles, ChevronRight } from 'lucide-react';
import { Product, CartItem } from '../types';
import { WHATSAPP_LINK } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  currency: 'PKR' | 'USD';
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedFrame, setSelectedFrame] = useState<'gold' | 'walnut' | 'black'>(product.defaultFrame);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Customization fields
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [graduateName, setGraduateName] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [notes, setNotes] = useState('');

  const selectedSize = product.availableSizes[selectedSizeIndex] || product.availableSizes[0];
  const unitPrice = Math.round(product.price * selectedSize.priceMultiplier);
  const totalPrice = unitPrice * quantity;

  const formattedUnitPrice = currency === 'PKR' ? `Rs. ${unitPrice.toLocaleString()}` : `$${(unitPrice / 280).toFixed(0)}`;
  const formattedTotalPrice = currency === 'PKR' ? `Rs. ${totalPrice.toLocaleString()}` : `$${(totalPrice / 280).toFixed(0)}`;

  const isNikkah = product.category === 'nikkahnama';
  const isGrad = product.category === 'graduation';

  const handleAdd = () => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: unitPrice,
      quantity,
      selectedFrame,
      selectedSize: `${selectedSize.label} (${selectedSize.dimensions})`,
      customDetails: {
        brideName: brideName.trim() || undefined,
        groomName: groomName.trim() || undefined,
        eventDate: eventDate.trim() || undefined,
        hijriDate: hijriDate.trim() || undefined,
        graduateName: graduateName.trim() || undefined,
        degreeTitle: degreeTitle.trim() || undefined,
        institution: institution.trim() || undefined,
        notes: notes.trim() || undefined
      }
    };
    onAddToCart(item);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    let customText = '';
    if (isNikkah) {
      customText = `\n- Bride: ${brideName || 'Not specified'}\n- Groom: ${groomName || 'Not specified'}\n- Date: ${eventDate || 'Not specified'}\n- Hijri Date: ${hijriDate || 'Standard'}`;
    } else if (isGrad) {
      customText = `\n- Graduate: ${graduateName || 'Not specified'}\n- Degree: ${degreeTitle || 'Not specified'}\n- Institute: ${institution || 'Not specified'}`;
    }

    const message = encodeURIComponent(
      `Assalam o Alaikum Admire Designs,\nI would like to order the following bespoke piece:\n` +
      `Product: ${product.name}\n` +
      `Frame Finish: ${selectedFrame.toUpperCase()}\n` +
      `Size: ${selectedSize.label} (${selectedSize.dimensions})\n` +
      `Quantity: ${quantity}\n` +
      `Total: ${formattedTotalPrice}` +
      `${customText}\n` +
      (notes ? `Special Notes: ${notes}\n` : '') +
      `\nPlease let me know the process for digital proofing and delivery.`
    );

    window.open(`${WHATSAPP_LINK}&text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
        >
          {/* Top Bar with close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
              <Sparkles className="h-4 w-4" />
              <span>Admire Bespoke Configurator</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable split container */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Gallery & Frame Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Frame Simulation Border Overlay */}
                  {selectedFrame === 'gold' && (
                    <div className="pointer-events-none absolute inset-0 border-8 border-[#C5A059]/40 rounded-xl" />
                  )}
                  {selectedFrame === 'walnut' && (
                    <div className="pointer-events-none absolute inset-0 border-8 border-[#4A3525]/50 rounded-xl" />
                  )}
                  {selectedFrame === 'black' && (
                    <div className="pointer-events-none absolute inset-0 border-8 border-[#1A1A1A]/60 rounded-xl" />
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        activeImage === img ? 'border-[#0A192F] scale-95 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>

                {/* Trust guarantee badge */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 text-[#0A192F] font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                    <span>Free Digital Proof via WhatsApp</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    We share a high-resolution proof on WhatsApp before printing. We only proceed upon your 100% approval.
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Delivery: All over Pakistan (6 to 8 working days)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customization Controls (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0A192F]">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    {product.subtitle}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-cinzel text-2xl font-bold text-[#0A192F] tabular-nums">
                      {formattedUnitPrice}
                    </span>
                    <span className="text-xs text-slate-400">per piece (tax incl.)</span>
                  </div>
                </div>

                {/* Selection 1: Frame Finish */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
                    Frame Moulding Finish: <span className="text-[#0A192F] font-bold capitalize">{selectedFrame}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'gold', label: 'Baroque Gold', color: 'bg-[#D4AF37]' },
                      { id: 'walnut', label: 'Heritage Walnut', color: 'bg-[#5C4033]' },
                      { id: 'black', label: 'Gallery Black', color: 'bg-[#1A1A1A]' }
                    ].map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame.id as any)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          selectedFrame === frame.id
                            ? 'border-[#0A192F] bg-slate-50 font-bold text-[#0A192F] shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className={`h-3.5 w-3.5 rounded-full ${frame.color} shrink-0 ring-1 ring-black/10`} />
                        <span className="truncate">{frame.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selection 2: Size & Dimensions */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
                    Dimension & Scale
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.availableSizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                          selectedSizeIndex === idx
                            ? 'border-[#0A192F] bg-slate-50 text-[#0A192F]'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold">{size.label}</span>
                        <span className="text-[11px] text-slate-500">{size.dimensions}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selection 3: Bespoke Personalization Inputs */}
                {product.customizable && (
                  <div className="mb-5 rounded-xl border border-slate-200 p-4 bg-slate-50/60">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F] flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                        Bespoke Engraving Details
                      </span>
                      <span className="text-[11px] text-slate-500">Free Customization</span>
                    </div>

                    {isNikkah && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Bride's Name
                            </label>
                            <input
                              type="text"
                              value={brideName}
                              onChange={(e) => setBrideName(e.target.value)}
                              placeholder="e.g., Hamna Sajjad"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Groom's Name
                            </label>
                            <input
                              type="text"
                              value={groomName}
                              onChange={(e) => setGroomName(e.target.value)}
                              placeholder="e.g., Zohaib Ahmed"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Ceremony Date
                            </label>
                            <input
                              type="text"
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                              placeholder="e.g., Friday, 22 November 2024"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Hijri Date (Optional)
                            </label>
                            <input
                              type="text"
                              value={hijriDate}
                              onChange={(e) => setHijriDate(e.target.value)}
                              placeholder="e.g., Rajab 11, 1446 AH"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {isGrad && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Graduate's Full Name
                            </label>
                            <input
                              type="text"
                              value={graduateName}
                              onChange={(e) => setGraduateName(e.target.value)}
                              placeholder="e.g., Nimra Riaz"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              Degree & Program
                            </label>
                            <input
                              type="text"
                              value={degreeTitle}
                              onChange={(e) => setDegreeTitle(e.target.value)}
                              placeholder="e.g., Bachelors in Biotechnology"
                              className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                            University / Institute & Class Year
                          </label>
                          <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g., International Islamic University Islamabad · Class of 2025"
                            className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Special Inscription or Additional Instructions
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Urgent delivery date, custom vow phrasing, or gift note..."
                        className="w-full text-xs px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>
                  </div>
                )}

                {/* Quantity & Buy Bar */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-700">Quantity</span>
                      <div className="flex items-center rounded-md border border-slate-200 bg-white">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#0A192F] tabular-nums">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">Order Subtotal</div>
                      <div className="font-cinzel text-lg font-bold text-[#0A192F] tabular-nums">
                        {formattedTotalPrice}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAdd}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#102A4C] transition-all shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#1fae54] transition-all shadow-md cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
