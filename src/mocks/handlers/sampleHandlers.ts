import { rest } from 'msw';

import { API_URL } from '@/config';
import { mockSample } from '@/mocks/resolvers/mockSample';

export const sampleHandlers = [
  rest.get(`${API_URL}/sample`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSample));
  }),

  rest.get(`${API_URL}/sample/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSample[0]));
  }),

  rest.put(`${API_URL}/sample/1`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.json({ ...mockSample[0], message: 'Updated message' }));
  }),
];
