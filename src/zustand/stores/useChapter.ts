import { create } from 'zustand';

interface State {
  lastChapterId: number;
  title: string | undefined;
}
interface Actions {
  setLastChapterId(id: number): void;
  setChapterTitle(title: string): void;
}
const state: State = {
  lastChapterId: 0,
  title: '',
};

const useNovelChapter = create<State & Actions>()((set, get) => ({
  ...state,
  setLastChapterId(id: number) {
    set({ lastChapterId: id });
  },
  setChapterTitle(title: string) {
    set({ title });
  },
}));

export default useNovelChapter;
