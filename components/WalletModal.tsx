import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bitcoin, ArrowUpRight, ArrowDownLeft, History, Copy, QrCode, RefreshCw, CheckCircle2, Loader2, Wallet, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';

interface WalletModalProps {
  balance: number;
  transactions: Transaction[];
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ balance, transactions, onClose, onDeposit }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [depositStatus, setDepositStatus] = useState<'idle' | 'scanning' | 'found'>('idle');
  const [walletAddress] = useState(`3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc${Math.floor(Math.random()*9)}`);
  
  const handleCheckDeposit = () => {
      setDepositStatus('scanning');
      setTimeout(() => {
          setDepositStatus('found');
          const randomAmount = parseFloat((Math.random() * 500 + 50).toFixed(2));
          onDeposit(randomAmount);
          setTimeout(() => setDepositStatus('idle'), 3000);
      }, 3000);
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-cyber-card w-full max-w-4xl border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col h-[700px]"
      >
        {/* Header */}
        <div className="bg-cyber-bg p-6 border-b border-cyber-border flex justify-between items-start">
             <div>
                 <h2 className="text-2xl font-mono font-bold text-white flex items-center gap-2">
                     <Wallet className="text-cyber-accent" /> CRYPTO WALLET
                 </h2>
                 <p className="text-cyber-muted text-xs mt-1">Manage your funds securely. PGP Signed.</p>
             </div>
             
             <div className="text-right">
                 <div className="text-xs text-cyber-muted uppercase font-bold">Total Balance</div>
                 <div className="text-3xl font-mono font-bold text-white tracking-tight">
                     ${balance.toFixed(2)} <span className="text-lg text-cyber-muted">AUD</span>
                 </div>
                 <div className="text-xs font-mono text-cyber-gold">
                     ≈ {(balance / 145000).toFixed(6)} BTC
                 </div>
             </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cyber-border bg-black/20">
            {[
                { id: 'deposit', icon: <ArrowDownLeft size={16}/>, label: 'Deposit' },
                { id: 'withdraw', icon: <ArrowUpRight size={16}/>, label: 'Withdraw' },
                { id: 'history', icon: <History size={16}/>, label: 'Transaction History' },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider transition-all
                        ${activeTab === tab.id 
                            ? 'bg-cyber-accent/10 text-cyber-accent border-b-2 border-cyber-accent' 
                            : 'text-cyber-muted hover:text-white hover:bg-white/5'
                        }`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-cyber-bg/50 relative">
            
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-cyber-muted hover:text-white z-10">
                <X size={24}/>
            </button>

            <AnimatePresence mode="wait">
                {activeTab === 'deposit' && (
                    <motion.div 
                        key="deposit"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex flex-col md:flex-row gap-8 h-full"
                    >
                        {/* QR Section */}
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg border-4 border-white">
                             <div className="relative">
                                 <QrCode size={200} className="text-black"/>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="bg-white p-2 rounded-full shadow-lg">
                                         <Bitcoin size={32} className="text-orange-500 fill-current"/>
                                     </div>
                                 </div>
                             </div>
                             <p className="mt-4 text-black font-bold text-sm text-center">SCAN TO DEPOSIT</p>
                             <p className="text-gray-500 text-[10px] text-center">Only send BTC to this address.</p>
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-cyber-muted uppercase">Your Unique Bitcoin Deposit Address</label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 bg-black border border-cyber-border p-4 rounded text-cyber-text font-mono text-sm break-all">
                                        {walletAddress}
                                    </code>
                                    <button 
                                        onClick={handleCopy}
                                        className="bg-cyber-card border border-cyber-border p-4 rounded hover:bg-cyber-accent hover:text-black transition-colors"
                                    >
                                        {copied ? <CheckCircle2 size={20}/> : <Copy size={20}/>}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-cyber-warning mt-2">
                                    <AlertTriangle size={12} className="text-yellow-500"/>
                                    <span className="text-yellow-500">Minimum deposit: 0.0005 BTC. 1 confirmation required.</span>
                                </div>
                            </div>

                            <div className="bg-cyber-card border border-cyber-border rounded-lg p-6 space-y-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <RefreshCw size={16} className={depositStatus === 'scanning' ? 'animate-spin' : ''}/>
                                    {depositStatus === 'idle' && "Check for Deposits"}
                                    {depositStatus === 'scanning' && "Scanning Blockchain..."}
                                    {depositStatus === 'found' && "Deposit Confirmed!"}
                                </h3>
                                <p className="text-sm text-cyber-muted">
                                    If you have sent funds, click below to update your balance. It may take up to 10 minutes for the network to confirm.
                                </p>
                                <button 
                                    onClick={handleCheckDeposit}
                                    disabled={depositStatus !== 'idle'}
                                    className="w-full bg-cyber-accent text-black font-bold py-3 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {depositStatus === 'idle' ? 'REFRESH BALANCE' : depositStatus === 'scanning' ? 'SEARCHING MEMPOOL...' : 'FUNDS ADDED'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'withdraw' && (
                    <motion.div key="withdraw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto space-y-6 pt-8">
                        <div className="bg-cyber-danger/10 border border-cyber-danger p-4 rounded flex items-start gap-3">
                            <AlertTriangle className="text-cyber-danger shrink-0" size={24}/>
                            <div>
                                <h4 className="font-bold text-cyber-danger">Security Warning</h4>
                                <p className="text-xs text-cyber-danger/80 mt-1">Ensure your withdrawal address is correct. Transactions cannot be reversed. Withdrawals are processed manually for amounts over $1,000.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                             <div className="space-y-2">
                                 <label className="text-xs font-bold text-cyber-muted uppercase">Destination BTC Address</label>
                                 <input type="text" className="w-full bg-black border border-cyber-border rounded p-3 text-white focus:border-cyber-accent outline-none font-mono" placeholder="bc1q..." />
                             </div>
                             
                             <div className="space-y-2">
                                 <label className="text-xs font-bold text-cyber-muted uppercase">Amount (AUD)</label>
                                 <div className="relative">
                                    <span className="absolute left-3 top-3 text-cyber-muted">$</span>
                                    <input type="number" className="w-full bg-black border border-cyber-border rounded p-3 pl-6 text-white focus:border-cyber-accent outline-none font-mono" placeholder="0.00" />
                                    <button className="absolute right-2 top-2 text-[10px] bg-cyber-card px-2 py-1 rounded border border-cyber-border hover:text-white">MAX</button>
                                 </div>
                             </div>

                             <div className="space-y-2">
                                 <label className="text-xs font-bold text-cyber-muted uppercase">2FA Code</label>
                                 <input type="text" className="w-full bg-black border border-cyber-border rounded p-3 text-white focus:border-cyber-accent outline-none font-mono text-center tracking-widest" placeholder="000 000" />
                             </div>

                             <button className="w-full bg-cyber-card border border-cyber-border text-cyber-text font-bold py-4 rounded mt-4 hover:bg-cyber-danger hover:text-white hover:border-cyber-danger transition-all">
                                 INITIATE WITHDRAWAL
                             </button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-cyber-muted border-b border-cyber-border">
                                    <th className="py-3 font-bold uppercase">Type</th>
                                    <th className="py-3 font-bold uppercase">Transaction ID</th>
                                    <th className="py-3 font-bold uppercase">Date</th>
                                    <th className="py-3 font-bold uppercase">Status</th>
                                    <th className="py-3 font-bold uppercase text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-mono">
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-cyber-muted italic">No transactions found.</td>
                                    </tr>
                                ) : (
                                    transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-cyber-border/30 hover:bg-white/5 transition-colors">
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border
                                                    ${tx.type === 'Deposit' ? 'bg-green-500/10 text-green-500 border-green-500/30' : 
                                                      tx.type === 'Withdrawal' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                                                      'bg-blue-500/10 text-blue-500 border-blue-500/30'}`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="py-3 text-cyber-muted truncate max-w-[150px]">{tx.txHash || tx.id}</td>
                                            <td className="py-3 text-cyber-text">{tx.date}</td>
                                            <td className="py-3">
                                                <span className={`flex items-center gap-1 ${tx.status === 'Completed' ? 'text-cyber-success' : 'text-yellow-500'}`}>
                                                    {tx.status === 'Completed' ? <CheckCircle2 size={12}/> : <Loader2 size={12} className="animate-spin"/>}
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className={`py-3 text-right font-bold ${['Deposit', 'Win'].includes(tx.type) ? 'text-green-500' : 'text-red-500'}`}>
                                                {['Deposit', 'Win'].includes(tx.type) ? '+' : '-'}${tx.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};