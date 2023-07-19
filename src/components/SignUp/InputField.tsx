import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from './style';
import { Name, SignUpFormValues } from './type';

interface Props {
  name: Name;
  placeholder: string;
  register: UseFormRegister<SignUpFormValues>;
  rules?: RegisterOptions<SignUpFormValues, Name>;
}

const InputField: React.FC<Props> = ({ name, placeholder, register, rules }) => (
  <Input {...register(name, rules)} placeholder={placeholder} />
);

export default InputField;
