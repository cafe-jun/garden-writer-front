import Image from 'next/image';
import { ReactElement, useState } from 'react';

import { config } from '@/config/config';
import { novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import ScrollTextBox from '../ScrollTextBox/ScrollTextBox';
import st from './NovelDefaultInfo.module.scss';

export default function NovelDefaultInfo(): ReactElement {
  const roomId = useUrlDatas<number>('room');
  const [modityMode, setModifyMode] = useState<boolean>(false);
  const { data: novelInfo } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });
  const toggleModify = () => {
    setModifyMode(p => !p);
  };
  return (
    <div className={st.main}>
      <div className={st.main_imgAndTextBox}>
        <Image
          width={270}
          height={202}
          style={{ objectFit: 'cover' }} // 이미지를 컨테이너에 맞게 자르고 채움
          src={novelInfo?.data?.bookCover ?? '/images/book-cover-2.png'}
          alt="북커버"
        />
        <div className={st.main_textColumn}>
          <ScrollTextBox
            disabled={!modityMode}
            title={novelInfo?.data.subTitle ?? ''}
            // date={novelInfo?.data.updatedAt ?? ''}
            style={{ width: '718px', height: '138px', marginLeft: '8px' }}
          />

          <div className={`${st.main_tagBox} ${modityMode ? st.mdf : ''}`}>
            <div className={st.main_tag_flexWrap}>
              {/* {['aaa', 'ddd', 'cccc'].map(i => (
            <div key={i} className={st.main_tagBox_tag}>
              #{i}
            </div>
          ))} */}
              <div className={st.main_tagBox_tag}>#{novelInfo?.data.category.name}</div>
            </div>
            {/* <p className={st.main_tag_date}>시간</p> */}
          </div>
        </div>
      </div>

      {/* 등장인물 */}
      <ScrollTextBox
        disabled={!modityMode}
        title="등장인물"
        style={{ width: '996px', height: '186px', marginTop: '8px' }}
      />
      {/* 줄거리 */}
      <ScrollTextBox
        disabled={!modityMode}
        title="줄거리"
        style={{ width: '996px', height: '186px', marginTop: '8px' }}
      />
      {!modityMode ? (
        <button
          type="button"
          className={`white-btn ${st.main_infoModifyBtn}`}
          onClick={toggleModify}
        >
          기본정보 수정
        </button>
      ) : (
        <div className={st.infoChangeBtn}>
          <button onClick={toggleModify} className="blue-btn" type="button">
            수정완료
          </button>
          <button className="white-btn" type="button">
            취소
          </button>
        </div>
      )}
    </div>
  );
}
