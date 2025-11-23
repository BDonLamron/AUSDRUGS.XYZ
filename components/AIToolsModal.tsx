
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BrainCircuit, Image, ScanLine, Send, Loader2, Video, Wand2 } from 'lucide-react';
import { askOracle, analyzeImage, generateVendorImage, generateVideo, editImage } from '../services/geminiService';

export const AIToolsModal: React.FC<{ onClose: () => void, initialTab?: string }> = ({ onClose, initialTab = 'oracle' }) => {
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState('');
  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  
  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (file) { const r = new FileReader(); r.onload = () => setImg(r.result as string); r.readAsDataURL(file); }
  };

  const runAction = async () => {
    setLoading(true);
    if (tab === 'oracle') setRes(await askOracle(query));
    if (tab === 'lab' && img) setRes(await analyzeImage(img.split(',')[1]));
    if (tab === 'studio') setImg(await generateVendorImage(query, "1:1"));
    if (tab === 'motion' && img) setRes(await generateVideo(query) as string); // Veo
    if (tab === 'edit' && img) setImg(await editImage(img.split(',')[1], query)); // Nano Banana
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-cyber-card w-full max-w-5xl h-[80vh] border border-cyber-accent rounded-xl overflow-hidden flex shadow-neon">
         <div className="w-64 bg-black/40 border-r border-cyber-border flex flex-col p-4 gap-2">
            <h2 className="font-mono text-xl font-bold text-white mb-4">AI SUITE</h2>
            {[
                { id: 'oracle', icon: <BrainCircuit size={16}/>, label: 'ORACLE' },
                { id: 'lab', icon: <ScanLine size={16}/>, label: 'LAB' },
                { id: 'studio', icon: <Image size={16}/>, label: 'STUDIO' },
                { id: 'motion', icon: <Video size={16}/>, label: 'MOTION (VEO)' },
                { id: 'edit', icon: <Wand2 size={16}/>, label: 'MAGIC EDIT' },
            ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 p-3 rounded text-xs font-bold ${tab === t.id ? 'bg-cyber-accent text-black' : 'text-cyber-muted hover:text-white'}`}>
                    {t.icon} {t.label}
                </button>
            ))}
         </div>
         <div className="flex-1 bg-cyber-bg p-6 relative flex flex-col gap-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-cyber-muted hover:text-white"><X size={24}/></button>
            <div className="flex-1 bg-black/30 border border-cyber-border rounded p-4 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                {loading ? <div className="flex items-center gap-2 text-cyber-accent animate-pulse"><Loader2 className="animate-spin"/> PROCESSING...</div> : 
                 tab === 'studio' || tab === 'edit' ? (img ? <img src={img} className="max-h-full object-contain mx-auto"/> : "Generated image will appear here.") :
                 tab === 'motion' && res ? <video src={res} controls className="w-full h-full"/> :
                 res || "Ready for input."}
            </div>
            <div className="flex gap-2">
                {(tab === 'lab' || tab === 'motion' || tab === 'edit') && (
                    <div className="relative w-12 bg-black border border-cyber-border rounded flex items-center justify-center cursor-pointer hover:border-cyber-accent">
                        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer"/>
                        {img ? <img src={img} className="w-full h-full object-cover"/> : <ScanLine size={16}/>}
                    </div>
                )}
                <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-black border border-cyber-border rounded p-3 text-white outline-none focus:border-cyber-accent" placeholder={tab === 'oracle' ? "Ask Gemini..." : "Enter prompt..."} />
                <button onClick={runAction} disabled={loading} className="bg-cyber-accent text-black px-6 rounded font-bold hover:bg-white"><Send size={20}/></button>
            </div>
         </div>
      </motion.div>
    </div>
  );
};
