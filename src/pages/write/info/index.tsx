import { StaticImageData } from 'next/image';
import { ReactElement, useState } from 'react';

import BookCover from '@/components/BookCover/BookCover';
import BookCoverList from '@/components/BookCoverList/BookCoverList';
import CategorySelect from '@/components/CategorySelect/CategorySelect';
import HashTagInput from '@/components/HashTagInput/HashTagInput';
import MultipleLineInput from '@/components/MultipleLineInput/MultipleLineInput';
import OneLineInput from '@/components/OneLineInput/OneLineInput';
import PeopleCount from '@/components/PeopleCount/PeopleCount';
import WriterPeople from '@/components/WriterPeople/WrtierPeople';
import useCreateNovelPost from '@/zustand/stores/useCreateNovelPost.zst';

import CreatePost from '../post';
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

  // api가 어떤 형태로 저장하는지 몰라서 작업 못함
  const [cagegory, setCategory] = useState();

  // 해시태그 #이름 형태의 array
  const [hashTags, setHashTags] = useState<string[]>([]);

  // 등장인물 소개
  const [actor, setActor] = useState<string>('');

  // 줄거리
  const [summary, setSummary] = useState<string>('');

  // 북커버 리스트에서 이미지를 선택시 해당 변수에 이미지가 저장됨
  const [bookSrc, setBookScr] = useState<StaticImageData>();

  const { setNovel, novelChecking, ...props } = useCreateNovelPost();

  const [page, setPage] = useState<boolean>(false);
  if (page) {
    return <CreatePost />;
  }
  return (
    <div className={st.container}>
      {/* 중앙 content box start */}
      <div className={`${st.contentContainer} ${st.mt44}`}>
        <p className={st.text1}>01.소설공방 개설</p>
        <p className={st.text2}>작가들을 모집하고 새로운 세계관을 만들어보세요</p>

        {/* 여러명이 하는지 아님 개인이 하는지 */}
        <WriterPeople
          onChange={value => {
            setPeople(value);
            if (value === 1) {
              setNovel({ type: 2 });
            } else {
              setNovel({ type: 1 });
            }
          }}
        />
        {/* 여러명일 경우 인원선택 */}
        {people === 1 ? (
          <PeopleCount
            onChange={value => {
              setPeopleCount(value);
              switch (value) {
                case 2:
                  setNovel({ type: 2 });
                  break;
                case 3:
                  setNovel({ type: 3 });
                  break;
                case 4:
                  setNovel({ type: 4 });
                  break;
                case 5:
                  setNovel({ type: 5 });
                  break;
                default:
                  break;
              }
            }}
          />
        ) : null}

        {/* 제목 */}
        <OneLineInput
          onChange={value => {
            setNovel({
              title: value,
            });
          }}
          style={{ marginTop: '60px' }}
          compulsory={props.titleCheck.essential}
          categoryText="제목"
          speechBubbleText="소설의 제목을 정해주세요"
          placeholder="소설의 제목을 작성해주세요"
          errorText={props.titleCheck.errorMsg}
          isError={props.titleCheck.isError}
        />

        {/* 한줄 소개 */}
        <OneLineInput
          onChange={value => {
            setNovel({
              subTitle: value,
            });
          }}
          style={{ marginTop: '31px' }}
          compulsory={props.subTitleCheck.essential}
          categoryText="한줄 소개"
          placeholder="소설의 내용을 요약해주세요"
          errorText={props.subTitleCheck.errorMsg}
          isError={props.subTitleCheck.isError}
        />

        {/* 카테고리 */}
        <CategorySelect
          compulsory={props.categoryCheck.essential}
          isError={props.categoryCheck.isError}
          errorText={props.categoryCheck.errorMsg}
          style={{ marginTop: '31px' }}
        />

        {/* 해시태그 입력 */}
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

        <button
          type="button"
          className={`${st.nextBtn} blue-btn ${st.mt32}`}
          onClick={() => {
            if (!novelChecking()) {
              setPage(true);
            }
            // setPage(true);
            // console.log(props);
          }}
        >
          다음
        </button>
      </div>
      {/* 중앙 content box end */}
    </div>
  );
}
