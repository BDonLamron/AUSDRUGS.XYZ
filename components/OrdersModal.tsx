import React from 'react';
import { motion } from 'framer-motion';
import { X, Package, Clock, CheckCircle, Truck, Box } from 'lucide-react';
import { Order } from '../types';

interface OrdersModalProps {
  orders: Order[];
  onClose: () => void;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors: Record<string, string> = {
        'Pending': 'text-yellow-400 bg-yellow-400/10 border-yellow-400',
        'Processing': 'text-blue-400 bg-blue-400/10 border-blue-400',
        'Shipped': 'text-purple-400 bg-purple-400/10 border-purple-400',
        'Delivered': 'text-green-400 bg-green-400/10 border-green-400',
    };
    
    const icons: Record<string, React.ReactNode> = {
        'Pending': <Clock size={12}/>,
        'Processing': <Box size={12}/>,
        'Shipped': <Truck size={12}/>,
        'Delivered': <CheckCircle size={12}/>,
    };

    return (
        <span className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] uppercase font-bold ${colors[status] || colors['Pending']}`}>
            {icons[status]} {status}
        </span>
    );
};

export const OrdersModal: React.FC<OrdersModalProps> = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-cyber-card w-full max-w-3xl border border-cyber-border rounded-xl shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh]"
      >
        <div className="p-4 border-b border-cyber-border bg-cyber-bg flex justify-between items-center">
            <h2 className="font-mono font-bold text-xl text-white flex items-center gap-2">
                <Package size={24} className="text-cyber-purple"/> YOUR ORDERS
            </h2>
            <button onClick={onClose} className="text-cyber-muted hover:text-white">
                <X size={24}/>
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-cyber-bg/50 space-y-4">
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-cyber-muted">
                    <Package size={48} className="mb-4 opacity-20"/>
                    <p>No orders found.</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="bg-cyber-card border border-cyber-border rounded-lg p-4 hover:border-cyber-accent/30 transition-colors">
                        <div className="flex justify-between items-start mb-4 border-b border-cyber-border/50 pb-2">
                            <div>
                                <div className="font-mono font-bold text-white text-sm">Order #{order.id}</div>
                                <div className="text-xs text-cyber-muted">{order.date}</div>
                            </div>
                            <div className="text-right">
                                <StatusBadge status={order.status}/>
                                <div className="text-xs font-mono text-cyber-muted mt-1">TX: {order.txHash.substring(0,8)}...</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {order.items.map((item) => (
                                <div key={item.cartId} className="flex items-center gap-3">
                                    <img src={item.imageUrl} className="w-8 h-8 rounded object-cover opacity-80"/>
                                    <div className="flex-1">
                                        <div className="text-sm text-cyber-text font-bold">{item.name}</div>
                                        <div className="text-xs text-cyber-muted">{item.selectedTier.amount} x {item.quantity}</div>
                                    </div>
                                    <div className="font-mono text-white text-sm">${item.selectedTier.price * item.quantity}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-2 border-t border-cyber-border/50 flex justify-between items-center">
                            <span className="text-xs text-cyber-muted font-bold uppercase">Total Paid</span>
                            <span className="font-mono font-bold text-lg text-cyber-accent">${order.total}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
      </motion.div>
    </div>
  );
};
