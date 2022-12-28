import { BaseEntity } from '@/types';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
}
