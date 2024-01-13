import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

export default function novelList(
  roomStatus: 'participating' | 'not_participating' = 'participating'
) {
  return callApi(`${config.apiLink + config.apiUrl.novelList}?roomStatus=${roomStatus}`);
}
