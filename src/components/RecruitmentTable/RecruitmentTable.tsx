import Image from 'next/image';
import React, { useEffect } from 'react';

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
}: GetWriterWantedList) => (
  <button className={st.card} type="button">
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
export const RecruitmentTable = ({ data, isLoading }: Props) => {
  const handleOnClick = (): void => {
    //
  };
  console.log(isLoading);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <div className={st.content}>
      {/* {new Array(6).fill(0).map(()=><Skeleton key={item} variant="rectangular" width="33.75px" height="11.125px" />)} */}
      {data.map(item => (
        // if (isLoading) {
        //   return (

        //   );
        // }
        <Card {...item} key={item.roomId} />
      ))}
    </div>
  );
};
