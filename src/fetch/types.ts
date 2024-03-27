// attending : 참여중, attendingReject : 참여 반려, attendingReview : 참여 검토, exit : 퇴장
type WriterStatus = 'attending' | 'attendingReject' | 'attendingReview' | 'exit';
type WriterType = 'host' | 'attendee';
type NovelStatus = 'writing';
// solo : 혼자 ___ group2 : 2명 ___ group3 : 3명
export type RoomType = 1 | 2 | 3 | 4 | 5;
export type RoomStatus = 'attending' | 'non_attending';
export interface Pagination {
  totalPage: number;
  chunkSize: number;
  totalCount: number;
}
interface ApiResponse {
  timestamp: string;
  message: string;
}
export interface NovelPost {
  id: number;
  type: RoomType;
  title: string;
  category: string;
  currentAttendCnt: number;
  currentWriterCnt: string;
  writerStatus: WriterStatus;
  exitedAt: string | null; // ?
  createdAt: string; // ??
  notifiedAt: number; // ??
  completionAt: string | null;
  status: string; // ??
}
export interface UserList {
  id: number;
  email: string;
  nickname: string;
  createDate: string;
  updateDate: string;
}
export interface SignUpRequestModel {
  email: string;
  nickname: string;
  password: string;
}
export interface LoginApiArg {
  email: string;
  password: string;
}
export interface NovelJoinWriteList {
  id: number;
  writingSeq: null;
  currentlyWriting: null;
  status: WriterStatus;
  nickname: string;
  category: WriterType;
}

export interface NovelChapter {
  id: number;
  no: number;
  status: NovelStatus;
  title: string;
  approvalDate: string | null;
  finalWriteredAt: string | null;
  viewCount: number;
  commentCnt: number;
  like: number;
}

export interface GetWriterListAdmin {
  id: number;
  userId: number;
  category: WriterType;
  status: WriterStatus;
  nickname: string;
  createdAt: string;
  notifiedAt: null;
  exitAt: null;
}
export interface GetWriterWantedList {
  roomTitle: string;
  boardTitle: string;
  viewCount: number;
  roomCreatedAt: string;
  like: number;
  category: number;
  currentWriterCnt: number;
  roomType: RoomType;
}
// -------
export interface LoginApiResonse extends ApiResponse {
  data: {
    accessToken: string;
    hasRoom: boolean;
  };
}
export interface NovelListRequest {
  roomState: RoomStatus;
  page: number;
}
export interface NovelListResponse extends ApiResponse {
  data: NovelPost[];
  meta: Pagination;
}

export interface CreateRoomArg {
  title: string;
  subTitle: string;
  category: number;
  novelTags: string[];
  type: RoomType;
  character: string;
  summary: string;

  attendTitle: string;
  attendOpenKakaoLink: string;
  attendContent: string;
}

export interface UserListResponse extends ApiResponse {
  data: UserList[];
}

export interface CreateRoomResponse {
  title: string;
  subTitle: string;
  category: number;
  novelTags: string[];
  type: number;
  character: string;
  summary: string;
  attendTitle: string;
  attendOpenKakaoLink: string;
  attendContent: string;
}

export interface NovelRoomInfoResponse extends ApiResponse {
  data: {
    id: number;
    category: number;
    character: string;
    summary: string;
    title: string;
    subTitle: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface NovelJoinWriteListResponse extends ApiResponse {
  data: NovelJoinWriteList[];
}

export interface GetNovelChaterListRequest {
  page: number;
  novelRoomId: number;
}

export interface GetNovelChaterListResponse extends ApiResponse {
  meta: Pagination;
  data: NovelChapter[];
}

export interface GetWriterListAdminResponse extends ApiResponse {
  data: GetWriterListAdmin[];
}

export interface UpdateWriterStateRequest {
  userId: number;
  status: WriterStatus;
}

export interface GetWriterWantedListResponse extends ApiResponse {
  data: GetWriterWantedList[];
}

export interface GetWriterWantedListRequest {
  page: number;
}
