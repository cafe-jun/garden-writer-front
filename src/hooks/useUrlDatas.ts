import { useRouter } from 'next/router';
import { useMemo } from 'react';

// interface UseUrlDatasResult {
//   roomId: number;
// }
export function useUrlDatas(): number {
  const router = useRouter();
  const roomId = useMemo(() => {
    const { room } = router.query;
    return Number(room ?? 0);
  }, [router.isReady]);
  return roomId;
}
