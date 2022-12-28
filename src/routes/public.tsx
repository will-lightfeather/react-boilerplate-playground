import { lazyImport } from '@/utils/lazyImport';

const { Register } = lazyImport(() => import('@/features/account/Register'), 'Register');

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <Register />,
  },
];
