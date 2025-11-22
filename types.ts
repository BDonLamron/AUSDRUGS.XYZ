
export interface PriceTier {
  id: string;
  amount: string; // e.g., "1g", "0.5oz"
  price: number;
}

export type Category = 'Cannabis' | 'Stimulants' | 'Psychedelics' | 'Pharmacy' | 'Digital';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  tiers: PriceTier[];
  // Marketplace specific fields
  vendor: {
    name: string;
    rating: number; // 0-5
    sales: number;
    trustLevel: number; // 1-10
    isVerified: boolean;
  };
  origin: string;
  shipsTo: string;
  isEscrow: boolean;
  isFE: boolean; // Finalize Early
  type: 'physical' | 'digital';
  btcAddress?: string;
}

export interface CartItem {
  cartId: string; // Unique ID for the cart entry (productID + tierID)
  productId: string;
  name: string;
  imageUrl: string;
  selectedTier: PriceTier;
  quantity: number;
}

export interface FilterState {
  search: string;
  origin: string; // 'All', 'Australia', 'International'
  shipsTo: string; // 'All', 'Australia', 'Worldwide'
  minPrice: number;
  maxPrice: number;
  categories: Category[];
}
