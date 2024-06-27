import { ReactElement, useEffect, useState } from 'react';

import ChaterInfo from '@/components/ChaterInfo/ChaterInfo';
import GenreBtn from '@/components/GenreBtn/GenreBtn';
import NovelChatManager from '@/components/NovelChatManager/NovelChatManager';
import NovelDefaultInfo from '@/components/NovelDefaultInfo/NovelDefaultInfo';
import NovelJoinUserManager from '@/components/NovelJoinUserManager/NovelJoinUserManager';
import { NovelTabsGray } from '@/components/NovelTabsGray/NovelTabsGray';
import WriterManagerBox from '@/components/WriterManagerBox/WriterManagerBox';
import { config } from '@/config/config';
import { getNovelChapterList, novelRoomInfo } from '@/fetch/get';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import useSocketIO from '@/hooks/useSocketIO';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import useNovelRoom from '@/zustand/stores/useNovelRoom';

import NovelPublish from '../../../components/modals/NovelPublish/NovelPublish';
import st from './detail.module.scss';

const PAGE_1 = '기본정보';
const PAGE_2 = '회차정보';
const PAGE_3 = '소설정보';
const PAGE_4 = '작가관리';

const useChaterList = ({ page, roomId }: { page: number; roomId: number }) => {
  const novelRoom = useNovelRoom();
  const { isSuccess, data } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
  });
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    // on mount refetch를 막지 않았음
    // 챕터를 다시 불러오는 걸 허용했다는 의미임
    // if (novelRoom.lastChapterId !== 0) {
    //   return;
    // }
    novelRoom.setLastChapterId(data.data[0].id);
  }, [isSuccess]);
};
export default function WriteDetail(): ReactElement {
  const wheelEvent = useOnWheelHandle(300);
  const [page, setPage] = useState<number>(1);
  const [tabList, setTabList] = useState<string[]>([PAGE_1, PAGE_2, PAGE_3, PAGE_4]);
  const [currentTap, setCurrentTap] = useState(tabList[0]);
  const [modityMode, setModifyMode] = useState<boolean>(false);

  const roomId = useUrlDatas<number>('room');
  useChaterList({ page, roomId });
  const { data: novelInfo } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });

  const handleCurrentTab = (tab: string): void => {
    setCurrentTap(tab);
    setModifyMode(false);
  };

  useSocketIO({
    url: `${config.wsLink}/room-${roomId}`,
    onChangeWriterSeq(res) {
      console.log(res);
    },
    onKickUser(res) {
      console.log(res);
    },
    onNewChat(res) {
      console.log(res);
      // getNewChatDetail(readJsonData(res).textId);
    },
    onUpdateChat(res) {
      console.log(res);
    },
  });

  return (
    <div className={st.mainBody} onWheel={wheelEvent}>
      <NovelPublish />
      {/* 참여작가 드래그 박스와 공장정보 박스를 row로 관리 */}
      <div className={st.mainBody_content}>
        {/* 참여작가 박스 */}
        <WriterManagerBox />

        {/* 소설공방 정보 박스 start */}
        <div className={st.mainBody_content_column}>
          {/* 소설 제목, 소설 장르 bar start */}
          <div className={`${st.mainBody_content_title} ${modityMode ? st.on : ''}`}>
            {/* 왼쪽 start */}
            <div className={st.content_row}>
              <p className={st.content_text}>{novelInfo?.data.title}</p>

              <GenreBtn disabled={!modityMode} />
            </div>
            {/* 왼쪽 end */}

            {/* 오른쪽 start */}
            <p className={st.content_status}>연재중</p>
          </div>
          {/* 소설 제목, 소설 장르 bar end */}

          <div className={st.mainBody_tab}>
            <NovelTabsGray
              tabs={tabList}
              currentTab={currentTap}
              handleCurrentTab={handleCurrentTab}
            />
          </div>

          {/* 흠........어렵네 */}
          {/* 탭 아래 컨텐트 start */}
          <NovelDefaultInfo isShow={currentTap === PAGE_1} />

          <ChaterInfo isShow={currentTap === PAGE_2} />

          {/* {currentTap === PAGE_3 && <NovelChatManager />} */}
          <NovelChatManager isShow={currentTap === PAGE_3} />

          <NovelJoinUserManager isShow={currentTap === PAGE_4} />

          {/* 탭 아래 컨텐트 end */}
        </div>
        {/* 소설공방 정보 박스 end */}
      </div>
    </div>
  );
}
