/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSlides } from './components/ProductSlides';
import { Process3DSlider } from './components/Process3DSlider';
import { ProductModal } from './components/ProductModal';
import { Craftsmanship } from './components/Craftsmanship';
import { CartDrawer } from './components/CartDrawer';
import { InquiryModal } from './components/InquiryModal';
import { SearchModal } from './components/SearchModal';
import { FloatingSocialIcons } from './components/FloatingSocialIcons';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  
  // Modals state
  const [cartOpen, setCartOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Cart state with initial sample item for rich preview
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      productId: 'nikkah-royal-gold',
      name: 'Royal Gold Baroque Nikkahnama Frame',
      image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg',
      price: 4200,
      quantity: 1,
      selectedFrame: 'gold',
      selectedSize: 'Standard A4 (8.3 × 11.7 in)',
      customDetails: {
        groomName: 'Zohaib',
        brideName: 'Hamna',
        eventDate: '11 January 2025',
        hijriDate: 'Rajab 11, 1446 AH'
      }
    }
  ]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.selectedFrame === item.selectedFrame && i.selectedSize === item.selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleQuickAddProduct = (product: Product) => {
    const defaultSize = product.availableSizes[0];
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      selectedFrame: product.defaultFrame,
      selectedSize: `${defaultSize.label} (${defaultSize.dimensions})`
    };
    handleAddToCart(item);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenProductById = (id: string) => {
    const found = PRODUCTS.find((p) => p.id === id);
    if (found) {
      setActiveProduct(found);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#0A192F] selection:bg-[#0A192F] selection:text-white flex flex-col font-sans">
      
      {/* Header with Centered Sliding Logo & Top Bar Contract */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
        onNavigateTo={scrollToSection}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section with Interactive 3D Frame & Story */}
        <Hero
          onExploreClick={() => scrollToSection('designs')}
          onOpenProduct={handleOpenProductById}
        />

        {/* Interactive Slides: Original Attached Pictures with Prices in Rs. 2,000 to Rs. 4,500 */}
        <ProductSlides
          products={PRODUCTS}
          onSelectProduct={(p) => setActiveProduct(p)}
          onAddToCart={handleQuickAddProduct}
        />

        {/* 3D Animated Slider: Our Process (Graphic Designing -> Printing -> Packaging -> Final Delivery) */}
        <Process3DSlider />

        {/* Craftsmanship & Verified Patron Reviews */}
        <Craftsmanship />

      </main>

      {/* Floating WhatsApp & Instagram Icons (strictly icons only, no text) */}
      <FloatingSocialIcons />

      {/* Footer */}
      <Footer
        onNavigateTo={scrollToSection}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* Product Detail & Customization Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Bespoke Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setActiveProduct(p)}
        currency={currency}
      />

    </div>
  );
}
