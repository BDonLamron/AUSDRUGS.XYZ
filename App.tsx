
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Product, CartItem, PriceTier, FilterState, Vendor, Order, Transaction, User, Currency, Notification } from './types';
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
import { WalletModal } from './components/WalletModal';
import { SettingsModal } from './components/SettingsModal';
import { AIToolsModal } from './components/AIToolsModal';
import { CheckoutCaptcha } from './components/CheckoutCaptcha';
import { CryptoTicker } from './components/CryptoTicker';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { RaffleWheel } from './components/RaffleWheel';
import { VerifiedVendorsList } from './components/VerifiedVendorsList';
import { VendorPreview } from './components/VendorPreview';
import { EditorPanel } from './components/EditorPanel';
import { DDoSProtection } from './components/DDoSProtection';
import { NotificationToast } from './components/NotificationToast';
import { ChatWidget } from './components/ChatWidget';
import { AnimatePresence } from 'framer-motion';
import { ShoppingBag, Headphones, User as UserIcon, TrendingUp, ShieldCheck, Trophy, Package, DollarSign, Activity, Zap, Terminal, Lock, Hexagon } from 'lucide-react';

const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: "Melbourne Ice - Pure Shards", description: 'Top shelf crystal. Verified 98% purity.', category: 'Stimulants', imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600', tiers: [{ id: 't1', amount: '0.5g', price: 250 }, { id: 't2', amount: '1g', price: 450 }], vendor: { name: 'AusStealthKing', rating: 4.95, sales: 3200, totalRevenue: 850000, trustLevel: 10, isVerified: true, rank: 'Kingpin', joinDate: 'Nov 2022', bio: 'Top quality.', feedback: [], isOnline: true }, origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical', views: 142, stockLevel: 'Medium', stealthRating: 9 },
  { id: 'p2', name: "PGR-Free Gold Coast Green", description: 'Organic bush bud, high THC.', category: 'Cannabis', imageUrl: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600', tiers: [{ id: 't4', amount: '7g', price: 120 }], vendor: { name: 'OrganicFarmerAU', rating: 4.8, sales: 850, totalRevenue: 120000, trustLevel: 8, isVerified: true, rank: 'Supplier', joinDate: 'Jan 2023', bio: 'Sharing the green love.', feedback: [], isOnline: true }, origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: true, type: 'physical', views: 12, stockLevel: 'High', stealthRating: 7 },
  { id: 'p6', name: "MDMA Champagne Rocks", description: '84% purity Dutch import. Re-rocked locally.', category: 'Stimulants', imageUrl: 'https://images.unsplash.com/photo-1626245233965-05c0658428fc?q=80&w=600', tiers: [{ id: 't12', amount: '1g', price: 180 }], vendor: { name: 'TheOneWhoKnocks', rating: 5.0, sales: 9001, totalRevenue: 2500000, trustLevel: 10, isVerified: true, rank: 'Heisenberg', joinDate: 'Oct 2020', bio: 'Say my name.', feedback: [], isOnline: true }, origin: 'Australia', shipsTo: 'Australia', isEscrow: true, isFE: false, type: 'physical', views: 256, stockLevel: 'Critical', stealthRating: 10 }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState(2500.50);
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currency, setCurrency] = useState<Currency>('AUD');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [rafflePot, setRafflePot] = useState(5000);
  const [tickets, setTickets] = useState(1420);
  const [filters, setFilters] = useState<FilterState>({ search: '', origin: 'All', shipsTo: 'All', minPrice: 0, maxPrice: 10000, categories: ['Cannabis', 'Stimulants', 'Psychedelics', 'Pharmacy', 'Digital'], showFavoritesOnly: false });
  
  // Modals
  const [modals, setModals] = useState({ cart: false, support: false, ranks: false, account: false, coinflip: false, orders: false, checkout: false, wallet: false, settings: false, ai: false, login: false, register: false, editor: false, captcha: false });
  const toggleModal = (m: keyof typeof modals, v: boolean) => setModals(p => ({ ...p, [m]: v }));
  
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [vendorPreview, setVendorPreview] = useState<{vendor: Vendor, x: number, y: number} | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const addNotif = (msg: string, type: 'info' | 'success' = 'info') => {
      const id = Math.random().toString();
      setNotifications(p => [...p, { id, message: msg, type }]);
      setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 4000);
  };

  const addToCart = (product: Product, tier: PriceTier) => {
    setCart(prev => [...prev, { cartId: Math.random().toString(), productId: product.id, name: product.name, imageUrl: product.imageUrl, selectedTier: tier, quantity: 1 }]);
    toggleModal('cart', true);
  };

  const filteredProducts = useMemo(() => products.filter(p => {
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (!filters.categories.includes(p.category)) return false;
      if (filters.origin !== 'All' && p.origin !== filters.origin) return false;
      if (filters.showFavoritesOnly && !p.isWishlisted) return false;
      return true;
  }), [products, filters]);

  const uniqueVendors = useMemo(() => Array.from(new Set(products.map(p => p.vendor.name))).map(n => products.find(p => p.vendor.name === n)!.vendor), [products]);

  if (loading) return <DDoSProtection onComplete={() => setLoading(false)} />;

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text font-sans flex flex-col cursor-crosshair overflow-x-hidden">
      <NotificationToast notifications={notifications} removeNotification={id => setNotifications(p => p.filter(n => n.id !== id))} />
      <button onClick={() => window.location.href = "https://google.com"} className="fixed bottom-4 right-4 z-[100] bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:scale-110 transition-transform uppercase text-xs">Panic Exit</button>
      <ChatWidget />
      <RGBBackground matrixMode={matrixMode} />
      <CryptoTicker />

      {/* Ticker */}
      <div className="bg-cyber-card border-b border-cyber-border py-1.5 px-4 flex justify-between text-[10px] font-mono z-20">
         <div className="flex gap-4 text-cyber-muted"><span className="text-cyber-accent">BTC: $96,420</span><span className="text-cyber-purple">XMR: $245</span></div>
         <div className="flex gap-4"><button onClick={() => setMatrixMode(!matrixMode)} className="text-cyber-accent flex gap-1"><Terminal size={10}/> MATRIX</button><span className="text-cyber-success"><ShieldCheck size={10}/> PGP OK</span></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-cyber-bg/80 backdrop-blur-lg border-b border-cyber-border p-4">
         <div className="max-w-[1920px] mx-auto flex justify-between items-center">
             <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
                 <div className="text-cyber-accent animate-pulse"><Hexagon size={32} fill="currentColor" className="text-cyber-bg"/></div>
                 <div><h1 className="font-mono font-bold text-2xl text-white leading-none tracking-tighter animate-rgb-text">AUSDRUGS</h1><p className="text-[10px] text-cyber-muted tracking-[0.2em]">PREMIUM MARKET</p></div>
             </div>
             <div className="flex items-center gap-6">
                 <div className="hidden md:flex flex-col text-right cursor-pointer" onClick={() => toggleModal('wallet', true)}><span className="text-xs text-cyber-gold font-mono">{(walletBalance/145000).toFixed(5)} BTC</span><span className="text-[10px] text-cyber-muted">${walletBalance}</span></div>
                 <button onClick={() => toggleModal('coinflip', true)} className="flex gap-2 text-sm font-bold hover:text-cyber-gold"><DollarSign size={18}/><span className="hidden sm:block">COINFLIP</span></button>
                 <button onClick={() => toggleModal('support', true)} className="flex gap-2 text-sm font-bold hover:text-cyber-accent"><Headphones size={18}/><span className="hidden sm:block">SUPPORT</span></button>
                 {currentUser ? (
                     <div className="flex gap-4">
                        <button onClick={() => toggleModal('orders', true)} className="flex gap-2 text-sm font-bold hover:text-cyber-purple"><Package size={18}/> ORDERS</button>
                        <button onClick={() => toggleModal('account', !modals.account)} className="flex gap-2 text-sm font-bold hover:text-cyber-accent"><UserIcon size={18}/> {currentUser.username}</button>
                     </div>
                 ) : (
                     <div className="flex gap-2"><button onClick={() => toggleModal('login', true)} className="text-sm font-bold border border-cyber-border px-3 py-1 rounded">LOGIN</button><button onClick={() => toggleModal('register', true)} className="text-sm font-bold bg-cyber-accent text-black px-3 py-1 rounded">REGISTER</button></div>
                 )}
                 <button onClick={() => toggleModal('cart', true)} className="relative bg-cyber-card border border-cyber-border p-2 rounded hover:border-cyber-accent"><ShoppingBag size={20}/>{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-cyber-accent text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{cart.reduce((a,b)=>a+b.quantity,0)}</span>}</button>
             </div>
         </div>
      </header>

      <main className="flex-1 max-w-[1920px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          <aside className="lg:col-span-3 space-y-6">
              <FilterPanel filters={filters} setFilters={setFilters} />
              <VerifiedVendorsList vendors={uniqueVendors.filter(v => v.isVerified)} onVendorClick={(v, e) => { e.stopPropagation(); setVendorPreview({ vendor: v, x: e.clientX, y: e.clientY }); }}/>
          </aside>
          <section className="lg:col-span-6">
              <div className="flex justify-between items-center mb-6"><h2 className="font-mono text-2xl font-bold text-white">Listings <span className="text-cyber-accent">({filteredProducts.length})</span></h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} onVendorClick={(v, e) => { e.stopPropagation(); setVendorPreview({ vendor: v, x: e.clientX, y: e.clientY }); }} onProductClick={setSelectedProduct} onToggleWishlist={() => {}} currency={currency} currentUser={currentUser} onEdit={p => { setEditingProduct(p); toggleModal('editor', true); }}/>
                  ))}
              </div>
          </section>
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
             <TopVendorsPanel vendors={uniqueVendors} />
             <div className="bg-cyber-card border border-cyber-border p-4 text-center rounded opacity-50 hover:opacity-100"><h4 className="font-bold text-cyber-purple">ADVERTISE HERE</h4></div>
             <RaffleWheel rafflePot={rafflePot} tickets={tickets} onBuyTicket={() => { setTickets(t => t+1); setRafflePot(p => p+5); }} onSpin={() => {}}/>
          </aside>
      </main>

      <CartSidebar isOpen={modals.cart} onClose={() => toggleModal('cart', false)} cart={cart} removeFromCart={id => setCart(p => p.filter(i => i.cartId !== id))} onCheckout={() => { toggleModal('cart', false); toggleModal('captcha', true); }} onClearCart={() => setCart([])}/>
      
      <AnimatePresence>
         {modals.support && <SupportModal onClose={() => toggleModal('support', false)} />}
         {modals.ranks && <RanksModal onClose={() => toggleModal('ranks', false)} />}
         {modals.coinflip && <CoinflipModal balance={walletBalance} onUpdateBalance={setWalletBalance} onClose={() => toggleModal('coinflip', false)} />}
         {modals.orders && <OrdersModal orders={orders} onClose={() => toggleModal('orders', false)} />}
         {modals.checkout && <CheckoutModal cart={cart} onClose={() => toggleModal('checkout', false)} onOrderComplete={(items, total) => { setOrders(p => [...p, { id: Math.random().toString(), date: 'Now', items, total, status: 'Pending', txHash: '0x123' }]); setCart([]); toggleModal('checkout', false); addNotif("Order Placed!", "success"); }} />}
         {modals.wallet && <WalletModal balance={walletBalance} transactions={transactions} onClose={() => toggleModal('wallet', false)} onDeposit={amt => { setWalletBalance(b => b + amt); addNotif(`$${amt} Deposited`, 'success'); }}/>}
         {modals.settings && <SettingsModal onClose={() => toggleModal('settings', false)} currency={currency} setCurrency={setCurrency} soundEnabled={true} setSoundEnabled={() => {}}/>}
         {modals.ai && <AIToolsModal onClose={() => toggleModal('ai', false)} />}
         {modals.login && <LoginModal onLogin={u => { setCurrentUser(u); toggleModal('login', false); }} onClose={() => toggleModal('login', false)} />}
         {modals.register && <RegisterModal onRegister={u => { setCurrentUser({ username: u, isAdmin: false, xp: 0, level: 1 }); toggleModal('register', false); }} onClose={() => toggleModal('register', false)} />}
         {modals.captcha && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"><CheckoutCaptcha onSuccess={() => { toggleModal('captcha', false); toggleModal('checkout', true); }} /></div>}
         
         {selectedVendor && <VendorModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} products={products} onProductClick={setSelectedProduct} />}
         {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} currency={currency} products={products} currentUser={currentUser} onEdit={p => { setEditingProduct(p); toggleModal('editor', true); }} onVendorClick={(v,e) => { setSelectedProduct(null); setVendorPreview({vendor: v, x: e.clientX, y: e.clientY}); }} />}
         {modals.editor && <EditorPanel product={editingProduct} onSave={p => { setProducts(prev => { const ex = prev.find(i => i.id === p.id); return ex ? prev.map(i => i.id === p.id ? p : i) : [p, ...prev]; }); toggleModal('editor', false); }} onClose={() => toggleModal('editor', false)} />}
         {vendorPreview && <VendorPreview vendor={vendorPreview.vendor} x={vendorPreview.x} y={vendorPreview.y} onClose={() => setVendorPreview(null)} onViewProfile={() => { setSelectedVendor(vendorPreview.vendor); setVendorPreview(null); }} />}
         {modals.account && <AccountMenu onClose={() => toggleModal('account', false)} onOpenWallet={() => toggleModal('wallet', true)} onOpenOrders={() => toggleModal('orders', true)} onOpenSettings={() => toggleModal('settings', true)} onOpenAITools={() => toggleModal('ai', true)} onSignOut={() => { setCurrentUser(null); window.location.reload(); }} user={currentUser} />}
      </AnimatePresence>
      <footer className="bg-cyber-card border-t border-cyber-border py-4 mt-auto z-10 font-mono text-[10px] text-cyber-muted text-center"><div className="flex justify-between px-4"><span>SYSTEM: OK</span><span>&copy; 2025 AUSDRUGS</span></div></footer>
    </div>
  );
}
