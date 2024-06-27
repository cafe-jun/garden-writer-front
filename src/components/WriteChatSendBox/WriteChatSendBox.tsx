import Image from 'next/image';
import { KeyboardEvent, ReactElement, useState } from 'react';

import { config } from '@/config/config';
import { newNovelText } from '@/fetch/post';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import chatSendPlane from '@/images/chat-send-plane.svg';

import st from './WriteChatSendBox.module.scss';

interface WriteChatSendBoxProps {
  lastNovelNo: number;
}
export default function WriteChatSendBox({ lastNovelNo }: WriteChatSendBoxProps): ReactElement {
  const { mutate: sendNewChat } = useMutationWrap({
    mutationKey: [config.apiUrl.newNovelText],
    mutationFn: newNovelText,
  });
  const [text, setText] = useState<string>('');
  const sendText = () => {
    if (lastNovelNo === 0) {
      return;
    }
    console.log(lastNovelNo);
    sendNewChat({ content: text, chapterId: lastNovelNo });
    setText('');
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendText();
      // Enter key alone pressed, you can add custom behavior here if needed.
    }
  };
  return (
    <div className={st.sendBox}>
      <textarea
        value={text}
        onKeyDown={handleKeyDown}
        onChange={event => setText(event.target.value)}
      />
      <button type="button" onClick={() => sendText()}>
        <Image src={chatSendPlane} alt="작성한 소설 채팅 보내기 버튼" />
      </button>
    </div>
  );
}
