import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

import { novelListResponse, roomStatus } from '../types';

export default function novelList(
  roomState: roomStatus,
  chunkSize: number,
  page: number
): Promise<novelListResponse> {
  return callApi(
    `${
      config.apiLink + config.apiUrl.novelList
    }?roomStatus=${roomState}&chuckSize=${chunkSize}&pageNo=${page}`
  );
}
