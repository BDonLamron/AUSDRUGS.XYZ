import React, { useState, useMemo } from 'react';
import { Product, CartItem, PriceTier, FilterState } from './types';
import { ProductCard } from './components/ProductCard';
import { RGBBackground } from './components/RGBBackground';
import { CartSidebar } from './components/CartSidebar';
import { FilterPanel } from './components/FilterPanel';
import { SupportModal } from './components/SupportModal';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Headphones, Menu, User, Lock, TrendingUp, ShieldCheck } from 'lucide-react';

// Updated Product Data - "Aussie" Themed
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: "Melbourne Ice - Pure Shards",
    description: 'Top shelf crystal. Verified 98% purity. Domestic express shipping from VIC.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't1', amount: '0.5g', price: 250 }, { id: 't2', amount: '1g', price: 450 }, { id: 't3', amount: '3.5g', price: 1400 }],
    vendor: { name: 'AusStealthKing', rating: 4.95, sales: 3200, trustLevel: 10, isVerified: true },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical'
  },
  {
    id: 'p2',
    name: "PGR-Free Gold Coast Green",
    description: 'Organic bush bud, high THC. No chemicals. Smells like fruit loops.',
    category: 'Cannabis',
    imageUrl: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't4', amount: '7g (Q)', price: 120 }, { id: 't5', amount: '28g (OZ)', price: 350 }],
    vendor: { name: 'OrganicFarmerAU', rating: 4.8, sales: 850, trustLevel: 8, isVerified: true },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: true, type: 'physical'
  },
  {
    id: 'p3',
    name: "Sydney Coke (High Heat)",
    description: 'Uncut brick. Fishscale shine. The best you will find in NSW.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't6', amount: '0.5g', price: 300 }, { id: 't7', amount: '1g', price: 550 }],
    vendor: { name: 'BondiConnect', rating: 4.7, sales: 400, trustLevel: 7, isVerified: false },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical'
  },
  {
    id: 'p4',
    name: "LSD-25 Tabs (200ug)",
    description: 'Swiss Needlepoint crystal laid on blotter art. Clean visual trip.',
    category: 'Psychedelics',
    imageUrl: 'https://images.unsplash.com/photo-1633436245131-0391f6920f66?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't8', amount: '5 Strip', price: 100 }, { id: 't9', amount: '10 Strip', price: 180 }],
    vendor: { name: 'TrippyWizard', rating: 5.0, sales: 150, trustLevel: 6, isVerified: true },
    origin: 'International', shipsTo: 'Worldwide', isEscrow: true, isFE: true, type: 'physical'
  },
  {
    id: 'p5',
    name: "Xanax 2mg (Pfizer Press)",
    description: 'Bitter taste, solid snap. Relax after a long week.',
    category: 'Pharmacy',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't10', amount: 'Bottle (50)', price: 200 }, { id: 't11', amount: 'Bottle (100)', price: 350 }],
    vendor: { name: 'PharmaBro', rating: 4.5, sales: 1200, trustLevel: 9, isVerified: false },
    origin: 'International', shipsTo: 'Australia', isEscrow: false, isFE: true, type: 'physical'
  },
  {
    id: 'p6',
    name: "MDMA Champagne Rocks",
    description: '84% purity Dutch import. Re-rocked locally. Tested clean.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1626245233965-05c0658428fc?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't12', amount: '1g', price: 180 }, { id: 't13', amount: '3.5g', price: 500 }],
    vendor: { name: 'RaveCave', rating: 4.9, sales: 600, trustLevel: 8, isVerified: true },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical'
  }
];

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    origin: 'All',
    shipsTo: 'All',
    minPrice: 0,
    maxPrice: 10000,
    categories: ['Cannabis', 'Stimulants', 'Psychedelics', 'Pharmacy', 'Digital']
  });

  const addToCart = (product: Product, tier: PriceTier) => {
    const cartId = `${product.id}-${tier.id}`;
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { cartId, productId: product.id, name: product.name, imageUrl: product.imageUrl, selectedTier: tier, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase()) && !p.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      // Category
      if (!filters.categories.includes(p.category)) return false;
      // Origin
      if (filters.origin !== 'All' && p.origin !== filters.origin) return false;
      if (filters.origin === 'Australia' && p.origin !== 'Australia') return false;
      // Ships To
      if (filters.shipsTo !== 'All' && p.shipsTo !== filters.shipsTo && p.shipsTo !== 'Worldwide') return false;
      // Price
      const minP = Math.min(...p.tiers.map(t => t.price));
      const maxP = Math.max(...p.tiers.map(t => t.price));
      if (maxP < filters.minPrice) return false;
      if (minP > filters.maxPrice) return false;

      return true;
    });
  }, [products, filters]);

  const totalCartItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text font-sans selection:bg-cyber-accent selection:text-black flex flex-col">
      <RGBBackground />

      {/* TOP TICKER BAR */}
      <div className="bg-cyber-card border-b border-cyber-border py-1.5 px-4 flex justify-between items-center text-[10px] font-mono z-20">
         <div className="flex items-center gap-4 text-cyber-muted">
            <span className="flex items-center gap-1 text-cyber-accent"><TrendingUp size={10}/> BTC: $96,420 AUD</span>
            <span className="flex items-center gap-1 text-cyber-purple"><TrendingUp size={10}/> XMR: $245 AUD</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-cyber-success"><ShieldCheck size={10}/> CANARY: ALIVE</span>
            <span className="flex items-center gap-1 text-cyber-text"><Lock size={10}/> PGP VERIFIED</span>
         </div>
      </div>

      {/* MAIN HEADER */}
      <header className="sticky top-0 z-30 bg-cyber-bg/80 backdrop-blur-lg border-b border-cyber-border">
         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
             {/* Logo */}
             <div className="flex items-center gap-3 group cursor-pointer">
                 <div className="w-10 h-10 bg-gradient-to-br from-cyber-accent to-cyber-purple rounded flex items-center justify-center text-white font-black text-xl shadow-neon">
                    A
                 </div>
                 <div>
                     <h1 className="font-mono font-bold text-2xl leading-none tracking-tighter text-white group-hover:text-cyber-accent transition-colors">AUSDRUGS</h1>
                     <p className="text-[10px] font-mono text-cyber-muted tracking-[0.2em] uppercase">Premium Marketplace</p>
                 </div>
             </div>

             {/* Actions */}
             <div className="flex items-center gap-6">
                 <button onClick={() => setIsSupportOpen(true)} className="flex items-center gap-2 text-sm font-mono hover:text-cyber-accent transition-colors">
                    <Headphones size={18} /> <span className="hidden sm:inline">SUPPORT</span>
                 </button>
                 <button className="flex items-center gap-2 text-sm font-mono hover:text-cyber-accent transition-colors">
                    <User size={18} /> <span className="hidden sm:inline">ACCOUNT</span>
                 </button>
                 <button 
                    onClick={() => setIsCartOpen(true)} 
                    className="relative bg-cyber-card border border-cyber-border p-2.5 rounded hover:border-cyber-accent group transition-all"
                 >
                    <ShoppingBag size={20} className="group-hover:text-cyber-accent"/>
                    {totalCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-cyber-accent text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-neon">
                            {totalCartItems}
                        </span>
                    )}
                 </button>
             </div>
         </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          
          {/* LEFT SIDEBAR (FILTERS) */}
          <aside className="lg:col-span-1 space-y-6">
              <FilterPanel filters={filters} setFilters={setFilters} />
              
              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-cyber-card to-black p-6 rounded-lg border border-cyber-border text-center space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                 <ShieldCheck size={40} className="mx-auto text-cyber-success mb-2"/>
                 <h3 className="font-mono font-bold text-white">Verified Vendors Only</h3>
                 <p className="text-xs text-cyber-muted">All vendors are vetted. Escrow protection enabled on all orders.</p>
              </div>
          </aside>

          {/* MAIN GRID (PRODUCTS) */}
          <section className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="font-mono text-2xl font-bold text-white">
                      Market Listings <span className="text-cyber-accent text-sm ml-2">({filteredProducts.length})</span>
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyber-muted">
                      <span>SORT BY:</span>
                      <select className="bg-cyber-card border border-cyber-border rounded p-1 outline-none focus:border-cyber-accent">
                          <option>Featured</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                          <option>Newest</option>
                      </select>
                  </div>
              </div>

              {filteredProducts.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-cyber-muted border-2 border-dashed border-cyber-border rounded-lg">
                      <p>No products found matching filters.</p>
                      <button onClick={() => setFilters(prev => ({...prev, search: '', origin: 'All', categories: ['Cannabis', 'Stimulants', 'Psychedelics', 'Pharmacy', 'Digital']}))} className="mt-2 text-cyber-accent underline">Reset Filters</button>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                          <ProductCard 
                              key={product.id} 
                              product={product} 
                              onAddToCart={addToCart} 
                          />
                      ))}
                  </div>
              )}
          </section>

      </main>

      <CartSidebar 
         isOpen={isCartOpen} 
         onClose={() => setIsCartOpen(false)} 
         cart={cart} 
         removeFromCart={removeFromCart} 
      />

      <AnimatePresence>
         {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-cyber-card border-t border-cyber-border py-8 mt-auto z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="font-mono text-cyber-accent font-bold text-lg mb-2">AUSDRUGS.XYZ</p>
              <p className="text-xs text-cyber-muted">
                  &copy; 2025 Underground Network. Tor Connection Recommended. <br/>
                  <span className="opacity-50">Keep it discreet. Keep it safe.</span>
              </p>
          </div>
      </footer>

    </div>
  );
};

export default App;
