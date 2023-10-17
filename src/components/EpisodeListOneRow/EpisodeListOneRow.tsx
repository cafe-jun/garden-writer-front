import { ReactElement } from 'react';

import st from './EpisodeListOneRow.module.scss';

export default function EpisodeListOneRow(): ReactElement {
  return (
    <button type="button" className={st.row}>
      <p className={st.main_list_episode}>1</p>
      <p className={st.main_list_title}>제목임둥</p>
      <p className={st.main_list_finalRetouchDate}>12.2.2</p>
      <p className={st.main_list_status}>작성중</p>
      <p className={st.main_list_serialApprovalDate}>12.22.2</p>
      <p className={st.main_list_views}>33</p>
      <p className={st.main_list_commnents}>22</p>
      <p className={st.main_list_likes}>111</p>
    </button>
  );
}
