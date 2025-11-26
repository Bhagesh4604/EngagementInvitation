import React from 'react';
import { Ornament } from './Ornament';
import { Editable } from './Editable';
import { SiteContent } from '../types';
import { Camera, Trash2 } from 'lucide-react';

interface HeroProps {
  content: SiteContent;
  onUpdate: (field: keyof SiteContent, value: string) => void;
  onResetBg: () => void;
  isAdmin: boolean;
}

export const Hero: React.FC<HeroProps> = ({ content, onUpdate, onResetBg, isAdmin }) => {
  
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate('heroBgUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden group">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url('${content.heroBgUrl}')` }}
      ></div>
      {/* Gradient adapts: Deep in dark mode, White in elegant mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-f-purple/90 via-f-blue/70 to-f-purple/95 transition-colors duration-500"></div>
      
      {/* Admin BG Controls */}
      {isAdmin && (
        <div className="absolute top-24 right-4 z-30 flex flex-col gap-2">
           <div className="flex gap-2">
             <input type="file" id="hero-bg-upload" className="hidden" accept="image/*" onChange={handleBgUpload}/>
             <label htmlFor="hero-bg-upload" className="cursor-pointer bg-f-blue/80 text-f-white p-2 rounded-full hover:bg-f-pink transition-colors flex items-center gap-2 shadow-lg backdrop-blur-md border border-f-pink/30">
               <Camera size={20} /> <span className="text-xs font-bold uppercase pr-2">Change BG</span>
             </label>
             <button 
                onClick={onResetBg}
                className="bg-red-600/80 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg backdrop-blur-md"
                title="Reset Background"
             >
                <Trash2 size={20} />
             </button>
           </div>
        </div>
      )}

      {/* Decorative Border Frame */}
      <div className="absolute inset-4 md:inset-8 border-2 border-f-pink/30 pointer-events-none rounded-lg z-10 flex flex-col justify-between">
         <Ornament className="opacity-80" color="fill-f-pink" />
         <Ornament className="opacity-80" color="fill-f-pink" rotate />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        <div className="font-serif text-f-pink uppercase tracking-widest text-sm md:text-base mb-4 drop-shadow-md text-glow">
          <Editable 
            text={content.heroSubtitle} 
            isEditing={isAdmin} 
            onSave={(val) => onUpdate('heroSubtitle', val)}
          />
        </div>
        
        {/* Main Title: Using text-f-white ensures it is dark in Elegant theme and white in others */}
        <h1 className="font-script text-7xl md:text-9xl text-f-white mb-2 leading-tight drop-shadow-lg text-glow flex flex-col md:flex-row items-center justify-center gap-4 transition-colors">
          <Editable 
            text={content.heroTitle1} 
            isEditing={isAdmin} 
            onSave={(val) => onUpdate('heroTitle1', val)}
            className="inline-block"
          />
          <span className="text-f-orange text-5xl md:text-7xl align-middle mx-2">&</span>
          <Editable 
            text={content.heroTitle2} 
            isEditing={isAdmin} 
            onSave={(val) => onUpdate('heroTitle2', val)}
            className="inline-block"
          />
        </h1>

        <div className="font-serif text-f-white/90 text-lg md:text-2xl italic max-w-2xl mx-auto drop-shadow-md transition-colors">
             We invite you to celebrate our engagement and the beginning of our forever.
        </div>

        <div className="py-8">
            <div className="inline-block border-y-2 border-f-orange py-4 px-8 backdrop-blur-md bg-f-blue/30 rounded-lg glass shadow-lg shadow-f-orange/10">
                <div className="font-sans text-xl md:text-3xl font-bold text-f-pink tracking-wide text-glow">
                    <Editable 
                        text={content.heroDate} 
                        isEditing={isAdmin} 
                        onSave={(val) => onUpdate('heroDate', val)}
                    />
                </div>
                <div className="font-serif text-lg text-f-white mt-1 transition-colors">
                    <Editable 
                        text={content.heroVenue} 
                        isEditing={isAdmin} 
                        onSave={(val) => onUpdate('heroVenue', val)}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};