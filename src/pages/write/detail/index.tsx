import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ReactElement, useState } from 'react';

import CusSelectBox from '@/components/CusSelectBox/CusSelectBox';
import EpisodeListOneRow from '@/components/EpisodeListOneRow/EpisodeListOneRow';
import GenreBtn from '@/components/GenreBtn/GenreBtn';
import { NovelTabsGray } from '@/components/NovelTabsGray/NovelTabsGray';
import PaginationBar from '@/components/PaginationBar/PaginationBar';
import ScrollTextBox from '@/components/ScrollTextBox/ScrollTextBox';
import WriteChat from '@/components/WriteChat/WirteChat';
import WriteChatSendBox from '@/components/WriteChatSendBox/WriteChatSendBox';
import WriterListOneRow from '@/components/WriterListOneRow/WriterListOneRow';
import WriterManagerBox from '@/components/WriterManagerBox/WriterManagerBox';
import { config } from '@/config/config';
import { getNovelChapterList, getWriterListAdmin, novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import st from './detail.module.scss';

const PAGE_1 = '기본정보';
const PAGE_2 = '회차정보';
const PAGE_3 = '소설정보';
const PAGE_4 = '작가관리';
export default function WriteDetail(): ReactElement {
  const [data, setData] = useState<string[]>(['1111111', '222222', '33333']);
  const [page, setPage] = useState<number>(1);
  const [tabList, setTabList] = useState<string[]>([PAGE_1, PAGE_2, PAGE_3, PAGE_4]);

  const [currentTap, setCurrentTap] = useState(tabList[0]);

  const [modityMode, setModifyMode] = useState<boolean>(false);

  const [selectListData, setSelectListData] = useState<string[]>(['첫화부터', '마지막화부터']);

  const roomId = useUrlDatas();

  const { data: novelInfo } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });

  const { data: chapterList } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
  });

  const { data: writerListForAdmin } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterListAdmin, roomId],
    queryFn: () => getWriterListAdmin(roomId),
  });

  // const docParser = new DOMParser();
  const htmlStr =
    '<p style="font-size:20px; color: red;">이름</p><p style="font-size:10px; color: blue;">시간</p><button>테스트 버튼</button>';
  // const doc = docParser.parseFromString(htmlStr, 'text/html');

  return (
    <div className={st.mainBody}>
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
          {currentTap === PAGE_1 ? (
            <div className={st.main}>
              <div className={st.main_imgAndTextBox}>
                <div className={st.img} />
                <div className={st.main_textColumn}>
                  <ScrollTextBox
                    disabled={!modityMode}
                    title={novelInfo?.data.subTitle ?? ''}
                    date={novelInfo?.data.updatedAt ?? ''}
                    style={{ width: '718px', height: '138px', marginLeft: '8px' }}
                  />

                  <div className={`${st.main_tagBox} ${modityMode ? st.mdf : ''}`}>
                    <div className={st.main_tag_flexWrap}>
                      {/* {['aaa', 'ddd', 'cccc'].map(i => (
                        <div key={i} className={st.main_tagBox_tag}>
                          #{i}
                        </div>
                      ))} */}
                      <div className={st.main_tagBox_tag}>#{novelInfo?.data.category}</div>
                    </div>
                    <p className={st.main_tag_date}>시간</p>
                  </div>
                </div>
              </div>

              {/* 등장인물 */}
              <ScrollTextBox
                disabled={!modityMode}
                title={novelInfo?.data.character ?? ''}
                date={novelInfo?.data.updatedAt ?? ''}
                style={{ width: '996px', height: '186px', marginTop: '8px' }}
              />
              {/* 줄거리 */}
              <ScrollTextBox
                disabled={!modityMode}
                title={novelInfo?.data.summary ?? ''}
                date={novelInfo?.data.updatedAt ?? ''}
                style={{ width: '996px', height: '186px', marginTop: '8px' }}
              />

              <button type="button" className={st.main_infoModifyBtn} onClick={toggleModify}>
                기본정보 수정
              </button>
            </div>
          ) : null}

          {currentTap === PAGE_2 ? (
            <div className={st.main}>
              <div className={st.main_list}>
                {/* select bar가 있는 영역 start */}
                <div className={st.main_list_selectBar}>
                  <CusSelectBox data={selectListData} />
                </div>
                {/* select bar가 있는 영역 end */}

                {/* 회차정보 list column name bar start */}
                <div className={st.main_list_columnName}>
                  <p className={st.main_list_episode}>회차</p>
                  <p className={st.main_list_title}>제목</p>
                  <p className={st.main_list_finalRetouchDate}>최종작성일</p>
                  <p className={st.main_list_status}>상태</p>
                  <p className={st.main_list_serialApprovalDate}>연재승인일</p>
                  <p className={st.main_list_views}>조회수</p>
                  <p className={st.main_list_commnents}>댓글</p>
                  <p className={st.main_list_likes}>좋아요</p>
                </div>
                {/* 회차정보 list column name bar end */}

                {/* 회차정보 row start */}
                {chapterList?.data.map(i => (
                  <EpisodeListOneRow key={i.id} {...i} />
                ))}
                {/* 회차정보 row end */}
                {chapterList ? <PaginationBar type="white" {...chapterList?.meta} /> : null}
              </div>
            </div>
          ) : null}

          {currentTap === PAGE_3 ? (
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
                {['1111111', '2222222', '333333333'].map(i => (
                  <WriteChat key={i} />
                ))}
              </div>

              <WriteChatSendBox />
            </div>
          ) : null}

          {currentTap === PAGE_4 ? (
            <div className={st.main}>
              <div className={st.main_list}>
                {/* select bar가 있는 영역 start */}
                <div className={st.main_list_selectBar}>
                  <CusSelectBox data={selectListData} />

                  <button type="button" className={st.main_list_goPost}>
                    작가 모집글 보러가기
                  </button>
                </div>
                {/* select bar가 있는 영역 end */}

                {/* 작가관리 list column name bar start */}
                <div className={`${st.main_writerlist_columnName} ${st.mt8}`}>
                  <p className={st.main_writerlist_Number}>No</p>
                  <p className={st.main_writerlist_nickName}>닉네임</p>
                  <p className={st.main_writerlist_textAmount}>작성분량</p>
                  <p className={st.main_writerlist_dateForParticipation}>참여신청일</p>
                  <p className={st.main_writerlist_approvalStatus}>참여승인/반려일</p>
                  <p className={st.main_writerlist_exitDate}>퇴장일</p>
                  <p className={st.main_writerlist_participationStatus}>참여상태</p>
                </div>
                {/* 작가관리 list column name bar end */}

                {/* 작가관리 row start */}
                {writerListForAdmin?.data.map((item, index) => (
                  <WriterListOneRow key={item.id} {...item} />
                ))}
                {/* 작가관리 row end */}

                {/* <PaginationBar /> */}
              </div>
            </div>
          ) : null}

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
