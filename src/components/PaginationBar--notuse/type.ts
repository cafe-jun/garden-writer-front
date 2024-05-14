import { Pagination } from '@/fetch/types';

export interface PaginationBarProps extends Partial<Pagination> {
  type: 'white' | 'dark';
}
