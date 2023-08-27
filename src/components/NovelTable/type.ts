export interface NovelTableProps {
  tableData: NovelTable[];
}
export interface NovelTable {
  id: string;
  category: string;
  title: string;
  created: string;
  completed: string;
  user_type: NovelTableUserType;
  user_limit: number;
  attend_users_number: number;
  current_writer: string;
  status: NovelTableStatus;
}

export enum NovelTableStatus {
  completed = 'completed',
  active = 'active',
}

export enum NovelTableUserType {
  main = 'main',
  sub = 'sub',
}
