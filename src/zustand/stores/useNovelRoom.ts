import { create } from 'zustand';

interface State {
  lastChapterId: number;
}
interface Actions {
  setLastChapterId(id: number): void;
}
const state: State = {
  lastChapterId: 0,
};

const useNovelRoom = create<State & Actions>()((set, get) => ({
  ...state,
  setLastChapterId(id: number) {
    set({ lastChapterId: id });
  },
}));

export default useNovelRoom;
