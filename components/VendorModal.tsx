import React, { useState } from 'react';
import { Vendor, RankTier } from '../types';
import { motion } from 'framer-motion';
import { X, Shield, Star, MessageSquare, Flag, Lock, Clock, Package, CheckCircle, Crown, Gem, Zap, Ghost } from 'lucide-react';

interface VendorModalProps {
  vendor: Vendor;
  onClose: () => void;
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

export const VendorModal: React.FC<VendorModalProps> = ({ vendor, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'feedback' | 'message'>('stats');
  const [messageBody, setMessageBody] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cyber-bg w-full max-w-2xl border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh]"
      >
         {/* Cover Image */}
         <div className="h-32 bg-gradient-to-r from-cyber-card to-cyber-border relative">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"/>
             <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-cyber-danger transition-colors">
                <X size={20} />
             </button>
         </div>

         {/* Profile Header */}
         <div className="px-6 pb-6 relative">
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
             <div className="flex gap-6 border-b border-cyber-border mb-6">
                 {['stats', 'feedback', 'message'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-2 text-sm font-mono font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === tab ? 'border-cyber-accent text-white' : 'border-transparent text-cyber-muted hover:text-white'}`}
                     >
                         {tab}
                     </button>
                 ))}
             </div>

             {/* Content */}
             <div className="min-h-[300px]">
                 {activeTab === 'stats' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
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

                 {activeTab === 'feedback' && (
                     <div className="space-y-3 h-[300px] overflow-y-auto pr-2 animate-in fade-in slide-in-from-bottom-4 duration-300 custom-scrollbar">
                         {vendor.feedback.map((fb, idx) => (
                             <div key={idx} className="bg-cyber-card p-3 rounded border border-cyber-border/50">
                                 <div className="flex justify-between mb-1">
                                     <span className="text-cyber-accent text-xs font-mono">{fb.user.substring(0, 3)}***</span>
                                     <span className="text-cyber-muted text-[10px]">{fb.time}</span>
                                 </div>
                                 <div className="flex text-yellow-500 text-xs mb-1">
                                     {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(fb.rating) ? "currentColor" : "none"}/>)}
                                 </div>
                                 <p className="text-sm text-white">{fb.comment}</p>
                             </div>
                         ))}
                     </div>
                 )}

                 {activeTab === 'message' && (
                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col">
                         <div className="bg-cyber-card border border-cyber-border p-3 rounded mb-4 flex items-center gap-2 text-xs text-cyber-muted">
                             <Lock size={14} className="text-cyber-success"/>
                             Messages are automatically encrypted using the vendor's PGP key.
                         </div>
                         <textarea 
                            className="flex-1 w-full bg-black border border-cyber-border rounded p-3 text-white font-mono text-sm focus:border-cyber-accent outline-none resize-none min-h-[150px]"
                            placeholder="Write your secure message here..."
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                         />
                         <button className="w-full mt-4 bg-cyber-text text-black font-bold py-3 rounded hover:bg-cyber-accent transition-colors">
                             ENCRYPT & SEND
                         </button>
                     </div>
                 )}
             </div>
         </div>
      </motion.div>
    </div>
  );
};