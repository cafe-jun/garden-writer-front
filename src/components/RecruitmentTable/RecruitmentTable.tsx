import React, { useEffect, useState } from 'react';

import {
  RecruitmentTable as RecruitmentTableType,
  RecruitmentTableProps,
} from '@/components/RecruitmentTable/type';

import styles from './RecruitmentTable.module.scss';

export const RecruitmentTable = ({ tableData, handleTableItem }: RecruitmentTableProps) => {
  const [data, setData] = useState<RecruitmentTableType[]>();

  const handleOnClick = (item: RecruitmentTableType): void => {
    handleTableItem(item);
  };

  useEffect(() => {
    if (!tableData) {
      // fetch
      // setData
    } else {
      setData(tableData);
    }
  }, []);

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
        {tableData?.map((item, index) => (
          <tr key={item.id} onClick={() => handleOnClick(item)}>
            <td>{index + 1}</td>
            <td>{item.novelTitle}</td>
            <td>{item.title}</td>
            <td>{item.admin}</td>
            <td>{item.created}</td>
            <td>{item.count}</td>
            <td>{item.like}</td>
            <td>
              {item.attend_users_number}/{item.user_limit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
