import { NovelJoinWriteList } from '@/fetch/types';

export interface DndItemProps extends Partial<NovelJoinWriteList> {
  disabled: boolean;
  overlayMode: boolean;
}
