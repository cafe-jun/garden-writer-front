import { DragEndEvent } from '@dnd-kit/core';

export interface WriterManagerBoxProps {
  data: string[];

  handleDragEnd(event: DragEndEvent): void;
}
