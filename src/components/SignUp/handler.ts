import { SubmitHandler, UseFormTrigger } from 'react-hook-form';

import { Name, SignUpFormValues } from './type';

export const onSubmit: SubmitHandler<SignUpFormValues> = data => {
  console.log(data);
};

export const handleBlurInputEmail = (trigger: UseFormTrigger<SignUpFormValues>, name: Name) => {
  trigger(name);
};
