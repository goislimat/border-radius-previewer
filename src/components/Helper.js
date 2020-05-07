import React, { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #1d1e20;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 20px;
  right: 20px;
  color: #f7f7f7;
  font-size: 15px;
  padding: 24px;
  line-height: 20px;
  cursor: pointer;
  border: 0;
  outline: 0;
  overflow: hidden;
  transition: width 100ms ease, height 250ms ease, border-radius 250ms ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      width: 200px;
      height: 200px;
      border-radius: 10px;
    `}

  strong {
    color: #f6b709;
  }

  span {
    font-size: 48px;
    font-weight: bold;
  }
`;

function Helper() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Container isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
      {isOpen ? (
        <p>
          Use the <strong>left bracket</strong> to lower and{" "}
          <strong>right bracket</strong> to increment 1 unit at a time in the
          border box value handlers.
        </p>
      ) : (
        <span>?</span>
      )}
    </Container>
  );
}

export default Helper;
