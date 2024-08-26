import { ChangeEvent } from 'react';

import WriteRoomCategory from '../../recruit/WriteRoomCategory/WriterRoomCategory';
import st from './OneLineInput.module.scss';
import { writeRoomCategoryProps } from '../../recruit/WriteRoomCategory/type';

export interface OneLineInputProps extends Omit<writeRoomCategoryProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;
  onChange(value: string): void;
}

export const OneLineInput = ({
  placeholder,
  errorText,
  isError,
  style,
  compulsory,
  categoryText,
  speechBubbleText,
  onChange,
}: OneLineInputProps) => (
  <WriteRoomCategory
    style={style}
    compulsory={compulsory}
    categoryText={categoryText}
    speechBubbleText={speechBubbleText}
  >
    <div className={st.container}>
      <input
        placeholder={placeholder}
        className={st.inputBox}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
      />
      {isError ? <p>{errorText}</p> : null}
    </div>
  </WriteRoomCategory>
);
