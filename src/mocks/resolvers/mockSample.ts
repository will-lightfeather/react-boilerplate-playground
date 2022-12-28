import { Sample } from '@/api/Sample';

export const mockSample: Sample[] = [
  { id: '1', createdAt: new Date().toISOString(), message: 'Sample text' },
  { id: '2', createdAt: new Date().toISOString(), message: 'Sample text' },
];
