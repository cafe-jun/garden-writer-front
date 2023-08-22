import { ReactElement } from 'react';

import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import { WriterPeopleProps } from './type';
import st from './WriterPeople.module.scss';

/**
 * 소설공방 개설 페이지의 같이 글쓰기, 혼자 글쓰기를 선택하는 component
 * @param props WriterPeopleProps
 * @returns component
 */
export default function WriterPeople(props: WriterPeopleProps): ReactElement {
  return (
    <WriteRoomCategory compulsory categoryText="작가정원" speechBubbleText="인원수를 정해주세요">
      <div className={st.container}>
        <label className={st.inputBox}>
          <input
            type="radio"
            name="people"
            onInput={() => {
              props.onChange(1);
            }}
            defaultChecked
          />
          <p className={st.ml8}>같이 글쓰기</p>
        </label>

        <label className={st.inputBox}>
          <input
            type="radio"
            name="people"
            onInput={() => {
              props.onChange(2);
            }}
          />
          <p className={st.ml8}>혼자 글쓰기</p>
        </label>
      </div>
    </WriteRoomCategory>
  );
}
