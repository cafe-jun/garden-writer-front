import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import LoginDataInput from '@/components/LoginDataInput';
import loginApi from '@/fetch/post/loginApi';
import useLoginData from '@/zustand/stores/useLoginData.zst';

import LoginLogo from '../../images/login-logo.svg';
import st from './login.module.scss';

export default function Login(): ReactElement {
  const { email, setEmail, password, setPasswd } = useLoginData();
  const route = useRouter();
  const { mutate, status } = useMutation({
    mutationKey: ['api/login'],
    mutationFn: loginApi,
    onSuccess(data) {
      localStorage.setItem('access', `${data.data.accessToken}`);
      console.log(data);
      route.replace('/novel');
    },
    onError(err) {
      console.log(err);
    },
  });
  return (
    <div className={`${st.container} ${st.mt92}`}>
      {/* 중앙에 배치되는 compoent container start */}
      <div className={st.inputContainer}>
        <Image className={st.mt8} src={LoginLogo} alt="main logo" />
        <p className={st.text1}>
          <span>이야기에 상상력을 더하고</span>
          <br />
          <span>더 높은 가치를 공유하세요</span>
        </p>
        <LoginDataInput
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력해주세요"
          isError={false}
          disabled={false}
        />
        <LoginDataInput
          type="password"
          value={password}
          onChange={e => {
            setPasswd(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요"
          isError={false}
          disabled={false}
        />

        <button
          disabled={status === 'pending'}
          type="button"
          className={`${st.loginBtn} ${st.mt21}`}
          onClick={() => {
            mutate({ email, password });
          }}
        >
          로그인
        </button>

        <p className={`${st.text2} ${st.mt32}`}>
          아직 계정이 없으신가요? <Link href="/">회원가입</Link>
        </p>
        <p className={`${st.text2} ${st.mt12}`}>
          계정이 기억나지 않으시나요? <Link href="/">비밀번호 찾기</Link>
        </p>
      </div>
      {/* 중앙에 배치되는 compoent container end */}
    </div>
  );
}
