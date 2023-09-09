import { ReactElement, useState } from 'react';

import MultipleLineInput from '@/components/MultipleLineInput/MultipleLineInput';
import OneLineInput from '@/components/OneLineInput/OneLineInput';

import st from './post.module.scss';

export default function CreatePost(): ReactElement {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [openLink, setOpenLink] = useState<string>('');
  return (
    <div className={st.content}>
      <div className={`${st.content_center}`}>
        <p className={st.text1}>02.작가 모집 게시글 작성</p>
        <p className={st.text2}>작가들을 모집하고 새로운 세계관을 만들어보세요</p>

        <OneLineInput
          onChange={setTitle}
          style={{ marginTop: '84px' }}
          compulsory
          categoryText="제목"
          placeholder="(예시) 12월 목료로 판타지 소설 작서해 보실분 구해요"
          errorText="제목을 입력해주세요"
          isError={false}
          speechBubbleText="소설을 함께 작성하실 작가를 모집하는 게시물의 제목입니다"
        />

        <MultipleLineInput
          onChange={setContents}
          style={{ marginTop: '31px' }}
          compulsory
          categoryText="작가 모집 내용"
          speechBubbleText="함께 소설을 작성하실 작가를 모집하는 게시글의 내용입니다."
          placeholder="(예시) 제목은 'OOO'이구요. 평일 모두 시간되시는 분 선호하고 잠수 시 강제 퇴장합니다. 오픈 채팅으로 연락 주세요."
          errorText=""
          isError={false}
        />

        <OneLineInput
          onChange={setOpenLink}
          style={{ marginTop: '41px' }}
          compulsory
          categoryText="오픈채팅 링크"
          placeholder="(예시) https://open.kakao.com/xxxxxxxxxxx"
          errorText="링크를 입력해주세요"
          isError={false}
          speechBubbleText="“작가모집 게시글을 보고 작가 분들이 해당 링크로 연락을 할 수 있습니다. 카카오톡 오픈채팅방 (1:1 채팅방) 생성 후 링크를 기입해 주세요.”"
        />
        <button type="button" className={st.nextBtn}>
          다음
        </button>
      </div>
    </div>
  );
}
