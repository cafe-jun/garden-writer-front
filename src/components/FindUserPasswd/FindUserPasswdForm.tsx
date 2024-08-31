import { useRouter } from 'next/router';
import st from './FindUserPasswd.module.scss';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { tempPassword } from '@/fetch/post';
import FormInput from '@/components/FormInput/FormInput';
import { emailRegex } from '@/constants/regex';
import { TempPasswordFormValues } from './types';
import { useEffect, useState } from 'react';

const FindUserPasswdForm = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const route = useRouter();
  const { formState, handleSubmit, getValues, trigger, setError } =
    useFormContext<TempPasswordFormValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, status, isError } = useMutation({
    mutationKey: ['api/temp-password'],
    mutationFn: tempPassword,
    onError: (error: any) => {
      if (error === 409) {
        setErrorMessage('존재하지 않는 이메일 입니다.');
      }
    },
    onSuccess: data => {
      setModal(true);
    },
  });
  const { isDirty, isValid } = formState;
  const onSubmit: SubmitHandler<TempPasswordFormValues> = data => {
    if (isValid) {
      mutate({
        email: data.email,
      });
    }
  };
  return (
    <div className={st.main}>
      {/* 중앙에 input contents가 위치하는 div start */}
      <div className={st.main_content}>
        <p className={st.main_text1}>비밀번호 찾기</p>
        <p className={st.main_text2}>
          <span>회원 가입 시 사용한 이메일과 입력하신 이메일이</span>
          <br />
          <span>동일하여야 인증번호를 받을 수 있습니다</span>
        </p>
        {/* 이메일 입력 input box start */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={st.main_inputArea}>
            <p className={st.main_inputArea_text1}>회원 가입 시 사용한 이메일을 입력해주세요</p>
            <FormInput<TempPasswordFormValues>
              regex={emailRegex}
              valuePayload="email"
              requiredMessage="이메일을 입력해주세요."
              validateErrorMessage="이메일 형식에 맞지 않습니다."
              placeholder="이메일"
              label=""
            />
            {isError && errorMessage && (
              <p className={st.main_inputArea_errorText}>{errorMessage}</p>
            )}
          </div>
          {/* 이메일 입력 input box end */}
          <button type="submit" className={st.main_content_compleBtn}>
            임시비밀번호 발급 받기
          </button>
        </form>
      </div>
      {/* 중앙에 input contents가 위치하는 div end */}
    </div>
  );
};

export default FindUserPasswdForm;
