import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

export default function userList() {
  return callApi(config.apiLink + config.apiUrl.user);
}
