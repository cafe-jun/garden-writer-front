import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ReactElement, useMemo, useState } from 'react';

import ChaterInfo from '@/components/ChaterInfo/ChaterInfo';
import GenreBtn from '@/components/GenreBtn/GenreBtn';
import NovelChatManager from '@/components/NovelChatManager/NovelChatManager';
import NovelDefaultInfo from '@/components/NovelDefaultInfo/NovelDefaultInfo';
import NovelJoinUserManager from '@/components/NovelJoinUserManager/NovelJoinUserManager';
import { NovelTabsGray } from '@/components/NovelTabsGray/NovelTabsGray';
import WriterManagerBox from '@/components/WriterManagerBox/WriterManagerBox';
import { config } from '@/config/config';
import { getWriterListAdmin, novelRoomInfo } from '@/fetch/get';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import st from './detail.module.scss';

const PAGE_1 = '기본정보';
const PAGE_2 = '회차정보';
const PAGE_3 = '소설정보';
const PAGE_4 = '작가관리';
export default function WriteDetail(): ReactElement {
  const wheelEvent = useOnWheelHandle(300);
  const [data, setData] = useState<string[]>(['1111111', '222222', '33333']);
  const [page, setPage] = useState<number>(1);
  const [userPage, setUserPage] = useState<number>(1);

  const [modityMode, setModifyMode] = useState<boolean>(false);

  const [selectListData, setSelectListData] = useState<string[]>(['첫화부터', '마지막화부터']);

  const roomId = useUrlDatas<number>('room');

  const { data: novelInfo } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });

  const {
    data: writerListForAdmin,
    isSuccess,
    isError,
    isLoading,
  } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterListAdmin, roomId],
    queryFn: () => getWriterListAdmin({ roomId, page: userPage }),
    retry: 1,
  });
  // const [tabList, setTabList] = useState<string[]>([PAGE_1, PAGE_2, PAGE_3, PAGE_4]);
  const tabList = useMemo(() => {
    if (isError) {
      return [PAGE_1, PAGE_2, PAGE_3];
    }
    return [PAGE_1, PAGE_2, PAGE_3, PAGE_4];
  }, [isError]);

  const [currentTap, setCurrentTap] = useState(tabList[0]);
  return (
    <div className={st.mainBody} onWheel={wheelEvent}>
      {/* 참여작가 드래그 박스와 공장정보 박스를 row로 관리 */}
      <div className={st.mainBody_content}>
        {/* 참여작가 박스 */}
        <WriterManagerBox handleDragEnd={handleDragEnd} />

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
          {currentTap === PAGE_1 ? <NovelDefaultInfo /> : null}

          {currentTap === PAGE_2 ? <ChaterInfo /> : null}

          {currentTap === PAGE_3 && <NovelChatManager />}

          {currentTap === PAGE_4 ? <NovelJoinUserManager /> : null}

          {/* 탭 아래 컨텐트 end */}
        </div>
        {/* 소설공방 정보 박스 end */}
      </div>
    </div>
  );

  function handleCurrentTab(tab: string): void {
    setCurrentTap(tab);
    setModifyMode(false);
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (over === null) {
      return;
    }
    // console.log('active', active);
    // console.log('over', over);
    if (active.id !== over.id) {
      data.indexOf(active.id.toString());
      setData((p: string[]) => {
        const old = p.indexOf(active.id.toString());
        const newA = p.indexOf(over.id.toString());

        return arrayMove(p, old, newA);
      });
    }
  }
  function toggleModify() {
    setModifyMode(p => !p);
  }
}
