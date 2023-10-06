import Image from 'next/image';
import { ReactElement } from 'react';

import chatSendPlane from '@/images/chat-send-plane.svg';

import st from './WriteChatSendBox.module.scss';

export default function WriteChatSendBox(): ReactElement {
  return (
    <div className={st.sendBox}>
      <textarea />
      <button type="button">
        <Image src={chatSendPlane} alt="작성한 소설 채팅 보내기 버튼" />
      </button>
    </div>
  );
}
