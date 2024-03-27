import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import WriteRoomCategory from '@/components/WriteRoomCategory/WriterRoomCategory';
import tagDeleteBtn from '@/images/tag-delete-btn.svg';

import st from './HashTagInput.module.scss';
import { HashTagInputProps, makeTagArrReturn } from './type';

/**
 * 소설공방 개설 페이지에서 해시 태그 입력 component
 * @param param0 HashTagInputProps
 * @returns component
 */
export default function HashTagInput({
  isError,
  errorText,
  onChange: passTags,
  ...props
}: HashTagInputProps): ReactElement {
  const [lastKey, setLastKey] = useState<string>('');
  const [inputData, setInputData] = useState<string>('');
  const [drowTag, setDrowTag] = useState<string[]>([]);

  // regex를 잘 못해서 두개로 쪼겠습니다ㅠ
  const tagRegex = /#[\S]*/g;
  const findSharp = /^#( |#)/;

  function getInputData(e: ChangeEvent<HTMLInputElement>): void {
    setInputData(e.target.value);
  }

  function getKeyCode(e: KeyboardEvent<HTMLInputElement>): void {
    setLastKey(e.key);
  }

  function makeTagArr(): makeTagArrReturn {
    // #으로 시작하는 모든 태그를 검색
    const catchTag: string[] | null = inputData.match(new RegExp(tagRegex));
    if (catchTag === null) {
      return null;
    }
    // #만 있는 한글자일 수도 있으므르로 한글자 이상일 경우만 filter
    const filterZeroLength = catchTag.filter(item => item.length > 1);

    // # 바로 다음 string이 공백이 아니거나 #으로 다시 시작하는 경우의 string 제거
    const filterSharp = filterZeroLength.filter(item => !findSharp.test(item));
    return [...drowTag, ...filterSharp];
  }

  function tagDelete(index: number) {
    setDrowTag((p: string[]) => p.filter((item, index_) => index_ !== index));
  }

  useEffect(() => {
    if (lastKey !== ' ' && lastKey !== '#') {
      return;
    }
    const nextTags: makeTagArrReturn = makeTagArr();
    if (nextTags === null) {
      return;
    }
    nextTags.forEach((item: string) => {
      setInputData(p => p.replace(lastKey === '#' ? `${item}` : `${item} `, ''));
    });
    setDrowTag(nextTags);
  }, [inputData, lastKey]);

  useEffect(() => {
    passTags(drowTag);
  }, [drowTag]);

  return (
    <WriteRoomCategory {...props}>
      <div className={st.tagArea}>
        <div className={st.tagContainer}>
          {drowTag.map(
            (item: string, index: number): ReactElement => (
              <div className={st.tagContainer_tag} key={item + index.toString()}>
                <p>{item}</p>
                <Image
                  onClick={() => {
                    tagDelete(index);
                  }}
                  className={st.tagContainer_tag_delete}
                  alt="태그 삭제 버튼"
                  src={tagDeleteBtn}
                />
              </div>
            )
          )}
          <input
            value={inputData}
            onKeyDown={getKeyCode}
            onInput={getInputData}
            className={st.tagContainer_input}
            placeholder="#카테고리"
          />
        </div>
        {isError ? <p className={st.tagArea_errorText}>{errorText}</p> : null}
      </div>
    </WriteRoomCategory>
  );
}
