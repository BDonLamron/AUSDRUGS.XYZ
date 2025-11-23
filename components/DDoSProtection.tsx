
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DDoSProtectionProps {
  onComplete: () => void;
}

export const DDoSProtection: React.FC<DDoSProtectionProps> = ({ onComplete }) => {
  const [status, setStatus] = useState('Checking your browser...');

  useEffect(() => {
    const steps = [
        { msg: 'Checking your browser...', delay: 1000 },
        { msg: 'Verifying PGP signature...', delay: 2000 },
        { msg: 'Establishing Tor circuit...', delay: 3000 },
        { msg: 'Access Granted.', delay: 3500 }
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ msg, delay }) => {
        const t = setTimeout(() => {
            setStatus(msg);
            if (msg === 'Access Granted.') {
                setTimeout(onComplete, 500);
            }
        }, delay);
        timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#000] flex flex-col items-center justify-center font-mono text-white">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
        >
            <ShieldCheck size={64} className="text-cyber-accent mx-auto animate-pulse"/>
            <h1 className="text-2xl font-bold">DDoS PROTECTION</h1>
            <div className="flex items-center justify-center gap-2 text-cyber-muted text-sm">
                {status !== 'Access Granted.' && <Loader2 size={16} className="animate-spin"/>}
                {status}
            </div>
            <div className="text-[10px] text-zinc-600 mt-8">
                Ray ID: {Math.random().toString(36).substring(7).toUpperCase()} • IP: 127.0.0.1
            </div>
        </motion.div>
    </div>
  );
};