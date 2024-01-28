import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

import { CreateRoomArg } from '../types';

export default function CreateRoom(body: CreateRoomArg) {
  return callApi(config.apiLink + config.apiUrl.createNovelRoom, body, 'POST');
}
