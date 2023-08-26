import React from 'react';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';

import styles from './novel.module.scss';

const NovelPage = () => {
  const handleCreateNovelButton = () => {
    console.log('create novel');
  };

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

      <div>
        <InformationText
          text="대표작가 또는 참여작가로 참여중이면서 현재 연재중 또는 완결된 소설공방이 조회됩니다."
          type={InformationTextType.primary}
        />
      </div>
    </div>
  );
};

export default NovelPage;
