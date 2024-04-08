import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers'; //uninstall but, interesting information
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactElement, useId, useMemo, useState } from 'react';

import { config } from '@/config/config';
import { novelJoinWriteList } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import DndItem from '../DndItem/DndItem';
import { WriterManagerBoxProps } from './type';
import st from './WriterManagerBox.module.scss';

export default function WriterManagerBox({ handleDragEnd }: WriterManagerBoxProps): ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const roomId = useUrlDatas();
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const id: string = useId();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { data: writerList, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.novelJoinWriterList, roomId],
    queryFn: () => novelJoinWriteList(roomId),
  });
  const data = useMemo(() => writerList?.data ?? [], [writerList]);

  const modifyCancel = (): void => {
    setModifyMode(false);
  };
  const doModify = () => {
    setModifyMode(true);
  };
  const handleDragStart = (event: DragStartEvent) => {
    if (!event) {
      setActiveId(null);
    }
    setActiveId(event.active.id);
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    handleDragEnd(e);
  };
  return (
    <DndContext
      sensors={sensors}
      id={id}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={st.column}>
        <div className={st.box}>
          <div className={st.box_title}>참여작가({data.length}/5)</div>

          <div className={st.scrollBox}>
            <SortableContext
              disabled={!modifyMode}
              items={data ?? []}
              strategy={verticalListSortingStrategy}
            >
              {data.map(item => (
                // 마우스가 드래그를 하면 마우스를 따라오는 것이 아닌 드래그 아이템이 놓아질 위치에 그려지는 element
                <DndItem
                  {...item}
                  overlayMode={false}
                  disabled={!modifyMode}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </SortableContext>
          </div>

          {/* 마우스가 드래그를 시작하면 마우스를 따라오는 오버레이 element */}
          <DragOverlay dropAnimation={null}>
            {activeId && data.length > 0 ? (
              <DndItem
                overlayMode={false}
                disabled={!modifyMode}
                {...data.find(item => item.id === activeId)}
              />
            ) : null}
          </DragOverlay>

          {!modifyMode ? (
            <button onClick={doModify} className={st.box_button} type="button">
              작가 순서 관리
            </button>
          ) : null}

          {modifyMode ? (
            <div className={st.box_btns}>
              <button type="button">완료</button>
              <button onClick={modifyCancel} type="button">
                취소
              </button>
            </div>
          ) : null}
        </div>

        <button className={st.column_btn} type="button">
          완결하기
        </button>
      </div>
    </DndContext>
  );
}
