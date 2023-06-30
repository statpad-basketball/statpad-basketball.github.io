export const generateRandomStats = (
  columnNames,
  integerColumns,
  columnRanges
) => {
  const randomValues = {};

  columnNames.forEach((column) => {
    const { minValue, maxValue } = columnRanges[column];
    let randomValue = Math.random() * (maxValue - minValue) + minValue;

    // Round the random value to the nearest integer for specific columns
    if (integerColumns.includes(column)) {
      randomValue = Math.round(randomValue);
    }

    randomValues[column] = randomValue;
  });

  return randomValues;
};

export const generateHOFProbabilities = async (
  axios,
  columnNames,
  selectedPlayerData
) => {
  // Prepare the input data
  const inputValues = columnNames.reduce((values, column) => {
    values[column] = parseFloat(selectedPlayerData[column] || 0);
    return values;
  }, {});

  try {
    // Make a POST request to the server
    const response = await axios.post(
      "http://localhost:2000/predict",
      inputValues
    );

    // Get the predicted probabilities from the response
    const { predictedProbabilities } = response.data;
    console.log("Predicted Probabilities:", predictedProbabilities[0]);

    // Return the predicted probability
    return predictedProbabilities[0]; // Assuming only one predicted probability
  } catch (error) {
    console.error("Error:", error);
    return "Error";
  }
};
