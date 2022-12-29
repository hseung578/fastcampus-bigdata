import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  dataList,
  disconnectSocket,
  initSocketConnection,
  Message,
  sendMessage,
} from "../socketio/socketio";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
  height: 80vh;
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  font-size: xx-large;
  font-weight: 700;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 50px;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  background-color: lightgray;
  overflow-y: scroll;
`;

const Box = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  font-size: x-large;
  outline: none;
  padding-left: 10px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

function Chat() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [datas, setDatas] = useState<Message[]>([]);

  useEffect(() => {
    initSocketConnection();
    setName(state);

    return () => {
      disconnectSocket();
    };
  }, [state]);

  useEffect(() => {
    setDatas(dataList);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMessage(value);
  };

  const onKeyDown = (e: { key: any }) => {
    if (e.key === "Enter") {
      console.log("message", message);
      sendMessage(name, message);
      setMessage("");
    }
  };

  const Back = () => {
    setDatas([]);
    navigate("/");
  };

  return (
    <Container>
      <Box>
        <Title>TEST ROOM</Title>
        <Button onClick={Back}>EXIT</Button>
      </Box>
      <Wrapper>
        <ul>
          {datas.map((data, i) => (
            <li key={i}>
              {data.name}: {data.text}
            </li>
          ))}
        </ul>
      </Wrapper>
      <Box>
        <Input
          type={"text"}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={message}
        />
      </Box>
    </Container>
  );
}
export default Chat;
