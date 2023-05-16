import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from './style';
import { Name, SignUpFormValues } from './type';

const InputField: React.FC<{
  name: Name;
  placeholder: string;
  register: UseFormRegister<SignUpFormValues>;
  rules?: RegisterOptions<SignUpFormValues, Name>;
}> = ({ name, placeholder, register, rules }) => (
  <Input {...register(name, rules)} placeholder={placeholder} />
);

export default InputField;
