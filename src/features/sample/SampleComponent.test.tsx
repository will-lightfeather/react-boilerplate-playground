import { mockReturnNetworkError } from '@/mocks/mock-utils';
import { render, screen, waitFor } from '@/test-utils';
import { expectRendersWithoutViolations } from '@/utils/testMatchers';

import { SampleComponent } from './SampleComponent';

describe('Sample Component', () => {
  test('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(<SampleComponent />);
  });

  test('should render hello message', async () => {
    render(<SampleComponent />);
    const message = await screen.findByText(/Hello World/i);
    await waitFor(() => expect(message).toBeVisible());
  });

  test('should return Alert when API call fail', async () => {
    mockReturnNetworkError();
    render(<SampleComponent />);
    expect(await screen.findByText(/Error retrieving samples!/i)).toBeInTheDocument();
  });
});
