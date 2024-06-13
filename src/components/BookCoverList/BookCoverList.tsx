import Image from 'next/image';
import { ReactElement } from 'react';

import BCimg1 from '@/images/book-corver-1.png';
import BCimg2 from '@/images/book-corver-2.png';
import BCimg3 from '@/images/book-corver-3.png';
import BCimg4 from '@/images/book-corver-4.png';
import BCimg5 from '@/images/book-corver-5.png';

import st from './BookCoverList.module.scss';
import { BookCoverListProps } from './type';

/**
 * book cover에 사용할 수 있는 이미지의 리스트 component이다
 * @param props BookCoverListProps
 * @returns component
 */
export default function BookCoverList({ style, selectImage }: BookCoverListProps): ReactElement {
  return (
    <div className={st.container} style={style}>
      <Image onClick={() => selectImage(BCimg1)} src={BCimg1} alt="북커버 이미지 1번" />
      <Image onClick={() => selectImage(BCimg2)} src={BCimg2} alt="북커버 이미지 2번" />
      <Image onClick={() => selectImage(BCimg3)} src={BCimg3} alt="북커버 이미지 3번" />
      <Image onClick={() => selectImage(BCimg4)} src={BCimg4} alt="북커버 이미지 4번" />
      <Image onClick={() => selectImage(BCimg5)} src={BCimg5} alt="북커버 이미지 5번" />
    </div>
  );
}
