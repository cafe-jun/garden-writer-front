import { SubmitHandler, UseFormTrigger } from 'react-hook-form';

import { SignUpFormValueKeys, SignUpFormValues } from './type';

export const useHandlers = () => {
  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    console.log(data);
  };

  const handleBlurInputField = (
    trigger: UseFormTrigger<SignUpFormValues>,
    name: SignUpFormValueKeys
  ) => {
    trigger(name);
  };

  return { onSubmit, handleBlurInputField };
};
