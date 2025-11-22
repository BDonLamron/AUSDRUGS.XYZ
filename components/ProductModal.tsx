import React, { useState, useEffect } from 'react';
import { Product, PriceTier } from '../types';
import { X, Bitcoin, Truck, CheckCircle2, Copy, Loader2, Box, Wand2, Crown, Gem, Zap, CheckCircle, Trophy, Activity, Map, ExternalLink, Star, Lock, Eye, ScanLine, Flag, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStealthPackaging } from '../services/geminiService';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, tier: PriceTier) => void;
}

type Step = 'select' | 'customize' | 'shipping' | 'payment' | 'success';

const FakeBlockchainFeed = () => {
    const [txs, setTxs] = useState<string[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            const hash = Math.random().toString(36).substring(2, 15) + "...";
            const amt = (Math.random() * 2).toFixed(4);
            setTxs(prev => [`TX: ${hash} | ${amt} BTC`, ...prev].slice(0, 5));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/50 p-3 rounded border border-cyber-border/50 font-mono text-[10px] text-cyber-muted h-24 overflow-hidden">
            <div className="text-cyber-accent font-bold mb-1 flex items-center gap-2 border-b border-cyber-border/30 pb-1">
                <Activity size={10}/> LIVE BLOCKCHAIN FEED
            </div>
            <div className="space-y-1">
                {txs.map((tx, i) => (
                    <div key={i} className="animate-in slide-in-from-top-2 fade-in duration-500">
                        {tx} <span className="text-cyber-success ml-2">CONFIRMED</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedTier, setSelectedTier] = useState<PriceTier>(product.tiers[0]);
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });
  const [customNote, setCustomNote] = useState('');
  const [stealthPlan, setStealthPlan] = useState('');
  const [generatingStealth, setGeneratingStealth] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleNext = () => {
    if (step === 'select') setStep('customize');
    else if (step === 'customize') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep('success');
        onAddToCart(product, selectedTier);
    }, 2000);
  };

  const handleGenerateStealth = async () => {
      setGeneratingStealth(true);
      const plan = await generateStealthPackaging(product.name);
      setStealthPlan(plan);
      setGeneratingStealth(false);
  };

  const handleCopyExample = () => {
      navigator.clipboard.writeText("Kane Simmons\n616 Sutton St\nDelacombe VIC 3356\nAustralia");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyzeImage = () => {
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cyber-card w-full max-w-5xl border border-cyber-border shadow-neon-purple/20 relative font-sans my-8 rounded-xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-cyber-bg p-4 flex justify-between items-center border-b border-cyber-border sticky top-0 z-10">
             <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${step === 'success' ? 'bg-cyber-success' : 'bg-cyber-accent animate-pulse'}`}/>
                <h2 className="font-mono text-xl text-white tracking-wide uppercase">
                    {step === 'select' && "Select Package"}
                    {step === 'customize' && "Stealth Configuration"}
                    {step === 'shipping' && "Drop Details"}
                    {step === 'payment' && "Secure Transaction"}
                    {step === 'success' && "Order Confirmed"}
                </h2>
             </div>
             <div className="flex items-center gap-2">
                 <button className="text-xs font-mono text-cyber-muted hover:text-cyber-accent flex items-center gap-1">
                    <Share2 size={12}/> SHARE
                 </button>
                 <button className="text-xs font-mono text-cyber-muted hover:text-cyber-danger flex items-center gap-1 ml-4">
                    <Flag size={12}/> REPORT
                 </button>
                 <button onClick={onClose} className="text-cyber-muted hover:text-cyber-danger transition-all ml-4">
                    <X size={24} />
                 </button>
             </div>
        </div>

        <div className="p-6 min-h-[500px] bg-[#0c0c0e]">
            <AnimatePresence mode="wait">
                {step === 'select' && (
                    <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Image & Visuals */}
                        <div className="w-full lg:w-5/12 space-y-4">
                            <div className="aspect-[4/3] bg-black border border-cyber-border rounded-lg overflow-hidden relative group shadow-lg">
                                <img src={product.imageUrl} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-60"/>
                                
                                {/* Image Analysis Overlay */}
                                <div className="absolute top-2 right-2">
                                    <button 
                                        onClick={handleAnalyzeImage}
                                        className="bg-black/50 backdrop-blur border border-cyber-border hover:border-cyber-accent text-cyber-muted hover:text-white p-2 rounded flex items-center gap-2 text-[10px] transition-all"
                                    >
                                        {analyzing ? <Loader2 size={12} className="animate-spin"/> : <ScanLine size={12}/>}
                                        {analyzing ? 'SCANNING PURITY...' : 'ANALYZE IMAGE'}
                                    </button>
                                </div>

                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur border border-cyber-border text-cyber-accent text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                    <Map size={12}/> {product.origin} Origin
                                </div>
                            </div>

                            <FakeBlockchainFeed />

                            {/* Stealth Rating Visual */}
                            <div className="bg-cyber-card border border-cyber-border p-3 rounded">
                                <div className="flex justify-between items-center text-[10px] font-bold text-cyber-muted mb-2">
                                    <span>STEALTH RATING</span>
                                    <span className="text-cyber-purple">9.8/10</span>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className={`h-2 flex-1 rounded-sm ${i < 9 ? 'bg-cyber-purple shadow-[0_0_5px_#d946ef]' : 'bg-cyber-border'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details & Selection */}
                        <div className="w-full lg:w-7/12 flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-mono text-3xl text-white font-bold mb-1 tracking-tight leading-none">{product.name}</h3>
                                        <p className="text-[10px] font-mono text-cyber-muted flex items-center gap-2 cursor-pointer hover:text-white">
                                            ID: {product.id.toUpperCase()} <Copy size={10}/>
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {product.isEscrow && <span className="text-[10px] bg-cyber-success/10 text-cyber-success border border-cyber-success/30 px-2 py-1 rounded font-bold flex items-center gap-1"><Lock size={10}/> ESCROW</span>}
                                        {product.isFE && <span className="text-[10px] bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/30 px-2 py-1 rounded font-bold">FE</span>}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4 text-sm text-cyber-muted mt-2">
                                    <span>Sold by:</span>
                                    <span className="text-cyber-accent font-bold hover:underline cursor-pointer">{product.vendor.name}</span>
                                    <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/> {product.vendor.rating}</div>
                                    <div className="text-[10px] bg-cyber-success/20 text-cyber-success px-1 rounded animate-pulse">Online</div>
                                </div>

                                <p className="text-cyber-text/80 border-l-2 border-cyber-purple pl-4 leading-relaxed text-sm">{product.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                {product.tiers.map(tier => (
                                    <button
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier)}
                                        className={`p-4 border rounded-lg text-left transition-all relative overflow-hidden group ${
                                            selectedTier.id === tier.id 
                                            ? 'border-cyber-accent bg-cyber-accent/10 shadow-neon' 
                                            : 'border-cyber-border hover:border-cyber-accent/50 hover:bg-cyber-card'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <div className="text-xl font-mono font-bold text-white">{tier.amount}</div>
                                            <div className={`text-sm font-bold font-mono ${selectedTier.id === tier.id ? 'text-cyber-accent' : 'text-cyber-muted'}`}>${tier.price} AUD</div>
                                        </div>
                                        {selectedTier.id === tier.id && <div className="absolute right-2 bottom-2 text-cyber-accent opacity-20"><CheckCircle2 size={40}/></div>}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 flex gap-4">
                                <button onClick={handleNext} className="w-full bg-cyber-text text-black font-bold text-lg py-3.5 rounded hover:bg-cyber-accent hover:shadow-neon transition-all flex items-center justify-center gap-2 group">
                                    CONTINUE ORDER <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'customize' && (
                    <motion.div key="customize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
                         <div className="bg-cyber-card border border-cyber-border p-4 rounded-lg">
                            <label className="font-mono text-sm font-bold mb-2 block text-cyber-accent">CUSTOM DROP INSTRUCTIONS</label>
                            <textarea 
                                value={customNote}
                                onChange={(e) => setCustomNote(e.target.value)}
                                className="w-full bg-cyber-bg border border-cyber-border rounded p-3 text-sm text-white focus:border-cyber-accent outline-none min-h-[100px] input-focus-effect"
                                placeholder="Gate codes, preferred hidden spots, mix requests..."
                            />
                         </div>

                         <div className="bg-gradient-to-br from-cyber-card to-black p-6 border border-cyber-purple rounded-lg relative overflow-hidden group">
                             <div className="relative z-10">
                                 <div className="flex justify-between items-start mb-4">
                                     <h3 className="font-mono text-lg text-white flex items-center gap-2">
                                         <Box size={20} className="text-cyber-purple"/> AI STEALTH SHIELDING
                                     </h3>
                                     <button 
                                        onClick={handleGenerateStealth}
                                        disabled={generatingStealth}
                                        className="bg-cyber-purple/20 text-cyber-purple text-xs font-bold px-3 py-1.5 rounded border border-cyber-purple/50 hover:bg-cyber-purple hover:text-white transition-all flex items-center gap-1"
                                     >
                                         {generatingStealth ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12}/>} GENERATE METHOD
                                     </button>
                                 </div>
                                 
                                 {stealthPlan ? (
                                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/50 p-4 border border-cyber-purple/30 rounded">
                                         <p className="font-mono text-cyber-purple text-sm">"{stealthPlan}"</p>
                                     </motion.div>
                                 ) : (
                                     <p className="text-cyber-muted text-sm font-mono">Use our AI to generate a custom disguise for your package to bypass inspections.</p>
                                 )}
                             </div>
                             {/* Background Pattern */}
                             <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                         </div>

                         <button onClick={handleNext} className="w-full mt-4 bg-cyber-accent text-black font-bold text-lg py-3 rounded hover:bg-white hover:shadow-neon transition-all">
                             CONFIRM CONFIGURATION
                         </button>
                    </motion.div>
                )}
                
                {step === 'shipping' && (
                    <motion.div key="shipping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-xl mx-auto">
                        
                        {/* REQUIRED SHIPPING EXAMPLE */}
                        <div className="bg-black border border-cyber-border p-4 rounded relative group">
                            <div className="text-xs font-bold text-cyber-muted uppercase mb-2 flex justify-between items-center">
                                Required Format Example
                                <button onClick={handleCopyExample} className="text-cyber-accent hover:text-white flex items-center gap-1 transition-colors">
                                    <Copy size={10}/> {copied ? 'COPIED' : 'COPY EXAMPLE'}
                                </button>
                            </div>
                            <pre className="font-mono text-sm text-cyber-text/80 bg-cyber-card/50 p-3 rounded border border-cyber-border/50 select-all">
Kane Simmons
616 Sutton St
Delacombe VIC 3356
Australia
                            </pre>
                            <p className="text-[10px] text-cyber-danger mt-2 flex items-center gap-1">
                                <Lock size={10}/> ENCRYPT WITH PGP IF POSSIBLE
                            </p>
                        </div>

                        <input className="w-full bg-cyber-bg border border-cyber-border rounded p-4 text-white focus:border-cyber-accent outline-none input-focus-effect" placeholder="RECIPIENT ALIAS (e.g. Kane Simmons)" value={shippingInfo.name} onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} />
                        <input className="w-full bg-cyber-bg border border-cyber-border rounded p-4 text-white focus:border-cyber-accent outline-none input-focus-effect" placeholder="STREET ADDRESS / PO BOX (e.g. 616 Sutton St)" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
                        <div className="flex gap-4">
                            <input className="w-1/2 bg-cyber-bg border border-cyber-border rounded p-4 text-white focus:border-cyber-accent outline-none input-focus-effect" placeholder="CITY (e.g. Delacombe)" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
                            <input className="w-1/2 bg-cyber-bg border border-cyber-border rounded p-4 text-white focus:border-cyber-accent outline-none input-focus-effect" placeholder="ZIP (e.g. 3356)" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} />
                        </div>
                        <button onClick={handleNext} className="w-full mt-6 bg-cyber-text text-black font-bold text-lg py-3 rounded hover:bg-cyber-accent hover:shadow-neon transition-all flex items-center justify-center gap-2">
                            <Lock size={16}/> ENCRYPT & PROCEED
                        </button>
                    </motion.div>
                )}

                {step === 'payment' && (
                    <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6 max-w-md mx-auto">
                         {/* Payment Step Content */}
                         <div className="bg-white p-6 rounded-lg border-4 border-cyber-border shadow-2xl relative">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-accent text-black text-xs font-bold px-3 py-1 rounded-full border border-black shadow-lg">SECURE ESCROW</div>
                             
                             <div className="w-48 h-48 bg-black mx-auto mb-6 flex items-center justify-center font-bold text-white border-2 border-black rounded">
                                 <div className="text-center">
                                     <Bitcoin size={48} className="mx-auto mb-2 text-cyber-accent"/>
                                     <span className="text-xs">[QR CODE SIMULATION]</span>
                                 </div>
                             </div>
                             
                             <p className="mb-1 text-gray-600 font-bold text-sm">SEND EXACT AMOUNT:</p>
                             <p className="text-3xl font-mono font-bold mb-4 text-black">0.0045 BTC</p>
                             
                             <div className="bg-gray-100 p-3 flex justify-between items-center gap-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 group">
                                 <span className="truncate font-mono font-bold text-xs text-black">1AusDrugsEscrowWalletXyZ...</span>
                                 <Copy size={14} className="text-gray-500 group-hover:text-black"/>
                             </div>
                         </div>
                         <button onClick={handlePayment} disabled={loading} className="w-full bg-cyber-accent text-black font-bold text-lg py-3.5 rounded hover:bg-white hover:shadow-neon transition-all flex items-center justify-center gap-3">
                            {loading ? <Loader2 className="animate-spin" size={20}/> : <Bitcoin size={20}/>} 
                            {loading ? 'CONFIRMING ON BLOCKCHAIN...' : 'I HAVE SENT PAYMENT'}
                         </button>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <div className="inline-block relative">
                            <div className="absolute inset-0 bg-cyber-success blur-2xl opacity-30 animate-pulse"></div>
                            <CheckCircle2 size={100} className="text-cyber-success mx-auto mb-6 relative z-10" />
                        </div>
                        <h3 className="font-mono text-4xl text-white font-bold mb-2 tracking-tight">ORDER SECURED</h3>
                        <p className="text-cyber-muted text-lg">Vendor has been notified. Encrypted receipt generated.</p>
                        <div className="mt-8 p-4 bg-cyber-card border border-cyber-border border-dashed rounded inline-block">
                            <p className="text-sm font-mono text-cyber-accent">ORDER ID: #AUS-{Math.floor(Math.random()*10000)}</p>
                        </div>
                        <button onClick={onClose} className="block w-full mt-12 text-cyber-text hover:text-cyber-accent font-mono text-sm tracking-widest hover:underline">RETURN TO MARKETPLACE</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};