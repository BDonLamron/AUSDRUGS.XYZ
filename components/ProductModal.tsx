import React, { useState } from 'react';
import { Product, PriceTier } from '../types';
import { X, Bitcoin, Truck, CheckCircle2, Copy, Loader2, Box, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStealthPackaging } from '../services/geminiService';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, tier: PriceTier) => void;
}

type Step = 'select' | 'customize' | 'shipping' | 'payment' | 'success';

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedTier, setSelectedTier] = useState<PriceTier>(product.tiers[0]);
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });
  const [customNote, setCustomNote] = useState('');
  const [stealthPlan, setStealthPlan] = useState('');
  const [generatingStealth, setGeneratingStealth] = useState(false);

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
    }, 2000);
  };

  const handleGenerateStealth = async () => {
      setGeneratingStealth(true);
      const plan = await generateStealthPackaging(product.name);
      setStealthPlan(plan);
      setGeneratingStealth(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-3xl border-[4px] border-edgy-pink shadow-[10px_10px_0px_0px_#000] relative font-sans my-8"
      >
        {/* Modal Header */}
        <div className="bg-black p-4 flex justify-between items-center border-b-4 border-edgy-pink sticky top-0 z-10">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"/>
                <h2 className="font-marker text-2xl text-edgy-pink tracking-wide leading-none transform translate-y-1">
                    {step === 'select' && "SELECT STASH"}
                    {step === 'customize' && "CUSTOMIZE & STEALTH"}
                    {step === 'shipping' && "DROP LOCATION"}
                    {step === 'payment' && "CRYPTO PAYMENT"}
                    {step === 'success' && "MISSION COMPLETE"}
                </h2>
             </div>
             <button onClick={onClose} className="text-white hover:text-edgy-pink hover:rotate-90 transition-all">
                <X size={28} />
             </button>
        </div>

        <div className="p-6 min-h-[400px]">
            <AnimatePresence mode="wait">
                {step === 'select' && (
                    <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-5/12">
                            <div className="aspect-square bg-black border-4 border-gray-200 shadow-sharp overflow-hidden relative group">
                                <img src={product.imageUrl} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                                <div className="absolute bottom-2 left-2 bg-edgy-pink text-white text-xs font-bold px-2 py-1 border border-black">
                                    {product.origin} Origin
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-7/12 flex flex-col gap-4">
                            <div>
                                <h3 className="font-marker text-4xl text-black leading-none mb-2">{product.name}</h3>
                                <p className="font-bold text-gray-500 border-l-4 border-edgy-pink pl-3">{product.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {product.tiers.map(tier => (
                                    <button
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier)}
                                        className={`p-4 border-2 text-left transition-all relative overflow-hidden group ${
                                            selectedTier.id === tier.id 
                                            ? 'border-black bg-edgy-pink text-white shadow-[4px_4px_0px_0px_#000]' 
                                            : 'border-gray-300 hover:border-black hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <div className="text-2xl font-marker">{tier.amount}</div>
                                            <div className={`text-sm font-bold ${selectedTier.id === tier.id ? 'text-black' : 'text-gray-500'}`}>${tier.price}</div>
                                        </div>
                                        {selectedTier.id === tier.id && <div className="absolute right-2 bottom-2 text-black opacity-20"><CheckCircle2 size={40}/></div>}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 flex gap-4">
                                <button onClick={handleNext} className="w-full bg-black text-white font-marker text-2xl py-3 border-2 border-transparent hover:bg-edgy-pink hover:border-black hover:shadow-sharp transition-all flex items-center justify-center gap-2 group">
                                    CONTINUE <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'customize' && (
                    <motion.div key="customize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                         <div className="bg-gray-50 border-2 border-black p-4 shadow-sm">
                            <label className="font-marker text-xl mb-2 block text-black">CUSTOM INSTRUCTIONS</label>
                            <textarea 
                                value={customNote}
                                onChange={(e) => setCustomNote(e.target.value)}
                                className="w-full bg-white border-2 border-gray-300 p-3 font-bold text-sm focus:border-edgy-pink outline-none min-h-[100px]"
                                placeholder="e.g., Mix strains, leave at back door, discrete label..."
                            />
                         </div>

                         <div className="bg-black text-white p-6 border-4 border-edgy-pink relative overflow-hidden">
                             <div className="relative z-10">
                                 <div className="flex justify-between items-start mb-4">
                                     <h3 className="font-marker text-2xl flex items-center gap-2">
                                         <Box size={24} className="text-edgy-pink"/> STEALTH PACKAGING AI
                                     </h3>
                                     <button 
                                        onClick={handleGenerateStealth}
                                        disabled={generatingStealth}
                                        className="bg-edgy-pink text-black text-xs font-bold px-3 py-1 border border-white hover:bg-white hover:text-edgy-pink flex items-center gap-1"
                                     >
                                         {generatingStealth ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12}/>} GENERATE PLAN
                                     </button>
                                 </div>
                                 
                                 {stealthPlan ? (
                                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 p-4 border border-gray-700">
                                         <p className="font-mono text-green-400 text-sm">"{stealthPlan}"</p>
                                     </motion.div>
                                 ) : (
                                     <p className="text-gray-500 text-sm font-mono">Click generate to let our AI suggest a discrete shipping method for {product.name}...</p>
                                 )}
                             </div>
                             {/* Background Pattern */}
                             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                         </div>

                         <button onClick={handleNext} className="w-full mt-4 bg-edgy-pink text-white font-marker text-xl py-3 border-2 border-black hover:shadow-sharp transition-all">
                             CONFIRM CUSTOMIZATION
                         </button>
                    </motion.div>
                )}
                
                {step === 'shipping' && (
                    <motion.div key="shipping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <div className="flex items-center gap-2 font-bold text-yellow-700 text-sm">
                                <Truck size={16}/> ADDRESSES ARE ENCRYPTED & DELETED AFTER DELIVERY.
                            </div>
                        </div>
                        <input className="w-full border-4 border-gray-200 p-4 font-bold focus:border-black outline-none transition-colors" placeholder="ALIAS / CODENAME" value={shippingInfo.name} onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} />
                        <input className="w-full border-4 border-gray-200 p-4 font-bold focus:border-black outline-none transition-colors" placeholder="STREET ADDRESS" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
                        <div className="flex gap-4">
                            <input className="w-1/2 border-4 border-gray-200 p-4 font-bold focus:border-black outline-none transition-colors" placeholder="CITY" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
                            <input className="w-1/2 border-4 border-gray-200 p-4 font-bold focus:border-black outline-none transition-colors" placeholder="ZIP / POSTAL" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} />
                        </div>
                        <button onClick={handleNext} className="w-full mt-6 bg-black text-white font-marker text-xl py-3 border-2 border-transparent hover:bg-edgy-pink hover:border-black hover:shadow-sharp transition-all">
                            PROCEED TO PAYMENT
                        </button>
                    </motion.div>
                )}

                {step === 'payment' && (
                    <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                         <div className="bg-gray-100 p-6 border-4 border-black font-mono relative">
                             <div className="absolute top-0 left-0 bg-edgy-pink text-white text-xs font-bold px-2 py-1">SECURE</div>
                             
                             <div className="w-40 h-40 bg-white mx-auto mb-6 flex items-center justify-center font-bold text-black border-4 border-black shadow-sm p-2">
                                 <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs text-center p-2">
                                     [QR CODE PLACEHOLDER]
                                 </div>
                             </div>
                             
                             <p className="mb-1 text-gray-600 font-bold text-sm">SEND EXACT AMOUNT:</p>
                             <p className="text-2xl font-bold mb-4 text-black">0.0045 BTC</p>
                             
                             <div className="bg-white p-3 flex justify-between items-center gap-2 border-2 border-black shadow-sm cursor-pointer hover:bg-gray-50 group">
                                 <span className="truncate font-bold text-sm">1BadSantaWalletAddressXmas...</span>
                                 <Copy size={16} className="text-gray-400 group-hover:text-black"/>
                             </div>
                         </div>
                         <button onClick={handlePayment} disabled={loading} className="w-full bg-edgy-pink text-white font-marker text-2xl py-4 border-2 border-black hover:bg-black hover:shadow-sharp transition-all flex items-center justify-center gap-3">
                            {loading ? <Loader2 className="animate-spin" size={24}/> : <Bitcoin size={24}/>} 
                            {loading ? 'VERIFYING BLOCKCHAIN...' : 'I HAVE SENT PAYMENT'}
                         </button>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <div className="inline-block relative">
                            <div className="absolute inset-0 bg-green-400 blur-xl opacity-50 animate-pulse"></div>
                            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6 relative z-10" />
                        </div>
                        <h3 className="font-marker text-5xl text-black mb-2">ORDER CONFIRMED</h3>
                        <p className="font-bold text-gray-500 text-lg">Your stash is being prepped by the elves.</p>
                        <div className="mt-8 p-4 bg-gray-100 border-2 border-dashed border-gray-300 inline-block">
                            <p className="text-xs font-mono text-gray-400">ORDER ID: #XMAS-{Math.floor(Math.random()*10000)}</p>
                        </div>
                        <button onClick={onClose} className="block w-full mt-8 text-black font-black hover:text-edgy-pink hover:underline">RETURN TO MARKET</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
