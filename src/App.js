import React, { useState, useEffect, useRef } from "react";

function App() {
  const [borderValues, setBorderValues] = useState({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  });
  const [codeString, setCodeString] = useState(
    `${borderValues.topLeft}px ${borderValues.topRight}px ${borderValues.bottomRight}px ${borderValues.bottomLeft}px;`
  );
  const codeRef = useRef();

  useEffect(
    function () {
      const borderRadiusString = `${borderValues.topLeft}px ${borderValues.topRight}px ${borderValues.bottomRight}px ${borderValues.bottomLeft}px`;

      setCodeString(borderRadiusString);
      document.getElementById(
        "rounded-border-box"
      ).style.borderRadius = borderRadiusString;
    },
    [borderValues]
  );

  function setBorderNewValue(corner, value) {
    if (typeof value !== "number") return;

    setBorderValues({
      ...borderValues,
      [corner]: value ? parseInt(value, 10) : 0,
    });
  }

  function handleBorderValueChange(corner) {
    return function (e) {
      const regex = /[a-z]/gi;

      if (regex.test(e.target.value)) return;

      setBorderValues({
        ...borderValues,
        [corner]: e.target.value ? parseInt(e.target.value, 10) : 0,
      });
    };
  }

  function handleModByOne(corner) {
    return function (e) {
      const value = parseInt(borderValues[corner]);

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
    <div className="main">
      <h1>BORDER RADIUS GENERATOR</h1>
      <div className="playground">
        <input
          className="input input--top-left"
          value={borderValues.topLeft}
          onChange={handleBorderValueChange("topLeft")}
          onKeyPress={handleModByOne("topLeft")}
        />
        <input
          className="input input--top-right"
          value={borderValues.topRight}
          onChange={handleBorderValueChange("topRight")}
          onKeyPress={handleModByOne("topRight")}
        />
        <input
          className="input input--bottom-right"
          value={borderValues.bottomRight}
          onChange={handleBorderValueChange("bottomRight")}
          onKeyPress={handleModByOne("bottomRight")}
        />
        <input
          className="input input--bottom-left"
          value={borderValues.bottomLeft}
          onChange={handleBorderValueChange("bottomLeft")}
          onKeyPress={handleModByOne("bottomLeft")}
        />
        <div id="rounded-border-box" />
      </div>

      <div className="code-container">
        <button
          onClick={() => {
            const code = codeRef;
            code.current.select();
            document.execCommand("copy");
          }}>
          COPY
        </button>
        <input
          ref={codeRef}
          className="code"
          value={`border-radius: ${codeString};`}
        />
      </div>
    </div>
  );
}

export default App;
