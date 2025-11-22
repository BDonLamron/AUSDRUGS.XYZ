import React, { useState, useEffect } from 'react';
import { Product, PriceTier, RankTier } from '../types';
import { ShoppingCart, Star, Shield, CheckCircle, Crown, Gem, Zap, Eye, Heart, AlertTriangle, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, tier: PriceTier) => void;
  onVendorClick: (vendor: any) => void;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
}

const VendorNameEffect: React.FC<{ name: string; rank: RankTier }> = ({ name, rank }) => {
    let className = "text-xs font-bold hover:underline transition-all ";
    
    switch(rank) {
        case 'Heisenberg':
            className += "text-red-500 font-black animate-glitch drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]";
            break;
        case 'Kingpin':
            className += "gold-shimmer font-black drop-shadow-[0_0_2px_rgba(251,191,36,0.8)]";
            break;
        case 'Supplier':
            className += "text-cyber-purple font-bold animate-pulse";
            break;
        case 'Dealer':
            className += "text-green-400 font-bold animate-bounce-subtle";
            break;
        case 'Runner':
            className += "text-cyber-accent";
            break;
        default:
            className += "text-cyber-text";
    }

    return <span className={className}>{name}</span>;
};

const VendorRankBadge: React.FC<{ level: number; verified: boolean }> = ({ level, verified }) => {
  if (!verified) return null;

  if (level >= 10) {
    return (
      <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded border border-yellow-200 shadow-neon-gold animate-pulse">
        <Crown size={10} fill="black" /> KINGPIN
      </span>
    );
  }
  if (level >= 8) {
    return (
      <span className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded border border-purple-300 shadow-neon-purple">
        <Gem size={10} /> LEGENDARY
      </span>
    );
  }
  if (level >= 5) {
    return (
      <span className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded border border-cyan-300">
        <Zap size={10} fill="currentColor" /> ELITE
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 bg-green-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded border border-green-300">
      <CheckCircle size={10} /> VERIFIED
    </span>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onVendorClick, onProductClick, onToggleWishlist }) => {
  const [selectedTier, setSelectedTier] = useState(product.tiers[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [viewers, setViewers] = useState(product.views || Math.floor(Math.random() * 20) + 5);

  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.7) {
            setViewers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-cyber-card border border-cyber-border rounded-xl overflow-hidden hover:border-cyber-accent/50 transition-all duration-300 hover:shadow-neon flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => onProductClick(product)}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 group-hover:sepia-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-90" />
        
        {/* Glitch Effect Layer */}
        <div className="absolute inset-0 bg-cyber-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isEscrow && (
            <span className="bg-cyber-success/20 text-cyber-success border border-cyber-success/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md flex items-center gap-1">
              <Shield size={10} /> Escrow
            </span>
          )}
          {product.isFE && (
            <span className="bg-cyber-danger/20 text-cyber-danger border border-cyber-danger/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md">
              FE Enabled
            </span>
          )}
          {product.stockLevel === 'Low' && (
            <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md flex items-center gap-1 animate-pulse">
              <AlertTriangle size={10} /> Low Stock
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
             <button 
                onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                className="bg-black/60 backdrop-blur text-white p-1.5 rounded-full border border-white/10 hover:bg-cyber-danger hover:border-cyber-danger transition-colors"
             >
                <Heart size={14} fill={product.isWishlisted ? "currentColor" : "none"} className={product.isWishlisted ? "text-cyber-danger" : ""}/>
             </button>
             <div className="bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold border border-white/10">
                From {product.origin}
             </div>
        </div>
        
        {/* Live Viewers Badge (Fake) */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-cyber-accent font-mono border border-cyber-accent/20">
            <Eye size={10} className="animate-pulse"/> {viewers} viewing
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col gap-3 relative">
        {/* Glow effect behind text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-cyber-accent/5 blur-3xl pointer-events-none" />

        <div className="flex justify-between items-start z-10">
          <div className="w-full">
             <h3 
                onClick={() => onProductClick(product)}
                className="font-mono font-bold text-lg text-white leading-tight group-hover:text-cyber-accent transition-colors truncate cursor-pointer"
             >
               {product.name}
             </h3>
             
             {/* Vendor Row with Gamified Rank & Name Effect */}
             <div className="flex items-center justify-between mt-2 pb-2 border-b border-cyber-border/30">
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-cyber-border/50 p-1 -ml-1 rounded transition-colors"
                    onClick={(e) => { e.stopPropagation(); onVendorClick(product.vendor); }}
                >
                    {/* Vendor Online Dot */}
                    <div className="w-2 h-2 rounded-full bg-cyber-success animate-pulse shadow-[0_0_5px_#10b981]"/>
                    <VendorNameEffect name={product.vendor.name} rank={product.vendor.rank} />
                    <VendorRankBadge level={product.vendor.trustLevel} verified={product.vendor.isVerified} />
                </div>
                <div className="flex items-center text-yellow-500 text-xs font-bold">
                    <Star size={10} fill="currentColor" className="mr-0.5"/> {product.vendor.rating}
                </div>
             </div>
          </div>
        </div>

        {/* Tiers & Actions */}
        <div className="mt-auto space-y-3 z-10">
          <div className="grid grid-cols-3 gap-2">
            {product.tiers.slice(0, 3).map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`text-[10px] py-1 rounded border transition-all relative overflow-hidden ${
                  selectedTier.id === tier.id
                    ? 'bg-cyber-accent text-black border-cyber-accent font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'bg-transparent text-cyber-muted border-cyber-border hover:border-cyber-accent/50'
                }`}
              >
                {tier.amount}
                {/* Bulk Discount Indicator (Fake) */}
                {tier.price > 300 && (
                    <div className="absolute -top-2 -right-2 bg-cyber-danger w-4 h-4 rounded-full blur-sm opacity-50"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-cyber-border/50">
             <div>
               <span className="text-[10px] text-cyber-muted block flex items-center gap-1">
                  Price {selectedTier.price > 400 && <span className="text-cyber-danger font-bold text-[8px] animate-pulse">HOT</span>}
               </span>
               <span className="font-mono text-xl text-white font-bold tracking-tight">
                 ${selectedTier.price} <span className="text-xs font-normal text-cyber-muted">AUD</span>
               </span>
             </div>

             <button 
               onClick={() => onAddToCart(product, selectedTier)}
               className="bg-cyber-text text-black p-2.5 rounded-lg hover:bg-cyber-accent hover:shadow-neon transition-all active:scale-95 flex items-center justify-center"
             >
                <ShoppingCart size={18} />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};