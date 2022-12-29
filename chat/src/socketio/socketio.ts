import { io, Socket } from "socket.io-client";

export type Message = {
  name: string;
  text: string;
};
let socket: Socket;
export const dataList: Message[] = [];
export const initSocketConnection = () => {
  socket = io("http://localhost:3000", { transports: ["websocket"] });
  socket.connect();
  socket.on("message", (message: Message) => {
    receiveMessage(message);
  });
};

export const sendMessage = (name: string, text: string) => {
  const message = {
    name,
    text,
  };

  console.log("send message", message);
  socket.emit("sendMessage", message);
};

export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
};

export const receiveMessage = (message: Message) => {
  dataList.push(message);
};
