import { create } from 'zustand';

import { RoomType } from '@/fetch/types';

interface Novel {
  // 소설정보
  type: RoomType;
  title: string;
  subTitle: string;
  category: number;
  novelTag: string[];
  actor: string;
  summary: string;
}
interface Post {
  // 작가모집글
  postTitle: string;
  postContent: string;
  openLink: string;
}
interface Actions {
  setNovel(data: Partial<Novel>): void;
  setPost(data: Partial<Post>): void;
}

const useCreateNovelPost = create<Novel & Post & Actions>()((set, get) => ({
  type: 2,
  title: '',
  subTitle: '',
  category: 0,
  novelTag: [],
  actor: '',
  summary: '',

  postTitle: '',
  postContent: '',
  openLink: '',
  setNovel(data) {
    set({ ...data });
  },
  setPost(data) {
    set({ ...data });
  },
}));

export default useCreateNovelPost;
