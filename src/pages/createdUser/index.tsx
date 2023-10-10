import React from 'react';

import { Completed } from '@/components/Completed/Completed';

import styles from './createdUser.module.scss';

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
        title="회원가입을 진심으로 축하드립니다 :)"
        description="작가의 정원을 통해 여러분의 상상력을 맘껏 펼쳐보세요."
        leftButtonLabel="소설공방 개설"
        leftButtonDescription="(대표작가로 진행)"
        rightButtonLabel="소설공방 참여"
        rightButtonDescription="(참여작가로 진행)"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
    </div>
  );
};

export default CreatedUser;
