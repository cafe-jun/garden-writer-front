import Image from 'next/image';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';

import WriteJoin from '@/components/modals/WriteJoin/WriteJoin';
import { config } from '@/config/config';
import { getWriterPostDetail } from '@/fetch/get';
import { writerJoinReqest } from '@/fetch/post';
import { useMutationWrap, useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import EyeIcon from '@/images/eye.svg';
import HeartRed from '@/images/heart-red.svg';

import styles from './recruitmentDetailPost.module.scss';
import { dateChanger } from '../../../../util/dateChange';

const RecruitmentDetailPostPage = () => {
  const router = useRouter();
  const { post } = router.query;
  const roomId = useUrlDatas<number>('roomId');
  const [isModal, setIsModal] = useState<boolean>(false);

  const { data, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterPostDetail(roomId)],
    queryFn: () => getWriterPostDetail({ roomId }),
  });
  console.log('data :: ', data);

  const novelJoin = useMutationWrap({
    mutationKey: [config.apiUrl.writerJoinRequest],
    mutationFn: writerJoinReqest,
    onSuccess() {
      enqueueSnackbar('참여신청을 완료했습니다');
    },
    onError(err: number) {
      console.log(err);
      if (err === 409) {
        enqueueSnackbar('이미 신청한 소설공방입니다', { variant: 'error' });
      }
    },
  });

  return (
    <div className={styles.container}>
      {isModal ? (
        <WriteJoin
          cancel={() => {
            setIsModal(false);
          }}
          nextStep={() => {
            novelJoin.mutate({ novelRoomId: roomId });
          }}
        />
      ) : null}
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
            <span>
              {data?.data.currentAttendCnt}/{data?.data.type}
            </span>
          </li>
          <li className={styles.novelItem}>
            <span>소설공방 개설일</span>
            <span>{dateChanger(data?.data.createdAt as string | null)}</span>
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
        <button type="button" className={styles.button} disabled={data?.data.hasLike}>
          <Image src={HeartRed} alt="HeartRed" />
          <span>{data?.data.likeCount}</span>
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsModal(true)}
          disabled={data?.data.isAttend}
        >
          {data?.data.isAttend ? '참석한 모임입니다.' : '참여 신청하기'}
        </button>
      </footer>
    </div>
  );
};

export default RecruitmentDetailPostPage;
