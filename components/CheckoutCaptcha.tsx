import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Unlock, Lock } from 'lucide-react';

interface CheckoutCaptchaProps {
  onSuccess: () => void;
}

export const CheckoutCaptcha: React.FC<CheckoutCaptchaProps> = ({ onSuccess }) => {
  const [nodes, setNodes] = useState([1, 2, 3, 4]);
  const [clicked, setClicked] = useState<number[]>([]);

  const handleNodeClick = (id: number) => {
    if (clicked.includes(id)) return;
    const newClicked = [...clicked, id];
    setClicked(newClicked);
    if (newClicked.length === 4) {
      setTimeout(onSuccess, 500);
    }
  };

  return (
    <div className="w-full bg-black/50 border border-cyber-border p-6 rounded-lg text-center mb-6">
      <div className="flex items-center justify-center gap-2 text-cyber-danger font-bold mb-4">
        <ShieldAlert size={20} /> SECURITY CHECK: DECRYPT THE NODES
      </div>
      
      <div className="flex justify-center gap-4">
        {nodes.map((id) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNodeClick(id)}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              clicked.includes(id) 
                ? 'bg-cyber-success border-cyber-success shadow-[0_0_15px_#10b981]' 
                : 'bg-transparent border-cyber-muted text-cyber-muted hover:border-white hover:text-white'
            }`}
          >
            {clicked.includes(id) ? <Unlock size={20} /> : <Lock size={20} />}
          </motion.button>
        ))}
      </div>
      
      <p className="text-[10px] text-cyber-muted mt-4">Click all nodes to verify humanity.</p>
    </div>
  );
};