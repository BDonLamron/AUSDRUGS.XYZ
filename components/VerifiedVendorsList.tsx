
import React from 'react';
import { Vendor } from '../types';
import { CheckCircle, Shield } from 'lucide-react';

export const VerifiedVendorsList: React.FC<{vendors: Vendor[], onVendorClick: any}> = ({ vendors, onVendorClick }) => (
  <div className="bg-cyber-card border border-cyber-border rounded-lg overflow-hidden">
    <div className="p-3 bg-black/40 border-b border-cyber-border flex items-center gap-2"><Shield size={14} className="text-cyber-success"/><span className="text-xs font-bold text-white uppercase">Verified Vendors</span></div>
    <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
        {vendors.map((v, i) => (
            <div key={i} onClick={(e) => onVendorClick(v, e)} className="flex items-center justify-between p-2 hover:bg-white/5 rounded cursor-pointer group">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[10px] font-bold text-cyber-text border border-cyber-border">{v.name.charAt(0)}</div>
                    <div className="text-xs font-bold text-white group-hover:text-cyber-accent truncate w-24">{v.name}</div>
                </div>
                <CheckCircle size={12} className="text-cyber-success opacity-50 group-hover:opacity-100"/>
            </div>
        ))}
    </div>
  </div>
);
