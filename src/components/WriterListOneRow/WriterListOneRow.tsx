import { ReactElement } from 'react';

import { WriterListOneRowProps } from './type';
import st from './WriterListOneRow.module.scss';

export default function WriterListOneRow({ index_ }: WriterListOneRowProps): ReactElement {
  return (
    <div className={st.writerRow}>
      <p className={st.main_writerlist_Number}>1</p>
      <p className={st.main_writerlist_nickName}>어렵다</p>
      <p className={st.main_writerlist_textAmount}>2343</p>
      <p className={st.main_writerlist_dateForParticipation}>12.23.23</p>
      <p className={st.main_writerlist_approvalStatus}>12.23.32/12.23.23</p>
      <p className={st.main_writerlist_exitDate}>12.45.6</p>
      <p className={st.main_writerlist_participationStatus}>아직</p>

      <div className={st.row_btns}>
        <button className={st.resolve} type="button">
          승인
        </button>
        <button className={st.reject} type="button">
          퇴장
        </button>
      </div>
    </div>
  );
}
