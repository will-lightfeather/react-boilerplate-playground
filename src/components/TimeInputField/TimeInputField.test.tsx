import * as yup from 'yup';

import { Form, TimeInputField } from '@/components';
import { expectRendersWithoutViolations, render, screen, userEvent } from '@/test-utils';

const handleSubmit = jest.fn();

const schema = yup.object({
  'test-time-input': yup.string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NO_OP = () => {};

describe('TimeInputField', () => {
  it('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(
      <Form onSubmit={handleSubmit} schema={schema}>
        <TimeInputField
          name='test-time-input'
          id='test-time-input'
          label='Test Time Input'
          onChange={NO_OP}
        />
      </Form>
    );
  });

  it('renders without errors', () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <TimeInputField
          name='test-time-input'
          id='test-time-input'
          label='Test Time Input'
          onChange={NO_OP}
        />
      </Form>
    );
    const inputField = screen.getByRole('combobox');
    expect(inputField).toBeVisible();
  });

  it('renders with validation errors', async () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <TimeInputField
          name='test-time-input'
          id='test-time-input'
          label='Test Time Input'
          onChange={NO_OP}
        />
      </Form>
    );

    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeVisible();
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitBtn);

    expect(await screen.findByText(/Required/i)).toBeVisible();
  });
});
