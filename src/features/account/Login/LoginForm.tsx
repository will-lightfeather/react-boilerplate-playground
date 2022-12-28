import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { AccountLoginDTO } from '@/api/Account';
import { Form, InputField } from '@/components';

const LoginFormSchema: yup.SchemaOf<AccountLoginDTO> = yup
  .object({
    email: yup
      .string()
      .email('Email Address must be valid')
      .required('Email Address is required')
      .matches(/(uscis.dhs.gov|lightfeather.io)$/i, 'Email Address must be a valid USCIS email'),
    password: yup.string().required('Password is required'),
  })
  .required();

interface LoginFormProps {
  onSubmit: SubmitHandler<AccountLoginDTO>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Form<AccountLoginDTO, typeof LoginFormSchema>
      onSubmit={onSubmit}
      schema={LoginFormSchema}
      submitText='Log In'
    >
      <>
        <h1>Log In</h1>

        <p>Please enter your Login ID and password to continue.</p>

        <InputField<AccountLoginDTO> name='email' label='Email Address' />
        <InputField<AccountLoginDTO> name='password' label='Password' />
      </>
    </Form>
  );
};

export default LoginForm;
