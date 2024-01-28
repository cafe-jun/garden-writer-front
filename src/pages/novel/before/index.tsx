import React from 'react';

import { Completed } from '@/components/Completed/Completed';
import { CompletedLogoTextHeader } from '@/components/CompletedLogoTextHeader/CompletedLogoTextHeader';

import styles from './BeforeNovelList.module.scss';

const CreatedUser = () => {
  const handleLeftButton = (): void => {
    console.log('handleLeftButton');
  };

  const handleRightButton = (): void => {
    console.log('handleRightButton');
  };

  return (
    <div className={styles.Container}>
      <Completed
        leftButtonLabel="소설공방 개설"
        leftButtonDescription="(대표작가로 진행)"
        rightButtonLabel="소설공방 참여"
        rightButtonDescription="(참여작가로 진행)"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      >
        <CompletedLogoTextHeader
          title="소설공방"
          description="지금바로 작가의 정원과 함께 소설을 연재해 보세요"
        />
      </Completed>
    </div>
  );
};

export default CreatedUser;
