import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const isAuthenticated = true;

  const commonRoutes = [{ path: '/', element: <>Landing</> }];

  const routes = isAuthenticated ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};
