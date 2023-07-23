import { useFormContext } from 'react-hook-form';

import { emailRegex, nicknameRegex, passwordRegex, phoneNumberRegex } from '@/constants/regex';

import FormItem from './FormItem';
import { useHandlers } from './handler';
import {
  Container,
  Description,
  FormContainer,
  FormContents,
  FormContentsMore,
  Header,
  SubmitButton,
  SubTitle,
  Title,
} from './style';
import { SignUpFormValues } from './type';

const SignUpForm = () => {
  const { onSubmit } = useHandlers();
  const { formState, handleSubmit } = useFormContext<SignUpFormValues>();
  const { isDirty, isValid } = formState;

  return (
    <Container>
      <Header>
        <Title>가입을 환영합니다</Title>
        <Description>회원가입에 필요한 정보들을 입력해주세요.</Description>
      </Header>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormContents>
          <SubTitle>필수정보</SubTitle>
          <FormItem
            regex={emailRegex}
            valuePayload="email"
            requiredMessage="이메일을 입력해주세요."
            validateErrorMessage="이메일 형식을 지켜주세요."
            validateSuccessMessage="사용 가능한 이메일입니다."
            label="이메일"
            placeholder="이메일"
            buttonLabel="인증 메일 발송"
          />
          {/* <FormItem
              valuePayload="certificationNumber"
              requiredMessage="인증번호를 입력해주세요."
              validateErrorMessage="인증번호가 일치하지 않습니다."
              validateSuccessMessage="인증번호가 일치합니다."
              label="인증번호"
              placeholder="인증번호를 입력해주세요."
              buttonLabel="확인하기"
            /> */}
          <FormItem
            type="password"
            regex={passwordRegex}
            valuePayload="password"
            requiredMessage="비밀번호를 입력해주세요."
            validateErrorMessage="사용할 수 없는 비밀번호입니다."
            validateSuccessMessage="사용 가능 한 비밀번호입니다."
            label="비밀번호"
            placeholder="비밀번호"
          />
          {/* <FormItem
              type="password"
              valuePayload="passwordConfirm"
              requiredMessage="비밀번호를 확인해주세요."
              validateErrorMessage="비밀번호가 일치하지 않습니다."
              validateSuccessMessage="비밀번호가 일치합니다."
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
            /> */}
          <FormItem
            regex={nicknameRegex}
            valuePayload="nickname"
            requiredMessage="닉네임을 입력해주세요."
            validateErrorMessage="닉네임 형식을 지켜주세요."
            validateSuccessMessage="사용 가능 한 닉네임입니다."
            label="닉네임"
            placeholder="닉네임"
            buttonLabel="중복확인"
          />
        </FormContents>
        <FormContentsMore>
          <SubTitle>추가정보(선택)</SubTitle>
          <FormItem
            regex={phoneNumberRegex}
            valuePayload="phoneNumber"
            validateErrorMessage="- 제외한 숫자만 입력해주세요."
            label="휴대번호"
            placeholder="- 제외한 숫자만 입력 가능"
            buttonLabel="중복확인"
          />
        </FormContentsMore>
        <SubmitButton type="submit" disabled={!isDirty || !isValid}>
          시작하기
        </SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default SignUpForm;
