import { rest } from 'msw';

import { API_URL } from '@/config';
import { mockUsers } from '@/mocks/resolvers/mockUsers';

export const userHandlers = [
  rest.get(`${API_URL}/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers));
  }),

  rest.get(`${API_URL}/users/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers[0]));
  }),
];
