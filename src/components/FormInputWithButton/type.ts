import { FieldValues, Path } from 'react-hook-form';

export interface FormInputWithButtonProps<T extends FieldValues> {
  type?: string;
  regex?: RegExp;
  valuePayload: Path<T>;
  requiredMessage?: string;
  validateErrorMessage?: string;
  validateSuccessMessage?: string;
  label: string;
  placeholder: string;
  buttonLabel: string;
  validate?: (value: string) => boolean;
  handleClickButton?: () => void;
}
