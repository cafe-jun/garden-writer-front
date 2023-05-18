type Name =
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'name'
  | 'phoneNumber'
  | 'certificationNumber'
  | 'nickName';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  certificationNumber: string;
  nickName: string;
}

export type { Name, SignUpFormValues };
