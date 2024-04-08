import { ReactElement } from 'react';

import { NovelChapter } from '@/fetch/types';

import st from './EpisodeListOneRow.module.scss';

export default function EpisodeListOneRow({
  no,
  title,
  approvalAt,
  status,
  finalAt,
  viewCount,
  commentCnt,
  like,
}: NovelChapter): ReactElement {
  return (
    <button type="button" className={st.row}>
      <p className={st.main_list_episode}>{no}</p>
      <p className={st.main_list_title}>{title}</p>
      <p className={st.main_list_finalRetouchDate}>{approvalAt}</p>
      <p className={st.main_list_status}>{status}</p>
      <p className={st.main_list_serialApprovalDate}>{finalAt}</p>
      <p className={st.main_list_views}>{viewCount}</p>
      <p className={st.main_list_commnents}>{commentCnt}</p>
      <p className={st.main_list_likes}>{like}</p>
    </button>
  );
}
