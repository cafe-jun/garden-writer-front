import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';

import Logo from '@/images/login-logo.svg';

import { SearchInput } from '../SearchInput/SearchInput';
import styles from './PageHeader.module.scss';

export const PageHeader = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (): void => {
    console.log('search');
  };

  return (
    <header className={styles.header}>
      <Image className={styles.headerLogo} src={Logo} alt="logo" />
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
      />
      <div className={styles.headerRightContents}>
        <div>알림</div>
        <Link href="/" replace={false} prefetch={false}>
          내정보
        </Link>
      </div>
    </header>
  );
};
