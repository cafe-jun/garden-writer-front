import { create } from 'zustand';

interface initialzeApp {
  email: string;
  password: string;
  setEmail(data: string): void;
  setPasswd(value: string): void;
}

const useLoginData = create<initialzeApp>()((set, get) => ({
  email: '',
  password: '',
  setEmail(data: string) {
    set({
      email: data,
    });
  },
  setPasswd(data: string) {
    set({
      password: data,
    });
  },
}));

export default useLoginData;
