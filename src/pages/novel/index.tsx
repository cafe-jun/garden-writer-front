import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';
import { NovelTable as Table } from '@/components/NovelTable/NovelTable';
import { NovelTabs } from '@/components/NovelTabs/NovelTabs';
import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
// import { Select } from '@/components/Select/Select';
import { config } from '@/config/config';
import { novelList } from '@/fetch/get';
import { NovelListResponse, RoomStatus } from '@/fetch/types';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';

import styles from './novel.module.scss';

const novelTabs = ['참여중', '참여신청'];

const novelFilters = ['최신순', '오래된순'];

const NovelPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(novelTabs[0]);
  const [filter, setFilter] = useState<string>(novelFilters[0]);

  const [roomState, setRoomStatus] = useState<RoomStatus>('attending');
  const [page, setPage] = useState<number>(1);

  const wheelEvent = useOnWheelHandle(300);
  const { data, isSuccess } = useQueryWrap<NovelListResponse>({
    queryKey: ['api/novelList', roomState, page],
    queryFn: () => novelList({ roomState, page }),
  });

  // 참여중, 미참여 탭 버튼을 클릭했을 때
  const handleCurrentTab = (tab: string) => {
    if (currentTab === tab) return;

    setCurrentTab(tab);
    if (tab === '참여중') {
      setRoomStatus('attending');
      setPage(1);
    } else {
      setRoomStatus('apptendApply');
      setPage(1);
    }
  };

  // 정렬 select box를 클릭했을 때
  const handleNovelFilter = (selectedItem: string) => {
    setFilter(selectedItem);
  };

  return (
    <div onWheel={wheelEvent}>
      <PageContentHeader
        backgroundColor="#9CE1E6"
        pageImage={NovelPageHeaderBackground}
        pageName="소설공방"
        summary1="동료 작가들과 함께 글을 써보세요"
      />
      <div className={styles.infoBar}>
        <div className={styles.roomCreateBtnBar}>
          <Link href="/write/info" className={`white-btn ${styles.createBtn}`}>
            소설공방개설 +
          </Link>
          <p>내가 대표 작가로 동료들을 모집하고 글을 쓸 수 있어요.</p>
        </div>
      </div>
      <main className={styles.main}>
        <div>
          <InformationText
            text="대표작가 또는 참여작가로 참여중이면서 현재 연재중 또는 완결된 소설공방이 조회됩니다."
            type={InformationTextType.primary}
          />
          <div className={styles.novelContainer}>
            <div className={styles.novelHeader}>
              <NovelTabs
                tabs={novelTabs}
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
              />
              {/* <Select
                selectedItem={filter}
                options={novelFilters}
                handleSelectedItem={handleNovelFilter}
              /> */}
            </div>
            {/* {isLoading ?  : null} */}
            {!isSuccess &&
              Array(6)
                .fill(0)
                .map((item, index) => (
                  <Skeleton
                    key={item + index.toString()}
                    sx={{
                      width: '1200px',
                      height: '48px',
                      padding: '0px',
                      margin: '0px',
                    }}
                    animation="wave"
                  />
                ))}

            {isSuccess && <Table tab={roomState} tableData={data?.data ?? []} />}
          </div>
        </div>

        <Pagination
          innerClass="cus-pagination"
          itemClass="cus-pagination-li"
          activePage={page}
          itemsCountPerPage={config.pageSize}
          totalItemsCount={data?.meta?.totalCount ?? 0}
          pageRangeDisplayed={5}
          prevPageText="‹"
          nextPageText="›"
          onChange={n => {
            setPage(n);
          }}
        />
      </main>
    </div>
  );
};

export default NovelPage;
