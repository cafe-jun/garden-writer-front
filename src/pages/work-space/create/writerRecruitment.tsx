import { OneLineInput, MultipleLineInput } from '@/components';
import useCreateNovelPost from '@/zustand/stores/useCreateNovelPost.zst';

import st from './writerRecruitment.module.scss';

export default function WriterRecruitment() {
  const { postTitleCheck, postContentCheck, openLinkCheck, setPost } = useCreateNovelPost();

  const handleChangeTitle = (postTitle: string) => {
    setPost({ postTitle });
  };

  const handleChangeContent = (postContent: string) => {
    setPost({
      postContent,
    });
  };

  const handleChangeLink = (openLink: string) => {
    setPost({
      openLink,
    });
  };

  return (
    <>
      <p className={st.text1}>02.작가 모집 게시글 작성</p>
      <p className={st.text2}>작가들을 모집하고 새로운 세계관을 만들어보세요</p>
      <OneLineInput
        onChange={handleChangeTitle}
        style={{ marginTop: '84px' }}
        compulsory={postTitleCheck.essential}
        categoryText="제목"
        placeholder="(예시) 12월 목표로 판타지 소설 작성해 보실 분 모집합니다."
        errorText={postTitleCheck.errorMsg}
        isError={postTitleCheck.isError}
        speechBubbleText="소설을 함께 작성하실 작가를 모집하는 게시물의 제목입니다"
      />
      <MultipleLineInput
        onChange={handleChangeContent}
        style={{ marginTop: '31px' }}
        compulsory={postContentCheck.essential}
        categoryText="작가 모집 내용"
        speechBubbleText="함께 소설을 작성하실 작가를 모집하는 게시글의 내용입니다."
        placeholder={`(예시) 제목은 'OOO’ 입니다. 
평소에 판타지 소설 즐겨보시는 아이디어 뱅크 분을 찾고 있습니다. 평일 저녁 8시 이후로 시간 되시는 분 선호하고 잠수는 강퇴합니다. 궁금하신 점은 오픈 채팅으로 연락해 주세요.`}
        errorText={postContentCheck.errorMsg}
        isError={postContentCheck.isError}
      />
      <OneLineInput
        onChange={handleChangeLink}
        style={{ marginTop: '41px' }}
        compulsory={openLinkCheck.essential}
        categoryText="오픈채팅 링크"
        placeholder="(예시) https://open.kakao.com/xxxxxxxxxxx"
        errorText={openLinkCheck.errorMsg}
        isError={openLinkCheck.isError}
        speechBubbleText="“작가모집 게시글을 보고 작가 분들이 해당 링크로 연락을 할 수 있습니다. 카카오톡 오픈채팅방 (1:1 채팅방) 생성 후 링크를 기입해 주세요.”"
      />
    </>
  );
}
