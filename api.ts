const API_URL = '/api';

export const api = {
  getContent: async () => {
    const response = await fetch(`${API_URL}/content`);
    return response.json();
  },
  updateContent: async (content: any) => {
    const response = await fetch(`${API_URL}/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    return response.json();
  },
  getTimeline: async () => {
    const response = await fetch(`${API_URL}/timeline`);
    return response.json();
  },
  addTimelineItem: async (item: any) => {
    const response = await fetch(`${API_URL}/timeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return response.json();
  },
  updateTimelineItem: async (id: number, item: any) => {
    const response = await fetch(`${API_URL}/timeline/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return response.json();
  },
  deleteTimelineItem: async (id: number) => {
    const response = await fetch(`${API_URL}/timeline/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
  getWishes: async () => {
    const response = await fetch(`${API_URL}/wishes`);
    return response.json();
  },
  addWish: async (wish: any) => {
    const response = await fetch(`${API_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wish),
    });
    return response.json();
  },
    deleteWish: async (id: number) => {
        const response = await fetch(`${API_URL}/wishes/${id}`, {
        method: 'DELETE',
        });
        return response.json();
    },
  getGallery: async () => {
    const response = await fetch(`${API_URL}/gallery`);
    return response.json();
  },
  uploadToGallery: async (item: any) => {
    const response = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return response.json();
  },
    updateGalleryItem: async (id: number, item: any) => {
        const response = await fetch(`${API_URL}/gallery/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        return response.json();
    },
    deleteGalleryItem: async (id: number) => {
        const response = await fetch(`${API_URL}/gallery/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
};