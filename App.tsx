import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, PriceTier, FilterState, Vendor, Order } from './types';
import { ProductCard } from './components/ProductCard';
import { RGBBackground } from './components/RGBBackground';
import { CartSidebar } from './components/CartSidebar';
import { FilterPanel } from './components/FilterPanel';
import { SupportModal } from './components/SupportModal';
import { ProductModal } from './components/ProductModal';
import { VendorModal } from './components/VendorModal';
import { RanksModal } from './components/RanksModal';
import { AccountMenu } from './components/AccountMenu';
import { CoinflipModal } from './components/CoinflipModal';
import { OrdersModal } from './components/OrdersModal';
import { CheckoutModal } from './components/CheckoutModal';
import { TopVendorsPanel } from './components/TopVendorsPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Headphones, Menu, User, Lock, TrendingUp, ShieldCheck, Trophy, Bitcoin, Package, DollarSign, Activity, AlertTriangle, Terminal, Zap } from 'lucide-react';

// Updated Product Data with Deep Vendor Info & Ranks & Revenue
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: "Melbourne Ice - Pure Shards",
    description: 'Top shelf crystal. Verified 98% purity. Domestic express shipping from VIC.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't1', amount: '0.5g', price: 250 }, { id: 't2', amount: '1g', price: 450 }, { id: 't3', amount: '3.5g', price: 1400 }],
    vendor: { 
        name: 'AusStealthKing', 
        rating: 4.95, 
        sales: 3200, 
        totalRevenue: 850000,
        trustLevel: 10, 
        isVerified: true,
        rank: 'Kingpin',
        joinDate: 'Nov 2022',
        bio: 'Providing the highest quality imports and domestic synthesises. Zero compromises.',
        feedback: [
            { user: 'user123', rating: 5, comment: 'Landed in 2 days. Top gear.', time: '2 hrs ago' },
            { user: 'stealth_master', rating: 5, comment: 'Stealth is insane. A+.', time: '1 day ago' }
        ]
    },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical',
    views: 42, stockLevel: 'Medium', stealthRating: 9
  },
  {
    id: 'p2',
    name: "PGR-Free Gold Coast Green",
    description: 'Organic bush bud, high THC. No chemicals. Smells like fruit loops.',
    category: 'Cannabis',
    imageUrl: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't4', amount: '7g (Q)', price: 120 }, { id: 't5', amount: '28g (OZ)', price: 350 }],
    vendor: { 
        name: 'OrganicFarmerAU', 
        rating: 4.8, 
        sales: 850, 
        totalRevenue: 120000,
        trustLevel: 8, 
        isVerified: true,
        rank: 'Supplier',
        joinDate: 'Jan 2023',
        bio: 'Just a humble farmer sharing the green love.',
        feedback: [
            { user: 'smoke_weed', rating: 5, comment: 'Taste is amazing.', time: '5 hrs ago' },
            { user: '420_blaze', rating: 4, comment: 'Good but slightly dry.', time: '2 days ago' }
        ]
    },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: true, type: 'physical',
    views: 12, stockLevel: 'High', stealthRating: 7
  },
  {
    id: 'p3',
    name: "Sydney Coke (High Heat)",
    description: 'Uncut brick. Fishscale shine. The best you will find in NSW.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't6', amount: '0.5g', price: 300 }, { id: 't7', amount: '1g', price: 550 }],
    vendor: { 
        name: 'BondiConnect', 
        rating: 4.7, 
        sales: 400, 
        totalRevenue: 150000,
        trustLevel: 7, 
        isVerified: false,
        rank: 'Dealer',
        joinDate: 'Mar 2024',
        bio: 'Direct connection. No middle man.',
        feedback: [
            { user: 'nose_candy', rating: 5, comment: 'Pure fire.', time: '1 day ago' }
        ]
    },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical',
    views: 89, stockLevel: 'Low', stealthRating: 6
  },
  {
    id: 'p4',
    name: "LSD-25 Tabs (200ug)",
    description: 'Swiss Needlepoint crystal laid on blotter art. Clean visual trip.',
    category: 'Psychedelics',
    imageUrl: 'https://images.unsplash.com/photo-1633436245131-0391f6920f66?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't8', amount: '5 Strip', price: 100 }, { id: 't9', amount: '10 Strip', price: 180 }],
    vendor: { 
        name: 'TrippyWizard', 
        rating: 5.0, 
        sales: 150, 
        totalRevenue: 25000,
        trustLevel: 6, 
        isVerified: true,
        rank: 'Runner',
        joinDate: 'May 2024',
        bio: 'Open your mind.',
        feedback: [
            { user: 'psychonaut', rating: 5, comment: 'Visuals were intense.', time: '3 days ago' }
        ]
    },
    origin: 'International', shipsTo: 'Worldwide', isEscrow: true, isFE: true, type: 'physical',
    views: 5, stockLevel: 'High', stealthRating: 10
  },
  {
    id: 'p5',
    name: "Xanax 2mg (Pfizer Press)",
    description: 'Bitter taste, solid snap. Relax after a long week.',
    category: 'Pharmacy',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't10', amount: 'Bottle (50)', price: 200 }, { id: 't11', amount: 'Bottle (100)', price: 350 }],
    vendor: { 
        name: 'PharmaBro', 
        rating: 4.5, 
        sales: 1200, 
        totalRevenue: 420000,
        trustLevel: 9, 
        isVerified: false,
        rank: 'Supplier',
        joinDate: 'Feb 2023',
        bio: 'All your pharma needs sorted.',
        feedback: [
            { user: 'chill_pill', rating: 4, comment: 'Presses look clean.', time: '1 week ago' }
        ]
    },
    origin: 'International', shipsTo: 'Australia', isEscrow: false, isFE: true, type: 'physical',
    views: 30, stockLevel: 'Medium', stealthRating: 8
  },
  {
    id: 'p6',
    name: "MDMA Champagne Rocks",
    description: '84% purity Dutch import. Re-rocked locally. Tested clean.',
    category: 'Stimulants',
    imageUrl: 'https://images.unsplash.com/photo-1626245233965-05c0658428fc?q=80&w=600&auto=format&fit=crop',
    tiers: [{ id: 't12', amount: '1g', price: 180 }, { id: 't13', amount: '3.5g', price: 500 }],
    vendor: { 
        name: 'TheOneWhoKnocks', 
        rating: 5.0, 
        sales: 9001, 
        totalRevenue: 2500000,
        trustLevel: 10, 
        isVerified: true,
        rank: 'Heisenberg',
        joinDate: 'Oct 2020',
        bio: 'Say my name.',
        feedback: [
            { user: 'jesse_p', rating: 5, comment: 'Blue sky quality.', time: '1 hr ago' },
            { user: 'gus_f', rating: 5, comment: 'Acceptable standards.', time: '2 hrs ago' }
        ]
    },
    origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical',
    views: 156, stockLevel: 'Critical', stealthRating: 10
  }
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [walletBalance, setWalletBalance] = useState(2500.50);
  const [matrixMode, setMatrixMode] = useState(false);
  
  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isRanksOpen, setIsRanksOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCoinflipOpen, setIsCoinflipOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Custom Cursor Logic
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Panic Button Handler
  const handlePanic = () => {
      window.location.href = "https://google.com";
  };

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

  const toggleWishlist = (productId: string) => {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, isWishlisted: !p.isWishlisted } : p));
  };

  const handleCheckoutOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        items: [...items],
        total: total,
        status: 'Pending',
        txHash: '0x' + Math.random().toString(36).substr(2, 40)
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    
    // Simulate status updates
    setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? { ...o, status: 'Processing' } : o));
    }, 5000);
    setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? { ...o, status: 'Shipped' } : o));
    }, 15000);
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

  // Unique Vendors for Leaderboard
  const uniqueVendors = useMemo(() => {
      const seen = new Set();
      return products.map(p => p.vendor).filter(v => {
          if(seen.has(v.name)) return false;
          seen.add(v.name);
          return true;
      });
  }, [products]);

  const totalCartItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div 
        className="min-h-screen bg-cyber-bg text-cyber-text font-sans selection:bg-cyber-accent selection:text-black flex flex-col cursor-none"
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
    >
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isClicking ? 'clicking' : ''} hidden md:block`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Panic Button */}
      <button 
        onClick={handlePanic}
        className="fixed bottom-4 right-4 z-[100] bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 shadow-lg hover:scale-110 transition-transform uppercase text-xs tracking-widest animate-pulse"
      >
         Panic Exit
      </button>

      <RGBBackground matrixMode={matrixMode} />

      {/* TOP TICKER BAR */}
      <div className="bg-cyber-card border-b border-cyber-border py-1.5 px-4 flex justify-between items-center text-[10px] font-mono z-20">
         <div className="flex items-center gap-4 text-cyber-muted">
            <span className="flex items-center gap-1 text-cyber-accent animate-pulse"><TrendingUp size={10}/> BTC: $96,420 AUD</span>
            <span className="flex items-center gap-1 text-cyber-purple"><TrendingUp size={10}/> XMR: $245 AUD</span>
         </div>
         <div className="flex items-center gap-4">
            <button onClick={() => setMatrixMode(!matrixMode)} className="text-cyber-accent hover:text-white flex items-center gap-1">
                <Terminal size={10}/> {matrixMode ? 'DISABLE' : 'ENABLE'} MATRIX
            </button>
            <button onClick={() => setIsRanksOpen(true)} className="flex items-center gap-1 text-yellow-400 hover:text-white transition-colors">
                <Trophy size={10}/> VIEW RANKS
            </button>
            <span className="flex items-center gap-1 text-cyber-success"><ShieldCheck size={10}/> CANARY: ALIVE</span>
            <span className="flex items-center gap-1 text-cyber-text"><Lock size={10}/> PGP VERIFIED</span>
         </div>
      </div>

      {/* MAIN HEADER */}
      <header className="sticky top-0 z-30 bg-cyber-bg/80 backdrop-blur-lg border-b border-cyber-border">
         <div className="max-w-[1600px] mx-auto px-4 py-4 flex justify-between items-center">
             {/* Logo */}
             <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
                 <div className="w-10 h-10 bg-gradient-to-br from-cyber-accent to-cyber-purple rounded flex items-center justify-center text-white font-black text-xl shadow-neon group-hover:rotate-12 transition-transform">
                    A
                 </div>
                 <div>
                     <h1 className="font-mono font-bold text-2xl leading-none tracking-tighter text-white group-hover:text-cyber-accent transition-colors animate-rgb-text">AUSDRUGS</h1>
                     <p className="text-[10px] font-mono text-cyber-muted tracking-[0.2em] uppercase">Premium Marketplace</p>
                 </div>
             </div>

             {/* Actions */}
             <div className="flex items-center gap-6 relative">
                 
                 {/* Wallet Widget */}
                 <div className="hidden md:flex flex-col items-end text-right">
                    <span className="text-xs font-mono font-bold text-cyber-gold animate-pulse">{(walletBalance / 145000).toFixed(5)} BTC</span>
                    <span className="text-[10px] text-cyber-muted">${walletBalance.toFixed(2)} AUD</span>
                 </div>

                 <button onClick={() => setIsCoinflipOpen(true)} className="flex items-center gap-2 text-sm font-mono hover:text-cyber-gold transition-colors animate-rgb-text font-bold">
                    <DollarSign size={18} /> <span className="hidden sm:inline">COINFLIP (1.9x)</span>
                 </button>

                 <button onClick={() => setIsSupportOpen(true)} className="flex items-center gap-2 text-sm font-mono hover:text-cyber-accent transition-colors animate-rgb-text font-bold">
                    <Headphones size={18} /> <span className="hidden sm:inline">SUPPORT</span>
                 </button>
                 
                 <div className="relative flex items-center gap-4">
                    <button onClick={() => setIsOrdersOpen(true)} className="flex items-center gap-2 text-sm font-mono hover:text-cyber-purple transition-colors animate-rgb-text font-bold">
                        <Package size={18} /> <span className="hidden sm:inline">ORDERS</span>
                    </button>

                    <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="flex items-center gap-2 text-sm font-mono hover:text-cyber-accent transition-colors animate-rgb-text font-bold">
                        <User size={18} /> <span className="hidden sm:inline">ACCOUNT</span>
                    </button>
                    {isAccountOpen && <AccountMenu onClose={() => setIsAccountOpen(false)} />}
                 </div>

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
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* LEFT SIDEBAR (FILTERS) - COL SPAN 3 */}
          <aside className="lg:col-span-3 space-y-6">
              <FilterPanel filters={filters} setFilters={setFilters} />
              
              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-cyber-card to-black p-6 rounded-lg border border-cyber-border text-center space-y-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer hover:shadow-neon-purple" onClick={() => setIsRanksOpen(true)}>
                 <ShieldCheck size={40} className="mx-auto text-cyber-success mb-2"/>
                 <h3 className="font-mono font-bold text-white">Verified Vendors Only</h3>
                 <p className="text-xs text-cyber-muted">All vendors are vetted. Escrow protection enabled on all orders.</p>
              </div>
          </aside>

          {/* MAIN GRID (PRODUCTS) - COL SPAN 6 */}
          <section className="lg:col-span-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredProducts.map(product => (
                          <ProductCard 
                              key={product.id} 
                              product={product} 
                              onAddToCart={addToCart} 
                              onVendorClick={(v) => setSelectedVendor(v)}
                              onProductClick={(p) => setSelectedProduct(p)}
                              onToggleWishlist={toggleWishlist}
                          />
                      ))}
                  </div>
              )}
          </section>
          
          {/* RIGHT SIDEBAR (TOP VENDORS) - COL SPAN 3 */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
             <TopVendorsPanel vendors={uniqueVendors} />
             
             {/* Ad Placeholder */}
             <div className="h-64 bg-cyber-card border border-cyber-border rounded-lg flex flex-col items-center justify-center p-4 text-center opacity-50 hover:opacity-100 transition-opacity relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/20 to-transparent"></div>
                 <h4 className="font-mono font-bold text-cyber-purple mb-2 relative z-10">ADVERTISE HERE</h4>
                 <p className="text-xs text-cyber-muted relative z-10">Reach 10,000+ daily users. Contact support to buy this slot.</p>
             </div>
          </aside>

      </main>

      <CartSidebar 
         isOpen={isCartOpen} 
         onClose={() => setIsCartOpen(false)} 
         cart={cart} 
         removeFromCart={removeFromCart} 
         onCheckout={() => {
             setIsCartOpen(false);
             setIsCheckoutOpen(true);
         }}
      />

      <AnimatePresence>
         {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}
         {isRanksOpen && <RanksModal onClose={() => setIsRanksOpen(false)} />}
         {isCoinflipOpen && <CoinflipModal balance={walletBalance} onUpdateBalance={setWalletBalance} onClose={() => setIsCoinflipOpen(false)} />}
         {isOrdersOpen && <OrdersModal orders={orders} onClose={() => setIsOrdersOpen(false)} />}
         {isCheckoutOpen && <CheckoutModal cart={cart} onClose={() => setIsCheckoutOpen(false)} onOrderComplete={handleCheckoutOrder} />}
         
         {selectedVendor && <VendorModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}
         {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-cyber-card border-t border-cyber-border py-4 mt-auto z-10 font-mono text-[10px] text-cyber-muted">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Activity size={10} className="text-cyber-success"/> SYSTEM UPTIME: 99.99%</span>
                  <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400"/> LATENCY: 24ms</span>
              </div>
              <div>
                  &copy; 2025 AUSDRUGS.XYZ // ENCRYPTED
              </div>
          </div>
      </footer>

    </div>
  );
};

export default App;