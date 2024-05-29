import { useRouter } from 'next/router';
import { useMemo } from 'react';
/**
 * url에서 데이터를 가져올 때 사용함
 * @code  useUrlDatas<number>("roomid")
 * @param dataName 가져올 url data의 이름
 * @returns T 타입의 dataName
 */
export function useUrlDatas<T>(dataName: string) {
  const router = useRouter();
  const roomId = useMemo(() => {
    const data = router.query[dataName];
    return data as T;
  }, [router.isReady]);
  return roomId;
}
