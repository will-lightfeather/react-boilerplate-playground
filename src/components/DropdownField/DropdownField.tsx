import { ErrorMessage } from '@hookform/error-message';
import {
  Dropdown,
  DropdownProps,
  ErrorMessage as ValidationErrorMessage,
  FormGroup,
} from '@team-lightfeather/ui-react-assets';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

type DropdownFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  hint?: string;
} & Omit<DropdownProps, 'name'>;

export const DropdownField = <T extends FieldValues>({
  id,
  name,
  label,
  children,
  disabled,
  rules,
  ...rest
}: DropdownFieldProps<T>) => {
  const methods = useFormContext<T>(); // retrieve all hook methods
  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <FormGroup>
      <Dropdown
        {...rest}
        id={id || name}
        label={label}
        disabled={disabled}
        {...register(name, rules)}
      >
        {children}
      </Dropdown>

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
