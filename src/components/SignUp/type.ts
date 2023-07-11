type Name =
  | 'email'
  | 'certificationNumber'
  | 'password'
  | 'passwordConfirm'
  | 'nickName'
  | 'phoneNumber';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  certificationNumber: string;
  nickName: string;
}

export type { Name, SignUpFormValues };
