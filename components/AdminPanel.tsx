import React, { useState } from 'react';
import { Settings, X, Lock, LogOut, Palette } from 'lucide-react';
import { Theme } from '../types';

interface AdminPanelProps {
  isAdmin: boolean;
  onLogin: (status: boolean) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isAdmin, onLogin, currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (password === 'Bhagesh@9797') {
=======
    if (password === 'admin' || password === 'siddharamswapna') {
>>>>>>> cbdda10 (QR)
      onLogin(true);
      setPassword('');
      setIsOpen(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    onLogin(false);
    setIsOpen(false);
  };

  const themes: { id: Theme; color: string; label: string; light?: boolean }[] = [
    { id: 'default', color: '#D946EF', label: 'Neon Rich' },
    { id: 'elegant', color: '#FDFBF7', label: 'White & Gold', light: true },
    { id: 'royal', color: '#7f1d1d', label: 'Royal Red' },
    { id: 'ocean', color: '#0ea5e9', label: 'Deep Ocean' },
    { id: 'forest', color: '#14532d', label: 'Dark Forest' },
    { id: 'sunset', color: '#f43f5e', label: 'Sunset' },
    { id: 'midnight', color: '#6366f1', label: 'Midnight' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-f-pink hover:bg-f-orange text-white p-4 rounded-full shadow-lg shadow-f-purple/50 transition-all hover:scale-110"
        title="Settings"
      >
        <Settings size={24} className={isAdmin ? 'animate-spin-slow' : ''} />
      </button>

      {/* Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-f-blue border-2 border-f-pink/30 rounded-xl p-6 w-full max-w-sm shadow-2xl relative animate-fade-in-up">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-f-white/60 hover:text-f-white"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl text-f-white mb-6 flex items-center gap-2">
              {isAdmin ? <Palette size={24} className="text-f-orange"/> : <Lock size={24} className="text-f-pink"/>}
              {isAdmin ? 'Website Settings' : 'Admin Login'}
            </h2>

            {!isAdmin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input 
                    type="password" 
                    className="w-full bg-black/20 border border-f-pink/30 focus:border-f-pink rounded px-4 py-3 text-f-white outline-none"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                  {error && <p className="text-f-orange text-sm mt-1">Incorrect password</p>}
                </div>
                <button type="submit" className="w-full bg-f-pink hover:bg-f-orange text-white font-bold py-3 rounded transition-colors">
                  LOGIN
                </button>
<<<<<<< HEAD
=======
                <p className="text-center text-xs text-f-white/60">(Try: admin)</p>
>>>>>>> cbdda10 (QR)
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-f-white/60 uppercase tracking-wider mb-3">Color Theme</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => onThemeChange(t.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded border transition-all ${
                          currentTheme === t.id 
                            ? 'border-f-orange bg-f-orange/20 text-f-white' 
                            : 'border-transparent bg-black/20 text-f-white/60 hover:bg-black/40'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border ${t.light ? 'border-gray-500' : 'border-transparent'}`} style={{ background: t.color }}></span>
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-f-pink/10">
                   <p className="text-sm text-f-white/80 mb-4">
                     You are logged in. You can now:
                   </p>
                   <ul className="text-sm text-f-white/60 space-y-2 list-disc pl-5 mb-6">
                     <li>Edit text by clicking on it</li>
                     <li>Add/Remove Timeline events</li>
                     <li>Change Hero background</li>
                     <li>Moderate photos</li>
                   </ul>

                   <button 
                     onClick={handleLogout}
                     className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-red-600 text-white py-2 rounded transition-colors text-sm font-bold uppercase"
                   >
                     <LogOut size={16} /> Logout
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> cbdda10 (QR)
