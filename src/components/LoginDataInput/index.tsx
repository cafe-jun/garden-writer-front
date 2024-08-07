import { ReactElement } from 'react';

import st from './LoginDataInput.module.scss';
import { LoginDataInputProps } from './type';
/**
 * login page에서 이메일과 비밀번호를 입력할 때에만 사용되는 input compoent
 *
 * @returns reactElement
 */
export default function LoginDataInput({ isError, ...props }: LoginDataInputProps): ReactElement {
  return (
    <div className={`${st.container} ${st.mt18}`}>
      <input {...props} disabled={false} />
      {isError ? <p>로그인 정보가 일치 하지 않습니다</p> : null}
    </div>
  );
}
