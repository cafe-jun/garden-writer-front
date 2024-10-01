import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import eventBus from '../../../../util/eventBus';
import readJsonData from '../../../../util/readJsonData';
import { config } from '@/config/config';
import { getChatHistory, getOneNovelText } from '@/fetch/get';
import { ChatHistory, GetOneNovelText } from '@/shared';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import useNovelPublishModal from '@/stores/useNovelPublishModal';
import { useNovelRoom } from '@/stores/useNovelRoom';
import Skel from '../../Skel/Skel';
import WriteChat from '../../WriteChat/WirteChat';
import { WriteChatSendBox } from '@/components';
import st from './NovelChatManager.module.scss';
import { useNovelTitleModal } from '@/stores/useNovelTitleModal';
import { useNovelChapter } from '@/stores/useChapter';

export const NovelChatManager = ({ isShow = false }: { isShow: boolean }) => {
  const [allText, setAllText] = useState<GetOneNovelText[]>([]);

  const roomId = useUrlDatas<number>('room');
  const chatContainerRef = useRef<HTMLDivElement>(null);
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
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data?.texts?.length > 0 ? allPages.length + 1 : null,
  });

  const { mutate: getNewChatDetail } = useMutationWrap({
    mutationFn: getOneNovelText,
    onSuccess(res) {
      setAllText(prevState => [...prevState, res.data]);
    },
  });

  const handleNewMessage = useCallback(
    (res: any) => {
      const { textId } = readJsonData(res);
      getNewChatDetail(textId);
    },
    [getNewChatDetail]
  );

  useEffect(() => {
    eventBus.on(config.socketEventNM.newChat, handleNewMessage);
    return () => eventBus.off(config.socketEventNM.newChat, handleNewMessage);
  }, [handleNewMessage, roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allText]);

  useEffect(() => {
    if (isSuccess && data?.pages?.length > 0) {
      const chatsRes = data.pages.map(page => page.data);
      const chatList = chatsRes.flatMap(res => res.texts);
      setAllText(chatList);
    }
  }, [data?.pages, isSuccess]);

  return (
    <div className={`flex flex-col w-full mt-2 ${isShow ? 'flex' : 'hidden'}`}>
      {/* 상단 바 */}
      <div className="flex flex-row items-center justify-between w-full rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] py-4 px-8">
        <div className="flex flex-row items-center">
          <input
            className="text-black text-base font-medium border-none outline-none"
            value={novelChapter.title}
            readOnly
          />
          <button
            className="w-[52px] h-4 rounded-full bg-blue-500 text-white text-xs font-normal flex items-center justify-center cursor-pointer"
            onClick={novelTitleModel.show}
          >
            수정하기
          </button>
        </div>
        <p className="text-black text-base font-medium">작성중</p>
      </div>

      {/* 채팅 내용 영역 */}
      <div
        ref={chatContainerRef}
        className="flex flex-col rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full h-[500px] mt-4 py-4 overflow-y-auto"
      >
        {!isSuccess && <Skel sx={{ width: '100%', height: 100 }} />}
        {allText.map(chat => (
          <WriteChat {...chat} key={chat.id} />
        ))}
      </div>

      {/* 채팅 입력 박스 */}
      <WriteChatSendBox lastNovelNo={novelRoom.lastChapterId} />

      {/* 완료 버튼 */}
      <div className="flex w-full items-center justify-center gap-[46px] py-8">
        <button
          className="w-[200px] h-[48px] bg-blue-500 text-white rounded-lg"
          onClick={() => fetchNextPage()}
        >
          다음 회차 생성
        </button>
        <button
          className="w-[200px] h-[48px] bg-white text-black rounded-lg border"
          onClick={novelPublishModal.show}
        >
          연재신청
        </button>
      </div>
    </div>
  );
};
