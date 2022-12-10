import { socket } from "../constants/api";
import { Message } from "../redux/types";

export const joinUser = (nickname: string) => {
  socket.emit("join", nickname);
};

export const watchUserTyping = () => {
  socket.emit("typing");

  setTimeout(() => {
    socket.emit("stopped_typing");
  }, 3000);
};

export const sendMessage = (message: Message): any => {
  socket.emit("chat_message", message);
};
