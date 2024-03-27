import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import {
  GetNovelChaterListRequest,
  GetNovelChaterListResponse,
  GetWriterListAdminResponse,
  GetWriterWantedListRequest,
  GetWriterWantedListResponse,
  NovelJoinWriteListResponse,
  NovelListRequest,
  NovelListResponse,
  NovelRoomInfoResponse,
  UserListResponse,
} from '../types';

const method = 'GET';

/**
 * 소설공방모집글 리스트
 * @param param0 NovelListRequest
 * @returns NovelListResponse
 */
export function novelList({ page, roomState }: NovelListRequest) {
  return callApi<NovelListResponse>({
    url: `${config.apiUrl.novelList}?roomStatus=${roomState}&chunkSize=${config.pageSize}&pageNo=${page}`,
    method,
  });
}
export function userList() {
  return callApi<UserListResponse>({ url: config.apiUrl.user, method });
}
/**
 * 소설공방의 기본정보 탭
 * @param roomId 소설공방 번호
 * @returns NovelRoomInfoResponse
 */
export function novelRoomInfo(roomId: number) {
  return callApi<NovelRoomInfoResponse>({
    url: config.apiUrl.novelRoomInfo(roomId),
    method,
  });
}
/**
 * 참여중인 작가 리스트
 * @param roomId novel room id
 * @returns NovelJoinWriteListResponse
 */
export function novelJoinWriteList(roomId: number) {
  return callApi<NovelJoinWriteListResponse>({
    url: `${config.apiUrl.novelJoinWriterList}?novelRoomId=${roomId}`,
    method,
  });
}
/**
 * 소설공방 상세페이지의 회차정보
 * @param param0 GetNovelChaterListRequest
 * @returns GetNovelChaterListResponse
 */
export function getNovelChapterList({ novelRoomId, page }: GetNovelChaterListRequest) {
  return callApi<GetNovelChaterListResponse>({
    url: `${config.apiUrl.novelChapterList}?chunkSize=${config.pageSize}&pageNo=${page}&novelRoomId=${novelRoomId}`,
    method,
  });
}
/**
 * 소설공방에서 작가관리를 위한 작가 리스트(공장 주인용)
 * @param roomId 룸 아이디
 * @returns GetWriterListAdminResponse
 */
export function getWriterListAdmin(roomId: number) {
  return callApi<GetWriterListAdminResponse>({
    url: `${config.apiUrl.getWriterListAdmin}?novelRoomId=${roomId}`,
    method,
  });
}
/**
 * 작가모집글
 * @returns GetWriterWantedListResponse
 */
export function getWriterWantedList({ page }: GetWriterWantedListRequest) {
  return callApi<GetWriterWantedListResponse>({
    url: `${config.apiUrl.getWriterWantedList}?pageNo=${page}&chunkSize=${config.pageSize}`,
    method,
  });
}
