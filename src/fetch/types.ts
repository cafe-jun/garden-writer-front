// attending : 참여중, attendingReject : 참여 반려, attendingReview : 참여 검토, exit : 퇴장
type WriterStatus = 'attending' | 'attendingReject' | 'attendingReview' | 'exit';
type WriterType = 'host' | 'attendee';
type NovelStatus = 'writing';
// series : 연재중, complete : 연재완료, remove : 삭제
type NovelRoomStatus = 'series' | 'complete' | 'remove';
// solo : 혼자 ___ group2 : 2명 ___ group3 : 3명
export type RoomType = 1 | 2 | 3 | 4 | 5;
export type RoomStatus = 'attending' | 'apptendApply';
export interface Pagination {
  totalPage: number;
  chunkSize: number;
  totalCount: number;
}
export interface Categorys {
  id: number;
  name: string;
}
export interface NovelPost {
  id: number;
  type: RoomType;
  title: string;
  category: Categorys;
  currentAttendCnt: number;
  writerStatus: WriterType;
  exitedAt: string | null; // ?
  createdAt: string; // ??
  notifiedAt: number; // ??
  completionAt: string | null;
  status: NovelRoomStatus; // ??
  completedAt: string;
  currentWriter: string;
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
  approvalAt: string | null;
  finalAt: string | null;
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
  roomId: number;
  roomTitle: string;
  boardTitle: string;
  viewCount: number;
  roomCreatedAt: string;
  likeCount: number;
  category: Categorys;
  currentWriterCnt: number;
  roomType: RoomType;
}

export interface GetWriterPostDetail {
  roomId: number;
  boardTitle: string;
  boardContent: string;
  viewCount: number;
  boardOpenKakaoLink: string;
  likeCount: number;
  hasLike: boolean;
}
// -------
export interface LoginApiResonse {
  data: {
    accessToken: string;
    hasRoom: boolean;
  };
}
export interface NovelListRequest {
  roomState: RoomStatus;
  page: number;
}
export interface NovelListResponse {
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

export interface UserListResponse {
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

export interface NovelRoomInfoResponse {
  data: {
    id: number;
    category: Categorys;
    character: string;
    summary: string;
    title: string;
    subTitle: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface NovelJoinWriteListResponse {
  data: NovelJoinWriteList[];
}

export interface GetNovelChaterListRequest {
  page: number;
  novelRoomId: number;
}

export interface GetNovelChaterListResponse {
  meta: Pagination;
  data: NovelChapter[];
}
export interface GetWriterListAdminRequest {
  roomId: number;
  page: number;
}
export interface GetWriterListAdminResponse {
  data: GetWriterListAdmin[];
}

export interface UpdateWriterStateRequest {
  userId: number;
  status: WriterStatus;
}

export interface GetWriterWantedListResponse {
  data: GetWriterWantedList[];
  meta: Pagination;
}

export interface GetWriterWantedListRequest {
  page: number;
}

export interface GetWriterPostDetailResponse {
  data: GetWriterPostDetail;
  meta: Pagination;
}
