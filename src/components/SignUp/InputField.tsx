import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from './style';
import { SignUpFormValueKeys, SignUpFormValues } from './type';

interface Props {
  type: string;
  name: SignUpFormValueKeys;
  placeholder: string;
  register: UseFormRegister<SignUpFormValues>;
  rules?: RegisterOptions<SignUpFormValues, SignUpFormValueKeys>;
}

const InputField: React.FC<Props> = ({ type, name, placeholder, register, rules }) => (
  <Input type={type} {...register(name, rules)} placeholder={placeholder} />
);

export default InputField;
