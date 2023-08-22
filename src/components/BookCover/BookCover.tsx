import Image from 'next/image';
import { ReactElement } from 'react';

import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import st from './BookCover.module.scss';
import { BoockCoverProps } from './type';

/**
 * 공방개설 시 사용되며 props로 받은 book cover의 이미지를 크게 보여주는 component.
 * props로 scr를 받아와야함
 * @param props BoockCoverProps
 * @returns component
 */
export default function BookCover(props: BoockCoverProps): ReactElement {
  return (
    <WriteRoomCategory
      compulsory={false}
      style={props.style}
      speechBubbleText="소설의 북커버를 선택해주세요."
      categoryText="북커버"
    >
      <div className={st.container}>
        <div className={st.bookCoverImg}>
          {props?.src ? <Image src={props.src} alt="북커버 이미지" /> : <p>북커버 이미지</p>}
        </div>
      </div>
    </WriteRoomCategory>
  );
}
