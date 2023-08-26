import React from 'react';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';
import { NovelTable as Table } from '@/components/Table/Table';
import { NovelTable, NovelTableStatus, NovelTableUserType } from '@/components/Table/type';

import styles from './novel.module.scss';

const NovelPage = () => {
  const handleCreateNovelButton = () => {
    console.log('create novel');
  };

  const tableData: NovelTable[] = [
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

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerTextWrap}>
          <h2 className={styles.headerTitle}>소설공방</h2>
          <p className={styles.headerDescription}>
            지금 바로 작가의 정원과 함께 소설을 연재해 보세요!
          </p>
        </div>
        <button type="button" className={styles.headerButton} onClick={handleCreateNovelButton}>
          소설공방 개설
        </button>
      </header>

      <main className={styles.main}>
        <div>
          <InformationText
            text="대표작가 또는 참여작가로 참여중이면서 현재 연재중 또는 완결된 소설공방이 조회됩니다."
            type={InformationTextType.primary}
          />
          <div className={`${styles.novelContainer}`}>
            <Table tableData={tableData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NovelPage;
