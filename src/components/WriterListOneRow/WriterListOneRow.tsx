import { ReactElement } from 'react';

import { config } from '@/config/config';
import { updateWriterState } from '@/fetch/fetch';
import { GetWriterListAdmin } from '@/fetch/types';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';

import st from './WriterListOneRow.module.scss';

export default function WriterListOneRow({
  category,
  createdAt,
  exitAt,
  id,
  nickname,
  notifiedAt,
  status,
  userId,
}: GetWriterListAdmin): ReactElement {
  const { mutate: writerStateUpdate } = useMutationWrap({
    mutationKey: [config.apiUrl.updateWriterState(id)],
    mutationFn: updateWriterState,
  });
  const join = () => {
    writerStateUpdate({ userId: id, status: 'attending' });
  };
  const reject = () => {
    writerStateUpdate({ userId: id, status: 'attendingReject' });
  };
  const kick = () => {
    writerStateUpdate({ userId: id, status: 'exit' });
  };
  return (
    <div className={st.writerRow}>
      <p className={st.main_writerlist_Number}>{id}</p>
      <p className={st.main_writerlist_nickName}>{nickname}</p>
      <p className={st.main_writerlist_textAmount}>??</p>
      <p className={st.main_writerlist_dateForParticipation}>??</p>
      <p className={st.main_writerlist_approvalStatus}>??/??</p>
      <p className={st.main_writerlist_exitDate}>{exitAt}</p>
      <p className={st.main_writerlist_participationStatus}>{status}</p>

      <div className={st.row_btns}>
        {category === 'attendee' &&
          (status === 'attending' ? (
            <button className={st.reject} onClick={kick} type="button">
              퇴장
            </button>
          ) : (
            <>
              <button className={st.resolve} onClick={join} type="button">
                승인
              </button>
              <button className={st.reject} onClick={reject} type="button">
                반려
              </button>
            </>
          ))}
      </div>
    </div>
  );
}
