import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import PaginationBar from '@/components/PaginationBar/PaginationBar';
import { RecruitmentTable as Table } from '@/components/RecruitmentTable/RecruitmentTable';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Select } from '@/components/Select/Select';
import { config } from '@/config/config';
import { getWriterWantedList } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';

import styles from './recruitment.module.scss';

export const recruitmentFilters = ['전체', '모집중', '모집완료'];

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

  useEffect(() => {
    console.log(recruitment);
  }, [recruitment]);

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
      <PageContentHeader
        backgroundColor="#9CE1E6"
        pageImage={NovelPageHeaderBackground}
        pageName="소설공방"
        summary1="동료 작가들과 함께 글을 써보세요"
      />

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

        <PaginationBar type="dark" {...recruitment?.meta} />
      </main>
    </div>
  );
};

export default RecruitmentPage;
