
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, ShieldCheck } from 'lucide-react';

export const LoginModal: React.FC<{onLogin: any, onClose: any}> = ({ onLogin, onClose }) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-cyber-card w-full max-w-md border border-cyber-border rounded-xl relative p-8 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-cyber-muted"><X size={20}/></button>
        <Lock size={40} className="text-cyber-accent mx-auto mb-4"/>
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">LOGIN</h2>
        <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" className="w-full bg-black border border-cyber-border rounded p-3 mb-4 text-white outline-none focus:border-cyber-accent"/>
        <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Password" className="w-full bg-black border border-cyber-border rounded p-3 mb-6 text-white outline-none focus:border-cyber-accent"/>
        <button onClick={() => onLogin({ username: u, isAdmin: u === 'nter' && p === 'simmons7', xp: 100, level: 1 })} className="w-full bg-cyber-accent text-black font-bold py-3 rounded flex justify-center gap-2 hover:bg-white"><ShieldCheck/> ENTER</button>
      </motion.div>
    </div>
  );
};
