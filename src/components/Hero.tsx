import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomizerClick?: () => void;
  onOpenProduct: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenProduct
}) => {
  // 3D tilt tracking for hero frame
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-white py-10 lg:py-16 border-b border-slate-100">
      {/* Subtle luxury ambient pattern in background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0A192F 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Official Logo Slide-in & Brand Focus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Subtle compact circular logo centered with stacked small brand text and tagline */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex flex-col items-start"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 sm:h-12 sm:w-12 overflow-hidden rounded-full border border-[#0A192F]/20 shadow-md shadow-[#0A192F]/5 bg-[#0A192F] ring-2 ring-[#C5A059]/40 shrink-0">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_7.21.14_PM_a5a01cfd.jpeg"
                    alt="ADMIRE DESIGNS"
                    className="h-full w-full object-cover scale-150"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0A192F] leading-tight">
                    ADMIRE DESIGNS
                  </span>
                  <span className="font-serif italic text-[10px] sm:text-[11px] text-[#C5A059] tracking-wide mt-0.5">
                    Where Imaginations Meet Design
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quality & Delivery Highlight Strip (Clean, Simple, Professional - No front price) */}
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded">
                All Over Pakistan: 6 to 8 Working Days
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-[#0A192F] font-semibold bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded">
                Free WhatsApp Proof Approval
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium">
                Bespoke Keepsakes
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 rounded-md bg-[#0A192F] px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:bg-[#102A4C] hover:shadow-lg hover:shadow-[#0A192F]/20 cursor-pointer"
              >
                <span>EXPLORE DESIGNS & PRICES</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Adjacency Trust Proof Strip with 1200 Delivered (No front starting price) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg">
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#0A192F] tabular-nums">1,200+</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Delivered</div>
              </div>
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#0A192F]">100%</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Custom Calligraphy</div>
              </div>
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#0A192F]">Safe Transit</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Doorstep Guarantee</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className="relative w-full max-w-md perspective-1200 cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => onOpenProduct('nikkah-royal-gold')}
            >
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 rounded-full bg-[#0A192F] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white shadow-md">
                <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-[#E8D499]">ROYAL EDITION</span>
              </div>

              {/* 3D Container with dynamic tilt */}
              <motion.div
                animate={{
                  rotateX: rotate.x,
                  rotateY: rotate.y,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="transform-3d relative rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-[#0A192F]/15 transition-shadow duration-300 hover:shadow-3xl"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-50">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg"
                    alt="Royal Gold Illumination Nikkah Certificate Framed"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Specular Glare Layer */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                    style={{
                      background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`
                    }}
                  />

                  {/* Bottom overlay information */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/40 to-transparent p-5 text-white">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E8D499] uppercase">
                      Featured Masterpiece
                    </p>
                    <h3 className="font-cinzel text-lg font-bold text-white mt-1">
                      Royal Gold Illumination Nikkah Frame
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs">
                      <span className="text-slate-300">Carved Baroque Gold Finish</span>
                      <span className="font-semibold text-[#E8D499] tabular-nums">Rs. 4,200</span>
                    </div>
                  </div>
                </div>

                {/* Interactive hint */}
                <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                    Tilt cursor for 3D frame perspective
                  </span>
                  <span className="text-[#0A192F] font-semibold underline underline-offset-2">
                    Click to View
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
