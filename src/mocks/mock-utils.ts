import { rest } from 'msw';

import { server } from './server';

// util to return a network error
export const mockReturnNetworkError = () => {
  return server.use(
    rest.get('*', (req, res) => res.networkError('Sorry, this is an error')),
    rest.post('*', (req, res) => res.networkError('Sorry, this is an error')),
    rest.put('*', (req, res) => res.networkError('Sorry, this is an error')),
    rest.patch('*', (req, res) => res.networkError('Sorry, this is an error')),
    rest.delete('*', (req, res) => res.networkError('Sorry, this is an error'))
  );
};
