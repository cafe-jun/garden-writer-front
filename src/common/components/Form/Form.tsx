import { ReactNode } from 'react';
import { DeepPartial, FormProvider, useForm } from 'react-hook-form';

interface FormProps<T = unknown> {
  defaultValues?: DeepPartial<T>;
  children: ReactNode;
}

const Form = <T extends {}>({ defaultValues, children }: FormProps<T>) => {
  const methods = useForm<T>({
    mode: 'onChange',
    defaultValues: defaultValues || undefined,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
