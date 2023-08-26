import React from 'react';

import styles from './Table.module.scss';
import { NovelTableProps } from './type';

export const NovelTable = ({ tableData }: NovelTableProps) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>No</th>
        <th>카테고리</th>
        <th>제목</th>
        <th>개설일</th>
        <th>완결일</th>
        <th>작가 구분</th>
        <th>정원</th>
        <th>현 작성자</th>
        <th>소설공방 상태</th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.category}</td>
          <td>{item.title}</td>
          <td>{item.created}</td>
          <td>{item.completed}</td>
          <td>{item.user_type}</td>
          <td>
            {item.attend_users_number}/{item.user_limit}
          </td>
          <td>{item.current_writer}</td>
          <td>{item.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
