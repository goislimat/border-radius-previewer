function getBorderRadiusString(bordersObject, unit) {
  const bordersValues = Object.entries(bordersObject).map(function ([
    key,
    value,
  ]) {
    return `${value}${unit}`;
  });

  if (bordersValues.length > 4) {
    const half = Math.floor(bordersValues.length / 2);
    return `${bordersValues.slice(0, half).join(" ")} / ${bordersValues
      .slice(half)
      .join(" ")}`;
  }

  return bordersValues.join(" ");
}

export default getBorderRadiusString;
