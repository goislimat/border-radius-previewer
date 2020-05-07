import React, { useState, useRef } from "react";
import styled from "styled-components";

import { getBorderRadiusString } from "../utils";

const Container = styled.section`
  position: relative;
  background-color: #1d1e20;
  color: #f7f7f7;
  border-radius: 5px;
  margin: 32px 0 64px;
  padding: 32px 48px;
  min-width: 600px;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  font-weight: bold;
  border: 0;
  background-color: #f6b709;
`;

const Input = styled.input`
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  background-color: transparent;
  border: 0;
  outline: 0;
  color: #f7f7f7;
  font-size: 16px;
  min-width: 100%;
`;

const Feedback = styled.span`
  position: absolute;
  top: -30px;
  right: 10px;
  color: #f7f7f7;
`;

function CodeContainer({ bordersObject, unit }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const codeRef = useRef();

  function copyToClipboard() {
    const code = codeRef;

    code.current.select();
    document.execCommand("copy");
    setShowFeedback(true);

    setTimeout(function () {
      setShowFeedback(false);
    }, 1500);
  }

  return (
    <Container>
      <Button onClick={copyToClipboard}>COPY</Button>
      {showFeedback && <Feedback>Copiado!</Feedback>}
      <Input
        ref={codeRef}
        value={`border-radius: ${getBorderRadiusString(bordersObject, unit)};`}
      />
    </Container>
  );
}

export default CodeContainer;
