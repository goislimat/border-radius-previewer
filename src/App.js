import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  BorderTypesCommands,
  CodeContainer,
  Helper,
  Playground,
  UnitTypesCommands,
} from "./components";

const Main = styled.main`
  position: realtive;
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90vw;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #f7f7f7;
  font-style: italic;
  font-weight: 700;
  margin: 48px 0;
`;

const INITIAL = {
  topLeft: 0,
  topRight: 0,
  bottomRight: 0,
  bottomLeft: 0,
};

const INITIAL_COMPLEX = {
  ...INITIAL,
  leftTop: 0,
  rightTop: 0,
  rightBottom: 0,
  leftBottom: 0,
};

function App() {
  const [borderValues, setBorderValues] = useState(INITIAL);

  const [complexBorderValues, setComplexBorderValues] = useState(
    INITIAL_COMPLEX
  );

  const [isComplex, setComplex] = useState(false);
  const [complexVisitedCounter, setComplexVisitedCounter] = useState(0);

  const [unit, setUnit] = useState("px");

  function drawRandons() {
    function getRandom() {
      return Math.floor(Math.random() * 150 + 30);
    }

    const values = {
      topLeft: getRandom(),
      topRight: getRandom(),
      bottomRight: getRandom(),
      bottomLeft: getRandom(),
    };

    if (isComplex) {
      setComplexBorderValues({
        ...values,
        leftTop: getRandom(),
        rightTop: getRandom(),
        rightBottom: getRandom(),
        leftBottom: getRandom(),
      });
    } else {
      setBorderValues(values);
    }
  }

  useEffect(function () {
    setTimeout(function () {
      [1, 2, 3, 4].forEach(function (i) {
        setTimeout(drawRandons, i * 750);
      });
    }, 500);
  }, []);

  useEffect(
    function () {
      if (complexVisitedCounter === 1) {
        setTimeout(function () {
          [1, 2, 3, 4].forEach(function (i) {
            setTimeout(drawRandons, i * 750);
          });
        }, 500);
      }
    },
    [complexVisitedCounter]
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

  function incrementComplexVisitedCounter() {
    setComplexVisitedCounter(complexVisitedCounter + 1);
  }

  return (
    <Main>
      <Title>BORDER RADIUS GENERATOR</Title>
      <Content>
        <Section>
          <BorderTypesCommands
            handleBorderTypeChange={setComplex}
            isComplex={isComplex}
            incrementComplexVisitedCounter={incrementComplexVisitedCounter}
          />
          <UnitTypesCommands handleUnitChange={setUnit} unit={unit} />
        </Section>

        <Section>
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
        </Section>
      </Content>

      <Helper />
    </Main>
  );
}

export default App;
