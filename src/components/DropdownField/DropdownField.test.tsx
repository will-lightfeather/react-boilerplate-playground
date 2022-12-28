import * as yup from 'yup';

import { DropdownField, Form } from '@/components';
import { expectRendersWithoutViolations, render, screen, userEvent } from '@/test-utils';

const handleSubmit = jest.fn();

const schema = yup.object({
  'test-input': yup.string().required('Dropdown is required'),
});

describe('DropdownField', () => {
  it('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(
      <Form onSubmit={handleSubmit} schema={schema}>
        <DropdownField name='test-input' label='Test input' id='test-input'>
          <option value='value1'>Option 1</option>
          <option value='value2'>Option 2</option>
          <option value='value3'>Option 3</option>
        </DropdownField>
      </Form>
    );
  });

  it('renders without errors', () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <DropdownField name='test-input' label='Test input' id='test-input'>
          <option value='value1'>Option 1</option>
          <option value='value2'>Option 2</option>
          <option value='value3'>Option 3</option>
        </DropdownField>
      </Form>
    );
    const dropdownField = screen.getByLabelText('Test input');
    expect(dropdownField).toBeVisible();
  });

  it('renders with validation errors', async () => {
    render(
      <Form onSubmit={handleSubmit} schema={schema}>
        <DropdownField name='test-input' label='Test input' id='test-input'>
          <option value=''>- Select -</option>
          <option value='value1'>Option 1</option>
          <option value='value2'>Option 2</option>
          <option value='value3'>Option 3</option>
        </DropdownField>
      </Form>
    );

    const dropdownField = screen.getByLabelText('Test input');
    expect(dropdownField).toBeVisible();

    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitBtn);

    expect(screen.getByText(/Required/i)).toBeVisible();
  });
});
