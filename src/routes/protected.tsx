import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Register } = lazyImport(() => import('@/features/account/Register'), 'Register');
const { SampleComponent } = lazyImport(() => import('@/features/sample'), 'SampleComponent');
const { UsersList } = lazyImport(() => import('@/features/users/UsersList'), 'UsersList');
const { UserDetail } = lazyImport(() => import('@/features/users/UserDetail'), 'UserDetail');

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Register /> },
      { path: '/sample', element: <SampleComponent /> },
      { path: '/users', element: <UsersList /> },
      { path: '/users/:userId', element: <UserDetail /> },
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
];
