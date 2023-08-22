import Image from 'next/image';
import { ReactElement, useState } from 'react';

import SpeechBubble from '../../images/speech-bubble.svg';
import { writeRoomCategoryProps } from './type';
import st from './WriteRoomCategory.module.scss';
/**
 * 소설공방 개설 페이지에서 필수, 제목, 말풍선을 하나의 component로 구현
 * children으로 자식 component를 상속 받아야하며
 * width는 384px이여야한다
 * @param props writeRoomCategoryProps
 * @returns component
 */
export default function WriteRoomCategory(props: writeRoomCategoryProps): ReactElement {
  const [isBubble, setIsBubble] = useState<boolean>(false);
  return (
    <div style={{ ...props.style }} className={st.container}>
      {/* 필수, 제목, 등의 카테고리 이름 box start */}
      <div className={st.catetoryInfos}>
        {props.compulsory ? (
          <p className={st.redColor}>[필수]</p>
        ) : (
          <p className={st.grayColor}>[선택]</p>
        )}

        <p>{props.categoryText}</p>

        {props?.speechBubbleText ? (
          <Image
            className={st.ml4}
            onMouseOver={(): void => {
              setIsBubble(p => !p);
            }}
            onMouseOut={(): void => {
              setIsBubble(p => !p);
            }}
            src={SpeechBubble}
            alt="말풍선"
          />
        ) : null}

        {isBubble ? <div className={st.speechBubbleContainer}>{props.speechBubbleText}</div> : null}
      </div>
      {/* 필수, 제목, 등의 카테고리 이름 box end */}

      {/* 상위에서 상속 받은 child component가 위치하게 됨 */}
      {props.children}
    </div>
  );
}
