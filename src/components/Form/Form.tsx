import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@team-lightfeather/ui-react-assets';
import classNames from 'classnames';
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';

interface FormProps<TFormValues extends FieldValues, Schema> {
  classNames?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  options?: UseFormProps<TFormValues>;
  submitText?: string;
  id?: string;
  schema?: Schema;
}

export const Form = <
  TFormValues extends Record<string, unknown>,
  Schema extends yup.AnyObjectSchema
>({
  children,
  onSubmit,
  schema,
  options,
  submitText = 'Submit',
  id,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={classNames('usa-form lf-form text-left usa-form--large', classNames)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}

        <Button type='submit' className='w-full'>
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
};
