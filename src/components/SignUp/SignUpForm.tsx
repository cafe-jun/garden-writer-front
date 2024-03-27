import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { emailRegex, nicknameRegex, passwordRegex } from '@/constants/regex';
import { userList } from '@/fetch/get';
import { signUp } from '@/fetch/post';
import { useTimer } from '@/hooks/useTimer';

import FormInput from '../FormInput/FormInput';
import FormInputWithButton from '../FormInputWithButton/FormInputWithButton';
import styles from './SignUp.module.scss';
import { SignUpFormValues } from './type';

const SignUpForm = () => {
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState<boolean>(true);
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState<boolean>(true);
  const [isClickedEmailDuplicateButton, setIsClickedEmailDuplicateButton] =
    useState<boolean>(false);
  const [isClickedNicknameDuplicateButton, setIsClickedNicknameDuplicateButton] =
    useState<boolean>(false);
  const [isPushEmail, setIsPushEmail] = useState<boolean>(false);

  const isValidEmail = isClickedEmailDuplicateButton && !isDuplicatedEmail;
  const isValidNickname = isClickedNicknameDuplicateButton && !isDuplicatedNickname;
  // const emailButtonLabel = isClickedEmailDuplicateButton ? '인증 메일 발송' : '중복 확인';
  const emailButtonLabel = '중복 확인';
  const emailValidateSuccessMessage = isValidEmail ? '사용 가능한 이메일입니다.' : '';
  const nicknameValidateSuccessMessage = isValidNickname ? '사용 가능 한 닉네임입니다.' : '';

  const route = useRouter();
  const { time, isActive, startTimer, resetTimer } = useTimer({
    initialTime: 600,
    onTimerComplete: handleTimerComplete,
  });
  const { formState, handleSubmit, getValues } = useFormContext<SignUpFormValues>();
  const { isDirty, isValid } = formState;
  const { data: userListData } = useQuery({
    queryKey: ['api/userList'],
    queryFn: () => userList(),
    placeholderData: keepPreviousData,
  });
  const { mutate, status, isError } = useMutation({
    mutationKey: ['api/signUp'],
    mutationFn: signUp,
  });

  useEffect(() => {
    console.log(userListData);
  }, [userListData]);

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    try {
      if (isValidEmail && isValidNickname) {
        mutate({
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        });
        route.replace('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleTimerComplete() {
    setIsPushEmail(false);
  }

  const handleEmailButton = (): void => {
    if (isClickedEmailDuplicateButton) {
      // handlePushEmailButton();
    } else {
      handleEmailDuplicatedButton();
    }
  };

  function handleCertificationNumberButton(): void {
    console.log(true);
  }

  const handleEmailDuplicatedButton = (): void => {
    const isDuplicated = userListData?.data.some((data: any) => data.email === getValues('email'));

    if (isDuplicated) {
      setIsClickedEmailDuplicateButton(false);
      setIsDuplicatedEmail(true);
    } else {
      setIsClickedEmailDuplicateButton(true);
      setIsDuplicatedEmail(false);
    }
  };

  const handleNicknameButton = (): void => {
    const isDuplicated = userListData?.data.some(
      (data: any) => data.nickname === getValues('nickname')
    );

    if (isDuplicated) {
      setIsClickedNicknameDuplicateButton(false);
      setIsDuplicatedNickname(true);
      console.log('중복');
    } else {
      setIsClickedNicknameDuplicateButton(true);
      setIsDuplicatedNickname(false);
      console.log('중복x');
    }
  };

  function handlePushEmailButton(): void {
    setIsPushEmail(true);
    startTimer();
  }

  function passwordConfirmValidate() {
    return getValues('password') !== '' && getValues('password') === getValues('passwordConfirm');
  }

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
            validateSuccessMessage={emailValidateSuccessMessage}
            label="이메일"
            disabled={isValidEmail}
            buttonDisabled={!isDuplicatedEmail && isPushEmail}
            placeholder="이메일"
            buttonLabel={emailButtonLabel}
            handleClickButton={handleEmailButton}
          />
          {/* <div className={styles.certificationNumberWrap}>
            <FormInputWithButton<SignUpFormValues>
              valuePayload="certificationNumber"
              requiredMessage="인증번호를 입력해주세요."
              validateErrorMessage="인증번호가 일치하지 않습니다."
              validateSuccessMessage="인증번호가 일치합니다."
              label="인증번호"
              placeholder="인증번호를 입력해주세요."
              buttonLabel="확인하기"
              handleClickButton={handleCertificationNumberButton}
              buttonDisabled={!isActive}
            />
            {isActive && (
              <p className={styles.certificationNumberTimer}>
                {Math.floor(time / 60)}:{time % 60}
              </p>
            )}
          </div> */}
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
          <FormInput<SignUpFormValues>
            type="password"
            validate={() => passwordConfirmValidate()}
            valuePayload="passwordConfirm"
            requiredMessage="비밀번호를 확인해주세요."
            validateErrorMessage="비밀번호가 일치하지 않습니다."
            validateSuccessMessage="비밀번호가 일치합니다."
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
          />
          <FormInputWithButton<SignUpFormValues>
            regex={nicknameRegex}
            valuePayload="nickname"
            requiredMessage="닉네임을 입력해주세요."
            validateErrorMessage="닉네임 형식을 지켜주세요."
            validateSuccessMessage={nicknameValidateSuccessMessage}
            label="닉네임"
            placeholder="닉네임"
            buttonLabel="중복확인"
            disabled={isValidNickname}
            buttonDisabled={isValidNickname}
            handleClickButton={handleNicknameButton}
          />
        </div>
        {/* <article className={styles.formContentsMore}>
          <h3 className={styles.subTitle}>추가정보(선택)</h3>
          <FormInputWithButton<SignUpFormValues>
            regex={phoneNumberRegex}
            valuePayload="phoneNumber"
            validateErrorMessage="- 제외한 숫자만 입력해주세요."
            label="휴대번호"
            placeholder="- 제외한 숫자만 입력 가능"
            buttonLabel="중복확인"
          />
          <IncreaseInput<SignUpFormValues>
            valuePayload="portfolios"
            label="작가 포트폴리오"
            placeholder="나를 소개할 수 있는 링크 (SNS, 블로그, 웹소설 등)"
          />
        </article> */}
        <button className={styles.submitButton} type="submit" disabled={!isDirty || !isValid}>
          시작하기
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
