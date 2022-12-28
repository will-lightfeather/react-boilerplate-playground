import { axe, render, screen, userEvent, waitFor } from '@/test-utils';

import { Register } from './Register';
import { RegisterForm } from './RegisterForm';

// jest.mock('react-router-dom', () => {
//   return {
//     ...jest.requireActual('react-router-dom'),
//     Navigate: () => 'Home',
//   };
// });

const onSubmit = jest.fn();

describe('Register', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  test('renders without accessibility violations', async () => {
    const { container } = render(<RegisterForm onSubmit={onSubmit} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should redirect if submit is successful', async () => {
    expect.assertions(1);

    render(<Register />);
    emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    passwordInput = screen.getByRole('textbox', { name: /Password/i });
    submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(emailInput, 'valid@uscis.dhs.gov');
    await userEvent.type(passwordInput, 'P@$sword1');
    await userEvent.click(submitButton);
    await waitFor(() => expect(document.location.pathname).toBe('/sample'));
  });

  test('should display error alert if submit failed', async () => {
    expect.assertions(1);

    render(<Register />);
    emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    passwordInput = screen.getByRole('textbox', { name: /Password/i });
    submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(emailInput, 'networkerror@uscis.dhs.gov');
    await userEvent.type(passwordInput, 'P@$sword1');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/There was a problem/i)).toBeInTheDocument();
  });
});

describe('RegisterForm', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    render(<RegisterForm onSubmit={onSubmit} />);

    emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    passwordInput = screen.getByRole('textbox', { name: /Password/i });
    submitButton = screen.getByRole('button', { name: /Submit/i });
  });

  test('should render all inputs', () => {
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('email address is required', async () => {
    await userEvent.click(submitButton);
    expect(await screen.findByText(/Email Address is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('email address must be valid', async () => {
    await userEvent.type(emailInput, 'invalidEmail');
    await userEvent.click(submitButton);
    expect(await screen.findByText(/Email Address must be valid/i)).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('email address must be a uscis email', async () => {
    await userEvent.type(emailInput, 'invalid@mail.com');
    await userEvent.click(submitButton);
    expect(
      await screen.findByText(/Email Address must be a valid USCIS email/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('password is required', async () => {
    await userEvent.click(submitButton);
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  test('can submit register form', async () => {
    expect.assertions(1);

    await userEvent.type(emailInput, 'valid@uscis.dhs.gov');
    await userEvent.type(passwordInput, 'P@s$word1');
    await userEvent.click(submitButton);
    await waitFor(() => expect(onSubmit).toBeCalled());
  });
});
