
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Save, Plus, Trash2 } from 'lucide-react';

export const EditorPanel: React.FC<{product?: Product, onSave: (p: Product) => void, onClose: () => void}> = ({ product: init, onSave, onClose }) => {
  const [p, setP] = useState<Product>(init ? { ...init } : { id: Math.random().toString(), name: '', description: '', category: 'Cannabis', imageUrl: '', tiers: [], vendor: { name: 'admin', rating: 5, sales: 0, totalRevenue: 0, trustLevel: 10, isVerified: true, rank: 'Kingpin', joinDate: 'Now', bio: '', feedback: [] }, origin: 'Aus', shipsTo: 'Aus', isEscrow: true, isFE: false, type: 'physical' });
  useEffect(() => { if(init) setP({...init}); }, [init]);
  const update = (k: keyof Product, v: any) => setP(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-cyber-bg border-l border-cyber-border z-[100] shadow-2xl flex flex-col font-mono">
      <div className="flex justify-between p-4 bg-cyber-card border-b border-cyber-border"><h2 className="font-bold text-xl text-white">EDITOR</h2><button onClick={onClose}><X className="text-cyber-muted"/></button></div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div><label className="text-xs text-cyber-accent font-bold">NAME</label><input value={p.name} onChange={e => update('name', e.target.value)} className="w-full bg-black border border-cyber-border p-2 text-white rounded"/></div>
        <div><label className="text-xs text-cyber-accent font-bold">IMAGE</label><input value={p.imageUrl} onChange={e => update('imageUrl', e.target.value)} className="w-full bg-black border border-cyber-border p-2 text-white rounded"/></div>
        <div><label className="text-xs text-cyber-accent font-bold">DESC</label><textarea value={p.description} onChange={e => update('description', e.target.value)} className="w-full bg-black border border-cyber-border p-2 text-white rounded h-24"/></div>
        <div className="bg-black/20 p-4 border border-cyber-border rounded"><div className="flex justify-between mb-2"><span className="text-xs text-cyber-accent font-bold">TIERS</span><button onClick={() => update('tiers', [...p.tiers, {id: Math.random().toString(), amount: '1g', price: 100}])}><Plus size={14} className="text-white"/></button></div>
            {p.tiers.map(t => (
                <div key={t.id} className="flex gap-2 mb-2"><input value={t.amount} onChange={e => update('tiers', p.tiers.map(ti => ti.id===t.id ? {...ti, amount: e.target.value} : ti))} className="bg-black border border-cyber-border text-white w-20 p-1 text-xs"/><input type="number" value={t.price} onChange={e => update('tiers', p.tiers.map(ti => ti.id===t.id ? {...ti, price: parseInt(e.target.value)} : ti))} className="bg-black border border-cyber-border text-white w-20 p-1 text-xs"/><button onClick={() => update('tiers', p.tiers.filter(ti => ti.id !== t.id))}><Trash2 size={14} className="text-red-500"/></button></div>
            ))}
        </div>
      </div>
      <div className="p-4 bg-cyber-card border-t border-cyber-border"><button onClick={() => { if(p.name) { onSave(p); onClose(); } }} className="w-full bg-cyber-success text-black font-bold py-3 rounded flex justify-center gap-2"><Save size={18}/> SAVE</button></div>
    </div>
  );
};
