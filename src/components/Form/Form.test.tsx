import * as yup from 'yup';

import { InputField } from '@/components/InputField';
import { expectRendersWithoutViolations, render, screen } from '@/test-utils';

import { Form } from './Form';

const handleSubmit = jest.fn();
const schema = yup.object();

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

describe('Form Wrapper', () => {
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
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(inputField).toBeVisible();
    expect(button).toBeVisible();
  });
});
