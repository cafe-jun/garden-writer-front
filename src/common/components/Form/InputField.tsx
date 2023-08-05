import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import styles from './Form.module.scss';

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
}: Props<T>) => (
  <input
    className={styles.input}
    type={type}
    {...register(name, rules)}
    placeholder={placeholder}
  />
);

export default InputField;
