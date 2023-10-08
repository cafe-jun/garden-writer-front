import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { RecruitmentTable, RecruitmentTableStatus } from '@/components/RecruitmentTable/type';
import EyeIcon from '@/images/eye.svg';
import HeartRed from '@/images/heart-red.svg';

import styles from './recruitmentDetailPost.module.scss';

const RecruitmentDetailPostPage = () => {
  const router = useRouter();
  const { post } = router.query;

  const data: RecruitmentTable = {
    id: 'adasdf',
    novelTitle: '재벌집 막내아들',
    title: '같이 작성하실 분',
    description: `소설 함께 쓰실 분 모집합니다!
    평일 중 3일 정도는 시간나시는 분 구하고 있어요~
    완료 목표는 올해 12월 입니다!
    오픈 채팅으로 연락 주세요!`,
    admin: 'Ayaan',
    created: '2023-05-02',
    status: RecruitmentTableStatus.active,
    count: 299,
    like: 10,
    attend_users_number: 2,
    user_limit: 5,
    openChatUrl: 'https://open.kakao.com/123123123123',
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTools}>
          <div className={styles.headerTool}>
            <Image src={EyeIcon} alt="EyeIcon" />
            <span>{data.count}</span>
          </div>
          <div className={styles.headerTool}>
            <Image src={HeartRed} alt="HeartRed" />
            <span>{data.like}</span>
          </div>
        </div>
        <h2>{data.title}</h2>
      </header>
      {/* {post} */}
      <main className={styles.main}>
        <ul className={styles.novelList}>
          <li className={styles.novelItem}>
            <span>소설 제목</span>
            <span>{data.novelTitle}</span>
          </li>
          <li className={styles.novelItem}>
            <span>대표작가</span>
            <span>{data.admin}</span>
          </li>
          <li className={styles.novelItem}>
            <span>작가 정원</span>
            <span>
              {data.attend_users_number}/{data.user_limit}
            </span>
          </li>
          <li className={styles.novelItem}>
            <span>소설공방 개설일</span>
            <span>{data.created}</span>
          </li>
        </ul>

        <div className={styles.novelDescription}>
          <p>내용</p>
          <p>{data.description}</p>
        </div>

        <div className={styles.novelOpenChat}>
          <p>오픈채팅 링크</p>
          <p>{data.openChatUrl}</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.button}>
          <Image src={HeartRed} alt="HeartRed" />
          <span>{data.count}</span>
        </button>
        <button className={styles.button}>참여 신청하기</button>
      </footer>
    </div>
  );
};

export default RecruitmentDetailPostPage;
