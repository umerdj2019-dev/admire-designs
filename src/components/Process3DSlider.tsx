import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, PenTool, Printer, PackageCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/products';

export const Process3DSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToStep = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
    setIsAutoPlay(false);
  };

  const currentStep = PROCESS_STEPS[currentIndex];

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'PenTool':
        return <PenTool className="h-5 w-5" />;
      case 'Printer':
        return <Printer className="h-5 w-5" />;
      case 'PackageCheck':
        return <PackageCheck className="h-5 w-5" />;
      case 'Truck':
        return <Truck className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <section id="process" className="relative bg-[#FAFAFC] py-20 lg:py-28 overflow-hidden border-b border-slate-100">
      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#0A192F]/[0.02] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#C5A059]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Admire Standard</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A192F] mb-4">
            Our 4-Stage Creation Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every bespoke masterpiece undergoes a rigorous artisanal journey, from vector Arabic calligraphy proofing to hot foil pressing and white-glove packaging.
          </p>
        </div>

        {/* Process Roadmap Navigation Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  className={`relative flex items-center gap-3 p-3.5 rounded-lg border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#0A192F] shadow-md shadow-[#0A192F]/5'
                      : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors ${
                      isActive ? 'bg-[#0A192F] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getStepIcon(step.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold tracking-wider text-[#C5A059] uppercase block">
                      Stage 0{idx + 1}
                    </span>
                    <span className={`text-xs sm:text-sm font-semibold truncate block ${isActive ? 'text-[#0A192F]' : 'text-slate-600'}`}>
                      {step.title}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeProcessPill"
                      className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-[#C5A059]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Animated Showcase Stage */}
        <div className="relative max-w-5xl mx-auto perspective-1200">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                rotateY: direction > 0 ? 30 : -30,
                scale: 0.96,
                z: -80
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
                z: 0
              }}
              exit={{
                opacity: 0,
                rotateY: direction > 0 ? -30 : 30,
                scale: 0.96,
                z: -80
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="transform-3d grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-[#0A192F]/8 overflow-hidden"
            >
              {/* Left Column: Visual Step Showcase (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto min-h-[340px] lg:min-h-[460px] overflow-hidden bg-slate-100">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent lg:hidden" />

                {/* Corner Stage Indicator */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-md bg-[#0A192F]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white tracking-widest shadow-md">
                  <span className="text-[#D4AF37]">STAGE 0{currentIndex + 1}</span>
                  <span className="text-white/40">/</span>
                  <span>04</span>
                </div>
              </div>

              {/* Right Column: Step Description & Quality Metrics (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-1">
                    {currentStep.highlightText}
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0A192F] mb-2">
                    {currentStep.title}
                  </h3>
                  <div className="text-sm font-medium text-[#102A4C] italic mb-4">
                    {currentStep.tagline}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {currentStep.description}
                  </p>

                  {/* Bullet Quality Pillars */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {currentStep.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous step"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0A192F] hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next step"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0A192F] hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Step {currentIndex + 1} of 4: {currentStep.title}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
