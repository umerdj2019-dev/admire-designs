import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
  onNavigateTo: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
  onNavigateTo,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Designs & Prices', target: 'designs' },
    { label: 'Our Process', target: 'process' },
    { label: 'Why Choose Us', target: 'craftsmanship' },
    { label: 'Reviews', target: 'reviews' }
  ];

  const handleLinkClick = (target: string) => {
    onNavigateTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#0A192F]/10 bg-white/95 backdrop-blur-md transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="border-b border-[#0A192F]/5 bg-[#0A192F] px-4 py-1.5 text-center text-xs tracking-wider text-slate-200">
        <span className="font-semibold text-[#D4AF37]">FREE SHIPPING</span> on orders over Rs. 3,000 · <span className="text-[#E8D499] font-medium">All Over Pakistan Delivery in 6 to 8 Working Days</span>
      </div>

      <div className="mx-auto flex h-22 sm:h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Left: Desktop Navigation Links & Mobile Menu Button */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-md text-[#0A192F] hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#0A192F]/85">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className="group relative py-1 text-sm font-medium tracking-wide text-[#0A192F]/85 transition-colors hover:text-[#0A192F] whitespace-nowrap cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#0A192F] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Circular Compact Logo with Smooth Animation On Load & Stacked Text */}
        <motion.div
          initial={{ scale: 0.65, y: -12, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <button
            onClick={() => handleLinkClick('hero')}
            className="group flex flex-col items-center justify-center text-center focus:outline-none cursor-pointer py-1"
            aria-label="ADMIRE DESIGNS Home"
          >
            {/* Uploaded Logo Image - Circular (Gol) in the Center */}
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-[#0A192F]/20 bg-[#0A192F] shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 ring-1 ring-[#C5A059]/40">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_7.21.14_PM_a5a01cfd.jpeg"
                alt="ADMIRE DESIGNS Logo"
                className="h-full w-full object-cover scale-150"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Brand Title (Thora aur chotaw) Underneath Logo */}
            <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#0A192F] transition-colors group-hover:text-[#102A4C] mt-1 leading-tight">
              ADMIRE DESIGNS
            </span>

            {/* Tagline Underneath: Where Imaginations Meet Design with Brand Color */}
            <span className="font-serif italic text-[9px] sm:text-[10px] tracking-wide text-[#C5A059] leading-tight">
              Where Imaginations Meet Design
            </span>
          </button>
        </motion.div>

        {/* Right: Search & Shopping Bag (PKR currency button cut as requested) */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Search collection"
            title="Search collection"
          >
            <Search className="h-5 w-5 stroke-[1.6]" />
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0A192F] text-white transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A059] text-[11px] font-bold text-[#0A192F] shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[#0A192F]/10 bg-white px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className="text-left py-2 font-cinzel text-base font-semibold text-[#0A192F] hover:text-[#C5A059] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Free Delivery across Pakistan on orders over Rs. 3,000</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
