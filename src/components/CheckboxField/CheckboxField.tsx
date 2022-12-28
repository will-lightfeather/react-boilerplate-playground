import { ErrorMessage } from '@hookform/error-message';
import {
  Checkbox,
  CheckboxProps,
  ErrorMessage as ValidationErrorMessage,
  FormGroup,
} from '@team-lightfeather/ui-react-assets';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  label: string;
  hint?: string;
} & Omit<CheckboxProps, 'name'>;

export const CheckboxField = <T extends FieldValues>({
  id,
  name,
  label,
  rules,
  ...rest
}: CheckboxFieldProps<T>) => {
  const methods = useFormContext<T>(); // retrieve all hook methods
  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <FormGroup>
      <Checkbox {...rest} id={id || name} label={label} {...register(name, rules)} />

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
