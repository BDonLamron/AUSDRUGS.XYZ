import React, { useState } from 'react';
import { X, Send, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{text: string, isUser: boolean, time: string}[]>([
    { text: "Welcome to AUSDRUGS Secure Support. All communications are PGP encrypted. How can we assist you today?", isUser: false, time: 'Now' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = { text: message, isUser: true, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Auto-reply simulation
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you. An agent will review your encrypted ticket shortly. Average response time: < 15 mins.", 
        isUser: false, 
        time: new Date().toLocaleTimeString() 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-cyber-card w-full max-w-lg border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col max-h-[600px]"
      >
        {/* Header */}
        <div className="bg-cyber-bg p-4 border-b border-cyber-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-cyber-accent/20 p-2 rounded-full text-cyber-accent">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-mono font-bold text-white">Secure Support</h3>
              <div className="flex items-center gap-1 text-xs text-cyber-success">
                <Lock size={10} /> End-to-End Encrypted
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-cyber-muted hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.isUser 
                  ? 'bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-text rounded-br-none' 
                  : 'bg-cyber-border/50 border border-cyber-border text-cyber-muted rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <p className="text-[10px] opacity-50 mt-1 text-right">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-cyber-bg border-t border-cyber-border">
          <div className="relative">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your encrypted message..."
              className="w-full bg-cyber-card border border-cyber-border rounded-lg py-3 pl-4 pr-12 text-sm text-white focus:border-cyber-accent outline-none"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 p-1.5 bg-cyber-accent text-black rounded hover:bg-white transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-[10px] text-center mt-2 text-cyber-muted">
            Ticket ID: #TKT-{Math.floor(Math.random() * 100000)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};