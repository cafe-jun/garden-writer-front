import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import LocalStorage from 'util/LocalStorage';

import { config } from '@/config/config';

interface useSocketIOOption {
  url: string;
  onNewChat(data: any): void;
  onUpdateChat(data: any): void;
  onChangeWriterSeq(data: any): void;
  onKickUser(data: any): void;
}
export default function useSocketIO({
  url,
  onChangeWriterSeq,
  onKickUser,
  onNewChat,
  onUpdateChat,
}: useSocketIOOption) {
  const sock = useMemo(
    () =>
      io(url, {
        autoConnect: false,
        auth: {
          accessToken: `${LocalStorage.getItem(config.storageKey)}`,
        },
        transports: ['websocket'],
        reconnection: false,
        port: 3000,
      }),
    [url]
  );
  const newChat = (res: any) => {
    console.log(config.socketEventNM.newChat);
    onNewChat(res);
  };
  const updateChat = (res: any) => {
    console.log('update/text = ');
    onUpdateChat(res);
  };
  const changeWriterSeq = (res: any) => {
    console.log('change/writer-sequence = ');
    onChangeWriterSeq(res);
  };
  const exitWriter = (res: any) => {
    console.log('exit/writer = ');
    onKickUser(res);
  };

  const connect = () => {
    console.log('connect');

    sock.on(config.socketEventNM.newChat, newChat);

    sock.on(config.socketEventNM.updateChat, updateChat);

    sock.on(config.socketEventNM.changeWriterSeq, changeWriterSeq);

    sock.on(config.socketEventNM.exitWriter, exitWriter);
  };
  useEffect(() => {
    sock.connect();
    sock.on('connect', () => connect());
  }, []);
  useEffect(
    () => () => {
      if (!sock) {
        return;
      }
      if (!sock.connected) {
        return;
      }
      console.log('out');
      console.log(sock);
      sock.removeAllListeners();
      sock.disconnect();
    },
    []
  );
}
