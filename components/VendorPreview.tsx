
import React from 'react';
import { motion } from 'framer-motion';
import { Vendor } from '../types';
import { Star, Shield, CheckCircle, User, Package, Activity } from 'lucide-react';

export const VendorPreview: React.FC<{vendor: Vendor, x: number, y: number, onClose: any, onViewProfile: any}> = ({ vendor, x, y, onClose, onViewProfile }) => {
  return (
    <>
    <div className="fixed inset-0 z-[60]" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ left: Math.min(x, window.innerWidth - 340), top: Math.min(y, window.innerHeight - 300) }} className="fixed z-[70] w-[320px] bg-cyber-bg border border-cyber-border rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-20 bg-black relative"><div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-bg"></div></div>
        <div className="px-6 pb-6 relative z-10 -mt-10">
            <div className="flex gap-4 items-end mb-4">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-2xl font-bold text-cyber-accent border border-cyber-border shadow-lg">{vendor.name.charAt(0)}</div>
                <div><h3 className="text-lg font-bold text-white flex items-center gap-1">{vendor.name} {vendor.isVerified && <CheckCircle size={14} className="text-cyber-success"/>}</h3><div className="text-xs text-cyber-muted flex gap-1"><span className="text-yellow-500 flex items-center gap-0.5"><Star size={10}/> {vendor.rating}</span> <span>{vendor.rank}</span></div></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-black/40 p-2 rounded border border-cyber-border"><div className="text-[10px] text-cyber-muted flex justify-center gap-1"><Package size={10}/> SALES</div><div className="font-bold text-white">{vendor.sales}</div></div>
                <div className="bg-black/40 p-2 rounded border border-cyber-border"><div className="text-[10px] text-cyber-muted flex justify-center gap-1"><Shield size={10}/> TRUST</div><div className="font-bold text-cyber-purple">{vendor.trustLevel}</div></div>
                <div className="bg-black/40 p-2 rounded border border-cyber-border"><div className="text-[10px] text-cyber-muted flex justify-center gap-1"><Activity size={10}/> SPEED</div><div className="font-bold text-cyber-success">FAST</div></div>
            </div>
            <button onClick={onViewProfile} className="w-full bg-cyber-text text-black font-bold py-2 rounded text-sm hover:bg-cyber-accent flex justify-center gap-2"><User size={16}/> VIEW PROFILE</button>
        </div>
    </motion.div>
    </>
  );
};
