import Image from 'next/image';
import { ReactElement, useState } from 'react';

import bottomArrow from '@/images/bottom-arrow.svg';

import st from './GenreBtn.module.scss';
import { GenreBtnProps } from './type';

export default function GenreBtn({ disabled }: GenreBtnProps): ReactElement {
  const [openPenel, setOpenPanel] = useState<boolean>(false);
  return (
    <button type="button" className={`${!disabled ? st.btn : st.disableBtn}`} onClick={opener}>
      장르이름
      <Image src={bottomArrow} alt="소설 장르 선택 패널 열기 아이콘" />
      {openPenel ? (
        <div className={st.btn_panel}>
          {[
            '11111',
            '2222',
            '33333',
            '444444',
            '5555555',
            '6666666',
            '77777777',
            '888888',
            '999999',
          ].map(i => (
            <label className={st.btn_panel_label} key={i}>
              <input type="radio" name="genre" />
              <p>시/수필/에세이</p>
            </label>
          ))}
        </div>
      ) : null}
    </button>
  );
  function opener() {
    if (!openPenel) {
      return;
    }
    setOpenPanel(p => !p);
  }
}
