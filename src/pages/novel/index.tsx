import React from 'react';

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
    </div>
  );
};

export default NovelPage;
