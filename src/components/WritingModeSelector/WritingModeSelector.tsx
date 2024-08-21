import { WritingModeType } from '@/pages/write/info';
import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import st from './WritingModeSelector.module.scss';

interface WritingModeSelectorProps {
  writingMode: WritingModeType;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const WritingModeSelector = ({ onChange, writingMode }: WritingModeSelectorProps) => (
  <WriteRoomCategory compulsory categoryText="작가정원" speechBubbleText="인원수를 정해주세요">
    <div className={st.container}>
      <label className={st.inputBox}>
        <input
          type="radio"
          onChange={onChange}
          defaultChecked
          value="collaborate"
          checked={writingMode === 'collaborate'}
        />
        <p className={st.ml8}>같이 글쓰기</p>
      </label>
      <label className={st.inputBox}>
        <input type="radio" onChange={onChange} value="solo" checked={writingMode === 'solo'} />
        <p className={st.ml8}>혼자 글쓰기</p>
      </label>
    </div>
  </WriteRoomCategory>
);
