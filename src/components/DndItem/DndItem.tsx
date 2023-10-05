import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { ReactElement } from 'react';

import userMoveIcon from '@/images/user-move-icon.svg';

import UserIcon from '../../images/user-icon.svg';
import st from './DndItem.module.scss';
import { DndItem } from './type';

export default function DndItem({ id, disabled }: DndItem): ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className={st.item} style={style} {...attributes} {...listeners}>
      <Image src={UserIcon} alt="유저 아이콘" />
      <h3 className={st.item_name}>{id}</h3>

      {!disabled ? (
        <Image className={st.moveIcon} src={userMoveIcon} alt="그래그 가능 상태 아이콘" />
      ) : null}
    </div>
  );
}
