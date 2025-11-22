import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Shield, Crown, Zap, Gem, Ghost, Info } from 'lucide-react';
import { RankTier } from '../types';

interface RanksModalProps {
  onClose: () => void;
}

interface RankDef {
  tier: RankTier;
  icon: React.ReactNode;
  salesReq: string;
  perks: string[];
  color: string;
}

const RANKS: RankDef[] = [
  { 
    tier: 'Peddler', 
    icon: <Ghost size={24}/>, 
    salesReq: '0 - 10 Sales', 
    perks: ['Basic Listing Limit', 'Standard Fees'], 
    color: 'text-gray-400 border-gray-400' 
  },
  { 
    tier: 'Runner', 
    icon: <Zap size={24}/>, 
    salesReq: '10 - 50 Sales', 
    perks: ['Verified Badge', 'Bold Listings'], 
    color: 'text-cyber-accent border-cyber-accent' 
  },
  { 
    tier: 'Dealer', 
    icon: <Shield size={24}/>, 
    salesReq: '50 - 200 Sales', 
    perks: ['Escrow Priority', 'Search Boost'], 
    color: 'text-green-500 border-green-500' 
  },
  { 
    tier: 'Supplier', 
    icon: <Star size={24}/>, 
    salesReq: '200 - 1000 Sales', 
    perks: ['Reduced Fees', 'Homepage Feature'], 
    color: 'text-cyber-purple border-cyber-purple' 
  },
  { 
    tier: 'Kingpin', 
    icon: <Crown size={24}/>, 
    salesReq: '1000+ Sales', 
    perks: ['Instant FE', 'Dedicated Support', 'Custom URL'], 
    color: 'text-yellow-400 border-yellow-400 shadow-neon-gold' 
  },
  { 
    tier: 'Heisenberg', 
    icon: <div className="relative"><Gem size={24}/><div className="absolute -top-2 -right-2 text-xs">🐸</div></div>, 
    salesReq: 'Invitiation Only', 
    perks: ['God Mode', 'Market Share', 'The One Who Knocks'], 
    color: 'text-red-500 border-red-500 animate-pulse' 
  },
];

export const RanksModal: React.FC<RanksModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cyber-card w-full max-w-4xl border border-cyber-border rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
         <div className="p-6 border-b border-cyber-border bg-cyber-bg flex justify-between items-center sticky top-0 z-10">
            <div>
                <h2 className="font-mono text-2xl font-bold text-white flex items-center gap-2">
                    VENDOR HIERARCHY <Info size={20} className="text-cyber-muted"/>
                </h2>
                <p className="text-cyber-muted text-xs">Climb the ladder. Earn the trust. Rule the market.</p>
            </div>
            <button onClick={onClose} className="bg-cyber-border/50 p-2 rounded-full hover:bg-cyber-danger hover:text-white transition-colors">
                <X size={20}/>
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RANKS.map((rank, idx) => (
                    <motion.div 
                        key={rank.tier}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`bg-cyber-bg/80 backdrop-blur border-2 ${rank.color} p-6 rounded-xl relative group hover:scale-105 transition-transform duration-300`}
                    >
                        {rank.tier === 'Heisenberg' && (
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-xl pointer-events-none"/>
                        )}
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-black border ${rank.color}`}>
                                {rank.icon}
                            </div>
                            <div className="text-right">
                                <h3 className={`font-mono font-bold text-xl uppercase ${rank.color.split(' ')[0]}`}>{rank.tier}</h3>
                                <p className="text-[10px] text-cyber-muted">Rank {idx + 1}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-black/40 p-2 rounded border border-cyber-border/30">
                                <p className="text-[10px] text-cyber-muted uppercase font-bold">Requirement</p>
                                <p className="text-sm font-mono text-white">{rank.salesReq}</p>
                            </div>
                            
                            <div>
                                <p className="text-[10px] text-cyber-muted uppercase font-bold mb-1">Unlocks</p>
                                <ul className="space-y-1">
                                    {rank.perks.map((perk, i) => (
                                        <li key={i} className="text-xs text-cyber-text flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${rank.color.split(' ')[0].replace('text', 'bg')}`}/>
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {rank.tier === 'Heisenberg' && (
                            <div className="absolute -bottom-4 -right-4 text-4xl opacity-20 rotate-12 group-hover:opacity-100 group-hover:scale-125 transition-all">
                                🐸
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
         </div>
      </motion.div>
    </div>
  );
};