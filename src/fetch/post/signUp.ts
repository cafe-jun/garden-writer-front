import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

import { signUpRequestModel } from '../types';

export default function signUp({ email, password, nickname }: signUpRequestModel): Promise<void> {
  return callApi(config.apiLink + config.apiUrl.signUp, { email, password, nickname }, 'POST');
}
