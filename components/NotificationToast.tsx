
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationToastProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="pointer-events-auto bg-black/90 backdrop-blur border-l-4 p-4 rounded shadow-2xl min-w-[300px] flex items-start gap-3 relative overflow-hidden"
            style={{ 
                borderColor: n.type === 'success' ? '#10b981' : n.type === 'error' ? '#f43f5e' : n.type === 'warning' ? '#fbbf24' : '#22d3ee'
            }}
          >
            <div className="mt-0.5">
                {n.type === 'success' && <CheckCircle size={18} className="text-green-500"/>}
                {n.type === 'error' && <XCircle size={18} className="text-red-500"/>}
                {n.type === 'warning' && <AlertTriangle size={18} className="text-yellow-500"/>}
                {n.type === 'info' && <Info size={18} className="text-cyan-500"/>}
            </div>
            <div className="flex-1">
                <p className="font-mono text-xs font-bold text-white uppercase">{n.type}</p>
                <p className="text-sm text-cyber-text/90 font-sans">{n.message}</p>
            </div>
            <button onClick={() => removeNotification(n.id)} className="text-cyber-muted hover:text-white">
                <X size={14}/>
            </button>
            
            {/* Progress Bar */}
            <motion.div 
                initial={{ width: '100%' }} 
                animate={{ width: '0%' }} 
                transition={{ duration: 4, ease: "linear" }}
                className="absolute bottom-0 left-0 h-0.5 bg-white/30"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};