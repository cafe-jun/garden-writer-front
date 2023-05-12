import { styled } from 'lib/stitches.config';
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
  <Input {...register(name, rules)} placeholder={placeholder} />
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
      <InputsContainer>
        <InputField name="email" placeholder="이메일" register={register} />
        <InputField name="password" placeholder="비밀번호" register={register} />
        <InputField name="passwordConfirm" placeholder="비밀번호 확인" register={register} />
        <InputField name="name" placeholder="이름" register={register} />
        <InputWrap>
          <InputField name="phoneNumber" placeholder="'-'없이 번호만" register={register} />
          <InputButton type="button">인증번호 받기</InputButton>
        </InputWrap>
        <InputWrap>
          <InputField name="certificationNumber" placeholder="인증번호" register={register} />
          <InputButton type="button">확인하기</InputButton>
        </InputWrap>
        <InputField name="nickName" placeholder="닉네임" register={register} />
      </InputsContainer>
      <SubmitButton type="submit">시작하기</SubmitButton>
    </form>
  );
};

export const InputsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const InputWrap = styled('div', {
  display: 'flex',
  gap: '16px',
});

export const Input = styled('input', {
  padding: '16px',
  flex: '1',
  fontSize: '$f14',
  color: '#2D2D2D',
  borderRadius: '10px',
  border: '1px solid #D9D9D9',
});

export const InputButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '102px',
  height: '48px',
  fontSize: '$f14',
  color: '#059EAF',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  border: '1px solid #059EAF',
  cursor: 'pointer',
});

export const SubmitButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '46px',
  fontSize: '$f14',
  color: '#ffffff',
  backgroundColor: '#059EAF',
  borderRadius: '62px',
  border: 'unset',
});

export default SignUpPage;
