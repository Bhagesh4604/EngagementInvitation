import React from 'react';
import { Ornament } from './Ornament';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621621667797-e06afc21085c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 via-white/70 to-orange-50/90"></div>
      
      {/* Decorative Border Frame */}
      <div className="absolute inset-4 md:inset-8 border-2 border-gold-300 pointer-events-none rounded-lg z-10 flex flex-col justify-between">
         <Ornament className="opacity-80" />
         <Ornament className="opacity-80" rotate />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        <p className="font-serif text-maroon-800 uppercase tracking-widest text-sm md:text-base mb-4">
          With the blessings of our families
        </p>
        
        <h1 className="font-script text-7xl md:text-9xl text-maroon-800 mb-2 leading-tight">
          Siddharam <span className="text-gold-500 text-5xl md:text-7xl align-middle mx-2">&</span> Swapna
        </h1>

        <p className="font-serif text-stone-700 text-lg md:text-2xl italic max-w-2xl mx-auto">
          We invite you to celebrate our engagement and the beginning of our forever.
        </p>

        <div className="py-8">
            <div className="inline-block border-y-2 border-gold-400 py-4 px-8">
                <p className="font-sans text-xl md:text-3xl font-bold text-maroon-900 tracking-wide">
                    DECEMBER 15, 2025
                </p>
                <p className="font-serif text-lg text-stone-600 mt-1">
                    IK Royal Function Hall, Almel
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};