// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { WEBSOCKET_URL } from '@env';

type CallbackFn = (data: any) => void;

const useWebSocket = (onMessage: CallbackFn, deps: any[] = []) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      //console.log('Connected to WebSocket');
    });

    socket.on('onlineUser', (data) => {
      // console.log("onlineUser received:", data);
      onMessage(data); // Send to component
    });

    socket.on('offlineUser', (data) => {
      // console.log("after offline, now online users:", data);
      onMessage(data); // Send to component
    })

    return () => {
      socket.disconnect();
    };
  }, deps);

  const checkOnlineUser = (email: string) => {
    // console.log('in websocket online email', email);
    socketRef.current?.emit('check_online', { email });
  };

  const checkOfflineUser = (email: string) => {
    // console.log('in websocket offline email', email);
    socketRef.current?.emit('check_offline', email);
  };

  return { checkOnlineUser, checkOfflineUser };
};

export default useWebSocket;
