import { ErrorMessage } from '@hookform/error-message';
import {
  ErrorMessage as ValidationErrorMessage,
  FormGroup,
  ITimeInputProps,
  ITimeInputSelection,
  TimeInput,
} from '@team-lightfeather/ui-react-assets';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

type TimeInputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  label: string;
  hint?: string;
} & Omit<ITimeInputProps, 'name'>;

export const TimeInputField = <T extends FieldValues>({
  id,
  name,
  label,
  rules,
  ...rest
}: TimeInputFieldProps<T>) => {
  const methods = useFormContext<T>(); // retrieve all hook methods
  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <FormGroup>
      <TimeInput
        {...rest}
        id={id || name}
        label={label}
        {...register(name, rules)}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onChange={(time: ITimeInputSelection) => {}}
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
