
import React, { useState, useRef, useEffect } from 'react';
import { Vendor, RankTier, Product } from '../types';
import { motion } from 'framer-motion';
import { X, Shield, Star, MessageSquare, Flag, Lock, Clock, Package, CheckCircle, Crown, Gem, Zap, Ghost, Send, User, ShoppingBag, Grid } from 'lucide-react';

interface VendorModalProps {
  vendor: Vendor;
  onClose: () => void;
  products: Product[];
  onProductClick: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'vendor';
  text: string;
  timestamp: string;
}

const RankIcon: React.FC<{ rank: RankTier }> = ({ rank }) => {
    switch(rank) {
        case 'Heisenberg': return <div className="flex gap-1 text-red-500"><Gem size={16}/>🐸</div>;
        case 'Kingpin': return <Crown size={16} className="text-yellow-400"/>;
        case 'Supplier': return <Star size={16} className="text-cyber-purple"/>;
        case 'Dealer': return <Shield size={16} className="text-green-500"/>;
        case 'Runner': return <Zap size={16} className="text-cyber-accent"/>;
        default: return <Ghost size={16} className="text-gray-400"/>;
    }
};

export const VendorModal: React.FC<VendorModalProps> = ({ vendor, onClose, products, onProductClick }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'inventory' | 'feedback' | 'message'>('stats');
  const [messageBody, setMessageBody] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
      { id: '1', sender: 'vendor', text: '-----BEGIN PGP SIGNED MESSAGE-----\nSecure connection established. How can I assist you with your order today?', timestamp: 'Now' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const vendorProducts = products.filter(p => p.vendor.name === vendor.name);

  useEffect(() => {
    if (activeTab === 'message' && chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, activeTab]);

  const handleSendMessage = () => {
      if (!messageBody.trim()) return;

      const newUserMsg: ChatMessage = {
          id: Math.random().toString(),
          sender: 'user',
          text: messageBody,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, newUserMsg]);
      setMessageBody('');

      // Simulate vendor reply
      setTimeout(() => {
          const vendorReply: ChatMessage = {
              id: Math.random().toString(),
              sender: 'vendor',
              text: "Message received. Decrypting... I will review your request and get back to you shortly.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatHistory(prev => [...prev, vendorReply]);
      }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cyber-bg w-full max-w-2xl border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh] h-[80vh]"
      >
         {/* Cover Image */}
         <div className="h-32 bg-gradient-to-r from-cyber-card to-cyber-border relative shrink-0">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"/>
             <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-cyber-danger transition-colors">
                <X size={20} />
             </button>
         </div>

         {/* Profile Header */}
         <div className="px-6 pb-4 relative shrink-0">
             <div className="flex justify-between items-end -mt-12 mb-4">
                 <div className="flex items-end gap-4">
                     <div className="w-24 h-24 bg-black rounded-xl border-4 border-cyber-bg overflow-hidden shadow-lg flex items-center justify-center text-3xl font-mono font-bold text-cyber-accent">
                        {vendor.name.charAt(0)}
                     </div>
                     <div className="mb-1">
                         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                             {vendor.name} 
                             {vendor.isVerified && <CheckCircle size={20} className="text-cyber-accent"/>}
                         </h2>
                         <div className="flex items-center gap-2 text-sm font-mono">
                             <span className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-bold uppercase
                                ${vendor.rank === 'Heisenberg' ? 'border-red-500 text-red-500 bg-red-500/10' : 
                                  vendor.rank === 'Kingpin' ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 
                                  'border-cyber-border text-cyber-muted'}`}>
                                <RankIcon rank={vendor.rank}/> {vendor.rank}
                             </span>
                             <span className="text-cyber-muted">Member since {vendor.joinDate}</span>
                         </div>
                     </div>
                 </div>
                 <div className="flex gap-2">
                     <button className="p-2 border border-cyber-border rounded hover:border-cyber-danger hover:text-cyber-danger text-cyber-muted transition-colors">
                         <Flag size={18}/>
                     </button>
                     <button onClick={() => setActiveTab('message')} className="bg-cyber-accent text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors flex items-center gap-2">
                         <MessageSquare size={18}/> Message
                     </button>
                 </div>
             </div>

             {/* Tabs */}
             <div className="flex gap-6 border-b border-cyber-border overflow-x-auto">
                 {['stats', 'inventory', 'feedback', 'message'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-2 text-sm font-mono font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === tab ? 'border-cyber-accent text-white' : 'border-transparent text-cyber-muted hover:text-white'}`}
                     >
                         {tab === 'inventory' && <Grid size={14} />}
                         {tab}
                     </button>
                 ))}
             </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
             {activeTab === 'stats' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 py-4">
                     <p className="text-cyber-text italic border-l-2 border-cyber-accent pl-4 py-2 bg-cyber-card/50 rounded-r">
                         "{vendor.bio}"
                     </p>
                     
                     <div className="grid grid-cols-2 gap-4">
                         <div className="bg-cyber-card p-4 rounded border border-cyber-border">
                             <div className="flex items-center gap-2 text-cyber-muted mb-1 text-xs font-bold uppercase"><Star size={14}/> Rating</div>
                             <div className="text-2xl text-white font-mono font-bold">{vendor.rating} / 5.0</div>
                             <div className="text-xs text-cyber-success">Top 1% of vendors</div>
                         </div>
                         <div className="bg-cyber-card p-4 rounded border border-cyber-border">
                             <div className="flex items-center gap-2 text-cyber-muted mb-1 text-xs font-bold uppercase"><Package size={14}/> Sales</div>
                             <div className="text-2xl text-white font-mono font-bold">{vendor.sales}</div>
                             <div className="text-xs text-cyber-muted">Total completed orders</div>
                         </div>
                         <div className="bg-cyber-card p-4 rounded border border-cyber-border">
                             <div className="flex items-center gap-2 text-cyber-muted mb-1 text-xs font-bold uppercase"><Clock size={14}/> Avg Speed</div>
                             <div className="text-2xl text-white font-mono font-bold">2 Days</div>
                             <div className="text-xs text-cyber-muted">Dispatch time</div>
                         </div>
                         <div className="bg-cyber-card p-4 rounded border border-cyber-border">
                             <div className="flex items-center gap-2 text-cyber-muted mb-1 text-xs font-bold uppercase"><Shield size={14}/> Trust Level</div>
                             <div className="text-2xl text-white font-mono font-bold">{vendor.trustLevel} / 10</div>
                             <div className="text-xs text-cyber-purple">High Clearance</div>
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'inventory' && (
                 <div className="grid grid-cols-2 gap-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                     {vendorProducts.length === 0 ? (
                         <div className="col-span-2 flex flex-col items-center justify-center py-12 text-cyber-muted">
                             <Package size={48} className="mb-4 opacity-20"/>
                             <p className="italic">No active inventory listings.</p>
                         </div>
                     ) : (
                         vendorProducts.map(product => (
                             <div 
                                key={product.id} 
                                onClick={() => onProductClick(product)}
                                className="bg-cyber-card border border-cyber-border rounded p-3 cursor-pointer hover:border-cyber-accent hover:shadow-neon transition-all group relative overflow-hidden"
                             >
                                 <div className="absolute top-0 right-0 bg-cyber-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    VIEW
                                 </div>
                                 <div className="aspect-square bg-black rounded mb-2 overflow-hidden relative">
                                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100"/>
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
                                     {product.stockLevel === 'Low' && (
                                         <div className="absolute bottom-1 left-1 bg-red-500/20 text-red-500 text-[9px] font-bold px-1.5 rounded border border-red-500/50">
                                             LOW STOCK
                                         </div>
                                     )}
                                 </div>
                                 <div className="font-bold text-white text-sm truncate">{product.name}</div>
                                 <div className="text-xs text-cyber-muted flex justify-between mt-1 items-center">
                                     <span>{product.category}</span>
                                     <span className="text-cyber-accent font-mono font-bold">${product.tiers[0].price}</span>
                                 </div>
                             </div>
                         ))
                     )}
                 </div>
             )}

             {activeTab === 'feedback' && (
                 <div className="space-y-3 py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                     {vendor.feedback.length === 0 ? (
                         <p className="text-center text-cyber-muted italic py-8">No feedback recorded yet.</p>
                     ) : (
                         vendor.feedback.map((fb, idx) => (
                             <div key={idx} className="bg-cyber-card p-3 rounded border border-cyber-border/50 hover:border-cyber-border transition-colors">
                                 <div className="flex justify-between mb-1">
                                     <span className="text-cyber-accent text-xs font-mono font-bold">{fb.user.substring(0, 3)}***</span>
                                     <span className="text-cyber-muted text-[10px]">{fb.time}</span>
                                 </div>
                                 <div className="flex text-yellow-500 text-xs mb-1">
                                     {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(fb.rating) ? "currentColor" : "none"}/>)}
                                 </div>
                                 <p className="text-sm text-white/90">{fb.comment}</p>
                             </div>
                         ))
                     )}
                 </div>
             )}

             {activeTab === 'message' && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col py-4">
                     <div className="bg-cyber-card border border-cyber-border p-3 rounded mb-4 flex items-center gap-2 text-xs text-cyber-muted shrink-0">
                         <Lock size={14} className="text-cyber-success"/>
                         Messages are end-to-end encrypted with {vendor.name}'s PGP key.
                     </div>
                     
                     <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar border border-cyber-border/30 bg-black/20 rounded p-4">
                         {chatHistory.map((msg) => (
                             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                 <div className={`max-w-[80%] p-3 rounded-lg text-sm font-mono ${
                                     msg.sender === 'user' 
                                        ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-text rounded-br-none' 
                                        : 'bg-cyber-card border border-cyber-border text-cyber-muted rounded-bl-none'
                                 }`}>
                                     <div className="flex items-center gap-2 mb-1 text-[10px] opacity-50 uppercase font-bold">
                                         {msg.sender === 'user' ? <User size={10}/> : <Shield size={10}/>}
                                         {msg.sender === 'user' ? 'You' : vendor.name}
                                     </div>
                                     <p className="whitespace-pre-wrap">{msg.text}</p>
                                     <p className="text-[9px] opacity-40 mt-1 text-right">{msg.timestamp}</p>
                                 </div>
                             </div>
                         ))}
                         <div ref={chatEndRef} />
                     </div>

                     <div className="flex gap-2 shrink-0">
                         <textarea 
                            className="flex-1 bg-black border border-cyber-border rounded p-3 text-white font-mono text-sm focus:border-cyber-accent outline-none resize-none h-[60px]"
                            placeholder="Write your encrypted message..."
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                         />
                         <button 
                            onClick={handleSendMessage}
                            disabled={!messageBody.trim()}
                            className="bg-cyber-text text-black font-bold px-6 rounded hover:bg-cyber-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1"
                         >
                             <Send size={20}/>
                             <span className="text-[10px]">SEND</span>
                         </button>
                     </div>
                 </div>
             )}
         </div>
      </motion.div>
    </div>
  );
};
