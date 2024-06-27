import Image from 'next/image';
import { ReactElement, useState } from 'react';

import { config } from '@/config/config';
import { novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import ScrollTextBox from '../ScrollTextBox/ScrollTextBox';
import Skel from '../Skel/Skel';
import st from './NovelDefaultInfo.module.scss';

export default function NovelDefaultInfo({ isShow = false }: { isShow: boolean }): ReactElement {
  const roomId = useUrlDatas<number>('room');
  const [modityMode, setModifyMode] = useState<boolean>(false);
  const { data: novelInfo, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });
  const toggleModify = () => {
    setModifyMode(p => !p);
  };
  return (
    <div className={st.main} style={{ display: isShow ? 'flex' : 'none' }} aria-hidden={isShow}>
      <div className={st.main_imgAndTextBox}>
        {isSuccess && (
          <Image
            width={270}
            height={202}
            style={{ objectFit: 'cover' }} // 이미지를 컨테이너에 맞게 자르고 채움
            src={novelInfo?.data?.bookCover ?? '/images/book-cover-2.png'}
            alt="북커버"
          />
        )}
        {!isSuccess && <Skel sx={{ width: 270, height: 202 }} />}

        <div className={st.main_textColumn}>
          {isSuccess && (
            <ScrollTextBox
              disabled={!modityMode}
              title="소개"
              content={novelInfo.data.subTitle}
              style={{ width: '718px', height: '138px', marginLeft: '8px' }}
            />
          )}
          {!isSuccess && <Skel sx={{ width: 718, height: 138, marginLeft: 8 }} />}

          {isSuccess && (
            <div className={`${st.main_tagBox} ${modityMode ? st.mdf : ''}`}>
              <div className={st.main_tag_flexWrap}>
                <div className={st.main_tagBox_tag}>#{novelInfo?.data.category.name}</div>
              </div>
            </div>
          )}
          {!isSuccess && <Skel sx={{ width: 718, height: 56, marginLeft: 8, marginTop: 8 }} />}
        </div>
      </div>

      {/* 등장인물 */}
      {isSuccess && (
        <ScrollTextBox
          content={novelInfo.data.character}
          disabled={!modityMode}
          title="등장인물"
          style={{ width: '996px', height: '186px', marginTop: '8px' }}
        />
      )}
      {!isSuccess && <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />}

      {/* 줄거리 */}
      {isSuccess && (
        <ScrollTextBox
          content={novelInfo.data.summary}
          disabled={!modityMode}
          title="줄거리"
          style={{ width: '996px', height: '186px', marginTop: '8px' }}
        />
      )}
      {!isSuccess && <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />}
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
