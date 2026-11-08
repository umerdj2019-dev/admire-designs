import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, MessageCircle, RefreshCw, Layers } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_LINK } from '../data/products';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
  currency: 'PKR' | 'USD';
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({
  onAddToCart,
  currency
}) => {
  const [designType, setDesignType] = useState<'nikkah' | 'grad'>('nikkah');
  const [frameType, setFrameType] = useState<'gold' | 'walnut' | 'black'>('gold');
  
  // Nikkah fields
  const [bride, setBride] = useState('Hamna Sajjad');
  const [groom, setGroom] = useState('Zohaib Ahmed');
  const [eventDate, setEventDate] = useState('11 January 2025');
  const [hijriDate, setHijriDate] = useState('Rajab 11, 1446 AH');

  // Grad fields
  const [graduate, setGraduate] = useState('Nimra Riaz');
  const [degree, setDegree] = useState('Bachelors in Biotechnology');
  const [university, setUniversity] = useState('International Islamic University Islamabad');
  const [batch, setBatch] = useState('Class of 2023 - 2026');

  // Pricing strictly between 2000 and 3400
  const price = designType === 'nikkah' ? 3400 : 2600;
  const formattedPrice = currency === 'PKR' ? `Rs. ${price.toLocaleString()}` : `$${(price / 280).toFixed(0)}`;

  // 3D tilt
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({
      x: ((y - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((x - rect.width / 2) / (rect.width / 2)) * 8
    });
  };

  const handleReset = () => {
    if (designType === 'nikkah') {
      setBride('Hamna Sajjad');
      setGroom('Zohaib Ahmed');
      setEventDate('11 January 2025');
      setHijriDate('Rajab 11, 1446 AH');
    } else {
      setGraduate('Nimra Riaz');
      setDegree('Bachelors in Biotechnology');
      setUniversity('International Islamic University Islamabad');
      setBatch('Class of 2023 - 2026');
    }
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `custom-${designType}-${Date.now()}`,
      productId: designType === 'nikkah' ? 'nikkah-royal-gold' : 'grad-academic-honor',
      name: designType === 'nikkah' ? `Bespoke Nikkahnama (${groom} & ${bride})` : `Bespoke Graduation Frame (${graduate})`,
      image: designType === 'nikkah'
        ? '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg'
        : '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__2__4b108c6b.jpeg',
      price,
      quantity: 1,
      selectedFrame: frameType,
      selectedSize: 'Standard A4 (8.3 × 11.7 in)',
      customDetails: designType === 'nikkah' ? {
        brideName: bride,
        groomName: groom,
        eventDate,
        hijriDate
      } : {
        graduateName: graduate,
        degreeTitle: degree,
        institution: university,
        notes: batch
      }
    };
    onAddToCart(item);
  };

  const handleWhatsAppSend = () => {
    const text = designType === 'nikkah'
      ? `Assalam o Alaikum Admire Designs, I configured a custom Nikkahnama:\n- Bride: ${bride}\n- Groom: ${groom}\n- Date: ${eventDate} (${hijriDate})\n- Frame: ${frameType.toUpperCase()}\n- Price: ${formattedPrice}\nPlease let me know how to finalize the design.`
      : `Assalam o Alaikum Admire Designs, I configured a custom Graduation Frame:\n- Graduate: ${graduate}\n- Degree: ${degree}\n- Institute: ${university}\n- Batch: ${batch}\n- Frame: ${frameType.toUpperCase()}\n- Price: ${formattedPrice}\nPlease let me know how to proceed.`;
    window.open(`${WHATSAPP_LINK}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="customizer" className="relative bg-white py-20 lg:py-28 border-b border-slate-100">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Bespoke Studio</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A192F] mb-4">
            Personalize Your Heirloom in Real Time
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Type your names, dates, or academic honors below to watch your framed Islamic artwork dynamically transform with authentic gold calligraphy and custom moulding.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Interactive Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-slate-200">
            
            {/* Design Type Tabs (Functional filter/buttons allowed by constitution) */}
            <div className="flex p-1 bg-slate-200/60 rounded-lg mb-6">
              <button
                onClick={() => setDesignType('nikkah')}
                className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase rounded-md transition-all ${
                  designType === 'nikkah' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-600 hover:text-[#0A192F]'
                }`}
              >
                Nikkah Contract
              </button>
              <button
                onClick={() => setDesignType('grad')}
                className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase rounded-md transition-all ${
                  designType === 'grad' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-600 hover:text-[#0A192F]'
                }`}
              >
                Graduation Frame
              </button>
            </div>

            {/* Frame Finish Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0A192F] block mb-2">
                Select Frame Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gold', name: 'Baroque Gold', bg: 'bg-[#D4AF37]' },
                  { id: 'walnut', name: 'Dark Walnut', bg: 'bg-[#4A3525]' },
                  { id: 'black', name: 'Gallery Black', bg: 'bg-[#18181B]' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrameType(f.id as any)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      frameType === f.id
                        ? 'border-[#0A192F] bg-white text-[#0A192F] font-bold shadow-sm'
                        : 'border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${f.bg} shrink-0`} />
                    <span className="truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Inputs */}
            {designType === 'nikkah' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Bride's Full Name
                  </label>
                  <input
                    type="text"
                    value={bride}
                    onChange={(e) => setBride(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Groom's Full Name
                  </label>
                  <input
                    type="text"
                    value={groom}
                    onChange={(e) => setGroom(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Event Date
                    </label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Hijri Date
                    </label>
                    <input
                      type="text"
                      value={hijriDate}
                      onChange={(e) => setHijriDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Graduate's Full Name
                  </label>
                  <input
                    type="text"
                    value={graduate}
                    onChange={(e) => setGraduate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Degree Designation
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    University / Institute
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Batch / Class Years
                  </label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0A192F]"
                  />
                </div>
              </div>
            )}

            {/* Price & Actions */}
            <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Live Configured Total</span>
                <span className="font-cinzel text-xl font-bold text-[#0A192F] tabular-nums">
                  {formattedPrice}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#102A4C] transition-all cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleWhatsAppSend}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold tracking-wider uppercase text-white hover:bg-[#1fae54] transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Proof</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset to Sample Names</span>
              </button>
            </div>

          </div>

          {/* Right: Live Real-Time 3D Certificate Mockup (7 cols) */}
          <div className="lg:col-span-7 flex justify-center perspective-1200">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setRotate({ x: 0, y: 0 })}
              className="w-full max-w-md select-none"
            >
              <motion.div
                animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                className={`transform-3d relative rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-500 ${
                  frameType === 'gold'
                    ? 'bg-gradient-to-br from-[#E6C687] via-[#D4AF37] to-[#8C6D23] shadow-[#D4AF37]/20 border-4 border-[#FDF6E2]'
                    : frameType === 'walnut'
                    ? 'bg-[#3E2723] shadow-black/30 border-4 border-[#5D4037]'
                    : 'bg-[#18181B] shadow-black/30 border-4 border-slate-700'
                }`}
              >
                {/* Parchment Inner Art Board */}
                <div className="relative aspect-[3/4.2] w-full rounded-lg bg-[#FFFDF9] border border-[#E8D499]/60 p-6 flex flex-col justify-between text-center overflow-hidden shadow-inner">
                  
                  {/* Decorative Islamic Arch Border */}
                  <div className="pointer-events-none absolute inset-2 border border-[#C5A059]/40 rounded-md" />
                  <div className="pointer-events-none absolute inset-3 border-2 border-double border-[#C5A059]/30 rounded-md" />

                  {/* Top Bismillah Calligraphy */}
                  <div className="relative z-10 pt-2">
                    <p className="font-cinzel text-lg sm:text-xl font-bold text-[#0A192F] tracking-wide">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#C5A059] font-medium tracking-widest uppercase mt-1">
                      In the Name of Allah, Most Gracious, Most Merciful
                    </p>
                  </div>

                  {/* Center Content based on type */}
                  {designType === 'nikkah' ? (
                    <div className="relative z-10 my-auto py-4">
                      {/* Quranic Verse */}
                      <p className="text-xs sm:text-sm font-arabic font-semibold text-[#102A4C] px-4">
                        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                      </p>
                      <p className="font-luxury italic text-xs text-slate-600 mt-1 mb-4">
                        "And We created you in pairs" · Quran 78:8
                      </p>

                      <div className="border-t border-b border-[#C5A059]/30 py-3 my-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block mb-1">
                          Nikkah Certified Between
                        </span>
                        <div className="font-luxury text-2xl sm:text-3xl font-bold text-[#0A192F] tracking-wide">
                          {groom || 'Groom Name'}
                        </div>
                        <div className="font-luxury text-sm italic text-[#C5A059] my-0.5">&</div>
                        <div className="font-luxury text-2xl sm:text-3xl font-bold text-[#0A192F] tracking-wide">
                          {bride || 'Bride Name'}
                        </div>
                      </div>

                      <div className="text-[10px] sm:text-[11px] text-slate-500 mt-2">
                        <span>{eventDate}</span>
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span>{hijriDate}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 my-auto py-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#102A4C]">
                        وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
                      </p>
                      <p className="font-luxury italic text-xs text-slate-600 mt-1 mb-4">
                        "And my success is only by Allah" · Quran 11:88
                      </p>

                      <div className="border-t border-b border-[#C5A059]/30 py-3 my-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block mb-1">
                          Awarded in Honor of
                        </span>
                        <div className="font-luxury text-2xl sm:text-3xl font-bold text-[#C5A059] tracking-wide">
                          {graduate || 'Graduate Name'}
                        </div>
                        <div className="text-xs font-semibold text-[#0A192F] mt-1.5">
                          {degree || 'Degree Title'}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {university || 'University Name'}
                        </div>
                      </div>

                      <div className="text-[11px] font-semibold text-[#0A192F] mt-2">
                        {batch}
                      </div>
                    </div>
                  )}

                  {/* Signatures & Seal Bottom Strip */}
                  <div className="relative z-10 pt-2 border-t border-[#C5A059]/20 flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-400">
                    <div>
                      <div className="h-5 border-b border-slate-300 w-16 mb-1" />
                      <span>{designType === 'nikkah' ? 'Groom Sign' : 'Registrar'}</span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C5A059] bg-[#FFF9EA] text-[10px] font-bold text-[#C5A059] shadow-sm">
                      AD
                    </div>

                    <div>
                      <div className="h-5 border-b border-slate-300 w-16 mb-1" />
                      <span>{designType === 'nikkah' ? 'Bride Sign' : 'Dean / Seal'}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
