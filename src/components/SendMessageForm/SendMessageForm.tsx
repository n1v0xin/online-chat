import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { watchUserTyping } from "../../api";
import { socket } from "../../constants/api";
import { useAppSelector } from "../../hooks/redux";
import "./send-message-form.scss";

const SendMessageForm = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const currentUser = useAppSelector(
    (state) =>
      state.users.list[
        state.users.list.findIndex((user) => user.id === socket.id)
      ]
  );

  const handleTyping = () => {
    watchUserTyping();
  };

  const handleMessageSend = () => {
    socket.emit("send_chat_message", {
      nickname: currentUser?.nickname,
      text: inputRef.current?.value,
    });

    inputRef.current!.value = "";
  };

  return (
    <div className="send-message-form">
      <InputGroup>
        <Form.Control
          ref={inputRef}
          onChange={handleTyping}
          placeholder="Enter message"
          aria-label="Enter message"
          aria-describedby="chatMessage"
        />
        <Button variant="primary" id="chatMessage" onClick={handleMessageSend}>
          Send
        </Button>
      </InputGroup>
    </div>
  );
};

export default SendMessageForm;
