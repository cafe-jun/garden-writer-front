import Image from 'next/image';
import { ReactElement } from 'react';

import { GetOneNovelText } from '@/fetch/types';
import lockIcon from '@/images/lock.svg';
import unLockIcon from '@/images/unlock.svg';

import st from './WriteChat.module.scss';

export default function WriteChat({
  chapterId,
  content,
  createdAt,
  id,
  status,
  updatedAt,
}: GetOneNovelText): ReactElement {
  return (
    <div className={st.chat}>
      <div className={st.chat_bar}>
        <p className={st.chat_nick}>닉네임</p>
        <p className={st.chat_status}>{status}</p>
        <p className={st.chat_date}>{updatedAt}</p>
        <button type="button">
          <Image src={true ? lockIcon : unLockIcon} alt="자물쇠 아이콘" />
        </button>
      </div>
      <p className={st.chat_content}>{content}</p>
    </div>
  );
}
