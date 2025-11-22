import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Trophy, AlertTriangle } from 'lucide-react';

interface CoinflipModalProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
  onClose: () => void;
}

export const CoinflipModal: React.FC<CoinflipModalProps> = ({ balance, onUpdateBalance, onClose }) => {
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selection, setSelection] = useState<'Heads' | 'Tails' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFlip = () => {
    if (!selection) return;
    if (betAmount > balance) {
      setMessage("Insufficient funds!");
      return;
    }
    if (betAmount <= 0) return;

    setFlipping(true);
    setResult(null);
    setMessage(null);
    
    // Deduct immediately (can refund if won)
    onUpdateBalance(balance - betAmount);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      setFlipping(false);

      if (outcome === selection) {
        const winAmount = Math.floor(betAmount * 1.9);
        onUpdateBalance(balance - betAmount + winAmount); // Add winnings (original bet already deducted)
        setMessage(`YOU WON $${winAmount}!`);
      } else {
        setMessage(`YOU LOST $${betAmount}.`);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cyber-card w-full max-w-md border-2 border-cyber-gold rounded-2xl shadow-neon-gold overflow-hidden relative flex flex-col"
      >
        <div className="p-4 bg-cyber-bg border-b border-cyber-border flex justify-between items-center">
            <div className="flex items-center gap-2 text-cyber-gold font-mono font-bold text-xl animate-rgb-text">
                <DollarSign size={24}/> COINFLIP (1.9x)
            </div>
            <button onClick={onClose} className="text-cyber-muted hover:text-white">
                <X size={24}/>
            </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            {/* Balance Display */}
            <div className="bg-black/50 px-4 py-2 rounded border border-cyber-border text-center">
                <p className="text-xs text-cyber-muted uppercase">Wallet Balance</p>
                <p className="text-2xl font-mono font-bold text-white">${balance.toFixed(2)}</p>
            </div>

            {/* Coin Animation */}
            <div className="relative w-32 h-32 perspective-1000">
                <motion.div
                    animate={flipping ? { rotateY: [0, 1800] } : { rotateY: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="w-full h-full relative transform-style-3d"
                >
                    {/* Front (Heads) */}
                    <div className={`absolute inset-0 rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center shadow-lg backface-hidden ${result === 'Heads' || (!result && !flipping) ? 'z-10' : ''}`}>
                        <span className="text-4xl font-black text-yellow-700">H</span>
                    </div>
                    {/* Back (Tails) */}
                    <div className={`absolute inset-0 rounded-full bg-gray-300 border-4 border-gray-500 flex items-center justify-center shadow-lg backface-hidden rotate-y-180 ${result === 'Tails' ? 'z-10' : ''}`}>
                        <span className="text-4xl font-black text-gray-600">T</span>
                    </div>
                </motion.div>
            </div>

            {/* Result Message */}
            <div className="h-8">
                {message && (
                    <motion.p 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className={`font-mono font-bold text-lg ${message.includes('WON') ? 'text-cyber-success' : 'text-cyber-danger'}`}
                    >
                        {message}
                    </motion.p>
                )}
            </div>

            {/* Controls */}
            <div className="w-full space-y-4">
                <div className="flex gap-4">
                    <button 
                        onClick={() => setSelection('Heads')}
                        className={`flex-1 py-3 rounded font-bold border-2 transition-all ${selection === 'Heads' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-transparent text-cyber-muted border-cyber-border hover:border-yellow-400'}`}
                    >
                        HEADS
                    </button>
                    <button 
                        onClick={() => setSelection('Tails')}
                        className={`flex-1 py-3 rounded font-bold border-2 transition-all ${selection === 'Tails' ? 'bg-gray-300 text-black border-gray-300' : 'bg-transparent text-cyber-muted border-cyber-border hover:border-gray-300'}`}
                    >
                        TAILS
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-cyber-muted uppercase">Bet Amount ($)</label>
                    <input 
                        type="number" 
                        value={betAmount}
                        onChange={(e) => setBetAmount(parseInt(e.target.value) || 0)}
                        className="w-full bg-black border border-cyber-border rounded p-3 text-center font-mono text-xl text-white focus:border-cyber-gold outline-none"
                    />
                </div>

                <button 
                    onClick={handleFlip}
                    disabled={flipping || !selection || betAmount <= 0}
                    className="w-full py-4 bg-cyber-gold text-black font-black text-xl rounded shadow-neon-gold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                    {flipping ? "FLIPPING..." : "FLIP COIN"}
                </button>
            </div>

        </div>
      </motion.div>
    </div>
  );
};
