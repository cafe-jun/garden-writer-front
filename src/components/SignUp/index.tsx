import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { emailRegex } from '@/constants/regex';

import { useHandlers } from './handler';
import { initFormValues } from './initFormValues';
import InputField from './InputField';
import {
  Container,
  Description,
  Form,
  FormContents,
  FormContentsMore,
  FormErrorLabel,
  FormItem,
  FormLabel,
  FormSuccessLabel,
  Header,
  InputButton,
  InputWithButtonContainer,
  SubmitButton,
  SubTitle,
  Title,
} from './style';
import { SignUpFormValues } from './type';

const SignUp = () => {
  const { onSubmit, handleBlurInputEmail } = useHandlers();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<SignUpFormValues>({
    defaultValues: initFormValues,
  });

  const emailValidate = useCallback((value: string) => {
    const isValidEmail = emailRegex.test(value);
    return isValidEmail;
  }, []);

  const emailValidateRule = useMemo(
    () => (value: string) => emailValidate(value) ? true : '이메일 형식을 지켜주세요.',
    [emailValidate]
  );

  const emailFieldValue = useMemo(() => getValues('email'), [getValues('email')]);

  return (
    <Container>
      <Header>
        <Title>가입을 환영합니다</Title>
        <Description>회원가입에 필요한 정보들을 입력해주세요.</Description>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContents>
          <SubTitle>필수정보</SubTitle>
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <InputWithButtonContainer>
              <InputField
                name="email"
                placeholder="이메일"
                register={register}
                rules={{
                  required: '이메일을 입력해주세요.',
                  validate: emailValidateRule,
                  onBlur: () => handleBlurInputEmail(trigger, 'email'),
                }}
              />
              <InputButton type="button" disabled={!emailValidate(emailFieldValue)}>
                인증 메일 발송
              </InputButton>
            </InputWithButtonContainer>
            {errors.email && <FormErrorLabel>{errors.email.message}</FormErrorLabel>}
            {emailValidate(emailFieldValue) && (
              <FormSuccessLabel>사용 가능한 이메일입니다.</FormSuccessLabel>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>인증번호</FormLabel>
            <InputWithButtonContainer>
              <InputField name="certificationNumber" placeholder="인증번호" register={register} />
              <InputButton type="button">확인하기</InputButton>
            </InputWithButtonContainer>
          </FormItem>
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <InputField name="password" placeholder="비밀번호" register={register} />
          </FormItem>
          <FormItem>
            <FormLabel>비밀번호 확인</FormLabel>
            <InputField name="passwordConfirm" placeholder="비밀번호 확인" register={register} />
          </FormItem>
          <FormItem>
            <FormLabel>닉네임</FormLabel>
            <InputWithButtonContainer>
              <InputField name="nickName" placeholder="닉네임" register={register} />
              <InputButton type="button">중복확인</InputButton>
            </InputWithButtonContainer>
          </FormItem>
        </FormContents>
        <FormContentsMore>
          <SubTitle>추가정보(선택)</SubTitle>
          <FormItem>
            <FormLabel>휴대번호</FormLabel>
            <InputField
              name="phoneNumber"
              placeholder="- 제외한 숫자만 입력 가능"
              register={register}
            />
          </FormItem>
        </FormContentsMore>
        <SubmitButton type="submit">시작하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignUp;
