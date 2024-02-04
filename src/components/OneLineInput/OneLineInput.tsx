import { ChangeEvent, ReactElement } from 'react';

import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import st from './OneLineInput.module.scss';
import { OneLineInputProps } from './type';
/**
 * 공방 개성 페이지에서 사용되는 한줄 입력 input component
 * @param props OneLineInputProps
 * @returns component
 */
export default function OneLineInput(props: OneLineInputProps): ReactElement {
  return (
    <WriteRoomCategory
      style={props.style}
      compulsory={props.compulsory}
      categoryText={props.categoryText}
      speechBubbleText={props.speechBubbleText}
    >
      <div className={st.container}>
        <input
          placeholder={props.placeholder}
          className={st.inputBox}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChange(event.target.value);
          }}
        />
        {props.isError ? <p>{props.errorText}</p> : null}
      </div>
    </WriteRoomCategory>
  );
}
