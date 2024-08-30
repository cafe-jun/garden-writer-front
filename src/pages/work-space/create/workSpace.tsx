import { StaticImageData } from 'next/image';
import { useState } from 'react';

import BookCover from '@/components/BookCover/BookCover';
import BookCoverList from '@/components/BookCoverList/BookCoverList';
import CategorySelect from '@/components/CategorySelect/CategorySelect';
import HashTagInput from '@/components/HashTagInput/HashTagInput';
import PeopleCount from '@/components/PeopleCount/PeopleCount';
import { WritingModeSelector, OneLineInput, MultipleLineInput } from '@/components';
import useCreateNovelPost from '@/stores/useCreateNovelPost.zst';

import st from './workSpace.module.scss';

export type WritingModeType = 'solo' | 'collaborate';

export default function WorkSpace() {
  const [writingMode, setWritingMode] = useState<WritingModeType>('collaborate');
  const [bookSrc, setBookScr] = useState<StaticImageData>();
  const { setNovel, ...props } = useCreateNovelPost();

  const handleChangeWritingMode = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value as WritingModeType;
    setWritingMode(inputValue);

    if (inputValue === 'solo') {
      setNovel({ type: 1 });
    } else {
      setNovel({ type: 2 });
    }
  };

  const handleChangePeopleCount = (value: number) => {
    if (value === 2 || value === 3 || value === 4 || value === 5) {
      setNovel({ type: value });
    }
  };

  const handleChangeTitle = (title: string) => {
    setNovel({
      title,
    });
  };

  const handleChangeDescription = (subTitle: string) => {
    setNovel({
      subTitle,
    });
  };

  return (
    <>
      <p className={st.text1}>01. 소설공방 개설</p>
      <p className={st.text2}>작가들을 모집하고 새로운 세계관을 만들어보세요</p>
      <WritingModeSelector onChange={handleChangeWritingMode} writingMode={writingMode} />
      {writingMode === 'collaborate' && <PeopleCount onChange={handleChangePeopleCount} />}
      <OneLineInput
        onChange={handleChangeTitle}
        style={{ marginTop: '60px' }}
        compulsory={props.titleCheck.essential}
        categoryText="제목"
        speechBubbleText="소설의 제목을 정해주세요"
        placeholder="소설의 제목을 작성해주세요"
        errorText={props.titleCheck.errorMsg}
        isError={props.titleCheck.isError}
      />
      <OneLineInput
        onChange={handleChangeDescription}
        style={{ marginTop: '31px' }}
        compulsory={props.subTitleCheck.essential}
        categoryText="한줄 소개"
        placeholder="소설의 내용을 요약해주세요"
        errorText={props.subTitleCheck.errorMsg}
        isError={props.subTitleCheck.isError}
      />
      <CategorySelect
        compulsory={props.categoryCheck.essential}
        isError={props.categoryCheck.isError}
        errorText={props.categoryCheck.errorMsg}
        style={{ marginTop: '31px' }}
      />
      <HashTagInput
        onChange={tags => setNovel({ novelTag: tags })}
        categoryText="태그"
        compulsory={props.novelTagCheck.essential}
        errorText={props.novelTagCheck.errorMsg}
        isError={props.novelTagCheck.isError}
        style={{ marginTop: '31px' }}
      />

      {/* 등장인물 */}
      <MultipleLineInput
        onChange={value => {
          setNovel({ actor: value });
        }}
        style={{ marginTop: '55px' }}
        compulsory={props.actorCheck.essential}
        categoryText="등장인물"
        speechBubbleText="소설의 등장인물에 대한 설명을 입력해주세요"
        placeholder="(예시) 로미오 : 아름다운 줄리엣을 만나 첫눈에 사랑에 빠진다."
        errorText={props.actorCheck.errorMsg}
        isError={props.actorCheck.isError}
      />

      {/* 줄거리 */}
      <MultipleLineInput
        onChange={value => {
          setNovel({ summary: value });
        }}
        style={{ marginTop: '20px' }}
        compulsory={props.summaryCheck.essential}
        categoryText="줄거리"
        speechBubbleText="소설의 줄거리를 기승전결에 따라 입력해주세요."
        placeholder="줄거리에 대해 작성해주세요."
        errorText={props.summaryCheck.errorMsg}
        isError={props.summaryCheck.isError}
      />

      {/* 선택된 북커버 */}
      <BookCover style={{ marginTop: '16px' }} src={bookSrc} />
      {/* 기본 북커버 이미지 리스트 */}
      <BookCoverList style={{ marginTop: '16px' }} selectImage={setBookScr} />
    </>
  );
}
