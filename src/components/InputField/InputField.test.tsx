import * as yup from 'yup';

import { Form, InputField } from '@/components';
import { expectRendersWithoutViolations, render, screen, userEvent } from '@/test-utils';

const handleSubmit = jest.fn();

const schema = yup.object({
  'test-input': yup.string().min(1, 'Required'),
});

describe('InputField', () => {
  it('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(
      <Form onSubmit={handleSubmit} schema={schema}>
        <InputField name='test-input' label='Test input' />
      </Form>
    );
  });

  it('renders without errors', () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <InputField name='test-input' label='Test input' />
      </Form>
    );
    const inputField = screen.getByLabelText('Test input');
    expect(inputField).toBeVisible();
  });

  it('renders with validation errors', async () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <InputField name='test-input' label='Test input' />
      </Form>
    );

    const inputField = screen.getByLabelText('Test input');
    expect(inputField).toBeVisible();
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitBtn);

    expect(await screen.findByText(/Required/i)).toBeVisible();
  });
});
