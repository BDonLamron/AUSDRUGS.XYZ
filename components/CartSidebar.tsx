
import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartSidebar: React.FC<{isOpen: boolean, onClose: any, cart: CartItem[], removeFromCart: any, onCheckout: any, onClearCart: any}> = ({ isOpen, onClose, cart, removeFromCart, onCheckout }) => {
  const total = cart.reduce((s, i) => s + (i.selectedTier.price * i.quantity), 0);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose}/>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-cyber-bg z-50 border-l border-cyber-border flex flex-col font-mono shadow-2xl">
            <div className="p-5 border-b border-cyber-border flex justify-between items-center bg-cyber-card">
                 <div><h2 className="font-bold text-white">CART</h2><p className="text-[10px] text-cyber-muted flex gap-1"><Lock size={10}/> ENCRYPTED</p></div>
                 <button onClick={onClose}><X className="text-cyber-muted hover:text-white"/></button>
            </div>
            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              {cart.map(i => (
                  <div key={i.cartId} className="flex gap-4 bg-cyber-card p-3 rounded border border-cyber-border">
                    <img src={i.imageUrl} className="w-12 h-12 rounded object-cover bg-zinc-900"/>
                    <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{i.name}</h4>
                        <div className="flex justify-between text-xs text-cyber-muted"><span>{i.selectedTier.amount} x {i.quantity}</span><span className="text-white font-bold">${i.selectedTier.price * i.quantity}</span></div>
                    </div>
                    <button onClick={() => removeFromCart(i.cartId)}><Trash2 size={14} className="text-cyber-danger"/></button>
                  </div>
              ))}
            </div>
            <div className="p-6 bg-cyber-card border-t border-cyber-border">
                <div className="flex justify-between text-white font-bold text-lg mb-4"><span>TOTAL</span><span>${Math.floor(total * 1.03)}</span></div>
                <button onClick={onCheckout} disabled={cart.length === 0} className="w-full py-3 bg-cyber-accent text-black font-bold rounded hover:bg-white flex justify-center gap-2 disabled:opacity-50"><ShieldCheck/> CHECKOUT</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
