import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingBag, Sparkles, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_LINK } from '../data/products';

interface ProductSlidesProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductSlides: React.FC<ProductSlidesProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeProduct = products[currentIndex] || products[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Auto rotation every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, products.length]);

  const getWhatsAppOrderLink = (product: Product) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Admire Designs! I want to order "${product.name}" priced at Rs. ${product.price.toLocaleString()}. Please share details for personalization.`
    );
    return `${WHATSAPP_LINK}&text=${text}`;
  };

  return (
    <section 
      id="designs" 
      className="bg-white py-14 lg:py-20 border-b border-slate-100 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Design Showcase</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A192F]">
            Our Exclusive Collections & Prices
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every piece is personalized with your names and dates. All prices range from Rs. 2,000 to Rs. 4,500 with nationwide delivery across Pakistan.
          </p>
        </div>

        {/* Main Interactive Slide Showcase */}
        <div className="relative max-w-5xl mx-auto bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-8 shadow-xl shadow-[#0A192F]/5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: HD Framed Image Slide with Price Tag & Navigation Overlay (7 cols) */}
            <div className="lg:col-span-7 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-200 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => onSelectProduct(activeProduct)}
                  >
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Prominent Price Tag directly on Slide */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                      <div className="bg-[#0A192F]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#C5A059]/40 flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Price:</span>
                        <span className="font-cinzel text-base sm:text-lg font-bold text-[#E8D499] tabular-nums">
                          Rs. {activeProduct.price.toLocaleString()}
                        </span>
                      </div>
                      {activeProduct.originalPrice && (
                        <div className="bg-white/90 text-slate-500 line-through text-[11px] px-2.5 py-0.5 rounded-full shadow-sm ml-1 font-semibold">
                          Rs. {activeProduct.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Top Right Bestseller / Category Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-white/95 text-[#0A192F] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md border border-slate-200">
                      {activeProduct.category === 'nikkahnama' ? 'Nikkahnama Frame' : activeProduct.category === 'graduation' ? 'Graduation Frame' : 'Fine Print'}
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-semibold text-[#E8D499] tracking-wider uppercase">
                        Slide {currentIndex + 1} of {products.length}
                      </p>
                      <h4 className="font-cinzel text-base sm:text-lg font-bold text-white drop-shadow-sm line-clamp-1">
                        {activeProduct.name}
                      </h4>
                    </div>

                    {/* Click to inspect hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                      <span className="bg-white/90 text-[#0A192F] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        Click to View Details
                      </span>
                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Slide Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-[#0A192F] shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-200"
                  aria-label="Previous Design"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-[#0A192F] shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-200"
                  aria-label="Next Design"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

              </div>
            </div>

            {/* Right: Product Details, Price Breakdown & Order Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                {/* Brand Tagline */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                  <span>Admire Designs Original</span>
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0A192F] mb-2">
                  {activeProduct.name}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {activeProduct.description}
                </p>

                {/* Prominent Price Box */}
                <div className="bg-white border border-[#C5A059]/30 rounded-xl p-4 shadow-sm mb-5">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Official Design Price:
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0A192F] tabular-nums">
                      Rs. {activeProduct.price.toLocaleString()}
                    </span>
                    {activeProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-medium">
                        Rs. {activeProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    Delivered in 6 to 8 working days anywhere in Pakistan
                  </p>
                </div>

                {/* Key Inclusions */}
                <ul className="space-y-2 mb-6">
                  {activeProduct.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#0A192F]/85">
                      <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppOrderLink(activeProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>ORDER ON WHATSAPP (RS. {activeProduct.price.toLocaleString()})</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCart(activeProduct)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] hover:bg-[#102A4C] text-white px-4 py-2.5 text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(activeProduct)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0A192F]/30 hover:bg-slate-100 text-[#0A192F] px-4 py-2.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>VIEW DETAILS</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Slide Thumbnails Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                Select Slide ({products.length} Designs):
              </span>
              <div className="flex items-center gap-1.5">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-[#0A192F]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
              {products.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                    currentIndex === idx
                      ? 'border-[#0A192F] ring-2 ring-[#C5A059]/40 scale-102 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#0A192F]/90 p-1 text-[9px] font-bold text-[#E8D499] text-center truncate">
                    Rs. {item.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
