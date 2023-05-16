import { useForm } from 'react-hook-form';

import { emailRegex } from '@/constants/regex';

import { handleBlurInputEmail, onSubmit } from './handler';
import { initFormValues } from './initFormValues';
import InputField from './InputField';
import { InputButton, InputsContainer, InputWrap, SubmitButton } from './style';
import { SignUpFormValues } from './type';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignUpFormValues>({
    defaultValues: initFormValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputsContainer>
        <InputField
          name="email"
          placeholder="이메일"
          register={register}
          rules={{
            required: '이메일을 입력해주세요.',
            validate: value => {
              const isValidEmail = emailRegex.test(value);
              if (!isValidEmail) {
                return '이메일 형식을 지켜주세요.';
              }
              return true;
            },
            onBlur: () => handleBlurInputEmail(trigger, 'email'),
          }}
        />
        {errors.email && <p>{errors.email.message}</p>}
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

export default SignUp;
