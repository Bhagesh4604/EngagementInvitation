import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Event', href: '#event' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md py-2 backdrop-blur-sm' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`font-script text-3xl md:text-4xl text-maroon-800 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          S & S
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-stone-800 hover:text-maroon-800 font-serif uppercase tracking-widest text-sm font-semibold transition-colors border-b-2 border-transparent hover:border-gold-400 pb-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-maroon-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.label} 
            href={link.href} 
            className="text-2xl font-serif text-maroon-800 hover:text-gold-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};