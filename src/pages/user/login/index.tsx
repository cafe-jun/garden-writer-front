import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { LoginDataInput } from '@/components';
import { loginApi } from '@/fetch/post';
import useLoginData from '@/zustand/stores/useLoginData.zst';

import LoginLogo from '../../../images/login-logo.svg';
import st from './login.module.scss';
import { storageKey } from '@/constants';

export default function Login() {
  const route = useRouter();
  const { email, setEmail, password, setPassword } = useLoginData();
  const { mutate, status, isError } = useMutation({
    mutationKey: ['api/login'],
    mutationFn: loginApi,
    onSuccess(data) {
      localStorage.setItem(storageKey, `${data.data.accessToken}`);
      route.replace('/work-space');
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ email, password });
    }
  };

  const handleChangeIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickButton = () => {
    mutate({ email, password });
  };

  return (
    <div className={`${st.container}`}>
      <div className={st.inputContainer}>
        <Image src={LoginLogo} alt="작가의 정원 메인 로고" />
        <p className={st.text1}>
          <span>이야기에 상상력을 더하고</span>
          <br />
          <span>더 높은 가치를 공유하세요</span>
        </p>
        <LoginDataInput
          onKeyDown={handleKeyDown}
          value={email}
          onChange={handleChangeIdInput}
          placeholder="이메일을 입력해주세요"
          isError={isError}
          disabled={status === 'pending'}
        />
        <LoginDataInput
          onKeyDown={handleKeyDown}
          type="password"
          value={password}
          onChange={handleChangePasswordInput}
          placeholder="비밀번호를 입력해주세요"
          isError={isError}
          disabled={status === 'pending'}
        />
        <button
          disabled={status === 'pending'}
          type="button"
          className={`${st.loginBtn} ${st.mt21}`}
          onClick={handleClickButton}
        >
          로그인
        </button>
        <p className={`${st.text2} ${st.mt32}`}>
          아직 계정이 없으신가요? <Link href="/join">회원가입</Link>
        </p>
        <p className={`${st.text2} ${st.mt12}`}>
          계정이 기억나지 않으시나요? <Link href="user/find-password">비밀번호 찾기</Link>
        </p>
      </div>
    </div>
  );
}
