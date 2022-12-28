import { User } from '@/api/User';

export const mockUsers: User[] = [
  {
    id: '1',
    createdAt: new Date().toISOString(),
    firstName: 'Rhaenyra',
    lastName: 'Targaryen',
    email: 'rhaenyra@targaryen.com',
  },
  {
    id: '2',
    createdAt: new Date().toISOString(),
    firstName: 'Alicent',
    lastName: 'Hightower',
    email: 'alicent@hightower.com',
  },
];
