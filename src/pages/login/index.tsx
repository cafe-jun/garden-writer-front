import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import LoginDataInput from '@/components/LoginDataInput';

import LoginLogo from '../../images/login-logo.svg';
import st from './login.module.scss';

export default function Login(): ReactElement {
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
        <LoginDataInput placeholder="이메일을 입력해주세요" isError={false} disabled={false} />
        <LoginDataInput placeholder="비밀번호를 입력해주세요" isError={false} disabled={false} />

        <button type="button" className={`${st.loginBtn} ${st.mt21}`}>
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
