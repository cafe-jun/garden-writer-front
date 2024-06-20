import { ReactElement, useEffect, useRef, useState } from 'react';
import readJsonData from 'util/readJsonData';

import { config } from '@/config/config';
import { getNovelChapterList, getOneNovelText } from '@/fetch/get';
import { GetOneNovelText } from '@/fetch/types';
import { useMutationWrap, useQueryWrap } from '@/hooks/reactQeuryWrapper';
import useSocketIO from '@/hooks/useSocketIO';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import WriteChat from '../WriteChat/WirteChat';
import WriteChatSendBox from '../WriteChatSendBox/WriteChatSendBox';
import st from './NovelChatManager.module.scss';

export default function NovelChatManager(): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [allText, setAllText] = useState<GetOneNovelText[]>([]);
  const roomId = useUrlDatas<number>('room');
  const messageEndRef = useRef<HTMLDivElement>(null);

  useSocketIO({
    url: `${config.wsLink}/room-${roomId}`,
    onChangeWriterSeq(res) {
      console.log(res);
    },
    onKickUser(res) {
      console.log(res);
    },
    async onNewChat(res) {
      console.log(res);
      getNewChatDetail(readJsonData(res).textId);
    },
    onUpdateChat(res) {
      console.log(res);
    },
  });
  const { data: chapterList } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
  });
  const { mutate: getNewChatDetail } = useMutationWrap({
    mutationFn: getOneNovelText,
    onSuccess(res) {
      setAllText(prevState => [...prevState, res.data]);
    },
  });
  useEffect(() => {
    if (!messageEndRef.current) {
      return;
    }
    console.log(messageEndRef.current);
    // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [allText]);
  return (
    <div className={st.main}>
      {/* 소설쓰기 탭의 제목 bar start */}
      <div className={st.writingNovel_topBar}>
        <div className={st.writingNovel_row}>
          <input className={st.writingNovel_Title} defaultValue="임시이무니다" />
          <button className={st.writingNovel_modify} type="button">
            수정하기
          </button>
        </div>
        <p className={st.writingNovel_status}>작성중</p>
      </div>
      {/* 소설쓰기 탭의 제목 bar end */}

      <div className={st.writingNovel_textarea}>
        {allText.map(i => (
          <WriteChat {...i} key={i.id} />
        ))}
        <div ref={messageEndRef} />
      </div>

      <WriteChatSendBox lastNovelNo={chapterList?.data[0].id ?? 0} />
    </div>
  );
}
