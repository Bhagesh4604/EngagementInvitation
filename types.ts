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
