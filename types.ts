export interface Guest {
  name: string;
  email: string;
  count: number;
  diet: 'veg' | 'non-veg';
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: 'ring' | 'dinner' | 'camera' | 'music';
}

export interface TimelineItem {
  id: number;
  time: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string | number;
  url: string;
  status: 'approved' | 'pending';
  isUserUploaded?: boolean;
  timestamp?: number;
}

export interface Wish {
  id: number;
  message: string;
  author: string;
  timestamp: number;
}

export interface SiteContent {
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroDate: string;
  heroVenue: string;
  storyTitle: string;
  storyText: string;
  eventDate: string;
  eventVenueTitle: string;
  eventVenueAddr: string;
  eventTime: string;
  heroBgUrl: string;
  contactPhone: string;
  contactEmail: string;
}

export type Theme = 'default' | 'royal' | 'ocean' | 'forest' | 'elegant' | 'sunset' | 'midnight';