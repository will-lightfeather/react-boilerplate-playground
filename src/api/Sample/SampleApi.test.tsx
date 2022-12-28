import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';

import { queryClient } from '@/lib/react-query';
import { mockSample } from '@/mocks/resolvers/mockSample';

import { useGetSample, useGetSamples, useUpdateSample } from './SampleApi';

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
    const { result, waitFor } = renderHook(() => useGetSamples(), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockSample);
  });

  test('getSample', async () => {
    const { result, waitFor } = renderHook(() => useGetSample({ sampleId: '1' }), { wrapper });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockSample[0]);
  });

  test('updateSample', async () => {
    const { result, waitFor } = renderHook(() => useUpdateSample(), {
      wrapper,
    });
    result.current.mutate({ data: { message: 'Updated message' }, sampleId: '1' });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({ ...mockSample[0], message: 'Updated message' });
  });
});
