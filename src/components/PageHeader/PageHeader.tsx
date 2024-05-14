import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { config } from '@/config/config';
import Logo from '@/images/login-logo.svg';
import useWheelState from '@/zustand/stores/useWheelState';

import { Notice } from '../Notice/Notice';
import { SearchInput } from '../SearchInput/SearchInput';
import styles from './PageHeader.module.scss';
import { PageHeaderProps } from './type';

export const PageHeader = ({ background }: PageHeaderProps) => {
  const [search, setSearch] = useState<string>('');
  const [visibleAlarm, setVisibleAlarm] = useState<boolean>(false);
  const { isWheelTop } = useWheelState();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (): void => {
    console.log('search');
  };

  const handleVisibleAralm = (): void => {
    setVisibleAlarm(prev => !prev);
    if (!visibleAlarm) {
      readAlarm();
    }
  };

  const handleAlarmItem = (id: number): void => {
    console.log(id);
  };

  const readAlarm = () => {
    console.log('read api');
  };

  useEffect(() => {
    console.log(isWheelTop);
  }, [isWheelTop]);

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: isWheelTop ? '#ffffff00' : '#ffffff' }}
    >
      <div className={styles.outline}>
        <Image src={Logo} alt="작가의 정원 로고" />
        <div className={styles.headerLeftContents}>
          <Link href="/" replace={false} prefetch={false}>
            웹소설
          </Link>
          <Link href={config.page.novel} replace={false} prefetch={false}>
            소설공방
          </Link>
          <Link href={config.page.recruitment} replace={false} prefetch={false}>
            작가모집
          </Link>
        </div>
        <SearchInput
          search={search}
          handleSearch={handleSearch}
          handleSubmitSearch={handleSubmitSearch}
          style={styles.recruitmentSearchWrapOriginal}
        />
        <div className={styles.headerRightContents}>
          <Notice
            visible={visibleAlarm}
            handleVisible={handleVisibleAralm}
            handleAlarmItem={handleAlarmItem}
          />
          <Link href="/" replace={false} prefetch={false}>
            내정보
          </Link>
        </div>
      </div>
    </header>
  );
};
