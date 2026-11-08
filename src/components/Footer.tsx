import React, { useState } from 'react';
import { Sparkles, MessageCircle, Instagram, ShieldCheck, Truck, Mail, Phone, QrCode, X } from 'lucide-react';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../data/products';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onOpenInquiry }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-[#0A192F]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Pillar Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-[#0A192F]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0A192F]">All Over Pakistan Delivery</div>
              <div className="text-[11px] text-slate-500">6 to 8 working days</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-[#0A192F]">
              <Sparkles className="h-5 w-5 text-[#C5A059]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0A192F]">Quality Custom Frames</div>
              <div className="text-[11px] text-slate-500">Bespoke names & dates</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-[#0A192F]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0A192F]">WhatsApp Proofing</div>
              <div className="text-[11px] text-slate-500">100% approval before print</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-[#0A192F]">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0A192F]">Direct WhatsApp Care</div>
              <div className="text-[11px] text-slate-500">Fast friendly support</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#0A192F]/20 bg-[#0A192F] shadow-sm ring-1 ring-[#C5A059]/40">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_7.21.14_PM_a5a01cfd.jpeg"
                  alt="ADMIRE DESIGNS"
                  className="h-full w-full object-cover scale-150"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.16em] text-[#0A192F]">
                  ADMIRE DESIGNS
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#C5A059] uppercase">
                  Where Imaginations Meet Design
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Custom framed Nikkahnama marriage contracts and graduation honor certificates, handcrafted and delivered all over Pakistan in 6 to 8 working days.
            </p>

            {/* Social & Contact Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#0A192F] hover:border-[#0A192F] hover:bg-slate-50 transition-colors"
                title="Follow on Instagram"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4.5 w-4.5" />
              </a>

              <button
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0A192F] hover:text-[#0A192F] transition-colors"
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>Scan WhatsApp QR</span>
              </button>
            </div>
          </div>

          {/* Col 1: Designs & Prices */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Designs & Prices
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Floral Nikkah Keepsake (Rs. 4,500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Royal Gold Baroque Frame (Rs. 4,200)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Gold Sunburst Silhouette (Rs. 3,900)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Dark Walnut Wood Frame (Rs. 3,800)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Graduation Degree Frames (Rs. 2,500 – 2,700)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('designs')} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                  Fine Art Print Sheet (Rs. 2,000)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio Process */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Creation Process
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigateTo('process')} className="hover:text-[#0A192F] transition-colors">
                  01. Graphic Designing & Proof
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('process')} className="hover:text-[#0A192F] transition-colors">
                  02. Fine Quality Gold Foil Printing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('process')} className="hover:text-[#0A192F] transition-colors">
                  03. Hand Framing & Wax Seal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('process')} className="hover:text-[#0A192F] transition-colors">
                  04. Insured Doorstep Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('collections')} className="hover:text-[#0A192F] transition-colors">
                  Browse All Designs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button onClick={onOpenInquiry} className="hover:text-[#0A192F] transition-colors font-semibold text-[#0A192F]">
                  Custom Design Inquiry
                </button>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A192F] transition-colors">
                  WhatsApp Support (Hafsa)
                </a>
              </li>
              <li>
                <span className="text-slate-500 font-semibold text-[#0A192F]">Delivery: All Over Pakistan (6 to 8 Working Days)</span>
              </li>
              <li>
                <span className="text-slate-500">Fast Rush Orders: Available via WhatsApp</span>
              </li>
              <li>
                <span className="text-slate-500">Payment: COD & Online Banking</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ADMIRE DESIGNS. All rights reserved. Handcrafted in Pakistan.
          </div>
          <div className="flex items-center gap-6">
            <span>Karachi · Lahore · Islamabad · Rawalpindi · All Over Pakistan (6 to 8 Working Days)</span>
          </div>
        </div>

      </div>

      {/* QR Code Popup Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h4 className="font-cinzel text-base font-bold text-[#0A192F] mb-1">
              WhatsApp Business QR Code
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Scan with your phone camera to start a direct chat with Hafsa at Admire Designs
            </p>
            <div className="mx-auto w-56 aspect-[9/16] max-h-[320px] overflow-hidden rounded-xl border border-slate-200">
              <img
                src="/assets/aistudio/image_e6d13f8b.png"
                alt="Admire Designs WhatsApp QR"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1fae54] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Open in WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </footer>
  );
};
