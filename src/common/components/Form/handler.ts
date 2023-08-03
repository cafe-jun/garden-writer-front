import { FieldValues, Path, SubmitHandler, UseFormTrigger } from 'react-hook-form';

export const useHandlers = <T extends FieldValues>() => {
  const onSubmit: SubmitHandler<T> = data => {
    console.log(data);
  };

  const handleBlurInputField = (trigger: UseFormTrigger<T>, name: Path<T>) => {
    trigger(name);
  };

  return { onSubmit, handleBlurInputField };
};
