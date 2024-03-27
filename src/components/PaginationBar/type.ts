import { Pagination } from '@/fetch/types';

export interface PaginationBarProps extends Pagination {
  type: 'white' | 'dark';
}
