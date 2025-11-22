import React from 'react';
import { FilterState, Category } from '../types';
import { Search, Filter, MapPin, Globe, DollarSign } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const CATEGORIES: Category[] = ['Cannabis', 'Stimulants', 'Psychedelics', 'Pharmacy', 'Digital'];

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
    <div className="w-full bg-cyber-card border border-cyber-border p-4 rounded-lg space-y-6">
      
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
            className="w-full bg-cyber-bg border border-cyber-border rounded p-2 pl-10 text-sm text-cyber-text focus:border-cyber-accent outline-none transition-colors"
          />
        </div>
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
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 border border-cyber-border rounded flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? 'bg-cyber-accent border-cyber-accent' : 'group-hover:border-cyber-accent'}`}>
                {filters.categories.includes(cat) && <div className="w-2 h-2 bg-black rounded-sm" />}
              </div>
              <input 
                type="checkbox" 
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="hidden" 
              />
              <span className={`text-sm ${filters.categories.includes(cat) ? 'text-cyber-text font-bold' : 'text-cyber-muted'}`}>
                {cat}
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
