import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.1.10:3001";

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

  return { sendNotification };
};

export default useWebSocket;
