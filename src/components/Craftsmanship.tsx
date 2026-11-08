import React from 'react';
import { Sparkles, Shield, Heart, CheckCircle2, Star, Truck } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const pillars = [
    {
      title: 'Personalized to Perfection',
      description: 'Customized with your names, special dates, and preferred Quranic verses.',
      icon: <Heart className="h-5 w-5 text-[#C5A059]" />
    },
    {
      title: 'WhatsApp Proof Before Printing',
      description: 'We share a complete digital draft on WhatsApp for your 100% review and approval.',
      icon: <CheckCircle2 className="h-5 w-5 text-[#C5A059]" />
    },
    {
      title: 'Premium Quality Frames',
      description: 'Elegant gold, walnut, and black frames assembled with clean precision.',
      icon: <Shield className="h-5 w-5 text-[#C5A059]" />
    },
    {
      title: 'Safe Nationwide Delivery',
      description: 'Carefully cushioned packaging delivered safely anywhere in Pakistan.',
      icon: <Truck className="h-5 w-5 text-[#C5A059]" />
    }
  ];

  const testimonials = [
    {
      quote: "Our Nikkahnama arrived in Lahore in impeccable packaging. The frame looked gorgeous on our signing table. Every single guest complimented it!",
      author: "Mahnoor & Zunair",
      location: "Lahore, Pakistan · Verified Wedding Order",
      rating: 5
    },
    {
      quote: "Ordered my sister's graduation frame for IIUI Islamabad. The Arabic calligraphy and name detailing were beautiful. Great service on WhatsApp!",
      author: "Hamna S.",
      location: "Islamabad, Pakistan · Verified Graduation Order",
      rating: 5
    },
    {
      quote: "The digital proof was sent on WhatsApp quickly, and the frame was securely delivered right on schedule in perfect condition.",
      author: "Zohaib & Ayesha",
      location: "Rawalpindi, Pakistan · Verified Order",
      rating: 5
    }
  ];

  return (
    <section id="craftsmanship" className="bg-white py-16 lg:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split Section: Nikkah Couple Showcase & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Column: Real Nikkah Ceremony Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_8.46.03_PM_5bf96d47.jpeg"
                alt="Couple signing their Nikkah Certificate"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E8D499] font-bold">
                  Cherished Wedding Moments
                </span>
                <p className="font-cinzel text-base sm:text-lg font-bold text-white mt-1">
                  Custom Nikkahnama Signed & Treasured
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Why People Choose Admire Designs */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Admire Designs</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A192F] mb-4">
              Why People Choose Admire Designs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              We design and craft custom framed Nikkahnama certificates and graduation keepsakes with timeless elegance. Every order is personalized to your exact names, dates, and preferences with digital proofing on WhatsApp before printing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-2 font-bold text-[#0A192F] text-sm mb-1">
                    {pillar.icon}
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Testimonials Strip */}
        <div id="reviews" className="pt-14 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-1">
              <span>Customer Reviews</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0A192F]">
              What Our Happy Customers Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 rounded-xl border border-slate-200/90 bg-[#FDFEFE] shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-[#C5A059]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="italic text-sm text-[#0A192F] leading-relaxed mb-5">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="font-bold text-xs text-[#0A192F]">{t.author}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
