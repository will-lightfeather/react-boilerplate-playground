import { ErrorMessage } from '@hookform/error-message';
import {
  ComboBox,
  ErrorMessage as ValidationErrorMessage,
  FormGroup,
  IComboBoxOption,
  IComboBoxProps,
} from '@team-lightfeather/ui-react-assets';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

type ComboboxFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  label: string;
  hint?: string;
} & Omit<IComboBoxProps, 'name'>;

export const ComboBoxField = <T extends FieldValues>({
  id,
  name,
  label,
  options,
  rules,
  ...rest
}: ComboboxFieldProps<T>) => {
  const methods = useFormContext<T>(); // retrieve all hook methods
  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <FormGroup>
      <ComboBox
        {...rest}
        id={id || name}
        label={label}
        options={options}
        {...register(name, rules)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        onChange={(selectedOption: IComboBoxOption) => {}}
      />

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
