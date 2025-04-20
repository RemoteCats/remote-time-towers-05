
export interface CatUser {
  id: string;
  name: string;
  photoUrl: string;
  timezone?: string;
}

export const catUsers: CatUser[] = [
  {
    id: '1',
    name: 'Whiskers',
    photoUrl: '/placeholder.svg',
    timezone: 'America/New_York'
  },
  {
    id: '2',
    name: 'Luna',
    photoUrl: '/placeholder.svg',
    timezone: 'Europe/London'
  },
  {
    id: '3',
    name: 'Shadow',
    photoUrl: '/placeholder.svg',
    timezone: 'Asia/Tokyo'
  }
];
