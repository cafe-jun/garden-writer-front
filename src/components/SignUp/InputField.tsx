import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from './style';
import { Name, SignUpFormValues } from './type';

interface Props {
  type: string;
  name: Name;
  placeholder: string;
  register: UseFormRegister<SignUpFormValues>;
  rules?: RegisterOptions<SignUpFormValues, Name>;
}

const InputField: React.FC<Props> = ({ type, name, placeholder, register, rules }) => (
  <Input type={type} {...register(name, rules)} placeholder={placeholder} />
);

export default InputField;
