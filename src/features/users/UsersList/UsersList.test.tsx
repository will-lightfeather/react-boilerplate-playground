import { mockReturnNetworkError } from '@/mocks/mock-utils';
import { mockUsers } from '@/mocks/resolvers/mockUsers';
import { render, screen, userEvent, waitFor } from '@/test-utils';
import { expectRendersWithoutViolations } from '@/utils/testMatchers';

import { UsersList } from './UsersList';

describe('Users List', () => {
  test('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(<UsersList />);
  });

  test('should return error alert message if network error', async () => {
    mockReturnNetworkError();
    render(<UsersList />);
    expect(await screen.findByText(/Error retrieving users/i)).toBeInTheDocument();
  });

  test('should return list of users', async () => {
    render(<UsersList />);
    expect(await screen.findByText(mockUsers[0].firstName)).toBeInTheDocument();
    expect(await screen.findByText(mockUsers[0].lastName)).toBeInTheDocument();
    expect(await screen.findByText(mockUsers[0].email)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'View' })[0]).toBeInTheDocument();

    expect(await screen.findByText(mockUsers[1].firstName)).toBeInTheDocument();
    expect(await screen.findByText(mockUsers[1].lastName)).toBeInTheDocument();
    expect(await screen.findByText(mockUsers[1].email)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'View' })[1]).toBeInTheDocument();
  });

  test('should navigate to individual user', async () => {
    render(<UsersList />);
    expect(await screen.findByText(mockUsers[0].firstName)).toBeInTheDocument();
    const userLink = screen.getAllByRole('link', { name: 'View' })[0];

    await userEvent.click(userLink);

    await waitFor(() => expect(document.location.pathname).toBe('/users/1'));
  });
});
