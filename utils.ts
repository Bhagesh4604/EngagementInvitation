export const generateICSFile = () => {
  const event = {
    title: 'Engagement: Siddharam & Swapna',
    description: 'We invite you to celebrate our engagement with joy and love.',
    location: 'IK Royal Function Hall, Almel',
    start: '20251215T180000', // YYYYMMDDTHHmmSS
    end: '20251215T220000',
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SiddharamSwapna//Engagement//EN
BEGIN:VEVENT
UID:${Date.now()}@siddharamswapna.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'siddharam-swapna-engagement.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Persistence Utilities ---

const DB_NAME = 'EngagementDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

// Helper to open IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create store with 'id' as the key path
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    
    request.onerror = (event) => {
      console.error("IndexedDB Open Error:", request.error);
      reject(request.error);
    };
  });
};

export const imageDB = {
  async getAll(): Promise<any[]> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("Error getting images from DB:", e);
      return [];
    }
  },

  async save(item: any): Promise<void> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        // .put() updates if key exists, adds if not
        const request = store.put(item); 
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("Error saving image to DB:", e);
    }
  },

  async delete(id: string | number): Promise<void> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("Error deleting image from DB:", e);
    }
  },

  async clear(): Promise<void> {
     try {
       const db = await openDB();
       return new Promise((resolve, reject) => {
           const transaction = db.transaction(STORE_NAME, 'readwrite');
           const store = transaction.objectStore(STORE_NAME);
           const request = store.clear();
           
           request.onsuccess = () => resolve();
           request.onerror = () => reject(request.error);
       });
     } catch (e) {
       console.error("Error clearing DB:", e);
     }
  }
};

export const storage = {
  save: (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Local Storage Save Error (${key})`, e);
    }
  },
  load: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error(`Local Storage Load Error (${key})`, e);
      return defaultValue;
    }
  }
};