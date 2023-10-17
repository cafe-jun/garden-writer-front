import { ReactElement } from 'react';

import st from './ScrollTextBox.module.scss';
import { ScrollTextBoxProps } from './type';

export default function ScrollTextBox({
  style,
  title,
  date,
  disabled,
}: ScrollTextBoxProps): ReactElement {
  return (
    <div style={style} className={`${st.container} ${disabled ? '' : st.on}`}>
      <div className={st.container_texts}>
        <p className={st.container_title}>{title}</p>
        <p className={st.container_date}>{date}</p>
      </div>
      <textarea disabled={disabled} className={st.container_textarea} />
    </div>
  );
}
