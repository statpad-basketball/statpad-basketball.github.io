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
} from "../../../../utilities/sandbox-utils.js";
import {
  debouncedHandleSearchInputChange,
  handleNameSelection,
} from "../../../../utilities/search-utils.js";

import { integerColumns, columnRanges } from "./constants.js";

const Sandbox = (props) => {
  const { data, columnNames } = props;
  const [predictedProbability, setPredictedProbability] = useState(null); // Add state for predicted probability
  const [nameSuggestions1, setNameSuggestions1] = useState([]);
  const [selectedPlayerData1, setSelectedPlayerData1] = useState({});

  const generateHOFProbabilitiesWrapper = async () => {
    const predictedProbability = await generateHOFProbabilities(
      axios,
      columnNames,
      selectedPlayerData1
    );
    setPredictedProbability(predictedProbability);
  };

  return (
    <Flex p="10" flexDir="column">
      <Stack mt={600} ml={200}>
        <FormControl w="60" mb={8}>
          <FormLabel>Fill Stats with Player</FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              variant="filled"
              onChange={(e) =>
                debouncedHandleSearchInputChange(
                  e.target.value.trim(),
                  data,
                  setNameSuggestions1
                )
              }
              placeholder="Search by name"
              list="nameSuggestions1"
            />
            <AutoCompleteList>
              {nameSuggestions1.map((name, index) => (
                <AutoCompleteItem
                  key={index}
                  value={name}
                  textTransform="capitalize"
                  onMouseDown={() =>
                    handleNameSelection(name, data, setSelectedPlayerData1)
                  }
                  onTouchStart={() =>
                    handleNameSelection(name, data, setSelectedPlayerData1)
                  }
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
              onChange={(e) =>
                setSelectedPlayerData1((prevData) => ({
                  ...prevData,
                  [column]: e.target.value,
                }))
              }
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
        onClick={() =>
          setSelectedPlayerData1(
            generateRandomStats(columnNames, integerColumns, columnRanges)
          )
        }
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
