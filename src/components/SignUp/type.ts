type SignUpFormValueKeys = keyof SignUpFormValues;

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface Portfolio {
  link: string;
}

export type { SignUpFormValueKeys, SignUpFormValues };
