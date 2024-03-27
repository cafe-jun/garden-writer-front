import { GetWriterWantedList } from '@/fetch/types';

export enum RecruitmentTableStatus {
  completed = 'completed',
  active = 'active',
}
export interface Props {
  data: GetWriterWantedList[];
}
