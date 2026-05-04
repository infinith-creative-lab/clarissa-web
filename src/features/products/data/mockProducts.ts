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
  rating: number;
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
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Midnight', hex: '#191970' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    rating: 4.8
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
    rating: 4.9
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
  }
];
