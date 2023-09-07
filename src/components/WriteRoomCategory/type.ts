import { ReactElement } from 'react';

export interface writeRoomCategoryProps {
  // 필수인지 아닌지
  compulsory: boolean;

  // 카테고리 이름
  categoryText: string;

  // 말풍선에 들어가는 설명
  speechBubbleText?: string;

  // 자식 component
  children: ReactElement;

  style?: {
    marginTop?: string;
  };
}
