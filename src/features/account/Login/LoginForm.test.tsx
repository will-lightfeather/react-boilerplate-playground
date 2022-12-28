import { axe, render, screen, userEvent, waitFor } from '@/test-utils';

import LoginForm from './LoginForm';

const onSubmit = jest.fn();

describe('LoginForm accessibility', () => {
  test('renders without accessibility violations', async () => {
    const { container } = render(<LoginForm onSubmit={onSubmit} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('LoginForm', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const SUBMIT_TEXT = /Log In/i;

  beforeEach(() => {
    render(<LoginForm onSubmit={onSubmit} />);

    emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    passwordInput = screen.getByLabelText(/Password/i);
    submitButton = screen.getByRole('button', { name: SUBMIT_TEXT });
  });

  test('should render all inputs', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('email address is required', async () => {
    await userEvent.click(submitButton);
    expect(await screen.findByText(/Email Address is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('password is required', async () => {
    await userEvent.click(submitButton);
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('can submit login form', async () => {
    expect.assertions(1);

    await userEvent.type(emailInput, 'valid@uscis.dhs.gov');
    await userEvent.type(passwordInput, 'P@s$word1');
    await userEvent.click(submitButton);

    await waitFor(() => expect(onSubmit).toBeCalled());
  });
});
