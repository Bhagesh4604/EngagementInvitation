import React, { useState } from 'react';
import { X } from 'lucide-react';

const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=800&auto=format&fit=crop"
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, idx) => (
        <div 
            key={idx} 
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative shadow-md"
            onClick={() => setSelectedImage(img)}
        >
            <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/20 transition-colors z-10"></div>
            <img 
                src={img} 
                alt={`Gallery ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />
        </div>
      ))}

      {selectedImage && (
        <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
        >
            <button className="absolute top-4 right-4 text-white hover:text-gold-400">
                <X size={40} />
            </button>
            <img 
                src={selectedImage} 
                alt="Full size" 
                className="max-w-full max-h-[90vh] rounded-sm border-4 border-white shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
            />
        </div>
      )}
    </div>
  );
};
