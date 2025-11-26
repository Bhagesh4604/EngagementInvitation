import React, { useState, useEffect } from 'react';
import { X, Upload, Shield, Check, Trash2, ImagePlus, RefreshCcw, Download, QrCode, Grid, Users, Camera, Lock } from 'lucide-react';
import { GalleryItem } from '../types';
<<<<<<< HEAD
import { imageDB } from '../utils'; // Keep imageDB import
=======
>>>>>>> cbdda10 (QR)

const defaultImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=800&auto=format&fit=crop"
];

interface GalleryProps {
  isAdmin: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ isAdmin }) => {
<<<<<<< HEAD
  const [images, setImages] = useState<GalleryItem[]>([]);
=======
  const [images, setImages] = useState<GalleryItem[]>(
    defaultImages.map((url, idx) => ({
      id: `def-${idx}`,
      url,
      status: 'approved',
      isUserUploaded: false,
      timestamp: Date.now()
    }))
  );
>>>>>>> cbdda10 (QR)
  
  const [activeTab, setActiveTab] = useState<'official' | 'guest'>('official');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  
  // State for QR Scan Landing Modal
  const [showScanOptions, setShowScanOptions] = useState(false);

<<<<<<< HEAD
  // Load images from DB on mount
  useEffect(() => {
    const loadImages = async () => {
        try {
            const stored = await imageDB.getAll();
            if (stored && stored.length > 0) {
                setImages(stored);
            } else {
                // Initial load of default images if DB is empty
                console.log("Seeding default images...");
                const initialItems: GalleryItem[] = defaultImages.map((url, idx) => ({
                    id: `def-${idx}`,
                    url,
                    status: 'approved',
                    isUserUploaded: false,
                    timestamp: Date.now()
                }));
                
                // CRITICAL: Persist defaults immediately
                for (const item of initialItems) {
                    await imageDB.save(item);
                }
                setImages(initialItems);
            }
        } catch (e) {
            console.error("Failed to load images", e);
        }
    };
    loadImages();
  }, []);

=======
>>>>>>> cbdda10 (QR)
  // Check URL for scan action on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'scan') {
      setShowScanOptions(true);
<<<<<<< HEAD
      // Clean URL without reloading
=======
      // Clean URL without reloading to remove the query param
>>>>>>> cbdda10 (QR)
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

<<<<<<< HEAD
  const cleanBaseUrl = window.location.href.split('?')[0];
  const qrCodeData = `${cleanBaseUrl}?action=scan`;
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrCodeData)}&size=300&ecLevel=H&margin=2&dark=000000&light=ffffff`;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
=======
  // Generate a clean URL for the QR code
  // We strip search params to ensure the QR code is clean and then append our specific action
  const cleanBaseUrl = window.location.href.split('?')[0];
  const qrCodeData = `${cleanBaseUrl}?action=scan`;
  // Use QuickChart API for robust rendering with High Error Correction (ecLevel=H)
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrCodeData)}&size=300&ecLevel=H&margin=2&dark=000000&light=ffffff`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> cbdda10 (QR)
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage(null);
<<<<<<< HEAD
    setShowScanOptions(false);
    
    let processedCount = 0;
    const newItems: GalleryItem[] = [];

    // Determine target category:
    // If Admin is on "Official" tab, it goes to official.
    // Otherwise (Guest or Admin on Guest tab), it goes to user uploads.
    const isTargetOfficial = isAdmin && activeTab === 'official';
    
    // Admin uploads are auto-approved
    const targetStatus = isAdmin ? 'approved' : 'pending';

    const filePromises = Array.from(files).map(file => {
        return new Promise<void>((resolve) => {
            if (!file.type.startsWith('image/')) {
                resolve();
                return;
            }
            const reader = new FileReader();
            reader.onloadend = async () => {
                const item: GalleryItem = {
                    id: Date.now() + Math.random(),
                    url: reader.result as string,
                    status: targetStatus,
                    isUserUploaded: !isTargetOfficial, 
                    timestamp: Date.now()
                };
                newItems.push(item);
                // Save to DB immediately
                try {
                    await imageDB.save(item);
                } catch(err) {
                    console.error("Failed to save image", err);
                }
                resolve();
            };
            reader.readAsDataURL(file);
        });
    });

    await Promise.all(filePromises);

    setImages(prev => [...prev, ...newItems]); // Append new items to previous state
    setIsUploading(false);
    
    if (isTargetOfficial) {
        setUploadMessage(`Added ${newItems.length} photos to Official Highlights.`);
    } else if (isAdmin) {
        setUploadMessage(`Added ${newItems.length} photos to Guest Gallery.`);
    } else {
        setUploadMessage(`Uploaded ${newItems.length} photos! Awaiting approval.`);
    }
    
    setTimeout(() => setUploadMessage(null), 4000);
    
    // Switch tab only if we uploaded as a guest or admin intended for guest tab
    if (!isTargetOfficial) {
        setActiveTab('guest');
    }
  };

  const handleReplaceImage = async (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const newUrl = reader.result as string;
            setImages(prev => prev.map(img => {
                if (img.id === id) {
                    const updated = { ...img, url: newUrl };
                    // Save update to DB
                    imageDB.save(updated).catch(err => console.log('Could not save replaced image to DB', err));
                    return updated;
                }
                return img;
            }));
=======
    setShowScanOptions(false); // Close scan modal if open

    let processedCount = 0;
    const newItems: GalleryItem[] = [];

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            processedCount++;
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            newItems.push({
                id: Date.now() + Math.random(),
                url: reader.result as string,
                status: isAdmin ? 'approved' : 'pending',
                isUserUploaded: true,
                timestamp: Date.now()
            });
            
            processedCount++;
            if (processedCount === files.length) {
                setImages(prev => [...newItems, ...prev]);
                setIsUploading(false);
                setUploadMessage(isAdmin ? `Added ${newItems.length} photos.` : `Uploaded ${newItems.length} photos! Awaiting approval.`);
                setTimeout(() => setUploadMessage(null), 4000);
                
                // Automatically switch to guest tab if uploading
                setActiveTab('guest');
            }
        };
        // Use readAsDataURL to keep original quality logic (Base64)
        reader.readAsDataURL(file);
    });
  };

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages(prev => prev.map(img => img.id === id ? { ...img, url: reader.result as string } : img));
>>>>>>> cbdda10 (QR)
        };
        reader.readAsDataURL(file);
    }
  };

