import { ReactElement, useState } from 'react';

import { config } from '@/config/config';
import { getWriterListAdmin } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import CusSelectBox from '../CusSelectBox/CusSelectBox';
import WriterListOneRow from '../WriterListOneRow/WriterListOneRow';
import st from './NovelJoinUserManager.module.scss';

export default function NovelJoinUserManager(): ReactElement {
  const [selectListData, setSelectListData] = useState<string[]>(['첫화부터', '마지막화부터']);
  const [userPage, setUserPage] = useState<number>(1);
  const roomId = useUrlDatas<number>('room');
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
  return (
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
  );
}
