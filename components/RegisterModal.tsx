
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UserPlus, Shield } from 'lucide-react';

export const RegisterModal: React.FC<{onRegister: any, onClose: any}> = ({ onRegister, onClose }) => {
  const [u, setU] = useState('');
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-cyber-card w-full max-w-md border border-cyber-border rounded-xl relative p-8 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-cyber-muted"><X size={20}/></button>
        <UserPlus size={40} className="text-cyber-purple mx-auto mb-4"/>
        <h2 className="text-2xl font-bold text-white mb-6 font-mono">REGISTER</h2>
        <input value={u} onChange={e => setU(e.target.value)} placeholder="Alias" className="w-full bg-black border border-cyber-border rounded p-3 mb-4 text-white outline-none focus:border-cyber-purple"/>
        <input type="password" placeholder="Password" className="w-full bg-black border border-cyber-border rounded p-3 mb-6 text-white outline-none focus:border-cyber-purple"/>
        <button onClick={() => onRegister(u)} className="w-full bg-cyber-purple text-black font-bold py-3 rounded flex justify-center gap-2 hover:bg-white"><Shield/> CREATE ID</button>
      </motion.div>
    </div>
  );
};
