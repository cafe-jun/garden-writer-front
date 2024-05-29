import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { GetWriterWantedList } from '@/fetch/types';
import LikeIcon from '@/images/novel-like-icon.svg';
import UserIcon from '@/images/user-icon.svg';
import ViewIcon from '@/images/view-icon.svg';

import st from './RecruitmentTable.module.scss';
import { Props } from './type';

const Card = ({
  boardTitle,
  category,
  currentWriterCnt,
  likeCount,
  roomCreatedAt,
  roomTitle,
  roomType,
  viewCount,
  roomId,
}: GetWriterWantedList) => {
  const router = useRouter();
  return (
    <button
      className={st.card}
      type="button"
      onClick={() => {
        router.push(`/recruitment/detail/${roomId}`);
      }}
    >
      <div>
        <div className={st.status}>모집중</div>
        <p>개설일 {roomCreatedAt}</p>
      </div>

      <p className={st.title}>{roomTitle}</p>

      <div>
        <p className={st.titleAndText}>
          제목<span>{boardTitle}</span>
          작가 인원
          <span>{currentWriterCnt}/5</span>
        </p>
      </div>

      <div className={st.otherInfo}>
        <div>
          <Image src={UserIcon} alt="유저 썸네일" />
          <p>용진</p>
        </div>

        <div>
          <Image src={ViewIcon} alt="읽은 횟수" />
          <p>{viewCount}</p>
          <Image src={LikeIcon} alt="좋아요 수" />
          <p>{likeCount}</p>
        </div>
      </div>
    </button>
  );
};
export const RecruitmentTable = ({ data, isLoading }: Props) => {
  const handleOnClick = (): void => {
    //
  };
  return (
    <div className={st.content}>
      {isLoading &&
        new Array(6)
          .fill(0)
          .map((item, index) => (
            <Skeleton
              key={index.toString() + 1}
              animation="wave"
              sx={{ width: '33.75rem', height: '11.125rem', transform: 'none' }}
            />
          ))}
      {!isLoading && data.map(item => <Card {...item} key={item.roomId} />)}
    </div>
  );
};
