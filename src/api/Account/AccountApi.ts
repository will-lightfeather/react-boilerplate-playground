import { useMutation } from '@tanstack/react-query';

import api from '@/api';

import { Account, AccountLoginDTO, AccountRegisterDTO } from './Account.model';

const login = (data: AccountLoginDTO): Promise<Account> => {
  return api.post('/auth/login', data);
};

const register = (data: AccountRegisterDTO): Promise<Account> => {
  return api.post<Account, Account, AccountRegisterDTO>('/auth/register', data);
};

export const useRegisterApi = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLoginApi = () => {
  return useMutation({
    mutationFn: login,
  });
};
