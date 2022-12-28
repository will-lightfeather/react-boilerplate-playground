import { ErrorMessage } from '@hookform/error-message';
import {
  ErrorMessage as ValidationErrorMessage,
  FormGroup,
  Input,
  InputProps,
} from '@team-lightfeather/ui-react-assets';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

type InputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  label: string;
  hint?: string;
} & Omit<InputProps, 'name'>;

export const InputField = <T extends FieldValues>({
  id,
  name,
  label,
  hint,
  rules,
  ...rest
}: InputFieldProps<T>) => {
  const methods = useFormContext<T>(); // retrieve all hook methods
  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <FormGroup>
      <Input {...rest} id={id || name} label={label} hint={hint} {...register(name, rules)} />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name as never}
          render={({ message }) => <ValidationErrorMessage>{message}</ValidationErrorMessage>}
        />
      )}
    </FormGroup>
  );
};
