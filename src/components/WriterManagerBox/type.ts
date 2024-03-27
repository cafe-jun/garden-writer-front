import { DragEndEvent } from '@dnd-kit/core';

export interface WriterManagerBoxProps {
  handleDragEnd(event: DragEndEvent): void;
}
