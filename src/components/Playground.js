import React from "react";
import styled, { css } from "styled-components";

import { getBorderRadiusString } from "../utils";

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 500px;
`;

const Input = styled.input`
  ${({ inputFor, isComplex }) => {
    let positioning;

    switch (inputFor) {
      case "topLeft":
        positioning = `
          top: 0;
          left: ${isComplex ? "100px" : "0"};
        `;
        break;
      case "topRight":
        positioning = `
          top: 0;
          right: ${isComplex ? "100px" : "0"};
        `;
        break;
      case "bottomRight":
        positioning = `
          bottom: 0;
          right: ${isComplex ? "100px" : "0"};
        `;
        break;
      case "bottomLeft":
        positioning = `
          bottom: 0;
          left: ${isComplex ? "100px" : "0"};
        `;
        break;
      case "leftTop":
        positioning = `
          top: 100px;
          left: 0;
        `;
        break;
      case "rightTop":
        positioning = `
          top: 100px;
          right: 0;
        `;
        break;
      case "rightBottom":
        positioning = `
          bottom: 100px;
          right: 0;
        `;
        break;
      case "leftBottom":
        positioning = `
          bottom: 100px;
          left: 0;
        `;
        break;
      default:
        break;
    }

    return css`
      ${positioning}
      position: absolute;
      text-align: center;
      border: 0;
      outline: 0;
      border-radius: 5px;
      background-color: #1d1e20;
      color: #f7f7f7;
      font-weight: bold;
      font-size: 17px;
      height: 30px;
      width: 50px;
    `;
  }}
`;

const DynamicShape = styled.div`
  ${({ borders }) => css`
    background: linear-gradient(45deg, #f6b802, #1d1e20);
    height: 350px;
    width: 350px;
    border-radius: ${borders};
    transition: border-radius 250ms ease;
  `}
`;

function Playground({
  bordersObject,
  isComplex,
  handleInputChange,
  handleInputModByOne,
  unit,
}) {
  return (
    <Container>
      {Object.entries(bordersObject).map(function ([key, value]) {
        return (
          <Input
            key={key}
            isComplex={isComplex}
            inputFor={key}
            value={value}
            onChange={handleInputChange(key)}
            onKeyPress={handleInputModByOne(key)}
          />
        );
      })}
      <DynamicShape borders={getBorderRadiusString(bordersObject, unit)} />
    </Container>
  );
}

export default Playground;
