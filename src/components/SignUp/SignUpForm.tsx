import { SubmitHandler, useFormContext } from 'react-hook-form';

import { emailRegex, nicknameRegex, passwordRegex, phoneNumberRegex } from '@/constants/regex';

import FormInput from '../FormInput/FormInput';
import FormInputWithButton from '../FormInputWithButton/FormInputWithButton';
import styles from './SignUp.module.scss';
import { SignUpFormValues } from './type';

const SignUpForm = () => {
  const { formState, handleSubmit } = useFormContext<SignUpFormValues>();
  const { isDirty, isValid } = formState;
  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>가입을 환영합니다</h2>
        <span className={styles.description}>회원가입에 필요한 정보들을 입력해주세요.</span>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContents}>
          <h3 className={styles.subTitle}>필수정보</h3>
          <FormInputWithButton<SignUpFormValues>
            regex={emailRegex}
            valuePayload="email"
            requiredMessage="이메일을 입력해주세요."
            validateErrorMessage="이메일 형식을 지켜주세요."
            validateSuccessMessage="사용 가능한 이메일입니다."
            label="이메일"
            placeholder="이메일"
            buttonLabel="인증 메일 발송"
          />
          {/* <FormInput<SignUpFormValues>
              valuePayload="certificationNumber"
              requiredMessage="인증번호를 입력해주세요."
              validateErrorMessage="인증번호가 일치하지 않습니다."
              validateSuccessMessage="인증번호가 일치합니다."
              label="인증번호"
              placeholder="인증번호를 입력해주세요."
              buttonLabel="확인하기"
            /> */}
          <FormInput<SignUpFormValues>
            type="password"
            regex={passwordRegex}
            valuePayload="password"
            requiredMessage="비밀번호를 입력해주세요."
            validateErrorMessage="사용할 수 없는 비밀번호입니다."
            validateSuccessMessage="사용 가능 한 비밀번호입니다."
            label="비밀번호"
            placeholder="비밀번호"
          />
          {/* <FormInput<SignUpFormValues>
              type="password"
              valuePayload="passwordConfirm"
              requiredMessage="비밀번호를 확인해주세요."
              validateErrorMessage="비밀번호가 일치하지 않습니다."
              validateSuccessMessage="비밀번호가 일치합니다."
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
            /> */}
          <FormInputWithButton<SignUpFormValues>
            regex={nicknameRegex}
            valuePayload="nickname"
            requiredMessage="닉네임을 입력해주세요."
            validateErrorMessage="닉네임 형식을 지켜주세요."
            validateSuccessMessage="사용 가능 한 닉네임입니다."
            label="닉네임"
            placeholder="닉네임"
            buttonLabel="중복확인"
          />
        </div>
        <article className={styles.formContentsMore}>
          <h3 className={styles.subTitle}>추가정보(선택)</h3>
          <FormInputWithButton<SignUpFormValues>
            regex={phoneNumberRegex}
            valuePayload="phoneNumber"
            validateErrorMessage="- 제외한 숫자만 입력해주세요."
            label="휴대번호"
            placeholder="- 제외한 숫자만 입력 가능"
            buttonLabel="중복확인"
          />
        </article>
        <button className={styles.submitButton} type="submit" disabled={!isDirty || !isValid}>
          시작하기
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
