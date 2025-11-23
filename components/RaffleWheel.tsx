
import React, { useRef, useEffect, useState } from 'react';
import { Trophy, Ticket, Sparkles } from 'lucide-react';

export const RaffleWheel: React.FC<{rafflePot: number, tickets: number, onBuyTicket: any, onSpin: any}> = ({ rafflePot, tickets, onBuyTicket, onSpin }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [free, setFree] = useState(true);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const colors = ['#f43f5e', '#000', '#22d3ee', '#000', '#fbbf24', '#000', '#d946ef', '#000'];
    ctx.clearRect(0, 0, 200, 200);
    for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.fillStyle = colors[i]; ctx.moveTo(100, 100); ctx.arc(100, 100, 90, (rotation + i * Math.PI/4), (rotation + (i+1) * Math.PI/4)); ctx.lineTo(100, 100); ctx.fill();
    }
    ctx.beginPath(); ctx.arc(100, 100, 20, 0, Math.PI*2); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(130, 100); ctx.lineTo(150, 90); ctx.lineTo(150, 110); ctx.fillStyle = '#fbbf24'; ctx.fill();
  }, [rotation]);

  const spin = () => {
      if (isSpinning) return;
      if (!free) onBuyTicket();
      setIsSpinning(true); setFree(false); onSpin();
      let v = 0.8, r = rotation;
      const loop = () => { v *= 0.98; r += v; setRotation(r); if (v > 0.005) requestAnimationFrame(loop); else setIsSpinning(false); };
      loop();
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded p-4 flex flex-col items-center relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 z-10 text-white font-bold font-mono text-sm"><Trophy size={16} className="text-cyber-gold"/> DAILY RAFFLE</div>
        <canvas ref={canvasRef} width={200} height={200} className="rounded-full border-4 border-cyber-card shadow-2xl mb-4 z-10"/>
        <div className="text-center z-10 mb-3"><p className="text-[10px] text-cyber-muted">POOL</p><p className="text-xl font-bold text-cyber-gold font-mono">${rafflePot}</p></div>
        <button onClick={spin} disabled={isSpinning} className={`w-full py-2 rounded font-bold text-sm z-10 flex justify-center gap-2 ${isSpinning ? 'bg-cyber-border text-cyber-muted' : 'bg-cyber-accent text-black'}`}>{isSpinning ? '...' : free ? <><Sparkles size={14}/> FREE SPIN</> : <><Ticket size={14}/> BUY $5</>}</button>
    </div>
  );
};
