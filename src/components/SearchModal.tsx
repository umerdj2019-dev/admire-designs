import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  currency: 'PKR' | 'USD';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  currency
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by certificate type, verse, frame finish (e.g. Gold, Nikkahnama, Graduation)..."
            className="w-full text-sm font-medium text-[#0A192F] placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching pieces found for "{query}". Try searching "Nikkah", "Gold", or "Graduation".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex items-center gap-4 py-3 hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition-colors"
              >
                <div className="h-14 w-14 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase block">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-cinzel text-sm font-bold text-[#0A192F] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{item.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-cinzel text-sm font-bold text-[#0A192F] tabular-nums">
                    {currency === 'PKR' ? `Rs. ${item.price.toLocaleString()}` : `$${(item.price / 280).toFixed(0)}`}
                  </div>
                  <span className="text-[10px] text-[#0A192F] font-semibold flex items-center justify-end gap-1 mt-0.5">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
