import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import {
  CreateRoomArg,
  CreateRoomResponse,
  LoginApiArg,
  LoginApiResonse,
  NewNovelTextRequest,
  SignUpRequestModel,
  WriterJoinReqest,
} from '../types';

const method = 'POST';

export function checkUserEmail(email: string) {
  return callApi<{ data: { result: boolean } }>({
    url: `${config.apiUrl.user}/check-email`,
    method,
    body: { email },
  });
}

export function checkUserNickname(nickname: string) {
  return callApi<{ data: { result: boolean } }>({
    url: `${config.apiUrl.user}/check-nickname`,
    method,
    body: { nickname },
  });
}

export function CreateRoom(body: CreateRoomArg) {
  return callApi<CreateRoomResponse>({ url: config.apiUrl.createNovelRoom, body, method });
}
export function loginApi({ email, password }: LoginApiArg) {
  return callApi<LoginApiResonse>({ url: config.apiUrl.login, body: { email, password }, method });
}
export function signUp({ email, password, nickname }: SignUpRequestModel) {
  return callApi<boolean>({
    url: config.apiUrl.signUp,
    body: { email, password, nickname },
    method,
  });
}
/**
 * 현재 작성중인 챕터에 글쓰기 api
 * @param body NewNovelTextRequest
 * @returns boolean
 */
export function newNovelText(body: NewNovelTextRequest) {
  return callApi<boolean>({
    url: config.apiUrl.newNovelText,
    body,
    method,
  });
}
/**
 * 참여작가로 신청
 * @param body WriterJoinReqest
 * @returns number
 */
export function writerJoinReqest(body: WriterJoinReqest) {
  return callApi<number>({
    url: config.apiUrl.writerJoinRequest,
    body,
    method,
  });
}
