import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Box, Wallet, Shield, LogOut, Key, CreditCard, BrainCircuit, BarChart2, Zap, Clock, MapPin, Link as LinkIcon } from 'lucide-react';
import { User as UserType } from '../types';

interface AccountMenuProps {
  onClose: () => void;
  onOpenWallet: () => void;
  onOpenOrders: () => void;
  onOpenSettings: () => void;
  onSignOut: () => void;
  onOpenAITools: () => void;
  user: UserType | null;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ onClose, onOpenWallet, onOpenOrders, onOpenSettings, onSignOut, onOpenAITools, user }) => {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="absolute top-full right-0 mt-2 w-72 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl z-40 overflow-hidden"
      >
        <div className="p-4 border-b border-cyber-border bg-cyber-bg/50">
             <div className="flex justify-between items-start">
                 <div>
                    <p className="text-xs text-cyber-muted font-bold uppercase">Signed in as</p>
                    <p className="text-white font-mono font-bold truncate text-lg">{user?.username || 'Guest'}</p>
                 </div>
                 {user?.isAdmin && <span className="bg-cyber-danger text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">ADMIN</span>}
             </div>
             
             {/* XP Bar */}
             <div className="mt-3">
                 <div className="flex justify-between text-[10px] text-cyber-muted font-bold mb-1">
                     <span>LEVEL {user?.level || 1}</span>
                     <span>{user?.xp || 0}/1000 XP</span>
                 </div>
                 <div className="h-1.5 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-cyber-accent" style={{ width: `${((user?.xp || 0) / 1000) * 100}%` }}></div>
                 </div>
             </div>

             <div className="flex items-center gap-1 mt-2 text-[10px] text-cyber-success">
                 <Shield size={10}/> 2FA Encrypted
             </div>
        </div>
        
        <div className="p-2">
            <button 
                onClick={() => { onOpenWallet(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left"
            >
                <Wallet size={16} className="text-cyber-accent"/> Wallet
            </button>
            <button 
                onClick={() => { onOpenOrders(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left"
            >
                <Box size={16} className="text-cyber-purple"/> Orders
            </button>
            <button 
                onClick={() => { onOpenAITools(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left"
            >
                <BrainCircuit size={16} className="text-cyber-gold"/> AI Tools
            </button>
            <button 
                onClick={() => { onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left group"
            >
                <BarChart2 size={16} className="text-cyber-muted group-hover:text-cyber-text"/> Affiliate Panel
            </button>
            <button 
                onClick={() => { onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left group"
            >
                <MapPin size={16} className="text-cyber-muted group-hover:text-cyber-text"/> Saved Drops
            </button>
            <div className="h-px bg-cyber-border my-1"></div>
            <button 
                onClick={() => { onOpenSettings(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left"
            >
                <Settings size={16}/> Settings
            </button>
            <button 
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-danger hover:bg-cyber-danger/10 rounded transition-colors text-left"
            >
                <LogOut size={16}/> Sign Out
            </button>
        </div>

        {/* Session Timer Footer */}
        <div className="bg-black/50 p-2 text-center border-t border-cyber-border">
            <p className="text-[10px] text-cyber-muted flex items-center justify-center gap-1">
                <Clock size={10}/> Auto-logout in 14:22
            </p>
        </div>
      </motion.div>
    </>
  );
};