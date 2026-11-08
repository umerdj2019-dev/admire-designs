import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_LINK } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: 'PKR' | 'USD';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategory?: (cat: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onAddToCart
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // PKR to USD conversion rate approximately 1 USD = 280 PKR
  const formattedPrice = currency === 'PKR' 
    ? `Rs. ${product.price.toLocaleString()}`
    : `$${(product.price / 280).toFixed(0)}`;

  const formattedOriginalPrice = product.originalPrice
    ? (currency === 'PKR' ? `Rs. ${product.originalPrice.toLocaleString()}` : `$${(product.originalPrice / 280).toFixed(0)}`)
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  };

  const handleWhatsAppQuickInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Assalam o Alaikum Admire Designs, I am interested in customizing "${product.name}" (${formattedPrice}). Could you please share more details?`);
    window.open(`${WHATSAPP_LINK}&text=${message}`, '_blank');
  };

  return (
    <div
      className="perspective-1200 group flex flex-col cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="transform-3d relative flex flex-col flex-1 rounded-xl border border-slate-200/90 bg-white p-3.5 transition-all duration-300 hover:border-[#0A192F]/30 hover:shadow-xl hover:shadow-[#0A192F]/8"
      >
        {/* Product Media Area (65-75% height) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Glare Sheen Layer */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`
            }}
          />

          {/* Clean Top Tag (Zero Pill, quiet text) */}
          <div className="absolute top-3 left-3 z-10">
            {product.isBestseller && (
              <span className="bg-[#0A192F]/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-[#E8D499] px-2.5 py-1 rounded">
                BESTSELLER
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#102A4C]/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-white px-2.5 py-1 rounded">
                NEW RELEASE
              </span>
            )}
          </div>

          {/* Quick Action Overlay on Hover */}
          <div
            className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-md bg-white/95 backdrop-blur-md py-2.5 text-xs font-semibold tracking-wider text-[#0A192F] shadow-md hover:bg-[#0A192F] hover:text-white transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>CUSTOMIZE</span>
            </button>

            <button
              onClick={handleWhatsAppQuickInquiry}
              title="Quick WhatsApp Inquiry"
              aria-label="Inquire via WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-[#25D366] text-white shadow-md hover:bg-[#1fae54] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Information Details */}
        <div className="mt-3.5 flex flex-col flex-1 justify-between px-1">
          <div>
            {/* Clean Metadata: Unboxed with typographic separator */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
              <span>{product.category.replace('-', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">6 to 8 Days Delivery</span>
            </div>

            <h3 className="font-cinzel text-base font-bold text-[#0A192F] line-clamp-1 group-hover:text-[#102A4C] transition-colors">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Price and CTA row */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-base font-bold text-[#0A192F] tabular-nums">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0A192F] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>ADD</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
