import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import {
  CreateRoomArg,
  CreateRoomResponse,
  LoginApiArg,
  LoginApiResonse,
  SignUpRequestModel,
} from '../types';

const method = 'POST';

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
