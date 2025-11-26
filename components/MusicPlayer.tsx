import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, AlertCircle } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Royalty-free Indian Sitar/Ambient Track
  // Source: Pixabay - "Meditative Sitar"
  const musicUrl = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; 

  const togglePlay = async () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                // Reset error state before trying
                setHasError(false);
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Audio playback failed:", error);
                setIsPlaying(false);
                // Only set error if it wasn't just an abort/pause interrupt
                if (audioRef.current.error) {
                   setHasError(true);
                }
            }
        }
    }
  };

  useEffect(() => {
      if(audioRef.current) {
          audioRef.current.volume = 0.5; // Set default volume to 50%
      }
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-center gap-2">
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        playsInline
        onError={() => {
            console.error("Audio source failed to load");
            setHasError(true);
            setIsPlaying(false);
        }}
      />
      
      {/* Visual Equalizer Effect */}
      {isPlaying && (
          <div className="flex gap-1 h-4 items-end mb-1">
              <div className="w-1 bg-f-pink animate-[bounce_1s_infinite] h-2"></div>
              <div className="w-1 bg-f-orange animate-[bounce_1.2s_infinite] h-4"></div>
              <div className="w-1 bg-f-pink animate-[bounce_0.8s_infinite] h-3"></div>
          </div>
      )}

      {hasError && (
          <span className="text-[10px] text-white bg-red-500/90 px-2 py-1 rounded mb-1 shadow-sm backdrop-blur-md">
             Stream Error
          </span>
      )}

      <button 
        onClick={togglePlay}
        disabled={hasError}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-f-pink/30 transition-all hover:scale-110 hover:shadow-f-pink/50 backdrop-blur-md ${
            isPlaying 
            ? 'bg-f-pink text-white animate-pulse shadow-f-pink/40' 
            : hasError 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed border-gray-500' 
                : 'bg-f-blue/80 text-f-pink glass'
        }`}
        title={hasError ? "Music Unavailable" : (isPlaying ? "Pause Music" : "Play Music")}
      >
        {isPlaying ? <Pause size={24} fill="currentColor" /> : (hasError ? <AlertCircle size={24}/> : <Music size={24} />)}
      </button>
    </div>
  );
};