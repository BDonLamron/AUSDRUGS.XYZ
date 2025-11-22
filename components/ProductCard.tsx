import React, { useState } from 'react';
import { Product, PriceTier } from '../types';
import { ShoppingCart, Star, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, tier: PriceTier) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedTier, setSelectedTier] = useState(product.tiers[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-cyber-card border border-cyber-border rounded-xl overflow-hidden hover:border-cyber-accent/50 transition-all duration-300 hover:shadow-neon flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-90" />
        
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
        </div>

        <div className="absolute top-3 right-3">
             <div className="bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold border border-white/10">
                Ships from {product.origin}
             </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col gap-3 relative">
        {/* Glow effect behind text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-cyber-accent/5 blur-3xl pointer-events-none" />

        <div className="flex justify-between items-start z-10">
          <div>
             <h3 className="font-mono font-bold text-lg text-white leading-tight group-hover:text-cyber-accent transition-colors">
               {product.name}
             </h3>
             <div className="flex items-center gap-2 mt-1 text-xs text-cyber-muted">
                <span className="flex items-center text-yellow-500"><Star size={10} fill="currentColor"/> {product.vendor.rating}</span>
                <span>•</span>
                <span className="hover:text-cyber-text cursor-pointer transition-colors">{product.vendor.name}</span>
                {product.vendor.isVerified && <CheckCircle size={10} className="text-cyber-accent"/>}
             </div>
          </div>
        </div>

        <p className="text-xs text-cyber-muted line-clamp-2 border-l-2 border-cyber-border pl-2 italic">
          {product.description}
        </p>

        <div className="mt-auto space-y-3 z-10">
          {/* Tier Selector */}
          <div className="grid grid-cols-3 gap-2">
            {product.tiers.slice(0, 3).map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`text-[10px] py-1 rounded border transition-all ${
                  selectedTier.id === tier.id
                    ? 'bg-cyber-accent text-black border-cyber-accent font-bold'
                    : 'bg-transparent text-cyber-muted border-cyber-border hover:border-cyber-accent/50'
                }`}
              >
                {tier.amount}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-cyber-border/50">
             <div>
               <span className="text-[10px] text-cyber-muted block">Price</span>
               <span className="font-mono text-xl text-white font-bold tracking-tight">
                 ${selectedTier.price} <span className="text-xs font-normal text-cyber-muted">AUD</span>
               </span>
             </div>

             <button 
               onClick={() => onAddToCart(product, selectedTier)}
               className="bg-cyber-text text-black p-2.5 rounded-lg hover:bg-cyber-accent hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all active:scale-95"
             >
                <ShoppingCart size={18} />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
