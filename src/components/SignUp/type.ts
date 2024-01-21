type SignUpFormValueKeys = keyof SignUpFormValues;

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  // phoneNumber: string;
  certificationNumber: string;
  nickname: string;
  portfolios: Portfolio[];
}

export interface Portfolio {
  link: string;
}

export type { SignUpFormValueKeys, SignUpFormValues };
