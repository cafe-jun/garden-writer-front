type Name =
  | 'email'
  | 'certificationNumber'
  | 'password'
  | 'passwordConfirm'
  | 'nickname'
  | 'phoneNumber';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  certificationNumber: string;
  nickname: string;
}

export type { Name, SignUpFormValues };
