
import React, { useState } from 'react';
import { Product, PriceTier, User, Vendor } from '../types';
import { X, Copy, CheckCircle2, Lock, Star, Edit, ScanLine, ShieldCheck, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIToolsModal } from './AIToolsModal';

export const ProductModal: React.FC<{product: Product, onClose: any, onAddToCart: any, currency: any, products: any, currentUser: User|null, onEdit: any, onVendorClick: any}> = ({ product, onClose, onAddToCart, currency, currentUser, onEdit, onVendorClick }) => {
  const [step, setStep] = useState('select');
  const [tier, setTier] = useState(product.tiers[0]);
  const [qty, setQty] = useState(1);
  const [showLab, setShowLab] = useState(false);
  const [copied, setCopied] = useState(false);
  const canEdit = currentUser?.isAdmin || (currentUser && currentUser.username === product.vendor.name);
  const getPrice = (p: number) => currency === 'BTC' ? `₿${(p/145000).toFixed(6)}` : `$${p}`;

  const copyAddr = () => { navigator.clipboard.writeText("Kane Simmons\n616 Sutton St\nDelacombe VIC 3356\nAustralia"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80 backdrop-blur" onClick={onClose} />
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-cyber-card w-full max-w-5xl border border-cyber-border rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-cyber-border flex justify-between items-center bg-cyber-bg">
             <h2 className="font-mono text-xl text-white uppercase">{step}</h2>
             <div className="flex gap-2">
                 {canEdit && <button onClick={() => onEdit(product)} className="text-xs text-cyber-accent border border-cyber-accent px-2 rounded flex gap-1 items-center"><Edit size={12}/> EDIT</button>}
                 <button onClick={onClose}><X className="text-cyber-muted hover:text-white"/></button>
             </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto bg-[#0c0c0e]">
            <AnimatePresence mode="wait">
                {step === 'select' && (
                    <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-5/12 space-y-4">
                            <div className="aspect-[4/3] bg-black rounded overflow-hidden relative group border border-cyber-border">
                                <img src={product.imageUrl} className="w-full h-full object-cover opacity-90"/>
                                <button onClick={() => setShowLab(true)} className="absolute top-2 right-2 bg-black/50 p-2 rounded text-[10px] text-white border border-cyber-border hover:border-cyber-accent flex gap-1"><ScanLine size={12}/> ANALYZE (AI)</button>
                                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-cyber-accent border border-cyber-border flex gap-1"><Map size={12}/> {product.origin}</div>
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 flex flex-col gap-4">
                            <h3 className="text-3xl font-mono font-bold text-white">{product.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-cyber-muted cursor-pointer" onClick={(e) => onVendorClick(product.vendor, e)}><span className="text-cyber-accent">{product.vendor.name}</span><Star size={12} className="text-yellow-500"/> {product.vendor.rating}</div>
                            <p className="text-sm text-cyber-text border-l-2 border-cyber-purple pl-4">{product.description}</p>
                            <div className="grid grid-cols-2 gap-3">{product.tiers.map(t => <button key={t.id} onClick={() => setTier(t)} className={`p-4 border rounded text-left ${tier.id === t.id ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-border'}`}><div className="font-bold text-white">{t.amount}</div><div className="text-cyber-accent">{getPrice(t.price)}</div></button>)}</div>
                            <div className="flex items-center gap-4 bg-black/20 p-3 rounded border border-cyber-border"><span className="text-xs font-bold text-cyber-muted">QTY:</span>{[1,2,5].map(q => <button key={q} onClick={() => setQty(q)} className={`w-8 h-8 rounded font-bold ${qty === q ? 'bg-cyber-accent text-black' : 'bg-cyber-card text-white border'}`}>{q}</button>)}</div>
                            <div className="mt-auto pt-6"><button onClick={() => setStep('shipping')} className="w-full bg-cyber-text text-black font-bold py-3.5 rounded hover:bg-cyber-accent">CONTINUE ORDER</button></div>
                        </div>
                    </motion.div>
                )}
                {step === 'shipping' && (
                    <motion.div key="shipping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto space-y-4">
                        <div className="bg-black border border-cyber-border p-4 rounded">
                            <div className="flex justify-between text-xs font-bold text-cyber-muted uppercase mb-2">Required Format <button onClick={copyAddr} className="text-cyber-accent hover:text-white flex gap-1"><Copy size={10}/> {copied ? 'COPIED' : 'COPY'}</button></div>
                            <pre className="font-mono text-sm text-cyber-text bg-cyber-card p-3 rounded select-all">Kane Simmons{'\n'}616 Sutton St{'\n'}Delacombe VIC 3356{'\n'}Australia</pre>
                        </div>
                        <input className="w-full bg-cyber-bg border border-cyber-border rounded p-4 text-white outline-none focus:border-cyber-accent" placeholder="RECIPIENT NAME"/>
                        <input className="w-full bg-cyber-bg border border-cyber-border rounded p-4 text-white outline-none focus:border-cyber-accent" placeholder="ADDRESS"/>
                        <button onClick={() => setStep('payment')} className="w-full bg-cyber-text text-black font-bold py-3 rounded hover:bg-cyber-accent flex justify-center gap-2"><Lock size={16}/> PROCEED TO PAYMENT</button>
                    </motion.div>
                )}
                {step === 'payment' && (
                    <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md mx-auto">
                         <div className="bg-white p-6 rounded shadow-2xl mb-6"><p className="font-bold text-black text-3xl mb-2">{(tier.price * qty / 145000).toFixed(5)} BTC</p><div className="bg-gray-100 p-2 rounded text-xs font-mono text-black break-all">1AusDrugsEscrowWallet...</div></div>
                         <button onClick={() => { setStep('success'); setTimeout(() => { onAddToCart(product, {...tier, price: tier.price * qty}); onClose(); }, 2000); }} className="w-full bg-cyber-accent text-black font-bold py-3 rounded">I HAVE SENT PAYMENT</button>
                    </motion.div>
                )}
                {step === 'success' && <motion.div className="text-center py-12"><CheckCircle2 size={100} className="text-cyber-success mx-auto mb-6"/><h3 className="text-4xl text-white font-bold">ORDER SECURED</h3></motion.div>}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
    {showLab && <AIToolsModal onClose={() => setShowLab(false)} initialTab="lab"/>}
    </>
  );
};
