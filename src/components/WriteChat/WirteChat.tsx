import Image from 'next/image';
import { ReactElement } from 'react';

import lockIcon from '@/images/lock.svg';
import unLockIcon from '@/images/unlock.svg';

import st from './WriteChat.module.scss';

export default function WriteChat(): ReactElement {
  const str =
    '으으아아아아아아아아아아아아아아아아아아아아 사람 살려 라고 그는 외쳤다. 왜 줄바꿈이 안되지. 왜!!!~~\n그는 멍하니 모니터를 보고 있다';
  return (
    <div className={st.chat}>
      <div className={st.chat_bar}>
        <p className={st.chat_nick}>닉네임</p>
        <p className={st.chat_status}>[상태]</p>
        <p className={st.chat_date}>23.23.23(월) 23:23</p>
        <button type="button">
          <Image src={true ? lockIcon : unLockIcon} alt="자물쇠 아이콘" />
        </button>
      </div>
      <p className={st.chat_content}>{str}</p>
    </div>
  );
}
