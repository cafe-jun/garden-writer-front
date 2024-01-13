import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

import { loginApiArg, loginApiResonse } from '../types';

export default function loginApi({ email, password }: loginApiArg): Promise<loginApiResonse> {
  return callApi(config.apiLink + config.apiUrl.login, { email, password }, 'POST');
}
