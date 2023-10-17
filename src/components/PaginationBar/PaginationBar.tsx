import { ReactElement } from 'react';
import Pagination from 'react-js-pagination';

import st from './PaginationBar.module.scss';

export default function PaginationBar({ type = 'white' }): ReactElement {
  return (
    <div className={`${st.pagination} ${type === 'dark' && st.paginationDark}`}>
      <Pagination
        // 현재 보고있는 페이지
        activePage={3}
        // 한페이지에 출력할 아이템수
        itemsCountPerPage={5}
        // 총 아이템수
        totalItemsCount={300}
        // 표시할 페이지수
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        activeLinkClass={st.colorRed}
        // 함수
        onChange={p => {
          console.log(p);
        }}
      />
    </div>
  );
}
