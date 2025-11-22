import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Bitcoin, QrCode, Loader2, CheckCircle2, Copy, ShieldCheck, Flame, Zap } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
  onOrderComplete: (items: CartItem[], total: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ cart, onClose, onOrderComplete }) => {
  const [mixCoins, setMixCoins] = useState(false);
  const cartTotal = cart.reduce((sum, item) => sum + (item.selectedTier.price * item.quantity), 0);
  const mixingFee = mixCoins ? cartTotal * 0.05 : 0;
  const gasFee = Math.random() * 5 + 2; // Random gas fee
  const finalTotal = cartTotal + mixingFee + gasFee;

  const [status, setStatus] = useState<'waiting' | 'detecting' | 'confirmed'>('waiting');
  const [btcAddress] = useState(`1A${Math.random().toString(36).substring(2, 10).toUpperCase()}xZ...${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulatePayment = () => {
    setStatus('detecting');
    setTimeout(() => {
        setStatus('confirmed');
        setTimeout(() => {
            onOrderComplete(cart, finalTotal);
        }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-cyber-card w-full max-w-lg border-2 border-cyber-accent rounded-xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden relative flex flex-col"
      >
        <div className="p-4 border-b border-cyber-border bg-cyber-bg flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-mono font-bold">
                <ShieldCheck className="text-cyber-accent"/> SECURE CHECKOUT
            </div>
            <button onClick={onClose} className="text-cyber-muted hover:text-white">
                <X size={24}/>
            </button>
        </div>

        <div className="p-6 flex flex-col items-center text-center space-y-6 bg-cyber-bg">
            
            {status !== 'confirmed' ? (
                <>
                    <div className="w-full bg-black/30 p-3 rounded border border-cyber-border/50 space-y-2 text-sm">
                         <div className="flex justify-between text-cyber-muted">
                             <span>Subtotal</span>
                             <span>${cartTotal.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between text-cyber-muted">
                             <span className="flex items-center gap-1"><Zap size={10}/> Network Fee (Est)</span>
                             <span>${gasFee.toFixed(2)}</span>
                         </div>
                         {mixCoins && (
                             <div className="flex justify-between text-cyber-purple">
                                 <span className="flex items-center gap-1"><Flame size={10}/> Mixing Fee (5%)</span>
                                 <span>${mixingFee.toFixed(2)}</span>
                             </div>
                         )}
                         <div className="border-t border-cyber-border pt-2 flex justify-between font-bold text-white">
                             <span>TOTAL DUE</span>
                             <span>${finalTotal.toFixed(2)}</span>
                         </div>
                    </div>

                    {/* Mixing Service Toggle */}
                    <div 
                        onClick={() => setMixCoins(!mixCoins)}
                        className={`w-full p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${mixCoins ? 'bg-cyber-purple/10 border-cyber-purple' : 'bg-cyber-card border-cyber-border hover:border-cyber-muted'}`}
                    >
                        <div className="text-left">
                            <div className={`text-xs font-bold ${mixCoins ? 'text-cyber-purple' : 'text-cyber-muted'}`}>ENABLE TOKEN MIXING</div>
                            <div className="text-[10px] text-cyber-muted">Anonymize coins before deposit (+5% Fee)</div>
                        </div>
                        <div className={`w-4 h-4 rounded border ${mixCoins ? 'bg-cyber-purple border-cyber-purple' : 'border-cyber-muted'}`}></div>
                    </div>

                    <div className="w-64 h-64 bg-white p-2 rounded-lg shadow-lg relative group cursor-pointer">
                        <div className="w-full h-full bg-black flex items-center justify-center border-4 border-black">
                             {/* Placeholder QR */}
                             <QrCode size={180} className="text-white"/>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Bitcoin size={48} className="text-cyber-gold bg-black rounded-full p-1 border-2 border-white"/>
                             </div>
                        </div>
                        <div className="absolute -bottom-8 left-0 right-0 text-center text-[10px] font-mono text-cyber-danger animate-pulse">
                            ORDER AUTO-DESTRUCT: {formatTime(timeLeft)}
                        </div>
                    </div>

                    <div className="w-full space-y-2">
                        <label className="text-xs font-bold text-cyber-muted uppercase block text-left">Send Payment To:</label>
                        <div className="flex items-center gap-2 bg-black border border-cyber-border p-3 rounded group hover:border-cyber-accent transition-colors cursor-pointer">
                            <code className="flex-1 text-left font-mono text-sm text-cyber-text truncate">{btcAddress}</code>
                            <Copy size={16} className="text-cyber-muted group-hover:text-white"/>
                        </div>
                        <p className="text-[10px] text-cyber-muted text-left">Send the exact amount or more. Excess will be credited to wallet.</p>
                    </div>

                    {status === 'waiting' && (
                        <button onClick={handleSimulatePayment} className="w-full py-3 bg-cyber-card border border-cyber-border text-cyber-muted hover:bg-cyber-accent hover:text-black hover:border-cyber-accent transition-all font-bold rounded mt-4">
                            I HAVE SENT THE PAYMENT
                        </button>
                    )}

                    {status === 'detecting' && (
                        <div className="w-full py-3 bg-cyber-accent/10 border border-cyber-accent text-cyber-accent font-bold rounded mt-4 flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={20}/> DETECTING ON BLOCKCHAIN...
                        </div>
                    )}
                </>
            ) : (
                <div className="py-12 flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-cyber-success/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={64} className="text-cyber-success"/>
                    </div>
                    <h3 className="text-2xl font-mono font-bold text-white mb-2">PAYMENT VERIFIED</h3>
                    <p className="text-cyber-muted text-sm mb-6">Your order has been securely processed.</p>
                    <div className="animate-pulse text-cyber-accent font-mono text-xs">Redirecting...</div>
                </div>
            )}

        </div>
      </motion.div>
    </div>
  );
};