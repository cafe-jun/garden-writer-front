import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import { ChatComplete, UpdateWriterStateRequest } from '../types';

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
/**
 * 채팅으로 보낸 문단을 임시저장에서 완료로 상태변경
 * @param param0 chatId
 * @returns
 */
export function chatComplete({ chatId }: ChatComplete) {
  return callApi<boolean>({
    url: config.apiUrl.chatComplete(chatId),
    method,
    body: { id: chatId },
  });
}
