import React from 'react';

import styles from './Completed.module.scss';
import { CompletedProps } from './type';

export const Completed = ({
  children,
  leftButtonLabel,
  rightButtonLabel,
  leftButtonDescription,
  rightButtonDescription,
  handleLeftButton,
  handleRightButton,
}: CompletedProps) => (
  <div className={styles.Container}>
    {children}
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
        <div className={styles.actionsButtonContent}>
          <span>{rightButtonLabel}</span>
          {rightButtonDescription && (
            <span className={styles.actionsButtonContentDescription}>{rightButtonDescription}</span>
          )}
        </div>
      </button>
    </div>
  </div>
);
