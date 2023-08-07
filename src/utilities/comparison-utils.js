export const getCellColor = (value1, value2) => {
  if (value1 > value2) {
    return "green";
  } else if (value1 < value2) {
    return "red";
  } else {
    return "black"; // You can choose any other color for equal values if you want
  }
};
