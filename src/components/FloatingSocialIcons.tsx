import React from 'react';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../data/products';

export const FloatingSocialIcons: React.FC = () => {
  return (
    <aside aria-label="Social contact channels" className="fixed right-4 sm:right-6 bottom-6 z-50 flex flex-col items-center gap-3">
      {/* Instagram Floating Icon - Icon Only */}
      <a
        href={INSTAGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Admire Designs on Instagram"
        title="Follow Admire Designs on Instagram"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0A192F] shadow-lg shadow-black/10 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#C5A059]"
      >
        <span className="sr-only">Instagram</span>
        <svg
          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>

      {/* WhatsApp Floating Icon - Icon Only */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hafsa at Admire Designs on WhatsApp"
        title="Chat with Hafsa at Admire Designs on WhatsApp"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/40"
      >
        <span className="sr-only">WhatsApp</span>
        <svg
          className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.12c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.14.11-3.69-.94-3.26-1.34-5.36-4.66-5.52-4.88-.16-.22-1.32-1.76-1.32-3.35 0-1.59.83-2.37 1.13-2.69.3-.32.65-.4.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.55.27.65.92 2.24.99 2.4.08.16.13.35.03.57-.11.22-.16.35-.32.54-.16.19-.34.42-.48.56-.16.16-.33.33-.14.65.19.32.85 1.4 1.82 2.26 1.25 1.11 2.3 1.46 2.63 1.62.33.16.51.14.7-.08.2-.22.84-.98 1.06-1.32.22-.35.43-.29.73-.18.3.11 1.9.9 2.22 1.06.32.16.54.24.62.38.08.14.08.82-.16 1.5z" />
        </svg>
      </a>
    </aside>
  );
};
