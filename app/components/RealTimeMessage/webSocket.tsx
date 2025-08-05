import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { WEBSOCKET_URL } from '@env';

const SOCKET_SERVER_URL = WEBSOCKET_URL;

type NotificationHandler = (data: any) => void;

const useWebSocket = (onNotification: NotificationHandler, deps: any[] = []) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("notification", onNotification);

    return () => {
      socket.disconnect();
    };
  }, deps);

  const sendNotification = (message: any) => {
    socketRef.current?.emit("send_message", {
      message,
    });
  };

  const sendInboxMessage = (payload: {
    email: string;
    message: string;
    userId: string;
  }) => {
    console.log({payload});
    socketRef.current?.emit("send_inbox_message", payload);
  };

  return { sendNotification, sendInboxMessage };
};

export default useWebSocket;
