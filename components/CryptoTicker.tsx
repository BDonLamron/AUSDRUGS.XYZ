import React, { useEffect, useState } from 'react';
import { getCryptoNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { Globe } from 'lucide-react';

export const CryptoTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getCryptoNews();
      setNews(data);
    };
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="bg-black border-b border-cyber-border overflow-hidden h-8 flex items-center relative z-20">
      <div className="bg-cyber-accent text-black px-3 h-full flex items-center text-[10px] font-bold z-10">
        <Globe size={12} className="mr-1"/> LIVE INTEL
      </div>
      <div className="flex whitespace-nowrap animate-marquee">
        {news.concat(news).map((item, i) => (
          <span key={i} className="text-[10px] font-mono text-cyber-muted mx-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-cyber-purple rounded-full mr-2 animate-pulse"></span>
            <span className="text-white font-bold mr-1">{item.source}:</span> {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};