import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { joinUser } from "../../api";
import "./set-nickname-modal.scss";

const SetNicknameModal = () => {
  const [showModal, setShowModal] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSetNickname = () => {
    if (inputRef.current?.value.length) {
      joinUser(inputRef.current?.value);

      setShowModal(false);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <Modal.Title>Set your nickname first</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control
            ref={inputRef}
            placeholder="Enter nickname"
            aria-label="Enter nickname"
            aria-describedby="chatNicknane"
          />
          <Button variant="primary" onClick={handleSetNickname}>
            Save Changes
          </Button>
        </InputGroup>
      </Modal.Body>
    </Modal>
  );
};

export default SetNicknameModal;
