import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { AccountRegisterDTO } from '@/api/Account';
import { Form, InputField } from '@/components';

const RegisterFormSchema: yup.SchemaOf<AccountRegisterDTO> = yup.object().shape({
  email: yup
    .string()
    .email('Email Address must be valid')
    .required('Email Address is required')
    .matches(/(uscis.dhs.gov|lightfeather.io)$/i, 'Email Address must be a valid USCIS email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must be 8 characters or more')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/[@$!%*#?&]+/, 'One special character')
    .matches(/\d+/, 'One number'),
});

interface RegisterFormProps {
  onSubmit: SubmitHandler<AccountRegisterDTO>;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const handleSubmit = async (values: AccountRegisterDTO) => {
    onSubmit(values);
  };

  return (
    <Form<AccountRegisterDTO, typeof RegisterFormSchema>
      onSubmit={handleSubmit}
      schema={RegisterFormSchema}
    >
      <>
        <h1>Register</h1>

        <p>
          Please provide your email address to register for the site. You will then receive your
          Login ID via email.
        </p>

        <InputField<AccountRegisterDTO> name='email' label='Email Address' />
        <InputField<AccountRegisterDTO> name='password' label='Password' />
      </>
    </Form>
  );
};
