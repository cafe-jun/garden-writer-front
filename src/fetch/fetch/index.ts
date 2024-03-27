import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import { UpdateWriterStateRequest } from '../types';

const method = 'PUT';
/**
 * 소설공방에서 작가 상태 변경 (공방 주인용)
 * @param userId 유저id
 * @returns boolean
 */
export function updateWriterState({ status, userId }: UpdateWriterStateRequest) {
  return callApi<boolean>({
    url: config.apiUrl.updateWriterState(userId),
    method,
    body: {
      status,
    },
  });
}
