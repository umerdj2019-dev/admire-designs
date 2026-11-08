import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, CheckCircle2, Sparkles, QrCode } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/products';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Nikkahnama Customization');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Hafsa (Admire Designs),\n` +
      `I would like to inquire regarding: *${inquiryType}*\n` +
      (name ? `Name: ${name}\n` : '') +
      (phone ? `Phone: ${phone}\n` : '') +
      (eventDate ? `Event Date: ${eventDate}\n` : '') +
      (message ? `Details: ${message}\n` : '') +
      `\nPlease let me know your customization options and timeline.`
    );
    window.open(`${WHATSAPP_LINK}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A192F] text-white">
              <Sparkles className="h-4 w-4 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#0A192F]">
                Bespoke Design Inquiry
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct consultation with our senior calligrapher & studio
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!submitted ? (
          <>
            {showQr ? (
              <div className="py-6 text-center">
                <p className="text-xs text-slate-600 mb-4 font-medium">
                  Scan this official WhatsApp QR Code to chat directly with Hafsa at Admire Designs:
                </p>
                <div className="mx-auto w-64 aspect-[9/16] max-h-[380px] overflow-hidden rounded-xl border border-slate-200 shadow-md">
                  <img
                    src="/assets/aistudio/image_e6d13f8b.png"
                    alt="WhatsApp QR Code Hafsa Admire Designs"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  onClick={() => setShowQr(false)}
                  className="mt-4 text-xs font-semibold text-[#0A192F] hover:underline"
                >
                  ← Back to inquiry form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Ayesha Khan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Event / Delivery Date</label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="e.g., 25 Dec 2026"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Inquiry Category</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F] bg-white"
                  >
                    <option value="Nikkahnama Customization">Nikkahnama & Wedding Contracts</option>
                    <option value="Graduation Frame Customization">Graduation & Honor Certificates</option>
                    <option value="Custom Arabic Calligraphy Art">Custom Arabic Calligraphy Art</option>
                    <option value="Urgent Rush Order (< 48 Hours)">Urgent Rush Order (&lt; 48 Hours)</option>
                    <option value="Overseas / International Bulk Order">Overseas / International Bulk Order</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">How can we assist you? *</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your theme, preferred Quranic verse, frame color, or special requests..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0A192F] resize-none"
                  />
                </div>

                <div className="pt-3 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] py-3 font-bold uppercase tracking-wider text-white hover:bg-[#102A4C] transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry to Studio</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-bold uppercase tracking-wider text-white hover:bg-[#1fae54] transition-all cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowQr(true)}
                    className="flex items-center justify-center gap-1.5 py-1 text-slate-500 hover:text-slate-800 transition-colors text-[11px]"
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    <span>View WhatsApp Business QR Code</span>
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-[#0A192F] mb-2">
              Inquiry Dispatched
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed mb-6">
              Thank you, <strong className="text-[#0A192F]">{name}</strong>. Our design consultant will reach out to your WhatsApp at <strong className="text-[#0A192F]">{phone}</strong> within 1-2 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="rounded-lg bg-[#0A192F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
