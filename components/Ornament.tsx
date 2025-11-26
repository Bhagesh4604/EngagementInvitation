import React from 'react';

interface OrnamentProps {
  className?: string;
  color?: string;
  rotate?: boolean;
}

export const Ornament: React.FC<OrnamentProps> = ({ className = "", color = "fill-gold-400", rotate = false }) => {
  return (
    <div className={`flex justify-center items-center w-full py-6 ${className} ${rotate ? 'rotate-180' : ''}`}>
      <svg width="200" height="40" viewBox="0 0 200 40" className={`${color}`} xmlns="http://www.w3.org/2000/svg">
         <path d="M100,35 C80,35 70,20 50,20 C30,20 20,35 0,35 V38 H200 V35 C180,35 170,20 150,20 C130,20 120,35 100,35 Z" opacity="0.6"/>
         <circle cx="100" cy="20" r="5" />
         <circle cx="50" cy="20" r="3" />
         <circle cx="150" cy="20" r="3" />
         <path d="M100 10 L105 15 L100 20 L95 15 Z" />
         <path d="M10 20 Q30 5 50 20 T90 20 T100 10 T110 20 T150 20 T190 20" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-current" />
      </svg>
    </div>
  );
};

export const MandalaPattern: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={`absolute opacity-10 pointer-events-none ${className}`} width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#8B0000" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="0.5"/>
        <path d="M50 10 L55 30 L50 35 L45 30 Z" fill="#D4AF37"/>
        <path d="M50 90 L55 70 L50 65 L45 70 Z" fill="#D4AF37"/>
        <path d="M90 50 L70 55 L65 50 L70 45 Z" fill="#D4AF37"/>
        <path d="M10 50 L30 55 L35 50 L30 45 Z" fill="#D4AF37"/>
        <circle cx="50" cy="50" r="10" stroke="#8B0000" strokeWidth="0.5"/>
    </svg>
);
