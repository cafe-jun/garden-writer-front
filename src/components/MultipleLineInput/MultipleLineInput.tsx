import { ChangeEvent, ReactElement } from 'react';

import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import st from './MultipleLineInput.module.scss';
import { MultipleLineInputProps } from './type';

/**
 * 여러줄 입력가능한 text area component
 * @param props MultipleLineInputProps
 * @returns component
 */
export default function MultipleLineInput(props: MultipleLineInputProps): ReactElement {
  return (
    <WriteRoomCategory
      style={props.style}
      compulsory={props.compulsory}
      categoryText={props.categoryText}
      speechBubbleText={props.speechBubbleText}
    >
      <div className={st.container}>
        <textarea
          placeholder={props.placeholder}
          className={st.inputBox}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.onChange(event.target.value);
          }}
        />
        {props.isError ? <p>{props.errorText}</p> : null}
      </div>
    </WriteRoomCategory>
  );
}
