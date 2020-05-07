import React from "react";
import styled, { css } from "styled-components";

const OptionsHolder = styled.section`
  display: flex;
  margin: 32px;
`;

const Button = styled.button`
  ${({ isActive }) => css`
    border: 0;
    border-radius: 10px;
    background-color: ${isActive ? "#f6b709" : "#1d1e20"};
    color: ${isActive ? "#1d1e20" : "#f7f7f7"};
    font-size: 16px;
    font-weight: 700;
    padding: 24px 32px;
    margin: 0 16px;
    outline: 0;
  `}
`;

function BorderTypesCommands({ isComplex, handleBorderTypeChange }) {
  return (
    <OptionsHolder>
      <Button
        isActive={!isComplex}
        onClick={() => handleBorderTypeChange(false)}>
        SIMPLE BORDERS
      </Button>
      <Button isActive={isComplex} onClick={() => handleBorderTypeChange(true)}>
        COMPLEX BORDERS
      </Button>
    </OptionsHolder>
  );
}

export default BorderTypesCommands;
