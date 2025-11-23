
import React, { useState, memo } from 'react';
import { Product, PriceTier, User } from '../types';
import { ShoppingCart, Star, Shield, Crown, Gem, Zap, CheckCircle, Eye, Heart, Edit, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard: React.FC<{product: Product, onAddToCart: any, onVendorClick: any, onProductClick: any, onToggleWishlist: any, currency: any, currentUser?: User | null, onEdit?: any}> = memo(({ product, onAddToCart, onVendorClick, onProductClick, onToggleWishlist, currency, currentUser, onEdit }) => {
  const [tier, setTier] = useState(product.tiers[0]);
  const [hover, setHover] = useState(false);
  const canEdit = currentUser?.isAdmin || (currentUser && currentUser.username === product.vendor.name);
  const getPrice = (p: number) => currency === 'BTC' ? `₿${(p/145000).toFixed(6)}` : currency === 'XMR' ? `XMR ${(p/245).toFixed(3)}` : `$${p}`;

  return (
    <motion.div whileHover={{ scale: 1.02 }} onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} className={`bg-cyber-card border rounded-xl overflow-hidden flex flex-col h-full ${product.views && product.views > 50 ? 'border-cyber-danger shadow-neon' : 'border-cyber-border'}`}>
      <div className="relative aspect-[4/3] cursor-pointer" onClick={() => onProductClick(product)}>
        <img src={product.imageUrl} className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-500" loading="lazy"/>
        {canEdit && hover && <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20" onClick={(e) => { e.stopPropagation(); onEdit(product); }}><div className="border border-cyber-accent px-4 py-2 rounded text-cyber-accent flex gap-2"><Edit/> EDIT</div></div>}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }} className="bg-black/60 p-1.5 rounded-full text-white hover:text-cyber-danger"><Heart size={14} fill={product.isWishlisted ? "currentColor" : "none"}/></button>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-cyber-accent flex gap-1"><Eye size={10}/> {product.views}</div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3 bg-cyber-card relative">
        <h3 onClick={() => onProductClick(product)} className="font-mono font-bold text-lg text-white truncate cursor-pointer hover:text-cyber-accent">{product.name}</h3>
        <div className="flex items-center justify-center gap-2 pb-2 border-b border-cyber-border/30" onClick={(e) => onVendorClick(product.vendor, e)}>
            <span className={`text-xs font-bold cursor-pointer ${product.vendor.rank === 'Heisenberg' ? 'text-red-500 animate-glitch' : 'text-white'}`}>{product.vendor.name}</span>
            {product.vendor.isVerified && <CheckCircle size={12} className="text-cyber-success"/>}
            <span className="flex text-yellow-500 text-xs"><Star size={10}/> {product.vendor.rating}</span>
        </div>
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-3 gap-2">{product.tiers.slice(0,3).map(t => <button key={t.id} onClick={() => setTier(t)} className={`text-[10px] py-1 rounded border ${tier.id === t.id ? 'bg-cyber-accent text-black border-cyber-accent' : 'border-cyber-border text-cyber-muted'}`}>{t.amount}</button>)}</div>
          <div className="flex justify-between items-center pt-2 border-t border-cyber-border/50">
             <div><span className="text-[10px] text-cyber-muted">Price</span><div className="font-mono text-xl text-white font-bold">{getPrice(tier.price)}</div></div>
             <button onClick={() => onAddToCart(product, tier)} disabled={product.vendor.isVacation} className="bg-cyber-text text-black p-2.5 rounded hover:bg-cyber-accent disabled:opacity-50"><ShoppingCart size={18}/></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
