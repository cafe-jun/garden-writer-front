export interface RecruitmentTableProps {
  tableData: RecruitmentTable[];
}

export interface RecruitmentTable {
  id: string;
  novelTitle: string;
  title: string;
  admin: string;
  created: string;
  status: RecruitmentTableStatus;
  count: number;
  like: number;
  attend_users_number: number;
  user_limit: number;
}

export enum RecruitmentTableStatus {
  completed = 'completed',
  active = 'active',
}
