import { debounce } from "lodash";

export const handleSearchInputChange = (
  inputText,
  data,
  setNameSuggestions
) => {
  if (inputText === "") {
    setNameSuggestions([]);
    return;
  }

  const suggestedNames = data
    .filter((row) =>
      row["Player"].toLowerCase().startsWith(inputText.toLowerCase())
    )
    .map((row) => row["Player"]);

  setNameSuggestions(suggestedNames);
};

export const debouncedHandleSearchInputChange = debounce(
  (inputText, data, setNameSuggestions) => {
    handleSearchInputChange(inputText, data, setNameSuggestions);
  },
  300
);

export const handleNameSelection = (
  selectedName,
  data,
  setSelectedPlayerData
) => {
  const playerData = data.find((row) => row["Player"] === selectedName);
  setSelectedPlayerData(playerData);
};
