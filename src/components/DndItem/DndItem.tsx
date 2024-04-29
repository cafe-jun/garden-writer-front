import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { ReactElement } from 'react';

import userMoveIcon from '@/images/user-move-icon.svg';

import UserIcon from '../../images/user-icon.svg';
import st from './DndItem.module.scss';
import { DndItemProps } from './type';

export default function DndItem({
  id,
  disabled,
  overlayMode,
  nickname,
}: DndItemProps): ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id ?? 1,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (overlayMode) {
    return (
      <div className={st.item}>
        <Image src={UserIcon} alt="유저 썸네일 아이콘" />
        <h3 className={st.item_name}>{nickname}</h3>

        {!disabled ? (
          <Image className={st.moveIcon} src={userMoveIcon} alt="그래그 가능 상태 아이콘" />
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`${st.item} ${isDragging ? st.moving : ''}`}
      style={style}
      {...attributes}
    >
      <Image src={UserIcon} alt="유저 썸네일 아이콘" />
      <h3 className={st.item_name}>{nickname}</h3>

      {!disabled ? (
        <Image
          {...listeners}
          className={st.moveIcon}
          src={userMoveIcon}
          alt="그래그 가능 상태 아이콘"
        />
      ) : null}
    </div>
  );
}
