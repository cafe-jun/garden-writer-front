import { callApi } from 'util/fetchWrapper';

import { config } from '@/config/config';

import { CreateWritePostArg } from '../types';

export default function CreateWritePost(body: CreateWritePostArg) {
  return callApi(config.apiLink + config.apiUrl.createWriterPost, body, 'POST');
}
