
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { chatWithBot } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState<{role: string, text: string}[]>([{ role: 'model', text: 'Greetings. How can I assist with your operations?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMsgs(p => [...p, userMsg]);
    setInput(''); setLoading(true);
    const history = msgs.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const res = await chatWithBot(history, input);
    setMsgs(p => [...p, { role: 'model', text: res }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-20 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-16 right-0 w-80 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-96">
            <div className="bg-cyber-bg p-3 border-b border-cyber-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-cyber-accent font-mono font-bold text-xs"><Bot size={14}/> AI ASSISTANT</div>
              <button onClick={() => setIsOpen(false)}><X size={14} className="text-cyber-muted hover:text-white"/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-black/40">
              {msgs.map((m, i) => (
                <div key={i} className={`p-2 rounded text-xs ${m.role === 'user' ? 'bg-cyber-accent/10 text-right ml-8' : 'bg-cyber-border/30 mr-8'}`}>
                  <p className="text-white">{m.text}</p>
                </div>
              ))}
              {loading && <div className="text-cyber-muted text-xs animate-pulse">Thinking...</div>}
            </div>
            <div className="p-2 bg-cyber-bg border-t border-cyber-border flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} className="flex-1 bg-black border border-cyber-border rounded p-2 text-xs text-white outline-none focus:border-cyber-accent" placeholder="Ask Gemini..." />
              <button onClick={send} className="p-2 bg-cyber-accent text-black rounded hover:bg-white"><Send size={14}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-cyber-accent text-black p-3 rounded-full shadow-neon hover:scale-110 transition-transform">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};
