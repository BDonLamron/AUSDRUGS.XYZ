
export interface PriceTier { id: string; amount: string; price: number; }
export type Category = 'Cannabis' | 'Stimulants' | 'Psychedelics' | 'Pharmacy' | 'Digital';
export type RankTier = 'Peddler' | 'Runner' | 'Dealer' | 'Supplier' | 'Kingpin' | 'Heisenberg';
export interface Vendor { name: string; rating: number; sales: number; totalRevenue: number; trustLevel: number; isVerified: boolean; rank: RankTier; joinDate: string; bio: string; feedback: any[]; pgpKey?: string; isOnline?: boolean; isVacation?: boolean; }
export interface Product { id: string; name: string; description: string; category: Category; imageUrl: string; tiers: PriceTier[]; vendor: Vendor; origin: string; shipsTo: string; isEscrow: boolean; isFE: boolean; type: 'physical' | 'digital'; views?: number; stockLevel?: string; stealthRating?: number; isWishlisted?: boolean; }
export interface CartItem { cartId: string; productId: string; name: string; imageUrl: string; selectedTier: PriceTier; quantity: number; }
export interface FilterState { search: string; origin: string; shipsTo: string; minPrice: number; maxPrice: number; categories: Category[]; showFavoritesOnly?: boolean; }
export interface Order { id: string; date: string; items: CartItem[]; total: number; status: string; txHash: string; }
export interface Transaction { id: string; type: string; amount: number; date: string; status: string; txHash?: string; }
export interface User { username: string; isAdmin: boolean; xp: number; level: number; }
export type Currency = 'AUD' | 'BTC' | 'XMR';
export interface Notification { id: string; message: string; type: 'info' | 'success' | 'error' | 'warning'; }
export interface NewsItem { title: string; source: string; }
