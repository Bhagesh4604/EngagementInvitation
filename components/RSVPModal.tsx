import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Guest } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Guest>({
    name: '',
    email: '',
    count: 1,
    diet: 'veg',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl p-8 border-t-4 border-gold-400 animate-fade-in-up">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-stone-400 hover:text-maroon-800 transition-colors"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="font-serif text-3xl text-maroon-800 text-center mb-2">Will You Join Us?</h2>
            <p className="text-center text-stone-500 mb-8 font-sans">Please kindly respond by Dec 1st, 2025</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border-b-2 border-stone-200 focus:border-maroon-800 outline-none py-2 bg-transparent transition-colors"
                  placeholder="Guest Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border-b-2 border-stone-200 focus:border-maroon-800 outline-none py-2 bg-transparent transition-colors"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Guests</label>
                  <select 
                    className="w-full border-b-2 border-stone-200 focus:border-maroon-800 outline-none py-2 bg-transparent"
                    value={formData.count}
                    onChange={e => setFormData({...formData, count: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Meal Preference</label>
                    <select 
                        className="w-full border-b-2 border-stone-200 focus:border-maroon-800 outline-none py-2 bg-transparent"
                        value={formData.diet}
                        onChange={e => setFormData({...formData, diet: e.target.value as 'veg' | 'non-veg'})}
                    >
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Message for the Couple</label>
                <textarea 
                  rows={3} 
                  className="w-full border-b-2 border-stone-200 focus:border-maroon-800 outline-none py-2 bg-transparent resize-none"
                  placeholder="Your blessings..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-maroon-800 text-white py-3 mt-4 font-serif text-lg tracking-widest hover:bg-maroon-900 transition-colors shadow-md"
              >
                CONFIRM ATTENDANCE
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Check size={32} />
            </div>
            <h3 className="text-2xl font-serif text-maroon-800 mb-2">Thank You!</h3>
            <p className="text-stone-600">Your RSVP has been received. We can't wait to see you there!</p>
            <button 
                onClick={onClose}
                className="mt-6 text-sm font-bold text-maroon-800 border-b border-maroon-800 pb-1 hover:text-maroon-600"
            >
                Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
