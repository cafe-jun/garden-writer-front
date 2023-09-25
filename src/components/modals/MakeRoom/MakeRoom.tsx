import { ReactElement } from 'react';

import CusModal from '@/components/CusModal/CusModal';

import st from './MakeRoom.module.scss';
import { MakeRoomProps } from './type';

export default function MakeRoom({ nextStep, cancel }: MakeRoomProps): ReactElement {
  return (
    <CusModal>
      <div className={st.contents}>
        <p className={st.contents_title}>소설공방을 개설 하시겠습니까?</p>
        <ul>
          <li>작가 참여 글에 업로드(같이 글쓰기에만)</li>
          <li>바로 연재되는 건 아니고 비공개 상태입니다.</li>
          <li>바로연재 OR 소설공방 리스트로 바로가기</li>
        </ul>

        {/* bottom button start */}
        <div className={st.contents_btnBox}>
          <button onClick={nextStep} type="button">
            개설하기
          </button>
          <button onClick={cancel} type="button">
            취소
          </button>
        </div>
        {/* bottom button end */}
      </div>
    </CusModal>
  );
}