<<<<<<< HEAD
  const approvePhoto = async (id: string | number) => {
    const item = images.find(img => img.id === id);
    if (item) {
        const updated = { ...item, status: 'approved' as const };
        setImages(prev => prev.map(img => img.id === id ? updated : img));
        await imageDB.save(updated);
    }
  };

  const rejectPhoto = async (id: string | number) => {
    setImages(prev => prev.filter(img => img.id !== id));
    await imageDB.delete(id);
=======
  const approvePhoto = (id: string | number) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, status: 'approved' } : img));
  };

  const rejectPhoto = (id: string | number) => {
    setImages(prev => prev.filter(img => img.id !== id));
>>>>>>> cbdda10 (QR)
  };

  const handleDownload = async (url: string) => {
    try {
<<<<<<< HEAD
=======
        // Fetch the Base64/URL content to a blob to force download logic
        // This ensures the browser downloads the original file data rather than just opening the link
>>>>>>> cbdda10 (QR)
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `Siddharam-Swapna-Event-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed", error);
<<<<<<< HEAD
=======
        // Fallback for simple URLs
>>>>>>> cbdda10 (QR)
        const link = document.createElement('a');
        link.href = url;
        link.download = `Siddharam-Swapna-${Date.now()}.jpg`;
        link.click();
    }
  };

<<<<<<< HEAD
  const canDownload = isAdmin || (activeTab === 'guest');

  const approvedImages = images.filter(img => img.status === 'approved');
  const officialCount = approvedImages.filter(img => !img.isUserUploaded).length;
  const guestCount = approvedImages.filter(img => img.isUserUploaded).length;

=======
  // Permission Logic:
  // Admin can download anything.
  // Guests can download FROM GUEST TAB ONLY.
  // Guests CANNOT download from Official Tab.
  const canDownload = isAdmin || (activeTab === 'guest');

  // Filtering Logic
  const approvedImages = images.filter(img => img.status === 'approved');
>>>>>>> cbdda10 (QR)
  const displayImages = activeTab === 'official' 
      ? approvedImages.filter(img => !img.isUserUploaded)
      : approvedImages.filter(img => img.isUserUploaded);
      
  const pendingImages = images.filter(img => img.status === 'pending');

  return (
    <div className="space-y-8 relative">
<<<<<<< HEAD
        <div className="flex flex-col gap-6 mb-8">
=======
        {/* Controls Bar */}
        <div className="flex flex-col gap-6 mb-8">
             
             {/* Action Buttons */}
>>>>>>> cbdda10 (QR)
             <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="relative">
                    <input 
                        type="file" 
                        id="photo-upload" 
                        className="hidden" 
                        accept="image/*"
<<<<<<< HEAD
                        multiple 
=======
                        multiple // Allow multiple files
>>>>>>> cbdda10 (QR)
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                    <label 
                        htmlFor="photo-upload" 
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all cursor-pointer shadow-lg hover:shadow-f-pink/20 ${
                            isUploading 
                            ? 'bg-gray-600 text-gray-300 cursor-wait' 
                            : 'bg-f-blue text-f-pink border border-f-pink hover:bg-f-pink hover:text-f-white glass'
                        }`}
                    >
<<<<<<< HEAD
                        {isUploading ? (
                            <span className="animate-pulse">Uploading...</span>
                        ) : (
                            <>
                                <Upload size={18} /> 
                                {isAdmin ? (activeTab === 'official' ? 'Add to Highlights' : 'Add to Guest Gallery') : 'Upload Photos'}
                            </>
                        )}
=======
                        {isUploading ? <span className="animate-pulse">Uploading...</span> : <><Upload size={18} /> {isAdmin ? 'Bulk Upload' : 'Upload Photos'}</>}
>>>>>>> cbdda10 (QR)
                    </label>
                </div>

                <button 
                    onClick={() => setShowQrCode(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all cursor-pointer shadow-lg hover:shadow-f-orange/20 bg-f-blue text-f-orange border border-f-orange hover:bg-f-orange hover:text-f-white glass"
                >
                    <QrCode size={18} /> QR Code
                </button>
             </div>

<<<<<<< HEAD
=======
             {/* Tabs */}
>>>>>>> cbdda10 (QR)
             <div className="flex justify-center">
                 <div className="flex bg-f-blue/30 p-1 rounded-full glass border border-f-pink/20">
                     <button 
                        onClick={() => setActiveTab('official')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all text-sm md:text-base ${
                            activeTab === 'official' ? 'bg-f-pink text-white shadow-md' : 'text-f-white hover:text-f-pink'
                        }`}
                     >
<<<<<<< HEAD
                         <Grid size={16} /> Official Highlights ({officialCount})
=======
                         <Grid size={16} /> Official Highlights
>>>>>>> cbdda10 (QR)
                     </button>
                     <button 
                        onClick={() => setActiveTab('guest')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all text-sm md:text-base ${
                            activeTab === 'guest' ? 'bg-f-pink text-white shadow-md' : 'text-f-white hover:text-f-pink'
                        }`}
                     >
<<<<<<< HEAD
                         <Users size={16} /> Guest Uploads ({guestCount})
=======
                         <Users size={16} /> Guest Uploads
>>>>>>> cbdda10 (QR)
                     </button>
                 </div>
             </div>
        </div>

        {uploadMessage && (
            <div className="text-center">
                <div className="text-f-pink font-serif italic animate-fade-in-up bg-f-blue/30 inline-block px-6 py-2 rounded-lg border border-f-pink/30">
                    {uploadMessage}
                </div>
            </div>
        )}

<<<<<<< HEAD
=======
        {/* Moderation Queue (Admin Only) */}
>>>>>>> cbdda10 (QR)
        {isAdmin && pendingImages.length > 0 && (
            <div className="bg-f-blue/40 border-2 border-f-orange/30 rounded-xl p-6 mb-8 animate-fade-in-up glass">
                <h3 className="text-f-orange font-serif text-2xl mb-4 flex items-center justify-center gap-2">
                    <Shield size={24} /> Pending Approvals ({pendingImages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pendingImages.map(img => (
                        <div key={img.id} className="relative group bg-f-blue rounded-lg p-2 shadow-md">
                            <div className="aspect-square overflow-hidden rounded mb-2">
                                <img src={img.url} alt="Pending" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between gap-2">
                                <button 
                                    onClick={() => rejectPhoto(img.id)}
                                    className="flex-1 bg-gray-700 hover:bg-red-600 text-white py-1 rounded flex justify-center items-center transition-colors"
                                    title="Reject"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button 
                                    onClick={() => approvePhoto(img.id)}
                                    className="flex-1 bg-f-pink hover:bg-green-600 text-white py-1 rounded flex justify-center items-center transition-colors"
                                    title="Approve"
                                >
                                    <Check size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

<<<<<<< HEAD
=======
        {/* Main Gallery Grid with Zoom Animation */}
>>>>>>> cbdda10 (QR)
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayImages.map((img, idx) => (
                <div 
                    key={img.id} 
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative shadow-md border border-f-blue hover:border-f-pink transition-colors opacity-0 animate-zoom-in"
<<<<<<< HEAD
                    style={{ animationDelay: `${Math.min(idx * 0.1, 1)}s` }}
                    onClick={() => setSelectedImage(img.url)}
                >
                    <div className="absolute inset-0 bg-f-purple/60 transition-colors z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                        <ImagePlus className="text-white drop-shadow-lg" size={32} />
                        
=======
                    style={{ animationDelay: `${Math.min(idx * 0.1, 1)}s` }} // Cap delay
                    onClick={() => setSelectedImage(img.url)}
                >
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-f-purple/60 transition-colors z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                        <ImagePlus className="text-white drop-shadow-lg" size={32} />
                        
                        {/* Admin Replace Button */}
>>>>>>> cbdda10 (QR)
                        {isAdmin && (
                            <div onClick={(e) => e.stopPropagation()}>
                                <input 
                                    type="file" 
                                    id={`replace-${img.id}`} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => handleReplaceImage(e, img.id)}
                                />
                                <label 
                                    htmlFor={`replace-${img.id}`}
                                    className="flex items-center gap-1 bg-f-orange text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-white hover:text-f-orange transition-colors shadow-lg"
                                >
                                    <RefreshCcw size={12} /> Replace
                                </label>
                            </div>
                        )}
<<<<<<< HEAD
                        {isAdmin && (
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    rejectPhoto(img.id);
                                }}
                                className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-white hover:text-red-600 transition-colors shadow-lg flex items-center gap-1"
                             >
                                <Trash2 size={12} /> Delete
                             </button>
                        )}
=======
>>>>>>> cbdda10 (QR)
                    </div>

                    <img 
                        src={img.url} 
                        alt="Gallery" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
        
        {displayImages.length === 0 && (
            <div className="text-f-white/60 italic py-12 border-2 border-dashed border-f-white/20 rounded-xl bg-f-blue/10 animate-fade-in-up">
                <p className="mb-2">No photos in this section yet.</p>
                {activeTab === 'guest' && <p>Be the first to upload one!</p>}
<<<<<<< HEAD
                {isAdmin && activeTab === 'official' && <p>Click "Add to Highlights" to add photos.</p>}
            </div>
        )}

=======
            </div>
        )}

        {/* Lightbox */}
>>>>>>> cbdda10 (QR)
        {selectedImage && (
            <div 
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
            >
                <button className="absolute top-4 right-4 text-f-white hover:text-f-orange transition-colors">
                    <X size={40} />
                </button>
                
                <div className="relative max-w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                    <img 
                        src={selectedImage} 
                        alt="Full size" 
                        className="max-w-full max-h-[80vh] rounded-sm border border-f-white/20 shadow-2xl" 
                    />
                    <div className="flex justify-center mt-6">
<<<<<<< HEAD
=======
                        {/* Download Logic: Guests can download guest photos, Admins can download all. Official photos restricted for guests. */}
>>>>>>> cbdda10 (QR)
                        {canDownload ? (
                            <button 
                                onClick={() => handleDownload(selectedImage)}
                                className="flex items-center gap-2 bg-f-orange hover:bg-white hover:text-f-orange text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-f-orange/50"
                            >
                                <Download size={20} /> Download Original
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 bg-gray-700/80 text-gray-200 px-6 py-2 rounded-full border border-gray-600 font-bold backdrop-blur-sm">
                                <Lock size={16} /> Admin Only Download
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

<<<<<<< HEAD
=======
        {/* QR Code Modal */}
>>>>>>> cbdda10 (QR)
        {showQrCode && (
            <div 
                className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={() => setShowQrCode(false)}
            >
                <div 
                    className="bg-white p-8 rounded-2xl max-w-sm w-full text-center relative animate-fade-in-up border-4 border-f-pink shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setShowQrCode(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <h3 className="font-serif text-2xl text-f-purple mb-2">Scan to Share</h3>
                    <p className="text-gray-600 mb-6 text-sm">Guests can scan this to upload photos or view the gallery.</p>
                    
                    <div className="flex justify-center mb-6">
<<<<<<< HEAD
=======
                        {/* Using QuickChart API for reliable QR generation */}
>>>>>>> cbdda10 (QR)
                        <img 
                            src={qrCodeUrl}
                            alt="Scan QR" 
                            className="w-64 h-64 border-2 border-gray-100 rounded-lg shadow-inner" 
                        />
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded text-xs text-gray-500 font-mono break-all line-clamp-2">
                        {cleanBaseUrl}
                    </div>
                </div>
            </div>
        )}

<<<<<<< HEAD
=======
        {/* Welcome Guest / Scan Action Modal */}
>>>>>>> cbdda10 (QR)
        {showScanOptions && (
            <div 
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
            >
                <div className="bg-f-blue border-2 border-f-pink rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in-up">
                    <h2 className="font-serif text-3xl text-f-pink mb-2">Welcome!</h2>
                    <p className="text-f-white/80 mb-8">You've joined the live event feed. What would you like to do?</p>
                    
                    <div className="grid gap-4">
                        <div className="relative">
                            <input 
                                type="file" 
                                id="scan-upload" 
                                className="hidden" 
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                            />
                            <label 
                                htmlFor="scan-upload"
                                className="w-full flex items-center justify-center gap-3 bg-f-pink hover:bg-f-orange text-white py-4 rounded-xl font-bold text-lg cursor-pointer transition-colors shadow-lg"
                            >
                                <Camera size={24} /> Upload Photos
                            </label>
                        </div>
                        
                        <button 
                            onClick={() => {
                                setShowScanOptions(false);
<<<<<<< HEAD
                                setActiveTab('guest');
=======
                                setActiveTab('guest'); // Switch to guest tab so they can see downloads
                                // Scroll to gallery
>>>>>>> cbdda10 (QR)
                                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full flex items-center justify-center gap-3 bg-f-purple/50 hover:bg-f-purple border border-f-white/20 text-f-white py-4 rounded-xl font-bold text-lg transition-colors"
                        >
                            <Download size={24} /> View & Download
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};