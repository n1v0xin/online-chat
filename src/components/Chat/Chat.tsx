import React from "react";
import { socket } from "../../constants/api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loadMessages } from "../../redux/reducers/messagesSlice";
import "./chat.scss";

const Chat = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);
  const currentUser = useAppSelector(
    (state) =>
      state.users.list[
        state.users.list.findIndex((user) => user.id === socket.id)
      ]
  );
  const messages = useAppSelector((state) => state.messages.list);

  React.useEffect(() => {
    socket.on("update_messages", (messages) => {
      dispatch(loadMessages(messages));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, users]);

  return (
    <div className="chat">
      <div className="chat__wrapper">
        {messages.length
          ? messages.map((message, index) => {
              return (
                <div
                  className={`chat__message ${
                    currentUser?.nickname === message.author
                      ? "chat__message--yours"
                      : ""
                  }`}
                  key={index}
                >
                  {currentUser?.nickname !== message.author ? (
                    <div className="chat__message-username">
                      {message.author}
                    </div>
                  ) : null}
                  <div className="chat__message-text">{message.text}</div>
                </div>
              );
            })
          : "no messages"}
      </div>
    </div>
  );
};

export default Chat;
