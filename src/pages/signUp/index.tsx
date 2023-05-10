import { SubmitHandler, useForm } from 'react-hook-form';

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
        <input {...register('email')} placeholder="이메일" />
        <input {...register('password')} placeholder="비밀번호" />
        <input {...register('passwordConfirm')} placeholder="비밀번호 확인" />
        <input {...register('name')} placeholder="이름" />
        <div>
          <input {...register('phoneNumber')} placeholder="'-'없이 번호만" />
          <button type="button">인증번호 받기</button>
        </div>
        <div>
          <input {...register('certificationNumber')} placeholder="인증번호" />
          <button type="button">인증번호 받기</button>
        </div>
        <input {...register('nickName')} placeholder="닉네임" />
      </div>
      <button type="submit">시작하기</button>
    </form>
  );
};

export default SignUpPage;
