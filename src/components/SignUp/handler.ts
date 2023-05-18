import { SubmitHandler, UseFormTrigger } from 'react-hook-form';

import { Name, SignUpFormValues } from './type';

export const useHandlers = () => {
  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    console.log(data);
  };

  const handleBlurInputEmail = (trigger: UseFormTrigger<SignUpFormValues>, name: Name) => {
    trigger(name);
  };

  return { onSubmit, handleBlurInputEmail };
};
