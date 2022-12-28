import { Alert } from '@team-lightfeather/ui-react-assets';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AccountLoginDTO, useLoginApi } from '@/api/Account';

import { RegisterForm } from './RegisterForm';

export const Register = () => {
  const { mutate, isError } = useLoginApi();

  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<AccountLoginDTO> = (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/sample');
      },
    });
  };

  return (
    <>
      {isError && <Alert type='error'>There was a problem. Please try again</Alert>}

      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
};
