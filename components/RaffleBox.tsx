import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Timer, DollarSign, Gift } from 'lucide-react';

export const RaffleBox: React.FC = () => {
  const [ticketsSold, setTicketsSold] = useState(1420);
  const [timeLeft, setTimeLeft] = useState<string>('23:59:59');
  const [hasFreeEntry, setHasFreeEntry] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Fake live ticket counter
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setTicketsSold(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Countdown Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEntry = () => {
    if (hasFreeEntry) {
        setMessage("FREE ENTRY CONFIRMED!");
        setHasFreeEntry(false);
        setTicketsSold(prev => prev + 1);
    } else {
        setMessage("REDIRECTING TO PAYMENT...");
        // Simulate payment delay
        setTimeout(() => {
            setTicketsSold(prev => prev + 1);
            setMessage("TICKET PURCHASED ($2.50)");
        }, 1000);
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="aspect-[3/4] border-4 border-edgy-pink bg-white shadow-sharp relative overflow-hidden flex flex-col">
        {/* Flashy Header */}
        <div className="bg-black text-white p-2 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-edgy-pink opacity-20 animate-pulse"></div>
            <h3 className="font-marker text-xl relative z-10 text-edgy-pink">WEEKLY LOTTO</h3>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4 relative z-10">
             {/* Prize Display */}
            <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
            >
                <h2 className="font-marker text-4xl leading-none text-black drop-shadow-md">
                    WIN 1 LB <br/> 
                    <span className="text-edgy-pink text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">SNOW</span>
                </h2>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 w-full">
                <div className="bg-gray-100 border-2 border-black p-2 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Time Left</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-edgy-pink">
                        <Timer size={12} /> {timeLeft}
                    </div>
                </div>
                <div className="bg-gray-100 border-2 border-black p-2 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Entries</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-black">
                        <Ticket size={12} /> {ticketsSold}
                    </div>
                </div>
            </div>
        </div>

        {/* Action Area */}
        <div className="p-4 bg-gray-50 border-t-2 border-dashed border-gray-300">
             <AnimatePresence mode="wait">
                {message ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-edgy-pink text-white text-center font-marker p-2 border-2 border-black"
                    >
                        {message}
                    </motion.div>
                ) : (
                    <button 
                        onClick={handleEntry}
                        className={`w-full border-4 border-black font-marker text-xl py-2 hover:scale-105 transition-transform flex items-center justify-center gap-2 ${hasFreeEntry ? 'bg-edgy-pink text-white' : 'bg-white text-black'}`}
                    >
                        {hasFreeEntry ? (
                            <> <Gift size={20} /> FREE ENTRY </>
                        ) : (
                            <> <DollarSign size={20} /> BUY TICKET </>
                        )}
                    </button>
                )}
             </AnimatePresence>
             <p className="text-[10px] text-center mt-2 font-bold text-gray-400">
                {hasFreeEntry ? "1 Free Entry per 24hrs" : "$2.50 AUD / Ticket"}
             </p>
        </div>

        {/* Background FX */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    </div>
  );
};