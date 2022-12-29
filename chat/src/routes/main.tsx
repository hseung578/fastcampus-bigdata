import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
  height: 80vh;
`;

const Input = styled.input`
  height: 50px;
  width: 300px;
  outline: none;
  font-size: x-large;
  padding-left: 10px;
`;

const Button = styled.button`
  height: 50px;
  width: 300px;
  font-size: x-large;
  background-color: black;
  color: white;
`;

function Main() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setName(value);
  };

  const onClick = () => {
    navigate(`/chat`, { state: name });
  };

  return (
    <Container>
      <Input
        type={"text"}
        placeholder={"Enter Your Name"}
        onChange={onChange}
      />
      <Button onClick={onClick}>Enter</Button>
    </Container>
  );
}
export default Main;
