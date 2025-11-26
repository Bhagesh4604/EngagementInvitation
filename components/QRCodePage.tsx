import React, { useRef, useState } from 'react';
import { api } from '../api';
import { GalleryItem } from '../types';

const mockPhotos = [
  { id: 1, url: 'https://picsum.photos/id/10/800/600', name: 'engagement-photo-1.jpg' },
  { id: 2, url: 'https://picsum.photos/id/20/800/600', name: 'engagement-photo-2.jpg' },
  { id: 3, url: 'https://picsum.photos/id/30/800/600', name: 'engagement-photo-3.jpg' },
  { id: 4, url: 'https://picsum.photos/id/40/800/600', name: 'engagement-photo-4.jpg' },
];

export function QRCodePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showDownloadablePhotos, setShowDownloadablePhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFilesClick = () => {
    setShowDownloadablePhotos(false);
    fileInputRef.current?.click();
  };

  const handleDownloadClick = () => {
    setSelectedFiles([]);
    setShowDownloadablePhotos(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    const filePromises = selectedFiles.map(file => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const item: Omit<GalleryItem, 'id' | 'timestamp'> = {
            url: reader.result as string,
            status: 'pending',
            isUserUploaded: true,
          };
          await api.uploadToGallery(item);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    await Promise.all(filePromises);

    window.dispatchEvent(new Event('photosUploaded'));

    alert(`${selectedFiles.length} photo(s) submitted for approval!`);
    setSelectedFiles([]);
  };

  const downloadImage = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = `Siddharam-Swapna-Event-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-f-purple text-f-white p-4">
      <h1 className="text-4xl font-serif text-f-pink mb-8">Share Your Moments</h1>
      <div className="space-y-4 w-full max-w-xs">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleSelectFilesClick}
          className="w-full px-8 py-4 bg-f-orange text-white font-bold rounded-lg shadow-lg hover:bg-f-orange/80 transition-colors"
        >
          Select Photos to Upload
        </button>
        <button
          onClick={handleDownloadClick}
          className="w-full px-8 py-4 bg-f-blue text-white font-bold rounded-lg shadow-lg hover:bg-f-blue/80 transition-colors"
        >
          Download Photos
        </button>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-serif text-f-pink mb-4 text-center">Selected Photos:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleUpload}
              className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Upload {selectedFiles.length} {selectedFiles.length > 1 ? 'Photos' : 'Photo'}
            </button>
          </div>
        </div>
      )}

      {showDownloadablePhotos && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-serif text-f-pink mb-4 text-center">Downloadable Photos:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mockPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <button
                  onClick={() => downloadImage(photo.url)}
                  className="absolute bottom-2 right-2 bg-f-pink text-white p-2 rounded-full shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}