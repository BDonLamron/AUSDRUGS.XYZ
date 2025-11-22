import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Box, Wallet, Shield, LogOut, Key, CreditCard } from 'lucide-react';

interface AccountMenuProps {
  onClose: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="absolute top-full right-0 mt-2 w-64 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl z-40 overflow-hidden"
      >
        <div className="p-4 border-b border-cyber-border bg-cyber-bg/50">
             <p className="text-xs text-cyber-muted font-bold uppercase">Signed in as</p>
             <p className="text-white font-mono font-bold truncate">GhostUser_99</p>
             <div className="flex items-center gap-1 mt-1 text-[10px] text-cyber-success">
                 <Shield size={10}/> 2FA Enabled
             </div>
        </div>
        
        <div className="p-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left">
                <Wallet size={16} className="text-cyber-accent"/> Wallet ($0.00)
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left">
                <Box size={16} className="text-cyber-purple"/> Orders
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left">
                <Key size={16} className="text-yellow-500"/> PGP Keys
            </button>
            <div className="h-px bg-cyber-border my-1"></div>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-text hover:bg-cyber-border/50 rounded transition-colors text-left">
                <Settings size={16}/> Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-cyber-danger hover:bg-cyber-danger/10 rounded transition-colors text-left">
                <LogOut size={16}/> Sign Out
            </button>
        </div>
      </motion.div>
    </>
  );
};