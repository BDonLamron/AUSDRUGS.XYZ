import React from 'react';
import { Vendor } from '../types';
import { Trophy, TrendingUp, Medal, Crown } from 'lucide-react';

interface TopVendorsPanelProps {
  vendors: Vendor[];
}

export const TopVendorsPanel: React.FC<TopVendorsPanelProps> = ({ vendors }) => {
  // Sort by revenue descending
  const sortedVendors = [...vendors].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  return (
    <div className="w-full bg-cyber-card border border-cyber-border p-0 rounded-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-cyber-card to-black border-b border-cyber-border flex items-center gap-2">
         <Trophy className="text-cyber-gold animate-pulse" size={20}/>
         <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider">High Rollers</h3>
      </div>
      
      <div className="divide-y divide-cyber-border">
         {sortedVendors.map((vendor, idx) => (
             <div key={idx} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group cursor-pointer">
                 <div className={`w-8 h-8 flex items-center justify-center font-black text-sm rounded ${
                     idx === 0 ? 'bg-cyber-gold text-black shadow-neon-gold' : 
                     idx === 1 ? 'bg-gray-300 text-black' :
                     idx === 2 ? 'bg-orange-700 text-white' : 'bg-cyber-border text-cyber-muted'
                 }`}>
                     {idx + 1}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-1">
                         <span className={`font-bold text-sm truncate ${
                             vendor.rank === 'Heisenberg' ? 'text-cyber-danger' : 
                             vendor.rank === 'Kingpin' ? 'text-cyber-gold' : 'text-white'
                         }`}>
                            {vendor.name}
                         </span>
                         {idx === 0 && <Crown size={12} className="text-cyber-gold"/>}
                     </div>
                     <div className="flex items-center gap-1 text-[10px] text-cyber-muted">
                        <TrendingUp size={10} className="text-cyber-success"/>
                        ${(vendor.totalRevenue / 1000).toFixed(1)}k Revenue
                     </div>
                 </div>
                 
                 <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyber-accent">{vendor.sales}</div>
                    <div className="text-[8px] text-cyber-muted uppercase">Sales</div>
                 </div>
             </div>
         ))}
      </div>
      
      <div className="p-3 bg-black/50 text-center">
          <span className="text-[10px] text-cyber-muted animate-pulse">LEADERBOARD UPDATES HOURLY</span>
      </div>
    </div>
  );
};