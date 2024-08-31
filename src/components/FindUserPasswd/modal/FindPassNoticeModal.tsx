import { ReactElement } from 'react';

import CusModal from '@/components/CusModal/CusModal';

import { FindPssNoticModalProps } from './type';
import st from './FindPassNoticeModal.module.scss';

export default function FindPassNoticeModal({ cancel }: FindPssNoticModalProps): ReactElement {
  return (
    <CusModal>
      <div className={st.contents}>
        <p className={st.contents_title}>임시패스워드 발급</p>
        <p>임시 패스워드가 발급 되었습니다</p>
        <p>이메일을 확인후 로그인 해주세요</p>
        <div className={st.contents_btnBox}>
          <button onClick={cancel} type="button">
            확인
          </button>
        </div>
      </div>
    </CusModal>
  );
}
