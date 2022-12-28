import { useQuery } from '@tanstack/react-query';

import api from '@/api';

import { User } from './User.model';

const getUsers = (): Promise<User[]> => {
  return api.get('/users');
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUsers,
  });
};

const getUser = ({ userId }: { userId: string }): Promise<User> => {
  return api.get(`/users/${userId}`);
};

export const useGetUser = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser({ userId }),
  });
};
