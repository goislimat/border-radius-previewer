import React from "react";
import styled, { css } from "styled-components";

const OptionHolder = styled.section`
  margin-bottom: 32px;
`;

const Button = styled.button`
  ${({ isActive }) => css`
    width: 25px;
    height: 25px;
    background-color: ${isActive ? "#f6b709" : "#f7f7f7"};
    border: 0;
    border-radius: 5px;
    color: #1d1e20;
    font-size: 12px;
    font-weight: 700;
    margin: 0 8px;
  `}
`;

function UnitTypesCommands({ unit, handleUnitChange }) {
  return (
    <OptionHolder className="options-handler">
      <Button isActive={unit === "px"} onClick={() => handleUnitChange("px")}>
        px
      </Button>
      <Button isActive={unit === "em"} onClick={() => handleUnitChange("em")}>
        em
      </Button>
      <Button isActive={unit === "%"} onClick={() => handleUnitChange("%")}>
        %
      </Button>
    </OptionHolder>
  );
}

export default UnitTypesCommands;
