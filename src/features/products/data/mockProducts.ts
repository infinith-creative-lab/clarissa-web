export interface Product {
  id: string;
  name: string;
  category: 'fashion' | 'beauty';
  subCategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  rating: number;
  description?: string;
  details?: string[];
  sizeGuide?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  // FASHION
  {
    id: 'f1',
    name: 'Silk Modest Dress - Ivory',
    category: 'fashion',
    subCategory: 'modest',
    price: 1250000,
    originalPrice: 1500000,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Midnight', hex: '#191970' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isSale: true,
    isBestSeller: true,
    rating: 4.8,
    description: 'Elevate your elegance with our Silk Modest Dress. Crafted from the finest mulberry silk, this dress features a subtle ivory sheen that captures the light beautifully. Designed with a modest silhouette that flows gracefully with every step.',
    details: [
      '100% Premium Mulberry Silk',
      'Soft ivory finish with natural sheen',
      'Hidden back zipper for a seamless look',
      'Breathable and lightweight for all-day comfort',
      'Elegant pleated detailing on the cuffs'
    ],
    sizeGuide: 'Standard sizing applies. Model is 172cm wearing size M.'
  },
  {
    id: 'f2',
    name: 'Premium Chiffon Hijab',
    category: 'fashion',
    subCategory: 'hijab',
    price: 245000,
    images: [
      'https://images.unsplash.com/photo-1585116612824-1273519c2f76?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#DCAE96' },
      { name: 'Sage', hex: '#9CAF88' }
    ],
    isBestSeller: true,
    rating: 4.5
  },
  {
    id: 'f3',
    name: 'Essential Leather Tote',
    category: 'fashion',
    subCategory: 'bags',
    price: 3850000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    isNew: true,
    originalPrice: 4500000,
    rating: 4.9
  },
  {
    id: 'f4',
    name: 'Seamless Comfort Bra',
    category: 'fashion',
    subCategory: 'underwear',
    price: 325000,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7
  },
  {
    id: 'f5',
    name: 'Elegant Slide Sandals',
    category: 'fashion',
    subCategory: 'footwear',
    price: 850000,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop'
    ],
    isNew: true,
    rating: 4.6
  },
  {
    id: 'f6',
    name: 'Kids Adventure Cap',
    category: 'fashion',
    subCategory: 'kids',
    price: 195000,
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.4
  },
  // BEAUTY
  {
    id: 'b1',
    name: 'Radiance Glow Serum',
    category: 'beauty',
    subCategory: 'skincare',
    price: 650000,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'
    ],
    isNew: true,
    rating: 4.7
  },
  {
    id: 'b2',
    name: 'Velvet Matte Lipstick',
    category: 'beauty',
    subCategory: 'cosmetics',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Classic Red', hex: '#B22222' },
      { name: 'Nude Peach', hex: '#FFDAB9' }
    ],
    rating: 4.6
  },
  {
    id: 'b3',
    name: 'Botanical Hair Mask',
    category: 'beauty',
    subCategory: 'haircare',
    price: 320000,
    originalPrice: 450000,
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1000&auto=format&fit=crop'
    ],
    isSale: true,
    rating: 4.4
  },
  {
    id: 'f7',
    name: 'Satin Pleated Skirt',
    category: 'fashion',
    subCategory: 'modest',
    price: 850000,
    images: ['https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.8
  },
  {
    id: 'f8',
    name: 'Jersey Instant Hijab',
    category: 'fashion',
    subCategory: 'hijab',
    price: 185000,
    images: ['https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.5
  },
  {
    id: 'f9',
    name: 'Mini Crossbody Bag',
    category: 'fashion',
    subCategory: 'bags',
    price: 1450000,
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=1000&auto=format&fit=crop'],
    isNew: true,
    rating: 4.7
  },
  {
    id: 'f10',
    name: 'Lace Trimmed Inner',
    category: 'fashion',
    subCategory: 'modest',
    price: 125000,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.6
  },
  {
    id: 'f11',
    name: 'Canvas Weekender',
    category: 'fashion',
    subCategory: 'bags',
    price: 2250000,
    originalPrice: 2750000,
    images: ['https://images.unsplash.com/photo-1544816153-12ad5d713312?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.8
  },
  {
    id: 'f12',
    name: 'Pointed Toe Flats',
    category: 'fashion',
    subCategory: 'footwear',
    price: 1150000,
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.5
  },
  {
    id: 'f13',
    name: 'Flowy Abaya - Black',
    category: 'fashion',
    subCategory: 'modest',
    price: 1850000,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'],
    isBestSeller: true,
    rating: 4.9
  },
  {
    id: 'f14',
    name: 'Embroidered Scarf',
    category: 'fashion',
    subCategory: 'hijab',
    price: 325000,
    images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.7
  },
  {
    id: 'b4',
    name: 'Overnight Repair Cream',
    category: 'beauty',
    subCategory: 'skincare',
    price: 890000,
    images: ['https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?q=80&w=1000&auto=format&fit=crop'],
    isNew: true,
    rating: 4.8
  },
  {
    id: 'b5',
    name: 'Volume Boost Mascara',
    category: 'beauty',
    subCategory: 'cosmetics',
    price: 245000,
    images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.6
  }
];
