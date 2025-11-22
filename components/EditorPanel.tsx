import React, { useState, useEffect } from 'react';
import { Product, PriceTier } from '../types';
import { X, Plus, Trash2, Save } from 'lucide-react';

interface EditorPanelProps {
  product?: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const EMPTY_PRODUCT: Product = {
  id: '', 
  name: '', 
  description: '', 
  // Fix: Add missing category
  category: 'Cannabis',
  imageUrl: 'https://picsum.photos/400/400',
  tiers: [{ id: 't1', amount: '1g', price: 100 }],
  vendor: { 
    name: 'admin', 
    rating: 5, 
    sales: 0, 
    totalRevenue: 0,
    trustLevel: 10, 
    isVerified: true,
    rank: 'Kingpin',
    joinDate: 'Jan 2025',
    bio: 'System Administrator',
    feedback: [] 
  },
  origin: 'USA', 
  shipsTo: 'WorldWide', 
  isEscrow: true, 
  // Fix: Add missing isFE
  isFE: false,
  type: 'physical'
};

export const EditorPanel: React.FC<EditorPanelProps> = ({ product: initialProduct, onSave, onClose }) => {
  const [product, setProduct] = useState<Product>(initialProduct ? { ...initialProduct } : { ...EMPTY_PRODUCT, id: Math.random().toString(36).substr(2, 9) });

  useEffect(() => {
    if (initialProduct) setProduct({ ...initialProduct });
    else setProduct({ ...EMPTY_PRODUCT, id: Math.random().toString(36).substr(2, 9) });
  }, [initialProduct]);

  const updateField = (field: keyof Product, value: any) => setProduct(prev => ({ ...prev, [field]: value }));

  const handleTierChange = (id: string, field: keyof PriceTier, value: string | number) => {
    const newTiers = product.tiers.map(t => t.id === id ? { ...t, [field]: value } : t);
    updateField('tiers', newTiers);
  };

  const addTier = () => updateField('tiers', [...product.tiers, { id: Math.random().toString(), amount: 'New', price: 0 }]);
  const removeTier = (id: string) => updateField('tiers', product.tiers.filter(t => t.id !== id));
  const handleSave = () => { if (product.name) { onSave(product); onClose(); } };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white border-l-4 border-edgy-pink z-50 shadow-2xl flex flex-col font-sans">
      <div className="flex justify-between items-center p-4 bg-edgy-pink text-white">
        <h2 className="font-marker text-2xl">LISTING EDITOR</h2>
        <button onClick={onClose}><X size={24} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-1">
          <label className="font-bold text-xs">PRODUCT NAME</label>
          <input type="text" value={product.name} onChange={(e) => updateField('name', e.target.value)} className="w-full border-2 border-black p-2 font-bold focus:border-edgy-pink outline-none" />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-xs">IMAGE URL</label>
          <input type="text" value={product.imageUrl} onChange={(e) => updateField('imageUrl', e.target.value)} className="w-full border-2 border-black p-2 text-xs focus:border-edgy-pink outline-none" />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-xs">DESCRIPTION</label>
          <textarea rows={3} value={product.description} onChange={(e) => updateField('description', e.target.value)} className="w-full border-2 border-black p-2 text-sm focus:border-edgy-pink outline-none" />
        </div>

        <div className="border-2 border-gray-200 p-4 space-y-3">
            <div className="flex justify-between items-center">
                <label className="font-bold text-xs">PRICING TIERS</label>
                <button onClick={addTier} className="text-xs bg-black text-white px-2 py-1 hover:bg-edgy-pink"><Plus size={12}/></button>
            </div>
            {product.tiers.map((tier) => (
                <div key={tier.id} className="flex gap-2 items-center">
                    <input type="text" value={tier.amount} onChange={(e) => handleTierChange(tier.id, 'amount', e.target.value)} className="flex-1 border border-gray-300 p-1 text-sm font-bold" />
                    <input type="number" value={tier.price} onChange={(e) => handleTierChange(tier.id, 'price', parseInt(e.target.value))} className="w-20 border border-gray-300 p-1 text-sm font-bold text-right" />
                    <button onClick={() => removeTier(tier.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
            ))}
        </div>
      </div>

      <div className="p-4 border-t-2 border-gray-200">
        <button onClick={handleSave} className="w-full py-3 bg-black text-white font-marker text-xl hover:bg-edgy-pink transition-colors flex items-center justify-center gap-2">
            <Save size={20} /> PUBLISH
        </button>
      </div>
    </div>
  );
};