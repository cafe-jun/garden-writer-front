import { create } from 'zustand';

import { roomType } from '@/fetch/types';

interface Novel {
  // 소설정보
  type: roomType;
  title: string;
  subTitle: string;
  category: string;
  hasTag: string[];
  actor: string;
  summary: string;
  setNovel(data: Partial<Omit<Novel, 'setTitle'>>): void;
}
interface Post {
  // 작가모집글
  postTitle: string;
  postContent: string;
  openLink: string;
  setPost(data: Partial<Omit<Post, 'setPost'>>): void;
}
interface initialzeApp extends Novel, Post {}

const useCreateNovelPost = create<initialzeApp>()((set, get) => ({
  type: 'group2',
  title: '',
  subTitle: '',
  category: '카테고리',
  hasTag: [],
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
