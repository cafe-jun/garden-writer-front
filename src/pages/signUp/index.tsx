import { RegisterOptions, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

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

const initFormValues: SignUpFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  certificationNumber: '',
  nickName: '',
};

const InputField: React.FC<{
  name: Name;
  placeholder: string;
  register: UseFormRegister<SignUpFormValues>;
  rules?: RegisterOptions;
}> = ({ name, placeholder, register, rules }) => (
  <input {...register(name, rules)} placeholder={placeholder} />
);

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: initFormValues,
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField name="email" placeholder="이메일" register={register} />
        <InputField name="password" placeholder="비밀번호" register={register} />
        <InputField name="passwordConfirm" placeholder="비밀번호 확인" register={register} />
        <InputField name="name" placeholder="이름" register={register} />
        <div>
          <InputField name="phoneNumber" placeholder="'-'없이 번호만" register={register} />
          <button type="button">인증번호 받기</button>
        </div>
        <div>
          <InputField name="certificationNumber" placeholder="인증번호" register={register} />
          <button type="button">인증번호 받기</button>
        </div>
        <InputField name="nickName" placeholder="닉네임" register={register} />
      </div>
      <button type="submit">시작하기</button>
    </form>
  );
};

export default SignUpPage;
