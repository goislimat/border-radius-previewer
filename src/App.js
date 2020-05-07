import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import {
  BorderTypesCommands,
  UnitTypesCommands,
  Playground,
  CodeContainer,
} from "./components";

const Main = styled.main`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #f7f7f7;
  font-style: italic;
  font-weight: 700;
  margin: 32px;
`;

function App() {
  const [borderValues, setBorderValues] = useState({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  });

  const [complexBorderValues, setComplexBorderValues] = useState({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
    leftTop: 0,
    rightTop: 0,
    rightBottom: 0,
    leftBottom: 0,
  });

  const [isComplex, setComplex] = useState(false);

  const [unit, setUnit] = useState("px");

  const [showFeedback, setShowFeedback] = useState(false);

  const [codeString, setCodeString] = useState(
    `${borderValues.topLeft}px ${borderValues.topRight}px ${borderValues.bottomRight}px ${borderValues.bottomLeft}px;`
  );

  const codeRef = useRef();

  useEffect(
    function () {
      let borderRadiusString;

      if (isComplex) {
        borderRadiusString = `${complexBorderValues.topLeft}${unit} ${complexBorderValues.topRight}${unit} ${complexBorderValues.bottomRight}${unit} ${complexBorderValues.bottomLeft}${unit} / ${complexBorderValues.leftTop}${unit} ${complexBorderValues.rightTop}${unit} ${complexBorderValues.rightBottom}${unit} ${complexBorderValues.leftBottom}${unit}`;
      } else {
        borderRadiusString = `${borderValues.topLeft}${unit} ${borderValues.topRight}${unit} ${borderValues.bottomRight}${unit} ${borderValues.bottomLeft}${unit}`;
      }

      setCodeString(borderRadiusString);
      // document.getElementById(
      //   "rounded-border-box"
      // ).style.borderRadius = borderRadiusString;
    },
    [borderValues, complexBorderValues, isComplex, unit]
  );

  function setBorderNewValue(corner, value) {
    if (typeof value !== "number") return;

    if (isComplex) {
      setComplexBorderValues({
        ...complexBorderValues,
        [corner]: value ? value : 0,
      });
    } else {
      setBorderValues({
        ...borderValues,
        [corner]: value ? value : 0,
      });
    }
  }

  function handleBorderValueChange(corner) {
    return function (e) {
      const regex = /[a-z]/gi;

      if (regex.test(e.target.value)) return;

      setBorderNewValue(corner, parseInt(e.target.value, 10));
    };
  }

  function handleModByOne(corner) {
    return function (e) {
      let value;
      if (isComplex) {
        value = parseInt(complexBorderValues[corner]);
      } else {
        value = parseInt(borderValues[corner]);
      }

      switch (e.key) {
        case "[":
          if (value > 0) setBorderNewValue(corner, value - 1);
          break;
        case "]":
          setBorderNewValue(corner, value + 1);
          break;
        default:
          break;
      }
    };
  }

  return (
    <Main>
      <Title>BORDER RADIUS GENERATOR</Title>
      <BorderTypesCommands
        handleBorderTypeChange={setComplex}
        isComplex={isComplex}
      />
      <UnitTypesCommands handleUnitChange={setUnit} unit={unit} />

      <Playground
        bordersObject={isComplex ? complexBorderValues : borderValues}
        isComplex={isComplex}
        handleInputChange={handleBorderValueChange}
        handleInputModByOne={handleModByOne}
        unit={unit}
      />

      <CodeContainer
        bordersObject={isComplex ? complexBorderValues : borderValues}
        unit={unit}
        isComplex={isComplex}
      />
    </Main>
  );
}

export default App;
