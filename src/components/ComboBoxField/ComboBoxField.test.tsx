import * as yup from 'yup';

import { ComboBoxField, Form } from '@/components';
import { expectRendersWithoutViolations, render, screen, userEvent } from '@/test-utils';

const handleSubmit = jest.fn();

const schema = yup.object({
  'test-combo': yup.string().min(1, 'Required'),
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NO_OP = () => {};

describe('CheckboxField', () => {
  it('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(
      <Form onSubmit={handleSubmit} schema={schema}>
        <ComboBoxField
          name='test-combo'
          id='test-combo'
          label='Test combo'
          onChange={NO_OP}
          options={[
            { label: 'Test 1', value: '1' },
            { label: 'Test 2', value: '2' },
            { label: 'Test 3', value: '3' },
          ]}
        />
      </Form>
    );
  });

  it('renders without errors', () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <ComboBoxField
          name='test-combo'
          id='test-combo'
          label='Test combo'
          onChange={NO_OP}
          options={[
            { label: 'Test 1', value: '1' },
            { label: 'Test 2', value: '2' },
            { label: 'Test 3', value: '3' },
          ]}
        />
      </Form>
    );
    const inputField = screen.getByRole('combobox');
    expect(inputField).toBeVisible();
  });

  it('renders with validation errors', async () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <ComboBoxField
          name='test-combo'
          id='test-combo'
          label='Test combo'
          onChange={NO_OP}
          options={[
            { label: 'Test 1', value: '1' },
            { label: 'Test 2', value: '2' },
            { label: 'Test 3', value: '3' },
          ]}
        />
      </Form>
    );

    const inputField = screen.getByRole('combobox');
    expect(inputField).toBeVisible();
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitBtn);

    expect(await screen.findByText(/Required/i)).toBeVisible();
  });
});
