import React from 'react';

import styles from './PageContentHeader.module.scss';
import { PageContentHeaderProps } from './type';

const PageContentHeader = ({
  title,
  description,
  handleButton,
  buttonTitle,
  backgroundImage,
}: PageContentHeaderProps) => (
  <header className={styles.header}>
    <div
      className={styles.headerBackground}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className={styles.headerContents}>
      <div className={styles.headerTextWrap}>
        <h2 className={styles.headerTitle}>{title}</h2>
        <p className={styles.headerDescription}>{description}</p>
      </div>
      {buttonTitle && handleButton && (
        <button type="button" className={styles.headerButton} onClick={handleButton}>
          {buttonTitle}
        </button>
      )}
    </div>
  </header>
);
export default PageContentHeader;
