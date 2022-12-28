import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';

import { queryClient } from '@/lib/react-query';
import { mockUsers } from '@/mocks/resolvers/mockUsers';

import { useGetUser, useGetUsers } from './UserApi';

describe('Sample api', () => {
  let wrapper: WrapperComponent<{
    children: JSX.Element;
  }>;
  beforeAll(() => {
    wrapper = ({ children }: { children: JSX.Element }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  test('getSamples', async () => {
    const { result, waitFor } = renderHook(() => useGetUsers(), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockUsers);
  });

  test('getSample', async () => {
    const { result, waitFor } = renderHook(() => useGetUser({ userId: '1' }), { wrapper });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockUsers[0]);
  });
});
