import { ChangeEvent } from 'react';
import st from './MultipleLineInput.module.scss';
import WriteRoomCategory from '../../recruit/WriteRoomCategory/WriterRoomCategory';
import { writeRoomCategoryProps } from '../../recruit/WriteRoomCategory/type';

export interface MultipleLineInputProps extends Omit<writeRoomCategoryProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;
  onChange: (value: string) => void;
}

export const MultipleLineInput = ({
  style,
  compulsory,
  categoryText,
  speechBubbleText,
  placeholder,
  onChange,
  isError,
  errorText,
}: MultipleLineInputProps) => (
  <WriteRoomCategory
    style={style}
    compulsory={compulsory}
    categoryText={categoryText}
    speechBubbleText={speechBubbleText}
  >
    <div className={st.container}>
      <textarea
        placeholder={placeholder}
        className={st.inputBox}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChange(event.target.value);
        }}
      />
      {isError && <p>{errorText}</p>}
    </div>
  </WriteRoomCategory>
);
