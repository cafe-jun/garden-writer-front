import React from 'react';

import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import RecruitmentPageHeaderBackground from '@/images/recruitment-page-header-background.png';

import styles from './recruitment.module.scss';

const RecruitmentPage = () => {
  const pageContentHeader = {
    badge: '작가 참여',
    title: '혼자 글을 쓰는게 힘드시진 않으신가요?',
    description: '나와 같은 생각을 가진 작가분들과 함께 이야기를 만들어보세요.',
    backgroundImage: RecruitmentPageHeaderBackground,
  };
  return (
    <div>
      <PageContentHeader backgroundImage={pageContentHeader.backgroundImage}>
        <div className={styles.headerTextWrap}>
          <p className={styles.headerBadge}>{pageContentHeader.badge}</p>
          <h2 className={styles.headerTitle}>{pageContentHeader.title}</h2>
          <p className={styles.headerDescription}>{pageContentHeader.description}</p>
        </div>
      </PageContentHeader>

      <main />
    </div>
  );
};

export default RecruitmentPage;
