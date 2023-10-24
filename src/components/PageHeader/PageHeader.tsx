import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useMemo, useState } from 'react';

import Logo from '@/images/login-logo.svg';
import LogoWhite from '@/images/logo-white.svg';
import SearchIconPrimary from '@/images/search-icon-primary.svg';
import SearchIconWhite from '@/images/search-icon-white.svg';

import { Notice } from '../Notice/Notice';
import { SearchInput } from '../SearchInput/SearchInput';
import styles from './PageHeader.module.scss';
import { PageHeaderBackground, PageHeaderProps } from './type';

export const PageHeader = ({ background = PageHeaderBackground.original }: PageHeaderProps) => {
  const [search, setSearch] = useState<string>('');
  const [visibleAlarm, setVisibleAlarm] = useState<boolean>(false);

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

  const searchStyle = useMemo((): string => {
    switch (background) {
      // eslint-disable-next-line default-case-last
      default:
      case PageHeaderBackground.original:
        return styles.recruitmentSearchWrapOriginal;
      case PageHeaderBackground.white:
        return styles.recruitmentSearchWrapWhite;
    }
  }, []);

  const searchIcon = useMemo((): StaticImageData => {
    switch (background) {
      // eslint-disable-next-line default-case-last
      default:
      case PageHeaderBackground.original:
        return SearchIconPrimary;
      case PageHeaderBackground.white:
        return SearchIconWhite;
    }
  }, []);

  const LogoIcon = useMemo((): StaticImageData => {
    switch (background) {
      // eslint-disable-next-line default-case-last
      default:
      case PageHeaderBackground.original:
        return Logo;
      case PageHeaderBackground.white:
        return LogoWhite;
    }
  }, []);

  return (
    <header
      className={`${styles.header} ${background === PageHeaderBackground.white && styles.white}`}
    >
      <Image className={styles.headerLogo} src={LogoIcon} alt="logo" />
      <div className={styles.headerLeftContents}>
        <Link href="/" replace={false} prefetch={false}>
          웹소설
        </Link>
        <Link href="/" replace={false} prefetch={false}>
          소설공방
        </Link>
        <Link href="/" replace={false} prefetch={false}>
          작가참여
        </Link>
      </div>
      <SearchInput
        search={search}
        handleSearch={handleSearch}
        handleSubmitSearch={handleSubmitSearch}
        style={searchStyle}
        buttonIcon={searchIcon}
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
    </header>
  );
};
