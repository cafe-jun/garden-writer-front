import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import eventBus from 'util/eventBus';
import readJsonData from 'util/readJsonData';

import { config } from '@/config/config';
import { getChatHistory, getOneNovelText } from '@/fetch/get';
import { ChatHistory, GetOneNovelText } from '@/fetch/types';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import useNovelPublishModal from '@/zustand/stores/useNovelPublishModal';
import useNovelRoom from '@/zustand/stores/useNovelRoom';

import Skel from '../Skel/Skel';
import WriteChat from '../WriteChat/WirteChat';
import WriteChatSendBox from '../WriteChatSendBox/WriteChatSendBox';
import st from './NovelChatManager.module.scss';
import useNovelTitleModal from '@/zustand/stores/useNovelTitleModel';
import useNovelChapter from '@/zustand/stores/useChapter';

export default function NovelChatManager({ isShow = false }: { isShow: boolean }): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [allText, setAllText] = useState<GetOneNovelText[]>([]);
  const roomId = useUrlDatas<number>('room');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const novelPublishModal = useNovelPublishModal();
  const novelTitleModel = useNovelTitleModal();
  const novelRoom = useNovelRoom();
  const novelChapter = useNovelChapter();
  const { data, isSuccess, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      config.apiUrl.getChatHistory({
        chapterId: novelRoom.lastChapterId,
        chunkSize: config.pageSize,
        pageNo: 1,
      }),
    ],
    queryFn: ({ pageParam = 1 }) =>
      getChatHistory({
        chapterId: novelRoom.lastChapterId,
        chunkSize: config.pageSize,
        pageNo: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.data?.texts?.length > 0 ? lastPageParam + 1 : null,
  });

  const { mutate: getNewChatDetail } = useMutationWrap({
    mutationFn: getOneNovelText,
    onSuccess(res) {
      setAllText(prevState => [...prevState, res.data]);
    },
  });
  const handleNewMessage = useCallback((res: any) => {
    getNewChatDetail(readJsonData(res).textId);
  }, []);
  useEffect(() => {
    eventBus.on(config.socketEventNM.newChat, handleNewMessage);
    return () => {
      eventBus.off(config.socketEventNM.newChat, handleNewMessage);
    };
  }, [roomId]);
  useEffect(() => {
    if (!messageEndRef.current) {
      return;
    }
    console.log(messageEndRef.current);
    // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [allText]);
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    if (data.pages.length === 0) {
      return;
    }
    const chatsRes = data.pages.map(chat => chat.data);
    const chats = chatsRes.map(i => i.texts);
    let chatList: ChatHistory[] = [];
    // chatsRes.forEach(i => {
    //   console.log(i);
    // });
    chats.forEach(i => {
      chatList = [...chatList, ...i];
    });

    setAllText(chatList);
  }, [data]);
  return (
    <div className={st.main} style={{ display: isShow ? 'flex' : 'none' }} aria-hidden={isShow}>
      {/* 소설쓰기 탭의 제목 bar start */}
      <div className={st.writingNovel_topBar}>
        <div className={st.writingNovel_row}>
          <input
            className={st.writingNovel_Title}
            defaultValue="임시화"
            value={novelChapter.title}
          />
          <button
            className={st.writingNovel_modify}
            type="button"
            onClick={() => {
              novelTitleModel.show();
            }}
          >
            수정하기
          </button>
        </div>
        <p className={st.writingNovel_status}>작성중</p>
      </div>
      {/* 소설쓰기 탭의 제목 bar end */}

      <div className={st.writingNovel_textarea}>
        {!isSuccess && <Skel sx={{ width: '100%', height: 100 }} />}
        {/* {isSuccess && data.pages.map(chat => chat).texts.map(i => <WriteChat {...i} key={i.id} />)} */}
        {allText.map(i => (
          <WriteChat {...i} key={i.id} />
        ))}
        <div ref={messageEndRef} />
      </div>

      <WriteChatSendBox lastNovelNo={novelRoom.lastChapterId} />

      <div className={st.completeBtns}>
        <button type="button" className={`${st.completeBtn} blue-btn`}>
          다음 회차 생성
        </button>
        <button
          type="button"
          className={`${st.completeBtn} white-btn`}
          onClick={() => {
            novelPublishModal.show();
          }}
        >
          연재신청
        </button>
      </div>
    </div>
  );
}
