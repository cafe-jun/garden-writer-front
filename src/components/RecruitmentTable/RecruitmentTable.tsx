import React from 'react';

import styles from './RecruitmentTable.module.scss';
import { Props } from './type';

export const RecruitmentTable = ({ data }: Props) => {
  const handleOnClick = (): void => {
    //
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>No</th>
          <th>소설 제목</th>
          <th>제목</th>
          <th>대표작가</th>
          <th>소설공방 개설일</th>
          <th>조회수</th>
          <th>좋아요</th>
          <th>작가 정원</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.roomTitle} onClick={() => handleOnClick()}>
            <td>{index + 1}</td>
            <td>{item.roomTitle}</td>
            <td>{item.boardTitle}</td>
            <td>??</td>
            <td>{item.roomCreatedAt}</td>
            <td>{item.viewCount}</td>
            <td>{item.like}</td>
            <td>
              {item.currentWriterCnt}/{item.roomType}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
