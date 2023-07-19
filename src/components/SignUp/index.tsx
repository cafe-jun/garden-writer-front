import { FormProvider, useForm } from 'react-hook-form';

import { emailRegex, nicknameRegex } from '@/constants/regex';

import FormItemWithButton from './FormItemWithButton';
import { useHandlers } from './handler';
import { initFormValues } from './initFormValues';
import InputField from './InputField';
import {
  Container,
  Description,
  Form,
  FormContents,
  FormContentsMore,
  FormItem,
  FormLabel,
  Header,
  InputButton,
  InputWithButtonContainer,
  SubmitButton,
  SubTitle,
  Title,
} from './style';
import { SignUpFormValues } from './type';

const SignUp = () => {
  const { onSubmit } = useHandlers();
  const methods = useForm<SignUpFormValues>({
    defaultValues: initFormValues,
  });

  return (
    <FormProvider {...methods}>
      <Container>
        <Header>
          <Title>가입을 환영합니다</Title>
          <Description>회원가입에 필요한 정보들을 입력해주세요.</Description>
        </Header>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormContents>
            <SubTitle>필수정보</SubTitle>
            <FormItemWithButton
              regex={emailRegex}
              valuePayload="email"
              requiredMessage="이메일을 입력해주세요."
              errorMessage="이메일 형식을 지켜주세요."
              successMessage="사용 가능한 이메일입니다."
              label="이메일"
              placeholder="이메일"
              buttonLabel="인증 메일 발송"
            />
            <FormItem>
              <FormLabel>인증번호</FormLabel>
              <InputWithButtonContainer>
                <InputField
                  name="certificationNumber"
                  placeholder="인증번호"
                  register={methods.register}
                />
                <InputButton type="button">확인하기</InputButton>
              </InputWithButtonContainer>
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <InputField name="password" placeholder="비밀번호" register={methods.register} />
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <InputField
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                register={methods.register}
              />
            </FormItem>
            <FormItemWithButton
              regex={nicknameRegex}
              valuePayload="nickname"
              requiredMessage="닉네임을 입력해주세요."
              errorMessage="닉네임 형식을 지켜주세요."
              label="닉네임"
              placeholder="닉네임"
              buttonLabel="중복확인"
            />
          </FormContents>
          <FormContentsMore>
            <SubTitle>추가정보(선택)</SubTitle>
            <FormItem>
              <FormLabel>휴대번호</FormLabel>
              <InputField
                name="phoneNumber"
                placeholder="- 제외한 숫자만 입력 가능"
                register={methods.register}
              />
            </FormItem>
          </FormContentsMore>
          <SubmitButton type="submit">시작하기</SubmitButton>
        </Form>
      </Container>
    </FormProvider>
  );
};

export default SignUp;
