import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import axios from "axios";
import {
  generateRandomStats,
  generateHOFProbabilities,
} from "../../utilities/sandbox-utils.js";
import {
  debouncedHandleSearchInputChange,
  handleNameSelection,
} from "../../utilities/search-utils.js";

const columnNames = [
  "MVP",
  "All_Star",
  "Field_Goal_Percentage",
  "Total_Rebounds",
  "Total_Blocks",
  "Points_Per_Game_Award",
  "Win_Shares",
  "Player_Efficiency_Rating",
  "Offensive_Win_Shares",
  "Defensive_Win_Shares",
  "Championships",
];

const integerColumns = [
  "MVP",
  "All_Star",
  "Total_Rebounds",
  "Total_Blocks",
  "Points_Per_Game_Award",
  "Win_Shares",
  "Championships",
];

const columnRanges = {
  MVP: { minValue: 0, maxValue: 6 }, // Range: 0 to 1
  All_Star: { minValue: 0, maxValue: 18 }, // Range: 0 to 10
  Field_Goal_Percentage: { minValue: 0.2, maxValue: 0.6 }, // Range: 0.4 to 0.6
  Total_Rebounds: { minValue: 0, maxValue: 12000 }, // Range: 0 to 10,000
  Total_Blocks: { minValue: 0, maxValue: 5000 }, // Range: 0 to 5,000
  Points_Per_Game_Award: { minValue: 0, maxValue: 100 }, // Range: 0 to 40
  Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 20
  Player_Efficiency_Rating: { minValue: 0, maxValue: 30 }, // Range: 0 to 30
  Offensive_Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  Defensive_Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  Championships: { minValue: 0, maxValue: 6 }, // Range: 0 to 1
};

const Sandbox = (props) => {
  const { data } = props;
  const [predictedProbability, setPredictedProbability] = useState(null); // Add state for predicted probability
  const [nameSuggestions1, setNameSuggestions1] = useState([]);
  const [selectedPlayerData1, setSelectedPlayerData1] = useState({});

  const handleSearchInputChange1 = (e) => {
    const inputText = e.target.value.trim();
    debouncedHandleSearchInputChange(inputText, data, setNameSuggestions1);
  };

  const handleNameSelection1 = (selectedName) => {
    handleNameSelection(selectedName, data, setSelectedPlayerData1);
  };

  const generateRandomStatsWrapper = () => {
    const randomValues = generateRandomStats(
      columnNames,
      integerColumns,
      columnRanges
    );
    setSelectedPlayerData1(randomValues);
  };

  const generateHOFProbabilitiesWrapper = async () => {
    const predictedProbability = await generateHOFProbabilities(
      axios,
      columnNames,
      selectedPlayerData1
    );
    setPredictedProbability(predictedProbability);
  };

  const handleInputChange = (column, value) => {
    setSelectedPlayerData1((prevData) => ({
      ...prevData,
      [column]: value,
    }));
  };

  return (
    <Flex p="10" flexDir="column">
      <Stack mt={600} ml={200}>
        <FormControl w="60" mb={8}>
          <FormLabel>Fill Stats with Player</FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              variant="filled"
              onChange={handleSearchInputChange1}
              placeholder="Search by name"
              list="nameSuggestions1"
            />
            <AutoCompleteList>
              {nameSuggestions1.map((name, index) => (
                <AutoCompleteItem
                  key={index}
                  value={name}
                  textTransform="capitalize"
                  onMouseDown={() => handleNameSelection1(name)}
                  onTouchStart={() => handleNameSelection1(name)}
                >
                  {name}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
        {columnNames.map((column) => (
          <Stack direction="row" align="center" mt={4} key={column}>
            <Text fontWeight="bold">{column}:</Text>
            <Input
              id={`${column}_input`}
              type="number"
              value={
                selectedPlayerData1[column] !== undefined
                  ? selectedPlayerData1[column]
                  : ""
              }
              onChange={(e) => handleInputChange(column, e.target.value)}
              width="20%"
              placeholder={`Enter ${column}`}
            />
          </Stack>
        ))}
      </Stack>

      <Button
        colorScheme="custom"
        bg="rgba(232, 158, 16, 0.88)"
        mt={4}
        onClick={generateRandomStatsWrapper}
      >
        Generate Random Statistics
      </Button>

      <Button
        colorScheme="custom"
        bg="rgba(232, 158, 16, 0.88)"
        mt={4}
        onClick={generateHOFProbabilitiesWrapper}
      >
        Generate Hall of Fame Probabilities
      </Button>
      {
        <Text mt={4} fontSize="xl" fontWeight="bold">
          Predicted Probability: {predictedProbability}
        </Text>
      }
    </Flex>
  );
};

export default Sandbox;
