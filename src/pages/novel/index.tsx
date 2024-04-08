import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';
import { NovelTable as Table } from '@/components/NovelTable/NovelTable';
import { NovelTable, NovelTableStatus, NovelTableUserType } from '@/components/NovelTable/type';
import { NovelTabs } from '@/components/NovelTabs/NovelTabs';
import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import { Select } from '@/components/Select/Select';
import { config } from '@/config/config';
import { novelList } from '@/fetch/get';
import { NovelListResponse, NovelPost, RoomStatus } from '@/fetch/types';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.png';

import styles from './novel.module.scss';

export const activeNovelTableData: NovelTable[] = [
  {
    id: 'haefasdfdf',
    category: '일반소설',
    title: '재벌집 막내아들',
    created: '2023-05-02',
    completed: '',
    user_type: NovelTableUserType.main,
    user_limit: 5,
    attend_users_number: 3,
    current_writer: '아얀',
    status: NovelTableStatus.completed,
  },
  {
    id: 'haedfsdffasdfdf',
    category: '퓨전',
    title: '배고파',
    created: '2023-05-14',
    completed: '',
    user_type: NovelTableUserType.sub,
    user_limit: 5,
    attend_users_number: 1,
    current_writer: '진식',
    status: NovelTableStatus.active,
  },
];

export const deactiveNovelTableData: NovelTable[] = [
  {
    id: 'shjrrw',
    category: '퓨전',
    title: '배불러',
    created: '2023-05-14',
    completed: '',
    user_type: NovelTableUserType.sub,
    user_limit: 5,
    attend_users_number: 1,
    current_writer: '진식',
    status: NovelTableStatus.active,
  },
];

export const novelTabs = ['참여중', '내 활동'];

export const novelFilters = ['최신순', '오래된순'];

const pageContentHeader = {
  title: '소설공방',
  description: '지금 바로 작가의 정원과 함께 소설을 연재해 보세요!',
  buttonTitle: '소설공방 개설',
  backgroundImage: NovelPageHeaderBackground,
};

const NovelPage = () => {
  const route = useRouter();
  const [currentTab, setCurrentTab] = useState<string>(novelTabs[0]);
  const [filter, setFilter] = useState<string>(novelFilters[0]);
  const [novelTable, setNovelTable] = useState<NovelPost[]>([]);

  const [roomState, setRoomStatus] = useState<RoomStatus>('attending');
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQueryWrap<NovelListResponse>({
    queryKey: ['api/novelList', roomState, page],
    queryFn: () => novelList({ roomState, page }),
    placeholderData: keepPreviousData,
  });

  // 참여중, 미참여 탭 버튼을 클릭했을 때
  const handleCurrentTab = (tab: string) => {
    if (currentTab === tab) return;

    setCurrentTab(tab);
    if (tab === '참여중') {
      setRoomStatus('attending');
      setPage(1);
    } else {
      setRoomStatus('non_attending');
      setPage(1);
    }
  };

  // 소설 공방 개설 버튼이 눌렸을 때
  const handleCreateNovelButton = () => {
    console.log('create novel');
    route.push('/write/info');
  };

  // 정렬 select box를 클릭했을 때
  const handleNovelFilter = (selectedItem: string) => {
    setFilter(selectedItem);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  // if (isLoading) {
  //   return <p>adsf</p>;
  // }
  // if (isError) {
  //   return <p>adsf</p>;
  // }
  return (
    <div>
      <PageContentHeader backgroundImage={pageContentHeader.backgroundImage}>
        <>
          <div className={styles.headerTextWrap}>
            <h2 className={styles.headerTitle}>{pageContentHeader.title}</h2>
            <p className={styles.headerDescription}>{pageContentHeader.description}</p>
          </div>
          <button type="button" className={styles.headerButton} onClick={handleCreateNovelButton}>
            {pageContentHeader.buttonTitle}
          </button>
        </>
      </PageContentHeader>

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
              <Select
                selectedItem={filter}
                options={novelFilters}
                handleSelectedItem={handleNovelFilter}
              />
            </div>
            {/* {isLoading ?  : null} */}
            <Table tableData={data?.data ?? []} />
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
            console.log(n);
            setPage(n);
          }}
        />
      </main>
    </div>
  );
};

export default NovelPage;
