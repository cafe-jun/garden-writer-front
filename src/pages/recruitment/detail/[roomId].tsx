import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { config } from '@/config/config';
import { getWriterPostDetail } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import EyeIcon from '@/images/eye.svg';
import HeartRed from '@/images/heart-red.svg';

import styles from './recruitmentDetailPost.module.scss';

const RecruitmentDetailPostPage = () => {
  const router = useRouter();
  const { post } = router.query;
  const roomId = useUrlDatas<number>('roomId');

  const { data, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterPostDetail(roomId)],
    queryFn: () => getWriterPostDetail({ roomId }),
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTools}>
          <div className={styles.headerTool}>
            <Image src={EyeIcon} alt="EyeIcon" />
            <span>{data?.data.viewCount}</span>
          </div>
          <div className={styles.headerTool}>
            <Image src={HeartRed} alt="HeartRed" />
            <span>{data?.data.hasLike}</span>
          </div>
        </div>
        {/* !!!!!! */}
        <h2>{data?.data.boardTitle}</h2>
      </header>
      {/* {post} */}
      <main className={styles.main}>
        <ul className={styles.novelList}>
          <li className={styles.novelItem}>
            <span>소설 제목</span>
            <span>{data?.data.boardTitle}</span>
          </li>
          <li className={styles.novelItem}>
            <span>대표작가</span>
            <span>글쓴이없음</span>
          </li>
          <li className={styles.novelItem}>
            <span>작가 정원</span>
            <span>??/5</span>
          </li>
          <li className={styles.novelItem}>
            <span>소설공방 개설일</span>
            <span>개설이 없음</span>
          </li>
        </ul>

        <div className={styles.novelDescription}>
          <p>내용</p>
          <p>{data?.data.boardContent}</p>
        </div>

        <div className={styles.novelOpenChat}>
          <p>오픈채팅 링크</p>
          <p>{data?.data.boardOpenKakaoLink}</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <button type="button" className={styles.button}>
          <Image src={HeartRed} alt="HeartRed" />
          <span>??</span>
        </button>
        <button type="button" className={styles.button}>
          참여 신청하기
        </button>
      </footer>
    </div>
  );
};

export default RecruitmentDetailPostPage;
