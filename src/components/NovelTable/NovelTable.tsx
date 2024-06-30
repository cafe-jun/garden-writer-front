import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { dateChanger } from 'util/dateChange';

import { NovelPost } from '@/fetch/types';

import styles from './NovelTable.module.scss';
import { NovelTableProps } from './type';

const writerType = {
  host: '대표작가',
  attendee: '참여작가',
};
const roomStatus = {
  series: '연재중',
  complete: '연재완료',
  remove: '삭제',
};
function AttendingHead(): ReactElement {
  return (
    <tr>
      <th>카테고리</th>
      <th>제목</th>
      <th>개설일</th>
      <th>완결일</th>
      <th>작가 구분</th>
      <th>정원</th>
      <th>현 작성자</th>
      <th>현황</th>
    </tr>
  );
}

function AttendingTr({ item }: { item: NovelPost }): ReactElement {
  const route = useRouter();
  const onClick = (id: number) => {
    route.push(`/write/detail?room=${id}`);
  };
  return (
    <tr key={item.id} onClick={() => onClick(item.id)}>
      <td style={{ width: '11.75rem' }}>{item.category.name}</td>
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dateChanger(item.createdAt)}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '9rem' }}>{writerType[item.writerCategory]}</td>
      <td style={{ width: '6rem' }}>
        {item.currentAttendCnt}/{item.type}
      </td>
      <td style={{ width: '9rem' }}>{item.currentWriter}</td>
      <td style={{ width: '6rem' }}>{roomStatus[item.status]}</td>
    </tr>
  );
}

function NotAttendingHead(): ReactElement {
  return (
    <tr>
      <th>제목</th>
      <th>참여신청일</th>
      <th>참여일</th>
      <th>퇴장일</th>
      <th>작가 참여상태</th>
    </tr>
  );
}

function NotAttendingTr({ item }: { item: NovelPost }): ReactElement {
  const route = useRouter();
  const onClick = (id: number) => {
    route.push(`/write/detail?room=${id}`);
  };
  return (
    <tr key={item.id} onClick={() => onClick(item.id)}>
      {/* <td style={{ width: '11.75rem' }}>{item.category.name}</td> */}
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dateChanger(item.createdAt)}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '11.75rem' }}>{dateChanger(item.exitedAt)}</td>
      <td style={{ width: '9rem' }}>승인대기</td>
      {/* <td style={{ width: '6rem' }}>{item.currentAttendCnt}/5</td>
      <td style={{ width: '9rem' }}>{item.currentWriter}</td>
      <td style={{ width: '6rem' }}>{item.status}</td> */}
    </tr>
  );
}
export const NovelTable = ({ tableData, tab }: NovelTableProps): ReactElement => (
  <table className={styles.table}>
    <thead>{tab === 'attending' ? <AttendingHead /> : <NotAttendingHead />}</thead>
    <tbody>
      {tableData.map((item, index) => {
        if (tab === 'attending') {
          return <AttendingTr key={item.id} item={item} />;
        }
        return <NotAttendingTr key={item.id} item={item} />;
      })}
    </tbody>
  </table>
);
