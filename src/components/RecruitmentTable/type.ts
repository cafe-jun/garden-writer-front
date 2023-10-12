export interface RecruitmentTableProps {
  tableData?: RecruitmentTable[];
  handleTableItem: (tableItem: RecruitmentTable) => void;
}

export interface RecruitmentTable {
  id: string;
  novelTitle: string;
  title: string;
  description: string;
  admin: string;
  created: string;
  status: RecruitmentTableStatus;
  count: number;
  like: number;
  attend_users_number: number;
  user_limit: number;
  openChatUrl: string;
}

export enum RecruitmentTableStatus {
  completed = 'completed',
  active = 'active',
}
