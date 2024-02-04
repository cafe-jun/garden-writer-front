export const config = {
  apiLink: 'https://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app',
  apiUrl: {
    // 회원가입
    signUp: '/user/join',

    // 로그인 api
    login: '/auth/login',

    // 소설공방모집글 리스트 api,
    novelList: '/novel-room',

    // 소설공방 생성 api
    createNovelRoom: '/novel-room/create-room',

    // 소설공방 작가 모집글 생성 api
    createWriterPost: '/novel-room/create-room',
  },
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
};
