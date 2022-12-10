import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "../List";
import Chat from "../Chat";
import SetNicknameModal from "../SetNicknameModal";
import SendMessageForm from "../SendMessageForm";

const App = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={4}>
            <List />
          </Col>
          <Col>
            <Chat />
            <SendMessageForm />
          </Col>
        </Row>
      </Container>

      <SetNicknameModal />
    </>
  );
};

export default App;
