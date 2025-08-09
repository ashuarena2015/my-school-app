// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { WEBSOCKET_URL } from '@env';

type CallbackFn = (data: any, chatRoomId: string) => void;

const useWebSocketChat = (onMessage: CallbackFn, deps: any[] = []) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      //console.log('Connected to WebSocket');
    });

    socket.on('startChat', (data, chatRoomId) => {
      // console.log("after offline, now online users:", data);
      onMessage(data, chatRoomId); // Send to component
    })

    return () => {
      socket.disconnect();
    };
  }, deps);

  const startChatWithUser = (data: any[], chatRoomId: string) => {    
    socketRef.current?.emit('start_chat', data, chatRoomId);
  };

  return { startChatWithUser };
};

export default useWebSocketChat;
