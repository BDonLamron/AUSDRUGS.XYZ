
import React from 'react';
export const RGBBackground: React.FC<{matrixMode?: boolean}> = ({ matrixMode }) => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#09090b]">
     <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] ${matrixMode ? 'opacity-80 animate-pulse' : 'opacity-100'}`}></div>
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)]"></div>
     <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-accent to-transparent opacity-50"></div>
     {matrixMode && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/matrix-code.png')] opacity-20 animate-pulse pointer-events-none mix-blend-screen"></div>}
  </div>
);
