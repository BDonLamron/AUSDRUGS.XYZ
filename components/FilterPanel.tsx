import React from 'react';
import { FilterState, Category } from '../types';
import { Search, Filter, MapPin, Globe, DollarSign, Cannabis, Zap, Pill, Binary, Heart, Eye } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const CATEGORIES: { id: Category; icon: React.ReactNode }[] = [
    { id: 'Cannabis', icon: <Cannabis size={14}/> },
    { id: 'Stimulants', icon: <Zap size={14}/> },
    { id: 'Psychedelics', icon: <Eye size={14}/> },
    { id: 'Pharmacy', icon: <Pill size={14}/> },
    { id: 'Digital', icon: <Binary size={14}/> }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  
  const handleCategoryToggle = (cat: Category) => {
    setFilters(prev => {
      const newCats = prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: newCats };
    });
  };

  const handleChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full bg-cyber-card border border-cyber-border p-4 rounded-lg space-y-6 relative z-20">
      
      <div className="flex items-center gap-2 text-cyber-accent mb-4 border-b border-cyber-border pb-2">
        <Filter size={20} />
        <h3 className="font-mono text-lg font-bold uppercase tracking-wider">Filters</h3>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-cyber-muted uppercase">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
          <input 
            type="text" 
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Keywords..."
            className="w-full bg-cyber-bg border border-cyber-border rounded p-2 pl-10 text-sm text-cyber-text focus:border-cyber-accent outline-none transition-colors input-focus-effect"
          />
        </div>
      </div>

      {/* Favorites Toggle */}
      <div className="bg-black/30 p-2 rounded border border-cyber-border">
          <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-cyber-danger flex items-center gap-2"><Heart size={12} fill="currentColor"/> Show Wishlist Only</span>
              <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={filters.showFavoritesOnly} 
                    onChange={(e) => handleChange('showFavoritesOnly', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors ${filters.showFavoritesOnly ? 'bg-cyber-danger' : 'bg-cyber-border'}`}></div>
                  <div className={`absolute left-0 top-0 w-4 h-4 bg-white rounded-full transition-transform ${filters.showFavoritesOnly ? 'translate-x-full' : ''}`}></div>
              </div>
          </label>
      </div>

      {/* Origin & Destination */}
      <div className="space-y-4">
        <div className="space-y-2">
           <label className="text-xs font-bold text-cyber-muted uppercase flex items-center gap-2">
             <MapPin size={12} /> Origin
           </label>
           <select 
             value={filters.origin}
             onChange={(e) => handleChange('origin', e.target.value)}
             className="w-full bg-cyber-bg border border-cyber-border rounded p-2 text-sm text-cyber-text focus:border-cyber-accent outline-none"
           >
             <option value="All">Any Origin</option>
             <option value="Australia">Australia (Domestic)</option>
             <option value="International">International</option>
           </select>
        </div>

        <div className="space-y-2">
           <label className="text-xs font-bold text-cyber-muted uppercase flex items-center gap-2">
             <Globe size={12} /> Ships To
           </label>
           <select 
             value={filters.shipsTo}
             onChange={(e) => handleChange('shipsTo', e.target.value)}
             className="w-full bg-cyber-bg border border-cyber-border rounded p-2 text-sm text-cyber-text focus:border-cyber-accent outline-none"
           >
             <option value="All">Anywhere</option>
             <option value="Australia">Australia</option>
             <option value="Worldwide">Worldwide</option>
           </select>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-cyber-muted uppercase">Category</label>
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group hover:bg-white/5 p-1 rounded transition-colors">
              <div className={`w-4 h-4 border border-cyber-border rounded flex items-center justify-center transition-colors ${filters.categories.includes(cat.id) ? 'bg-cyber-accent border-cyber-accent' : 'group-hover:border-cyber-accent'}`}>
                {filters.categories.includes(cat.id) && <div className="w-2 h-2 bg-black rounded-sm" />}
              </div>
              <input 
                type="checkbox" 
                checked={filters.categories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="hidden" 
              />
              <span className={`text-sm flex items-center gap-2 ${filters.categories.includes(cat.id) ? 'text-cyber-text font-bold' : 'text-cyber-muted'}`}>
                {cat.icon} {cat.id}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-cyber-muted uppercase flex items-center gap-2">
            <DollarSign size={12} /> Price Range (AUD)
        </label>
        <div className="flex gap-2 items-center">
            <input 
              type="number" 
              placeholder="Min" 
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', Number(e.target.value))}
              className="w-1/2 bg-cyber-bg border border-cyber-border rounded p-2 text-sm text-cyber-text focus:border-cyber-accent outline-none"
            />
            <span className="text-cyber-muted">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              className="w-1/2 bg-cyber-bg border border-cyber-border rounded p-2 text-sm text-cyber-text focus:border-cyber-accent outline-none"
            />
        </div>
      </div>

    </div>
  );
};