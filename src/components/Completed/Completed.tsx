import Image from 'next/image';
import React from 'react';

import Logo from '@/images/login-logo.svg';

import styles from './Completed.module.scss';
import { CompletedProps } from './type';

export const Completed = ({
  title,
  description,
  leftButtonLabel,
  rightButtonLabel,
  leftButtonDescription,
  rightButtonDescription,
  handleLeftButton,
  handleRightButton,
}: CompletedProps) => (
  <div className={styles.Container}>
    <header className={styles.header}>
      <Image className={styles.headerLogo} src={Logo} alt="logo" />
      <h2 className={styles.headerTitle}>{title}</h2>
      <p className={styles.headerDescription}>{description}</p>
    </header>

    <div className={styles.actions}>
      <button className={styles.actionsButton} type="button" onClick={handleLeftButton}>
        <div className={styles.actionsButtonContent}>
          <span>{leftButtonLabel}</span>
          {leftButtonDescription && (
            <span className={styles.actionsButtonContentDescription}>{leftButtonDescription}</span>
          )}
        </div>
      </button>
      <button className={styles.actionsButton} type="button" onClick={handleRightButton}>
        <div>{rightButtonLabel}</div>
        {rightButtonDescription && (
          <span className={styles.actionsButtonContentDescription}>{rightButtonDescription}</span>
        )}
      </button>
    </div>
  </div>
);
