export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'nikkahnama' | 'graduation' | 'islamic-art' | 'acrylic' | 'gift-sets' | 'prints';
  price: number; // in PKR
  originalPrice?: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  customizable: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  defaultFrame: 'gold' | 'walnut' | 'black';
  availableSizes: Array<{ label: string; dimensions: string; priceMultiplier: number }>;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedFrame: 'gold' | 'walnut' | 'black';
  selectedSize: string;
  customDetails?: {
    brideName?: string;
    groomName?: string;
    eventDate?: string;
    hijriDate?: string;
    graduateName?: string;
    degreeTitle?: string;
    institution?: string;
    notes?: string;
  };
}

export interface ProcessStep {
  id: number;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  image: string;
  iconName: string;
  highlightText: string;
}
