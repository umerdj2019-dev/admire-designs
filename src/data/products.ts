import { Product, ProcessStep } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'nikkah-royal-gold',
    name: 'Royal Gold Baroque Nikkahnama Frame',
    subtitle: 'Custom Islamic marriage contract in carved ornate gold frame',
    category: 'nikkahnama',
    price: 4200,
    originalPrice: 4800,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_8.46.03_PM_5bf96d47.jpeg'
    ],
    description: 'Custom framed Nikkahnama personalized with Bride & Groom names, ceremony date, and Quranic verse. Delivered ready to display on your signing table.',
    features: [
      'Customized with Bride & Groom names',
      'Islamic & Gregorian date personalization',
      'Carved gold frame with glass casing',
      'Free digital proof on WhatsApp before printing',
      'Ready to display'
    ],
    customizable: true,
    isBestseller: true,
    defaultFrame: 'gold',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'nikkah-ceremony-frame',
    name: 'Floral Nikkah Keepsake Frame',
    subtitle: 'Signature wedding contract frame treasured by couples',
    category: 'nikkahnama',
    price: 4500,
    originalPrice: 5200,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_8.46.03_PM_5bf96d47.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_8.46.03_PM_5bf96d47.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg'
    ],
    description: 'Our most popular couple choice. Handcrafted with bespoke floral motifs, couple signatures, and Quranic verses for a timeless wedding memory.',
    features: [
      'Personalized with Bride & Groom names & date',
      'Premium carved wooden frame with glass front',
      'WhatsApp preview before production',
      'Safe delivery across Pakistan',
      'Includes signing pen area'
    ],
    customizable: true,
    isBestseller: true,
    defaultFrame: 'walnut',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'nikkah-radiant-sunburst',
    name: 'Gold Sunburst Nikkah Frame with Silhouette',
    subtitle: 'Golden border marriage agreement with couple silhouette art',
    category: 'nikkahnama',
    price: 3900,
    originalPrice: 4400,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM_776611e3.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM_776611e3.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg'
    ],
    description: 'Features the Sunnah vow with bride and groom silhouette backdrop, illuminated golden borders, and dedicated signature lines.',
    features: [
      'Illuminated golden floral design',
      'Bride & Groom personalized names',
      'Ornate baroque gold frame',
      'WhatsApp draft approval included',
      'Safe courier packing'
    ],
    customizable: true,
    isBestseller: true,
    defaultFrame: 'gold',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'nikkah-heritage-walnut',
    name: 'Dark Walnut Wood Nikkahnama Frame',
    subtitle: 'Classic dark wooden frame with ornate Islamic border',
    category: 'nikkahnama',
    price: 3800,
    originalPrice: 4200,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__2__4b108c6b.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__2__4b108c6b.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg'
    ],
    description: 'Timeless dark walnut wood finish frame featuring Arabic calligraphy and your custom wedding vows. Complete with signature lines for Bride and Groom.',
    features: [
      'Solid dark walnut wood frame',
      'Personalized with couple names and dates',
      'Clear protective front glass',
      'Digital proof sent via WhatsApp',
      'Hanger and desktop stand included'
    ],
    customizable: true,
    defaultFrame: 'walnut',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'grad-bespoke-silhouette',
    name: 'Graduation Frame - Silhouette Art',
    subtitle: 'Personalized graduate portrait frame with cap and hood',
    category: 'graduation',
    price: 2700,
    originalPrice: 3200,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM_1e5f7883.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM_1e5f7883.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__1__9acd3cf6.jpeg'
    ],
    description: 'Custom graduate silhouette illustration with personalized hood color, graduate name, university, and convocation class year.',
    features: [
      'Personalized graduate illustration & name',
      'Custom university and degree designation',
      'Modern gallery frame with gold pinstripe',
      'WhatsApp preview before final print',
      'Secure doorstep delivery'
    ],
    customizable: true,
    defaultFrame: 'black',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'grad-academic-honor',
    name: 'Graduation Frame - Cap & Scroll Design',
    subtitle: 'Custom degree frame with Quranic verse and academic honors',
    category: 'graduation',
    price: 2500,
    originalPrice: 2900,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__1__9acd3cf6.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__1__9acd3cf6.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM_1e5f7883.jpeg'
    ],
    description: 'Celebrate university convocation with "And my success is only by Allah". Custom personalized with graduate name, degree title, university name, and batch.',
    features: [
      'Graduate name & degree personalization',
      'Quranic verse in Arabic calligraphy',
      'Sleek gallery frame with glass front',
      'WhatsApp digital proof before printing',
      'Table stand and wall hanging hook'
    ],
    customizable: true,
    isBestseller: true,
    defaultFrame: 'black',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'nikkah-archival-sheet',
    name: 'Unframed Nikkahnama Print Sheet',
    subtitle: 'High definition certificate print ready for your own custom frame',
    category: 'prints',
    price: 2000,
    originalPrice: 2400,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM__1__382f20ee.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM__1__382f20ee.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM_776611e3.jpeg'
    ],
    description: 'Unframed customized Nikkahnama certificate sheet, shipped flat in protective rigid board packaging. Ideal for travel or framing with your own custom mouldings.',
    features: [
      'Personalized wedding contract sheet',
      'High definition print with gold borders',
      'Delivered flat in protective rigid folder',
      'Digital WhatsApp approval included',
      'Easy to carry overseas'
    ],
    customizable: true,
    defaultFrame: 'gold',
    availableSizes: [
      { label: 'Standard A4', dimensions: '8.3 × 11.7 in', priceMultiplier: 1.0 },
      { label: 'Large A3', dimensions: '11.7 × 16.5 in', priceMultiplier: 1.0 }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Graphic Designing',
    tagline: 'Custom Calligraphy & Proofing',
    description: 'We arrange the couple names, dates, and Arabic verses into a clean, balanced layout. You receive a digital draft on WhatsApp for your direct review and approval before printing.',
    details: [
      'Arabic calligraphy & name styling',
      'Couple names and date alignment',
      '1-on-1 proofing and approval on WhatsApp'
    ],
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.17_PM__1__382f20ee.jpeg',
    iconName: 'PenTool',
    highlightText: 'Stage 01'
  },
  {
    id: 2,
    title: 'Printing',
    tagline: 'High Definition Fine Printing',
    description: 'Each certificate is printed with sharp, vibrant detail, rich gold borders, and crisp Arabic calligraphy that looks stunning under ambient lighting.',
    details: [
      'Heavyweight quality textured card',
      'Crisp gold border detailing',
      'Fade-proof long-lasting inks'
    ],
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.15_PM_d1bfa72d.jpeg',
    iconName: 'Printer',
    highlightText: 'Stage 02'
  },
  {
    id: 3,
    title: 'Packaging',
    tagline: 'Careful Framing & Inspection',
    description: 'Each piece is hand-fitted into your chosen gold, walnut, or black frame with protective glass, carefully inspected, and bubble-wrapped for safe transit.',
    details: [
      'Fitted frame assembly with glass front',
      'Thorough quality check before dispatch',
      'Cushioned shock-resistant protection'
    ],
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM_776611e3.jpeg',
    iconName: 'PackageCheck',
    highlightText: 'Stage 03'
  },
  {
    id: 4,
    title: 'Final Delivery',
    tagline: 'Doorstep Courier Delivery',
    description: 'Delivered securely to your doorstep anywhere in Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad, and other cities) via trusted couriers.',
    details: [
      'Doorstep delivery across Pakistan',
      'Cash on Delivery (COD) available',
      'Safe arrival guarantee'
    ],
    image: '/assets/aistudio/WhatsApp_Image_2026-11-06_at_6.30.16_PM__1__9acd3cf6.jpeg',
    iconName: 'Truck',
    highlightText: 'Stage 04'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Designs' },
  { id: 'nikkahnama', name: 'Nikkahnama Frames' },
  { id: 'graduation', name: 'Graduation Frames' },
  { id: 'prints', name: 'Unframed Prints' }
];

export const WHATSAPP_LINK = 'https://wa.me/923261072844?';
export const INSTAGRAM_LINK = 'https://www.instagram.com/admiredesigns.pk?utm_source=qr&dlrf=MW5zemk4dzR4bWcxYw==';
