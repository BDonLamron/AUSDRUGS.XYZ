import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, Key, Eye, Lock, Globe, AlertTriangle, ToggleLeft, ToggleRight, FileText, Volume2, Database, Download } from 'lucide-react';
import { Currency } from '../types';

interface SettingsModalProps {
  onClose: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, currency, setCurrency, soundEnabled, setSoundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'pgp' | 'notes'>('general');
  const [pgpKey, setPgpKey] = useState('');
  const [deadmanSwitch, setDeadmanSwitch] = useState(false);
  const [secureNote, setSecureNote] = useState('');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cyber-card w-full max-w-2xl border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col h-[600px]"
      >
         <div className="p-4 border-b border-cyber-border flex justify-between items-center bg-cyber-bg">
             <h2 className="text-xl font-mono font-bold text-white uppercase flex items-center gap-2">
                 <SettingsIcon activeTab={activeTab}/> {activeTab} SETTINGS
             </h2>
             <button onClick={onClose} className="text-cyber-muted hover:text-white"><X size={24}/></button>
         </div>

         <div className="flex h-full">
             {/* Sidebar */}
             <div className="w-48 border-r border-cyber-border bg-black/20 p-2 space-y-1">
                 {[
                     { id: 'general', icon: <Globe size={16}/>, label: 'General' },
                     { id: 'security', icon: <Shield size={16}/>, label: 'Security' },
                     { id: 'pgp', icon: <Key size={16}/>, label: 'PGP Key' },
                     { id: 'notes', icon: <FileText size={16}/>, label: 'Secure Notes' },
                 ].map(tab => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full text-left px-3 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors
                            ${activeTab === tab.id ? 'bg-cyber-accent text-black' : 'text-cyber-muted hover:bg-white/5 hover:text-white'}`}
                     >
                         {tab.icon} {tab.label}
                     </button>
                 ))}
             </div>

             {/* Content */}
             <div className="flex-1 p-6 bg-cyber-bg/50 overflow-y-auto">
                 {activeTab === 'general' && (
                     <div className="space-y-6">
                         <div className="space-y-2">
                             <label className="text-xs font-bold text-cyber-muted uppercase">Display Currency</label>
                             <select 
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as Currency)}
                                className="w-full bg-black border border-cyber-border rounded p-2 text-white outline-none focus:border-cyber-accent"
                             >
                                 <option value="AUD">AUD (Australian Dollar)</option>
                                 <option value="BTC">BTC (Bitcoin)</option>
                                 <option value="XMR">XMR (Monero)</option>
                             </select>
                         </div>
                         <div className="flex items-center justify-between p-3 border border-cyber-border rounded bg-black/30">
                             <div>
                                 <div className="font-bold text-white text-sm">Matrix Mode</div>
                                 <div className="text-xs text-cyber-muted">Enable falling code background effect</div>
                             </div>
                             <div className="w-10 h-5 bg-cyber-accent rounded-full relative cursor-pointer">
                                 <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full shadow-sm"></div>
                             </div>
                         </div>
                         <div className="flex items-center justify-between p-3 border border-cyber-border rounded bg-black/30" onClick={() => setSoundEnabled(!soundEnabled)}>
                             <div>
                                 <div className="font-bold text-white text-sm flex items-center gap-2">
                                     <Volume2 size={14}/> Sound FX
                                 </div>
                                 <div className="text-xs text-cyber-muted">Play interface clicks and beeps</div>
                             </div>
                             <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${soundEnabled ? 'bg-cyber-accent' : 'bg-cyber-border'}`}>
                                 <div className={`absolute top-1 w-3 h-3 bg-black rounded-full shadow-sm transition-all ${soundEnabled ? 'right-1' : 'left-1'}`}></div>
                             </div>
                         </div>
                     </div>
                 )}

                 {activeTab === 'security' && (
                     <div className="space-y-6">
                         <div className="bg-cyber-success/10 border border-cyber-success/30 p-4 rounded">
                             <h4 className="font-bold text-cyber-success flex items-center gap-2"><Shield size={16}/> 2FA ENABLED</h4>
                             <p className="text-xs text-cyber-success/80 mt-1">Your account is protected with PGP Two-Factor Authentication.</p>
                         </div>

                         <div className="space-y-2">
                             <label className="text-xs font-bold text-cyber-muted uppercase">Session Timeout</label>
                             <select className="w-full bg-black border border-cyber-border rounded p-2 text-white outline-none focus:border-cyber-accent">
                                 <option>15 Minutes</option>
                                 <option>30 Minutes</option>
                                 <option>1 Hour</option>
                             </select>
                         </div>

                         <div className="flex items-center justify-between p-3 border border-cyber-danger rounded bg-black/30" onClick={() => setDeadmanSwitch(!deadmanSwitch)}>
                             <div>
                                 <div className="font-bold text-cyber-danger text-sm flex items-center gap-2">
                                     Deadman Switch
                                 </div>
                                 <div className="text-xs text-cyber-muted">Auto-wipe account if inactive for 7 days</div>
                             </div>
                             <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${deadmanSwitch ? 'bg-cyber-danger' : 'bg-cyber-border'}`}>
                                 <div className={`absolute top-1 w-3 h-3 bg-black rounded-full shadow-sm transition-all ${deadmanSwitch ? 'right-1' : 'left-1'}`}></div>
                             </div>
                         </div>

                         <button className="w-full bg-cyber-card border border-cyber-border text-cyber-text font-bold py-3 rounded hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                            <Download size={16}/> EXPORT ACCOUNT DATA (JSON)
                         </button>

                         <div className="border-t border-cyber-border pt-6 mt-6">
                             <h4 className="font-bold text-cyber-danger flex items-center gap-2 mb-2"><AlertTriangle size={16}/> DANGER ZONE</h4>
                             <button className="w-full border-2 border-cyber-danger text-cyber-danger font-bold py-2 rounded hover:bg-cyber-danger hover:text-white transition-colors">
                                 BURN ACCOUNT (DELETE DATA)
                             </button>
                         </div>
                     </div>
                 )}

                 {activeTab === 'pgp' && (
                     <div className="space-y-4 h-full flex flex-col">
                         <p className="text-sm text-cyber-muted">
                             Add your Public PGP Key to enable 2FA and encrypt all communications.
                         </p>
                         <textarea 
                             className="flex-1 bg-black border border-cyber-border rounded p-3 font-mono text-xs text-cyber-text focus:border-cyber-accent outline-none resize-none"
                             placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----..."
                             value={pgpKey}
                             onChange={(e) => setPgpKey(e.target.value)}
                         ></textarea>
                         <button className="w-full bg-cyber-accent text-black font-bold py-3 rounded hover:bg-white transition-colors">
                             SAVE PGP KEY
                         </button>
                     </div>
                 )}

                 {activeTab === 'notes' && (
                     <div className="space-y-4 h-full flex flex-col">
                         <p className="text-sm text-cyber-muted flex items-center gap-2">
                             <Lock size={14}/> Local Encrypted Scratchpad
                         </p>
                         <textarea 
                             className="flex-1 bg-black border border-cyber-border rounded p-3 font-mono text-xs text-cyber-text focus:border-cyber-accent outline-none resize-none"
                             placeholder="Paste temporary addresses or keys here. Wiped on logout."
                             value={secureNote}
                             onChange={(e) => setSecureNote(e.target.value)}
                         ></textarea>
                         <button className="w-full bg-cyber-card border border-cyber-border text-white font-bold py-3 rounded hover:bg-white/10 transition-colors" onClick={() => setSecureNote('')}>
                             CLEAR NOTES
                         </button>
                     </div>
                 )}
             </div>
         </div>
      </motion.div>
    </div>
  );
};

const SettingsIcon = ({ activeTab }: { activeTab: string }) => {
    switch(activeTab) {
        case 'general': return <Globe size={20}/>;
        case 'security': return <Shield size={20}/>;
        case 'pgp': return <Key size={20}/>;
        case 'notes': return <FileText size={20}/>;
        default: return <Globe size={20}/>; 
    }
}