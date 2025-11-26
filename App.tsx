import React, { useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Ornament, MandalaPattern } from './components/Ornament';
import { Gallery } from './components/Gallery';
import { generateICSFile } from './utils';
import { MapPin, Calendar, Clock, Heart, Phone, Mail, Music, ExternalLink, Download, Trash2, Plus, PenSquare } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AdminPanel } from './components/AdminPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { SiteContent, Wish, Theme, TimelineItem } from './types';
import { Editable } from './components/Editable';
import { QRCodePage } from './components/QRCodePage';
import { QRCodeSVG } from 'qrcode.react';
import { api } from './api';

export default function App() {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [route, setRoute] = useState('/');
  
  const [theme, setTheme] = useState<Theme>('elegant');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  
  const [newWish, setNewWish] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [contentData, timelineData, wishesData] = await Promise.all([
        api.getContent(),
        api.getTimeline(),
        api.getWishes(),
      ]);
      setContent(contentData);
      setTimelineItems(timelineData);
      setWishes(wishesData);
      if (contentData && contentData.theme) {
        setTheme(contentData.theme);
        document.documentElement.setAttribute('data-theme', contentData.theme);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    setRoute(window.location.pathname);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle Theme Change
  const handleThemeChange = async (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (content) {
      const newContent = { ...content, theme: newTheme };
      setContent(newContent);
      await api.updateContent(newContent);
    }
  };

  // Handle Content Update
  const handleContentUpdate = async (field: keyof SiteContent, value: string) => {
    if (!content) return;
    const newContent = { ...content, [field]: value };
    setContent(newContent);
    await api.updateContent(newContent);
  };

  const resetHeroBg = async () => {
      if (!content) return;
      const newContent = { ...content, heroBgUrl: 'https://images.unsplash.com/photo-1621621667797-e06afc21085c?q=80&w=2000&auto=format&fit=crop' };
      setContent(newContent);
      await api.updateContent(newContent);
  };

  // Handle Timeline Updates
  const updateTimelineItem = async (id: number, field: keyof TimelineItem, value: string) => {
      const newTimelineItems = timelineItems.map(item => item.id === id ? { ...item, [field]: value } : item);
      setTimelineItems(newTimelineItems);
      const itemToUpdate = newTimelineItems.find(item => item.id === id);
      if(itemToUpdate) {
          await api.updateTimelineItem(id, itemToUpdate);
      }
  };

  const deleteTimelineItem = async (id: number) => {
      setTimelineItems(prev => prev.filter(item => item.id !== id));
      await api.deleteTimelineItem(id);
  };

  const addTimelineItem = async () => {
      const newItem: Omit<TimelineItem, 'id'> = {
          time: '00:00 PM',
          title: 'New Event',
          description: 'Description of the event.'
      };
      const addedItem = await api.addTimelineItem(newItem);
      setTimelineItems(prev => [...prev, addedItem]);
  };

  // Handle Wish Actions
  const addWish = async () => {
    if (!newWish.trim()) return;
    const wish: Omit<Wish, 'id' | 'timestamp'> = {
      author: 'Guest',
      message: newWish,
    };
    const addedWish = await api.addWish(wish);
    setWishes(prev => [addedWish, ...prev]);
    setNewWish('');
  };

  const deleteWish = async (id: number) => {
    setWishes(prev => prev.filter(w => w.id !== id));
    await api.deleteWish(id);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
        const canvas = await html2canvas(printRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim(),
            logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('Siddharam-Swapna-Invitation.pdf');
    } catch (err) {
        console.error("PDF generation failed", err);
        alert("Could not generate PDF. Please try again.");
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  if (route === '/qr') {
    return <QRCodePage />;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-f-white bg-f-purple min-h-screen transition-colors duration-500">
      <Header />
      <MusicPlayer />
      
      <AdminPanel 
        isAdmin={isAdmin} 
        onLogin={setIsAdmin} 
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Hidden Invitation Card for PDF Generation (Dynamic) */}
      <div className="fixed -left-[9999px] top-0">
        <div ref={printRef} className="w-[800px] h-[1120px] bg-f-purple text-f-white relative overflow-hidden flex flex-col items-center justify-between p-16 border-[20px] border-f-blue">
            <div className="absolute inset-0 border-[4px] border-f-pink m-6 rounded-3xl pointer-events-none"></div>
            <MandalaPattern className="opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] scale-150" />
            
            <div className="relative z-10 w-full flex flex-col items-center pt-8">
                <Ornament color="fill-f-orange" />
                <p className="font-serif text-f-pink uppercase tracking-[0.2em] text-lg mt-8 mb-4 text-f-white">
                    {content.heroSubtitle}
                </p>
                <p className="font-serif text-f-white text-xl italic mb-12">
                    We cordially invite you to the engagement of
                </p>
                
                <h1 className="font-script text-[100px] leading-tight text-f-white mb-4">
                    {content.heroTitle1}
                </h1>
                <div className="font-serif text-4xl text-f-orange my-2">&</div>
                <h1 className="font-script text-[100px] leading-tight text-f-white mt-4 mb-12">
                    {content.heroTitle2}
                </h1>
            </div>

            <div className="relative z-10 w-full text-center space-y-8">
                <div className="inline-block border-y-2 border-f-pink py-6 px-12 bg-f-blue/20 backdrop-blur-sm rounded-xl">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <Calendar size={32} className="text-f-orange"/>
                        <p className="font-sans text-4xl font-bold text-f-white tracking-wide">
                            {content.heroDate}
                        </p>
                    </div>
                </div>

                <div className="flex justify-around w-full max-w-lg mx-auto mt-8">
                     <div className="text-center">
                         <Clock size={32} className="text-f-orange mx-auto mb-2" />
                         <p className="font-serif text-2xl">{content.eventTime}</p>
                     </div>
                     <div className="text-center">
                         <MapPin size={32} className="text-f-orange mx-auto mb-2" />
                         <p className="font-serif text-2xl max-w-[200px]">{content.eventVenueTitle}</p>
                     </div>
                </div>
            </div>

            <div className="relative z-10 w-full text-center pb-8">
                 <p className="font-script text-4xl text-f-pink mb-6">We look forward to celebrating with you!</p>
                 <Ornament color="fill-f-orange" rotate />
            </div>
        </div>
      </div>

      {/* Hero Section (Editable) */}
      <Hero content={content} onUpdate={handleContentUpdate} onResetBg={resetHeroBg} isAdmin={isAdmin} />

      {/* About The Couple */}
      <Section id="story" className="text-center relative">
        <MandalaPattern className="top-0 left-0 -translate-x-1/2 -translate-y-1/4" />
        <Ornament className="mb-8" color="fill-f-pink" />
        <h2 className="font-serif text-4xl md:text-5xl text-f-pink mb-6 text-glow">
            <Editable text={content.storyTitle} onSave={val => handleContentUpdate('storyTitle', val)} isEditing={isAdmin} />
        </h2>
        <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-f-white">
            <Editable 
                type="textarea"
                text={content.storyText} 
                onSave={val => handleContentUpdate('storyText', val)} 
                isEditing={isAdmin} 
            />
            <div className="flex justify-center py-4 text-f-orange">
                <Heart fill="currentColor" size={32} className="animate-pulse" />
            </div>
        </div>
        <Ornament className="mt-8" color="fill-f-pink" rotate />
        <MandalaPattern className="bottom-0 right-0 translate-x-1/2 translate-y-1/4" />
      </Section>

      {/* Event Details */}
      <Section id="event" bgClass="bg-f-blue/30" className="text-center">
        <h2 className="font-serif text-4xl text-f-pink mb-12 text-glow">The Celebration</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* DATE */}
            <div className="bg-f-blue p-8 rounded-lg shadow-lg border-b-4 border-f-orange transform hover:-translate-y-2 transition-transform hover:shadow-f-pink/20 glass">
                <div className="w-16 h-16 bg-f-purple rounded-full flex items-center justify-center mx-auto mb-4 text-f-orange border border-f-pink/30 shadow-inner">
                    <Calendar size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-f-white">When</h3>
                <div className="text-f-white/80">
                     <Editable text={content.eventDate} onSave={val => handleContentUpdate('eventDate', val)} isEditing={isAdmin} />
                </div>
                
                <div className="flex flex-col gap-2 mt-4">
                    <button 
                        onClick={generateICSFile}
                        className="text-sm font-bold text-f-pink hover:text-f-white underline transition-colors"
                    >
                        Add to Calendar
                    </button>
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className="flex items-center justify-center gap-2 text-sm font-bold text-f-purple bg-f-orange hover:bg-f-orange/80 py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-f-orange/20"
                    >
                        <Download size={14} />
                        {isGeneratingPdf ? 'Generating...' : 'Download Invite'}
                    </button>
                </div>
            </div>

            {/* VENUE */}
            <div className="bg-f-blue p-8 rounded-lg shadow-lg border-b-4 border-f-orange transform hover:-translate-y-2 transition-transform hover:shadow-f-pink/20 glass">
                <div className="w-16 h-16 bg-f-purple rounded-full flex items-center justify-center mx-auto mb-4 text-f-orange border border-f-pink/30 shadow-inner">
                    <MapPin size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-f-white">Where</h3>
                <div className="text-f-white/80 font-bold">
                     <Editable text={content.eventVenueTitle} onSave={val => handleContentUpdate('eventVenueTitle', val)} isEditing={isAdmin} />
                </div>
                <div className="text-f-white/60 text-sm">
                     <Editable text={content.eventVenueAddr} onSave={val => handleContentUpdate('eventVenueAddr', val)} isEditing={isAdmin} />
                </div>
            </div>

            {/* TIME */}
            <div className="bg-f-blue p-8 rounded-lg shadow-lg border-b-4 border-f-orange transform hover:-translate-y-2 transition-transform hover:shadow-f-pink/20 glass">
                <div className="w-16 h-16 bg-f-purple rounded-full flex items-center justify-center mx-auto mb-4 text-f-orange border border-f-pink/30 shadow-inner">
                    <Clock size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-f-white">Time</h3>
                <div className="text-f-white/80">
                    <Editable text={content.eventTime} onSave={val => handleContentUpdate('eventTime', val)} isEditing={isAdmin} />
                </div>
                <p className="text-f-white/60 text-sm mt-2 font-serif italic">Dress Code: Traditional / Festive</p>
            </div>
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" className="max-w-4xl mx-auto">
         <h2 className="font-serif text-4xl text-f-pink text-center mb-16 text-glow">Itinerary</h2>
         
         {isAdmin && (
             <div className="text-center mb-8">
                 <button onClick={addTimelineItem} className="inline-flex items-center gap-2 bg-f-pink px-4 py-2 rounded-full text-white font-bold hover:bg-f-orange transition-colors">
                     <Plus size={16} /> Add Event
                 </button>
             </div>
         )}

         <div className="relative border-l-2 border-f-pink/30 ml-6 md:ml-1/2 space-y-12">
            {timelineItems.map((item, index) => (
                <div key={item.id} className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-f-orange rounded-full border-4 border-f-purple shadow-sm z-10 shadow-f-orange/50"></div>
                    
                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12 md:order-2'}`}>
                       <h3 className="font-serif text-2xl text-f-white group-hover:text-f-pink transition-colors">
                           <Editable text={item.title} onSave={val => updateTimelineItem(item.id, 'title', val)} isEditing={isAdmin} />
                       </h3>
                       <div className="inline-block bg-f-blue text-f-orange px-3 py-1 rounded-full text-sm font-bold mt-2 border border-f-orange/30">
                           <Editable text={item.time} onSave={val => updateTimelineItem(item.id, 'time', val)} isEditing={isAdmin} />
                       </div>
                    </div>
                    
                    <div className="md:hidden mt-2 mb-1 w-8 h-8 flex items-center justify-center bg-f-blue rounded-full text-f-orange">
                       <Music size={16}/>
                    </div>

                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pl-12' : 'md:text-right md:pr-12 md:order-1'}`}>
                        <div className="text-f-white/80">
                            <Editable type="textarea" text={item.description} onSave={val => updateTimelineItem(item.id, 'description', val)} isEditing={isAdmin} />
                        </div>
                        {isAdmin && (
                            <button onClick={() => deleteTimelineItem(item.id)} className="mt-2 text-red-500 hover:text-red-300 text-sm flex items-center gap-1">
                                <Trash2 size={12} /> Delete Event
                            </button>
                        )}
                    </div>
                </div>
            ))}
         </div>
      </Section>

      {/* Venue & Map */}
      <Section className="bg-f-blue rounded-lg shadow-xl p-0 overflow-hidden max-w-6xl mx-auto border border-f-blue shadow-f-pink/10 glass">
        <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center bg-f-blue/80 backdrop-blur-sm">
                <h2 className="font-serif text-3xl text-f-pink mb-6">Getting There</h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <MapPin className="text-f-orange mt-1 mr-4 shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-f-white">{content.eventVenueTitle}</h4>
                            <p className="text-f-white/80">{content.eventVenueAddr}</p>
                            
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=IK+Royal+Function+Hall,+Almel,+Karnataka"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-f-pink font-bold hover:text-f-orange transition-colors text-sm uppercase tracking-wider group"
                            >
                                <span className="border-b-2 border-f-pink group-hover:border-f-orange pb-0.5">Get Directions</span>
                                <ExternalLink size={14} />
                            </a>

                        </div>
                    </div>
                    <p className="text-sm text-f-white/60 italic mt-4 pl-10">
                        Ample parking is available at the venue.
                    </p>
                </div>
            </div>
            <div className="h-64 md:h-auto bg-gray-800 min-h-[300px]">
                {/* Embed Google Maps */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.077285328409!2d76.123456!3d17.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA3JzM0LjQiTiA3NsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin&maptype=satellite" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(0.5) contrast(1.2)'}}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Venue Map"
                ></iframe>
            </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="text-center">
        <Ornament className="mb-6" color="fill-f-pink" />
        <h2 className="font-serif text-4xl text-f-pink mb-2 text-glow">Live Event Feed</h2>
        <p className="text-f-white/80 mb-10">Captured moments from the celebration.</p>
        <Gallery isAdmin={isAdmin} />
        <div className="mt-8">
            <h3 className="font-serif text-2xl text-f-pink mb-4">Share Your Photos</h3>
            <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <QRCodeSVG value={window.location.origin + '/qr'} size={128} />
                </div>
            </div>
            <p className="text-f-white/80 mt-4">Scan the QR code to upload or download photos from the event.</p>
        </div>
      </Section>

      {/* Guestbook / Wishes */}
      <Section bgClass="bg-f-blue/20" className="text-center max-w-3xl">
         <h2 className="font-serif text-3xl text-f-pink mb-8 text-glow">Wishes & Blessings</h2>
         <div className="bg-f-blue p-8 rounded-lg shadow-sm border border-f-pink/20 glass">
            <div className="space-y-6 text-left max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {wishes.map(wish => (
                    <div key={wish.id} className="border-b border-f-pink/20 pb-4 relative group">
                        <p className="font-serif italic text-lg text-f-white/90">"{wish.message}"</p>
                        <p className="text-xs font-bold text-f-orange mt-2 uppercase tracking-wide">— {wish.author}</p>
                        {isAdmin && (
                            <button 
                                onClick={() => deleteWish(wish.id)}
                                className="absolute top-0 right-0 text-gray-500 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Wish"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-4">
                <textarea 
                    value={newWish}
                    onChange={e => setNewWish(e.target.value)}
                    className="w-full bg-f-purple border border-f-pink/30 rounded p-4 text-sm text-f-white focus:border-f-orange outline-none transition-colors" 
                    rows={3} 
                    placeholder="Leave a message for the couple..."
                ></textarea>
                <button 
                    onClick={addWish}
                    className="mt-4 px-6 py-2 bg-f-pink text-white font-serif text-sm tracking-widest hover:bg-f-orange transition-colors rounded shadow-lg shadow-f-pink/20"
                >
                    SEND WISHES
                </button>
            </div>
         </div>
      </Section>

      {/* Footer */}
      <footer className="bg-f-blue text-f-white/80 py-16 relative overflow-hidden border-t border-f-purple">
        <MandalaPattern className="opacity-5 top-0 left-0 w-64 h-64" />
        <MandalaPattern className="opacity-5 bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-script text-5xl mb-6 text-f-pink text-glow">{content.heroTitle1} & {content.heroTitle2}</h2>
            <p className="font-serif text-lg mb-8 tracking-wide">We look forward to celebrating with you!</p>
            
            <div className="flex justify-center gap-8 mb-12">
                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full border border-f-orange flex items-center justify-center text-f-orange group-hover:bg-f-orange group-hover:text-white transition-colors">
                        <Phone size={16} />
                    </div>
                    <span className="text-sm">
                        <Editable text={content.contactPhone} onSave={val => handleContentUpdate('contactPhone', val)} isEditing={isAdmin} />
                    </span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full border border-f-orange flex items-center justify-center text-f-orange group-hover:bg-f-orange group-hover:text-white transition-colors">
                        <Mail size={16} />
                    </div>
                    <span className="text-sm">
                        <Editable text={content.contactEmail} onSave={val => handleContentUpdate('contactEmail', val)} isEditing={isAdmin} />
                    </span>
                </div>
            </div>

            <Ornament color="fill-f-pink" className="opacity-50 mb-8" />
            
            <p className="text-xs text-f-white/60 uppercase tracking-widest flex items-center justify-center gap-2">
                © 2025  Made by Bhagesh <Heart size={12} fill="currentColor" className="text-f-pink" />
            </p>
        </div>
      </footer>
    </div>
  );
}