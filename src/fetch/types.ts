// attending : 참여중, attendingReject : 참여 반려, attendingReview : 참여 검토, exit : 퇴장
type writerStatus = 'attending' | 'attendingReject' | 'attendingReview' | 'exit';

// solo : 혼자 ___ group2 : 2명 ___ group3 : 3명
export type roomType = 'solo' | 'group2' | 'group3' | 'group4' | 'group5';
export type roomStatus = 'participating' | 'not_participating';
interface pagination {
  totalPage: number;
  chunkSize: number;
  totalCount: number;
}
interface apiResponse {
  timestamp: string;
  statusCode: number;
  message: string;
}
export interface novelPost {
  id: number;
  type: roomType;
  title: string;
  category: string;
  currentAttendCnt: number;
  currentWriterCnt: string;
  writerStatus: writerStatus;
  exitedAt: string | null; // ?
  createdAt: string; // ??
  notifiedAt: number; // ??
  completionAt: string | null;
  status: string; // ??
}
export interface loginApiArg {
  email: string;
  password: string;
}
export interface loginApiResonse extends apiResponse {
  data: {
    accessToken: string;
    hasRoom: boolean;
  };
}

export interface novelListResponse extends apiResponse {
  data: novelPost[];
  meta: pagination;
}

export interface CreateRoomArg {
  title: string;
  subTitle: string;
  category: string;
  type: string;
  character: string;
  summary: string;
}

export interface CreateWritePostArg {
  novelRoomId: number;
  title: string;
  content: string;
  openKakaoLink: string;
}
