export const config = {
  // apiLink: 'https://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app',
  // wsLink: 'ws://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app',
  wsLink: 'http://localhost:3001',

  apiLink: 'http://localhost:3001',

  apiUrl: {
    // 회원가입
    signUp: '/user/join',

    // 로그인 api
    login: '/auth/login',

    // 회원 목록
    user: '/user',

    // 소설공방모집글 리스트 api,
    novelList: '/novel-room',

    // 소설공방 생성 api
    createNovelRoom: '/novel-room',

    // 소설공방 작가 모집글 생성 api
    createWriterPost: '/novel-attend-board',

    // 소설공방 기본정보
    novelRoomInfo: (roomId: number) => `/novel-room/${roomId}`,

    // 소설공방에 참여중인 작가 리스트
    novelJoinWriterList: '/writer',

    // 소설상세 페에지의 회차정보
    novelChapterList: '/chapter',

    // (공방주인용) 작가관리 리스트
    getWriterListAdmin: '/writer/management',

    // (공방주인용) 작가승인/반려
    updateWriterState: (id: number) => `/writer/management/status/${id}`,

    // 작가모집 리스트
    getWriterWantedList: '/novel-attend-board',

    // 작가모집글 상세조회
    getWriterPostDetail: (roomId: number) => `/novel-attend-board/${roomId}`,

    // 소설 글쓰기 / 소설 채팅 보내기
    newNovelText: '/novel-text',

    // 특정 소설 채팅의 상세정보
    getOneNovelText: (novelId: number) => `/novel-text/${novelId}`,
  },
  page: {
    // 소설공방
    novel: '/novel',

    // 작가참여리스트
    recruitment: '/recruitment',
  },
  pageSize: 5,
  categorys: [
    '일반소설',
    '로멘스/드라마',
    '코믹',
    '시/수필/에세이',
    '판타지/SF',
    '퓨전',
    '액션/무협',
    '스포츠/학원',
    '공포/추리',
  ],
  storageKey: 'ac.a',
  socketEventNM: {
    newChat: 'enter/text',
    updateChat: 'update/text',
    changeWriterSeq: 'change/writer-sequence',
    exitWriter: 'exit/writer',
  },
};
