import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from './style';

interface Props<T extends FieldValues> {
  type: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

const InputField = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  rules,
}: Props<T>) => <Input type={type} {...register(name, rules)} placeholder={placeholder} />;

export default InputField;
