import { useState } from 'react';
import { useRouter } from 'next/router';
import st from './workSpace.module.scss';
import WorkSpace from './workSpace';
import { WorkspaceCreationModal } from '@/components';
import WriterRecruitment from './writerRecruitment';
import { useMutation } from '@tanstack/react-query';
import { config } from '@/config/config';
import { CreateRoom } from '@/fetch/post';
import useCreateNovelPost from '@/zustand/stores/useCreateNovelPost.zst';

const pageComponentsMap: Record<number, React.ReactNode> = {
  0: <WorkSpace />,
  1: <WriterRecruitment />,
};

export default function WorkSpaceCreation() {
  const route = useRouter();
  const [pageIdx, setPageIdx] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    type,
    title,
    subTitle,
    category,
    novelTag,
    actor,
    summary,
    bookCover,
    postTitle,
    postContent,
    openLink,
    novelChecking,
    postChecking,
  } = useCreateNovelPost();

  const { mutate } = useMutation({
    mutationKey: [config.apiUrl.createNovelRoom],
    mutationFn: CreateRoom,
    onSuccess(res) {
      route.replace('/work-space');
    },
    onError(res) {
      console.error(res);
    },
  });

  const handleClickButton = () => {
    const lastIdx = Object.keys(pageComponentsMap).length - 1;

    if (pageIdx < lastIdx) {
      if (!novelChecking()) {
        setPageIdx(prev => prev + 1);
      }
    }

    if (!postChecking()) {
      setModalOpen(true);
    }
  };

  const handleClickModalConfirm = () => {
    setModalOpen(false);
    mutate({
      title: title || undefined,
      type,
      category: category || undefined,
      character: actor || undefined,
      subTitle: subTitle || undefined,
      novelTags: novelTag,
      summary: summary || undefined,
      bookCover,
      attendContent: postContent || undefined,
      attendOpenKakaoLink: openLink || undefined,
      attendTitle: postTitle || undefined,
    });
  };

  const handleClickModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={st.container}>
        <div className={`${st.contentContainer} ${st.mt44}`}>
          {pageComponentsMap[pageIdx]}
          <button
            type="button"
            className={`${st.nextBtn} blue-btn ${st.mt32}`}
            onClick={handleClickButton}
          >
            다음
          </button>
        </div>
      </div>
      {isModalOpen && (
        <WorkspaceCreationModal
          nextStep={handleClickModalConfirm}
          cancel={handleClickModalCancel}
        />
      )}
    </>
  );
}
