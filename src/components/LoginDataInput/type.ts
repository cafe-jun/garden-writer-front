import { ComponentProps } from 'react';

export interface LoginDataInputProps extends ComponentProps<'input'> {
  isError: boolean;
}
