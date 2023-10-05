import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ReactElement, useId, useState } from 'react';

import DndItem from '../DndItem/DndItem';
import { WriterManagerBoxProps } from './type';
import st from './WriterManagerBox.module.scss';

export default function WriterManagerBox({
  data,
  handleDragEnd,
}: WriterManagerBoxProps): ReactElement {
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const id: string = useId();
  return (
    <DndContext id={id} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={st.column}>
        <div className={st.box}>
          <div className={st.box_title}>참여작가(3/5)</div>
          <SortableContext
            disabled={!modifyMode}
            items={data}
            strategy={verticalListSortingStrategy}
          >
            {data.map((item: string) => (
              <DndItem disabled={!modifyMode} id={item} key={item} />
            ))}
          </SortableContext>

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

  function modifyCancel(): void {
    setModifyMode(false);
  }
  function doModify() {
    setModifyMode(true);
  }
}
