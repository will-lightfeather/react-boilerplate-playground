import { rest } from 'msw';

import { Account, AccountLoginDTO } from '@/api/Account';
import { API_URL } from '@/config';

const mockAuthResponse = {
  valid: true,
  message: 'This is a message',
  email: 'valid@lightfeather.io',
  verificationCode: '123456',
};

export const authHandlers = [
  rest.post<Account, AccountLoginDTO>(`${API_URL}/auth/login`, (req, res, ctx) => {
    if (req.body.email === 'networkerror@uscis.dhs.gov') {
      return res(ctx.status(500));
    }
    return res(ctx.status(201), ctx.json(mockAuthResponse));
  }),

  rest.post<Account, AccountLoginDTO>(`${API_URL}/auth/register`, (req, res, ctx) => {
    if (req.body.email === 'networkerror@uscis.dhs.gov') {
      return res(ctx.status(500));
    }
    return res(ctx.status(201), ctx.json(mockAuthResponse));
  }),
];
