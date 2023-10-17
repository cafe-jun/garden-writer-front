import Image from 'next/image';
import React from 'react';

import Logo from '@/images/login-logo.svg';

import styles from './CompletedLogoTextHeader.module.scss';
import { CompletedLogoTextHeaderProps } from './type';

export const CompletedLogoTextHeader = ({ title, description }: CompletedLogoTextHeaderProps) => (
  <header className={styles.header}>
    <Image className={styles.headerLogo} src={Logo} alt="logo" />
    <h2 className={styles.headerTitle}>{title}</h2>
    <p className={styles.headerDescription}>{description}</p>
  </header>
);
