import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (cartId: string) => void;
  onCheckout: () => void; // Added prop
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, removeFromCart, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.selectedTier.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-cyber-bg z-50 shadow-2xl flex flex-col font-mono border-l border-cyber-border"
          >
            {/* Header */}
            <div className="p-5 border-b border-cyber-border bg-cyber-card flex justify-between items-center">
                 <div>
                   <h2 className="text-xl font-bold text-white tracking-widest">YOUR CART</h2>
                   <p className="text-[10px] text-cyber-muted flex items-center gap-1 mt-1">
                      <Lock size={10} /> 256-BIT ENCRYPTED SESSION
                   </p>
                 </div>
                 <button onClick={onClose} className="text-cyber-muted hover:text-white hover:rotate-90 transition-all">
                    <X size={24} />
                 </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-cyber-border gap-4">
                    <div className="w-16 h-16 border-2 border-dashed border-cyber-border rounded-full flex items-center justify-center">
                      <X size={24} />
                    </div>
                    <span className="text-sm tracking-wider">CART IS EMPTY</span>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 bg-cyber-card p-3 rounded border border-cyber-border hover:border-cyber-accent/30 transition-colors group">
                    <div className="w-16 h-16 bg-zinc-900 rounded overflow-hidden border border-cyber-border shrink-0">
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-cyber-accent">{item.selectedTier.amount}</p>
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="text-xs text-cyber-muted">Qty: {item.quantity}</div>
                           <div className="font-bold text-white">${item.selectedTier.price * item.quantity}</div>
                        </div>
                    </div>

                    <button onClick={() => removeFromCart(item.cartId)} className="self-start text-cyber-border hover:text-cyber-danger transition-colors">
                         <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="p-6 bg-cyber-card border-t border-cyber-border space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cyber-muted">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-cyber-muted">
                    <span>Service Fee (3%)</span>
                    <span>${Math.floor(total * 0.03)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-cyber-border">
                    <span>TOTAL (AUD)</span>
                    <span>${Math.floor(total * 1.03)}</span>
                  </div>
                </div>

                <button 
                    onClick={onCheckout}
                    disabled={cart.length === 0}
                    className="w-full py-3.5 bg-cyber-accent text-black font-bold tracking-wider rounded hover:bg-white hover:shadow-neon transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShieldCheck size={18} className="group-hover:scale-110 transition-transform"/> 
                    SECURE CHECKOUT
                </button>
                
                <div className="text-center">
                  <p className="text-[10px] text-cyber-muted">Payments accepted in BTC & XMR only.</p>
                </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
