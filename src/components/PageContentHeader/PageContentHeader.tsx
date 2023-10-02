import React from 'react';

import styles from './PageContentHeader.module.scss';
import { PageContentHeaderProps } from './type';

const PageContentHeader = ({ children, backgroundImage }: PageContentHeaderProps) => (
  <header className={styles.header}>
    <div
      className={styles.headerBackground}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className={styles.headerContents}>{children}</div>
  </header>
);
export default PageContentHeader;
