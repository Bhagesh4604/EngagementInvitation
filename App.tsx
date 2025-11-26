import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Ornament, MandalaPattern } from './components/Ornament';
import { Gallery } from './components/Gallery';
import { generateICSFile } from './utils';
import { MapPin, Calendar, Clock, Heart, Phone, Mail, Music, ExternalLink } from 'lucide-react';

export default function App() {
  return (
    <div className="font-sans text-stone-700 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* About The Couple */}
      <Section id="story" className="text-center relative">
        <MandalaPattern className="top-0 left-0 -translate-x-1/2 -translate-y-1/4" />
        <Ornament className="mb-8" />
        <h2 className="font-serif text-4xl md:text-5xl text-maroon-800 mb-6">Our Story</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-stone-600">
            <p>
                In the heart of tradition and family values, our paths crossed. What began as a meeting arranged by our elders blossomed into a connection grounded in mutual respect, shared dreams, and laughter.
            </p>
            <p>
                Siddharam, with his calm demeanor, and Swapna, with her vibrant spirit, found in each other a perfect balance. Now, with hearts full of gratitude, we are ready to take the first step towards our forever.
            </p>
            <div className="flex justify-center py-4 text-maroon-800">
                <Heart fill="currentColor" size={32} />
            </div>
        </div>
        <Ornament className="mt-8" rotate />
        <MandalaPattern className="bottom-0 right-0 translate-x-1/2 translate-y-1/4" />
      </Section>

      {/* Event Details */}
      <Section id="event" bgClass="bg-red-50" className="text-center">
        <h2 className="font-serif text-4xl text-maroon-800 mb-12">The Celebration</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border-b-4 border-gold-400 transform hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-maroon-800">
                    <Calendar size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">When</h3>
                <p className="text-stone-600">Monday, December 15, 2025</p>
                <button 
                    onClick={generateICSFile}
                    className="mt-4 text-sm font-bold text-gold-600 hover:text-gold-700 underline"
                >
                    Add to Calendar
                </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-b-4 border-gold-400 transform hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-maroon-800">
                    <MapPin size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Where</h3>
                <p className="text-stone-600">IK Royal Function Hall</p>
                <p className="text-stone-500 text-sm">Almel, Karnataka</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-b-4 border-gold-400 transform hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-maroon-800">
                    <Clock size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Time</h3>
                <p className="text-stone-600">6:00 PM Onwards</p>
                <p className="text-stone-500 text-sm mt-2 font-serif italic">Dress Code: Traditional / Festive</p>
            </div>
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" className="max-w-4xl mx-auto">
         <h2 className="font-serif text-4xl text-maroon-800 text-center mb-16">Itinerary</h2>
         <div className="relative border-l-2 border-gold-300 ml-6 md:ml-1/2 space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-maroon-800 rounded-full border-4 border-white shadow-sm z-10"></div>
                <div className="md:w-5/12 md:text-right md:pr-12">
                   <h3 className="font-serif text-2xl text-maroon-800">Arrival & Welcome</h3>
                   <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold mt-2">6:00 PM</span>
                </div>
                <div className="md:hidden mt-2 mb-1 w-8 h-8 flex items-center justify-center bg-orange-50 rounded-full text-maroon-800">
                   <Music size={16}/>
                </div>
                <div className="md:w-5/12 md:pl-12 text-stone-600">
                    Guests arrive. Welcome drinks and snacks will be served accompanied by Shehnai music.
                </div>
            </div>

             {/* Timeline Item 2 */}
             <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-maroon-800 rounded-full border-4 border-white shadow-sm z-10"></div>
                <div className="md:w-5/12 md:text-right md:pr-12 md:order-1">
                     <div className="md:hidden">
                        <h3 className="font-serif text-2xl text-maroon-800">Ring Ceremony</h3>
                        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold mt-2">7:00 PM</span>
                    </div>
                     <div className="hidden md:block text-stone-600">
                        The auspicious moment where we exchange rings and seek blessings from our elders.
                    </div>
                </div>
                <div className="md:w-5/12 md:pl-12 md:order-2">
                    <div className="hidden md:block">
                        <h3 className="font-serif text-2xl text-maroon-800">Ring Ceremony</h3>
                        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold mt-2">7:00 PM</span>
                    </div>
                     <div className="md:hidden text-stone-600 mt-2">
                         The auspicious moment where we exchange rings and seek blessings from our elders.
                    </div>
                </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-maroon-800 rounded-full border-4 border-white shadow-sm z-10"></div>
                <div className="md:w-5/12 md:text-right md:pr-12">
                   <h3 className="font-serif text-2xl text-maroon-800">Dinner & Photos</h3>
                   <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold mt-2">8:30 PM</span>
                </div>
                <div className="md:w-5/12 md:pl-12 text-stone-600">
                    A traditional vegetarian feast followed by a photo session with the couple.
                </div>
            </div>

         </div>
      </Section>

      {/* Venue & Map */}
      <Section className="bg-white rounded-lg shadow-xl p-0 overflow-hidden max-w-6xl mx-auto border border-stone-200">
        <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center bg-stone-50">
                <h2 className="font-serif text-3xl text-maroon-800 mb-6">Getting There</h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <MapPin className="text-gold-500 mt-1 mr-4 shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg">IK Royal Function Hall</h4>
                            <p className="text-stone-600">Main Road, Almel</p>
                            <p className="text-stone-600">Karnataka, India</p>
                            
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=IK+Royal+Function+Hall,+Almel,+Karnataka"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-maroon-800 font-bold hover:text-gold-600 transition-colors text-sm uppercase tracking-wider group"
                            >
                                <span className="border-b-2 border-maroon-800 group-hover:border-gold-600 pb-0.5">Get Directions</span>
                                <ExternalLink size={14} />
                            </a>

                        </div>
                    </div>
                    <p className="text-sm text-stone-500 italic mt-4 pl-10">
                        Ample parking is available at the venue.
                    </p>
                </div>
            </div>
            <div className="h-64 md:h-auto bg-stone-200 min-h-[300px]">
                {/* Embed Google Maps */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.077285328409!2d76.123456!3d17.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA3JzM0LjQiTiA3NsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Venue Map"
                ></iframe>
            </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="text-center">
        <Ornament className="mb-6" />
        <h2 className="font-serif text-4xl text-maroon-800 mb-2">Captured Moments</h2>
        <p className="text-stone-600 mb-10">A glimpse into our journey so far.</p>
        <Gallery />
      </Section>

      {/* Guestbook */}
      <Section bgClass="bg-red-50" className="text-center max-w-3xl">
         <h2 className="font-serif text-3xl text-maroon-800 mb-8">Wishes & Blessings</h2>
         <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <div className="space-y-6 text-left">
                {/* Mock Comments */}
                <div className="border-b border-stone-100 pb-4">
                    <p className="font-serif italic text-lg text-stone-700">"Congratulations Siddharam & Swapna! Wishing you a lifetime of happiness."</p>
                    <p className="text-xs font-bold text-maroon-800 mt-2 uppercase tracking-wide">— Rajesh & Family</p>
                </div>
                <div className="border-b border-stone-100 pb-4">
                    <p className="font-serif italic text-lg text-stone-700">"So happy for you both! Can't wait to celebrate."</p>
                    <p className="text-xs font-bold text-maroon-800 mt-2 uppercase tracking-wide">— Priya K.</p>
                </div>
            </div>
            <div className="mt-8 pt-4">
                <textarea className="w-full bg-stone-50 border border-stone-200 rounded p-4 text-sm focus:border-gold-400 outline-none transition-colors" rows={3} placeholder="Leave a message for the couple..."></textarea>
                <button className="mt-4 px-6 py-2 bg-maroon-800 text-white font-serif text-sm tracking-widest hover:bg-maroon-900 transition-colors">SEND WISHES</button>
            </div>
         </div>
      </Section>

      {/* Footer */}
      <footer className="bg-maroon-900 text-gold-100 py-16 relative overflow-hidden">
        <MandalaPattern className="opacity-10 top-0 left-0 w-64 h-64" />
        <MandalaPattern className="opacity-10 bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-script text-5xl mb-6">Siddharam & Swapna</h2>
            <p className="font-serif text-lg mb-8 tracking-wide">We look forward to celebrating with you!</p>
            
            <div className="flex justify-center gap-8 mb-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center">
                        <Phone size={16} />
                    </div>
                    <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center">
                        <Mail size={16} />
                    </div>
                    <span className="text-sm">hello@siddharamswapna.com</span>
                </div>
            </div>

            <Ornament color="fill-gold-500" className="opacity-50 mb-8" />
            
            <p className="text-xs text-gold-200/60 uppercase tracking-widest">
                © 2025 Siddharam & Swapna. Made with Love.
            </p>
        </div>
      </footer>
    </div>
  );
}