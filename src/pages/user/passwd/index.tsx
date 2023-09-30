import { ReactElement } from 'react';

import st from './FindUserPasswd.module.scss';

export default function FindUserPasswd(): ReactElement {
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
        <div className={st.main_inputArea}>
          <p className={st.main_inputArea_text1}>회원 가입 시 사용한 이메일을 입력해주세요</p>
          <input type="email" />
          <p className={st.main_inputArea_errorText}>error text</p>
        </div>
        {/* 이메일 입력 input box end */}

        <button type="button" className={st.main_content_compleBtn}>
          임시비밀번호 발급 받기
        </button>
      </div>
      {/* 중앙에 input contents가 위치하는 div end */}
    </div>
  );
}
