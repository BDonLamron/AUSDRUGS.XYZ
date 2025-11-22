import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MapPin } from 'lucide-react';

const LOCATIONS = [
  "Sydney, NSW", "Melbourne, VIC", "Brisbane, QLD", "Perth, WA", 
  "Adelaide, SA", "Canberra, ACT", "Hobart, TAS", "Darwin, NT"
];

const PRODUCTS = ["Nebula Haze", "Blue Dream", "OG Kush", "White Widow", "Pineapple Express"];
const MESSAGES = ["purchased", "ordered", "bought"];

interface Activity {
  id: string;
  text: string;
  location: string;
  product: string;
}

export const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const addActivity = () => {
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      const name = "User" + Math.floor(Math.random() * 1000); 

      const newActivity = {
        id: Math.random().toString(36).substr(2, 9),
        text: `${name} ${message}`,
        location: location,
        product: product
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 3));
    };

    addActivity();
    const interval = setInterval(() => {
        if (Math.random() > 0.5) {
            addActivity();
        }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 w-64 font-sans text-xs pointer-events-none hidden md:block">
        <div className="space-y-2">
            <AnimatePresence>
                {activities.map((activity) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/90 backdrop-blur border-l-4 border-peep-pink p-2 shadow-sm flex items-start gap-2"
                    >
                        <div className="mt-0.5 text-gray-400">
                           <ShoppingCart size={12} />
                        </div>
                        <div>
                             <p className="text-gray-600 leading-tight">
                                <span className="text-peep-dark font-bold">{activity.product}</span>
                             </p>
                             <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                <MapPin size={8} /> {activity.location}
                             </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
  );
};