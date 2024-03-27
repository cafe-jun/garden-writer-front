import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';

import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import { RecruitmentTable as Table } from '@/components/RecruitmentTable/RecruitmentTable';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Select } from '@/components/Select/Select';
import { config } from '@/config/config';
import { getWriterWantedList } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import RecruitmentPageHeaderBackground from '@/images/recruitment-page-header-background.png';

import styles from './recruitment.module.scss';

export const recruitmentFilters = ['전체', '모집중', '모집완료'];

export const pageContentHeader = {
  badge: '작가 참여',
  title: '혼자 글을 쓰는게 힘드시진 않으신가요?',
  description: '나와 같은 생각을 가진 작가분들과 함께 이야기를 만들어보세요.',
  backgroundImage: RecruitmentPageHeaderBackground,
};

const RecruitmentPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>(recruitmentFilters[1]);
  // const [recruitmentTableData, setRecruitmentTableData] = useState<RecruitmentTable[]>(recruitment);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data: recruitment } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterWantedList, page],
    queryFn: () => getWriterWantedList({ page }),
  });

  const handleNovelFilter = (selectedItem: string): void => {
    setFilter(selectedItem);
  };

  const handleTableItem = (): void => {
    // router.push(`/recruitment/detail/${tableItem.id}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (): void => {
    console.log(search);
  };

  // useEffect(() => {
  //   let filteredRecruitmentTableData = [];

  //   if (filter === '전체') {
  //     filteredRecruitmentTableData = recruitment;
  //   } else if (filter === '모집중') {
  //     filteredRecruitmentTableData = recruitment.filter(
  //       recruitmentTableRow => recruitmentTableRow.status === RecruitmentTableStatus.active
  //     );
  //   } else {
  //     filteredRecruitmentTableData = recruitment.filter(
  //       recruitmentTableRow => recruitmentTableRow.status === RecruitmentTableStatus.completed
  //     );
  //   }

  //   setRecruitmentTableData([...filteredRecruitmentTableData]);
  // }, [filter]);

  return (
    <div>
      <PageContentHeader backgroundImage={pageContentHeader.backgroundImage}>
        <div className={styles.headerTextWrap}>
          <p className={styles.headerBadge}>{pageContentHeader.badge}</p>
          <h2 className={styles.headerTitle}>{pageContentHeader.title}</h2>
          <p className={styles.headerDescription}>{pageContentHeader.description}</p>
        </div>
      </PageContentHeader>

      <main className={styles.main}>
        <div className={styles.recruitmentContainer}>
          <div className={styles.recruitmentSearchContainer}>
            <SearchInput
              handleSearch={handleSearch}
              handleSubmitSearch={handleSubmitSearch}
              search={search}
            />
          </div>
          <div className={styles.recruitmentHeader}>
            <Select
              selectedItem={filter}
              options={recruitmentFilters}
              handleSelectedItem={handleNovelFilter}
            />
          </div>
          <Table data={recruitment?.data ?? []} />
        </div>

        {/* <PaginationBar type="dark" /> */}
      </main>
    </div>
  );
};

export default RecruitmentPage;
