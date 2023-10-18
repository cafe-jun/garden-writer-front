import { ReactElement } from 'react';

import CommentSend from '@/components/CommentSend/CommentSend';
import NovelComment from '@/components/NovelComment/NovelComment';

import st from './NovelRead.module.scss';

const comm = [
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비2',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비3',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비4',
  },
];
export default function NovelRead(): ReactElement {
  return (
    <div className={st.main}>
      <div className={st.main_title}>
        <p>재벌집 아이들</p>
        <p>999화 헬창의 삶</p>
      </div>

      <div className={st.novelText}>
        아침에 일어났다. 잠 자는 동안 발생했던 근손실을 메꾸기 위해 단백질 쉐이크 1kg을 마셨다
      </div>

      <div className={st.main_commentCount}>댓글 2</div>

      {comm.map(i => (
        <NovelComment key={i.nickName} {...i} />
      ))}

      <CommentSend />
    </div>
  );
}
