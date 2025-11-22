
export interface PriceTier {
  id: string;
  amount: string; // e.g., "1g", "0.5oz"
  price: number;
}

export type Category = 'Cannabis' | 'Stimulants' | 'Psychedelics' | 'Pharmacy' | 'Digital';

export type RankTier = 'Peddler' | 'Runner' | 'Dealer' | 'Supplier' | 'Kingpin' | 'Heisenberg';

export interface Vendor {
    name: string;
    rating: number; // 0-5
    sales: number;
    totalRevenue: number; // New field for leaderboard
    trustLevel: number; // 1-10
    isVerified: boolean;
    rank: RankTier;
    joinDate: string;
    bio: string;
    feedback: { user: string; rating: number; comment: string; time: string }[];
    pgpKey?: string;
    isOnline?: boolean; // New feature
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  tiers: PriceTier[];
  // Marketplace specific fields
  vendor: Vendor;
  origin: string;
  shipsTo: string;
  isEscrow: boolean;
  isFE: boolean; // Finalize Early
  type: 'physical' | 'digital';
  btcAddress?: string;
  // New Features
  isWishlisted?: boolean;
  stealthRating?: number; // 1-10
  views?: number;
  stockLevel?: 'High' | 'Medium' | 'Low' | 'Critical';
}

export interface CartItem {
  cartId: string; // Unique ID for the cart entry (productID + tierID)
  productId: string;
  name: string;
  imageUrl: string;
  selectedTier: PriceTier;
  quantity: number;
  isMixed?: boolean; // Crypto mixing
}

export interface FilterState {
  search: string;
  origin: string; // 'All', 'Australia', 'International'
  shipsTo: string; // 'All', 'Australia', 'Worldwide'
  minPrice: number;
  maxPrice: number;
  categories: Category[];
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  txHash: string;
}