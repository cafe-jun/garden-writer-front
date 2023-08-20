import { StaticImageData } from 'next/image';
import { ReactElement, useState } from 'react';

import BookCover from '@/components/BookCover/BookCover';
import BookCoverList from '@/components/BookCoverList/BookCoverList';
import CategorySelect from '@/components/CategorySelect/CategorySelect';
import MultipleLineInput from '@/components/MultipleLineInput/MultipleLineInput';
import OneLineInput from '@/components/OneLineInput/OneLineInput';
import PeopleCount from '@/components/PeopleCount/PeopleCount';
import WriterPeople from '@/components/WriterPeople/WrtierPeople';

import st from './info.module.scss';

export default function WriteInfo(): ReactElement {
  // 여러명이 하는지 아님 개인이 하는지
  const [people, setPeople] = useState<number>(1);

  // 같이 글쓰기 일 경우 선택한 인원수
  const [peopleCount, setPeopleCount] = useState<number | null>(null);

  // 제목
  const [title, setTitle] = useState<string>('');

  // 한줄 소개
  const [oneLine, setOneLine] = useState<string>('');

  // 등장인물 소개
  const [actor, setActor] = useState<string>('');

  // 줄거리
  const [summary, setSummary] = useState<string>('');

  // 북커버 리스트에서 이미지를 선택시 해당 변수에 이미지가 저장됨
  const [bookSrc, setBookScr] = useState<StaticImageData>();
  return (
    <div className={st.container}>
      {/* 중앙 content box start */}
      <div className={`${st.contentContainer} ${st.mt44}`}>
        <p className={st.text1}>01.소설공방 개설</p>
        <p className={st.text2}>작가들을 모집하고 새로운 세계관을 만들어보세요</p>

        {/* 여러명이 하는지 아님 개인이 하는지 */}
        <WriterPeople onChange={setPeople} />
        {/* 여러명일 경우 인원선택 */}
        {people === 1 ? <PeopleCount onChange={setPeopleCount} /> : null}

        {/* 제목 */}
        <OneLineInput
          onChange={setTitle}
          style={{ marginTop: '60px' }}
          compulsory
          categoryText="제목"
          speechBubbleText="소설의 제목을 정해주세요"
          placeholder="소설의 제목을 작성해주세요"
          errorText="제목을 입력해주세요"
          isError={false}
        />

        {/* 한줄 소개 */}
        <OneLineInput
          onChange={setOneLine}
          style={{ marginTop: '31px' }}
          compulsory
          categoryText="한줄 소개"
          placeholder="소설의 내용을 요약해주세요"
          errorText="한줄 소개를 입력해주세요"
          isError={false}
        />

        {/* 카테고리 */}
        <CategorySelect
          isError={false}
          errorText="한 가지 이상의 카테고리를 선택해주세요"
          style={{ marginTop: '31px' }}
        />

        {/* 등장인물 */}
        <MultipleLineInput
          onChange={setActor}
          style={{ marginTop: '55px' }}
          compulsory={false}
          categoryText="등장인물"
          speechBubbleText="소설의 등장인물에 대한 설명을 입력해주세요"
          placeholder="(예시) 로미오 : 아름다운 줄리엣을 만나 첫눈에 사랑에 빠진다."
          errorText=""
          isError={false}
        />

        {/* 줄거리 */}
        <MultipleLineInput
          onChange={setSummary}
          style={{ marginTop: '20px' }}
          compulsory={false}
          categoryText="줄거리"
          speechBubbleText="소설의 줄거리를 기승전결에 따라 입력해주세요."
          placeholder="줄거리에 대해 작성해주세요."
          errorText=""
          isError={false}
        />

        {/* 선택된 북커버 */}
        <BookCover style={{ marginTop: '16px' }} src={bookSrc} />
        {/* 기본 북커버 이미지 리스트 */}
        <BookCoverList style={{ marginTop: '16px' }} selectImage={setBookScr} />

        <button className={`${st.nextBtn} ${st.mt32}`}>다음</button>
      </div>
      {/* 중앙 content box end */}
    </div>
  );
}
