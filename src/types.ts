export interface ProductHotspot {
  title: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface ColorOption {
  name: string;
  hex: string;
  border?: boolean;
}

export type RacingCategory =
  | 'All Racing Hoodies'
  | 'Limited Edition'
  | 'Formula 1 & Grand Prix'
  | 'Supercars & Hypercars'
  | 'JDM & Tuner Legends'
  | 'Track & Muscle';

export type CarMaker =
  | 'All Makers'
  | 'Ferrari'
  | 'McLaren'
  | 'Porsche'
  | 'BMW'
  | 'Nissan'
  | 'Toyota'
  | 'Lamborghini'
  | 'Mercedes-AMG'
  | 'Bugatti'
  | 'Shelby'
  | 'Audi'
  | 'Honda';

export type ColorTone =
  | 'All Colors'
  | 'White & Cream'
  | 'Black & Charcoal'
  | 'Silver & Grey'
  | 'Papaya & Yellow'
  | 'Sakura Pink'
  | 'Lavender Lilac'
  | 'Verde Lime';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Formula 1 & Grand Prix' | 'Supercars & Hypercars' | 'JDM & Tuner Legends' | 'Track & Muscle';
  isLimitedEdition: boolean;
  carMaker: CarMaker;
  carModel: string;
  colorTone: ColorTone;
  engineSpec: string;
  priceUSD: number;
  priceBDT: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors: ColorOption[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  gsm: number;
  sku: string;
  description: string;
  hotspots: ProductHotspot[];
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: ColorOption;
  quantity: number;
}
