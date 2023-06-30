import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  HStack,
  Stack,
  Input,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
// import { parse } from 'papaparse';
import { fetchData, sortData } from "../../utilities/data-backend-utils.js"; // import from your utility file
import {
  debouncedHandleSearchInputChange,
  handleNameSelection,
} from "../../utilities/search-utils.js";

// const columnNames = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'PER', 'VORP', 'MVP', 'Champ', 'DPOY'];
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

const ComparisonTool = (props) => {
  const { data } = props;
  const [nameSuggestions1, setNameSuggestions1] = useState([]);
  const [nameSuggestions2, setNameSuggestions2] = useState([]);
  const [selectedPlayerData1, setSelectedPlayerData1] = useState({});
  const [selectedPlayerData2, setSelectedPlayerData2] = useState({});

  const handleSearchInputChange1 = (e) => {
    const inputText = e.target.value.trim();
    debouncedHandleSearchInputChange(inputText, data, setNameSuggestions1);
  };

  const handleSearchInputChange2 = (e) => {
    const inputText = e.target.value.trim();
    debouncedHandleSearchInputChange(inputText, data, setNameSuggestions2);
  };

  const handleNameSelection1 = (selectedName) => {
    handleNameSelection(selectedName, data, setSelectedPlayerData1);
  };

  const handleNameSelection2 = (selectedName) => {
    handleNameSelection(selectedName, data, setSelectedPlayerData2);
  };

  return (
    <Flex p="10" flexDir="column">
      <Center mt={600} width={"80%"}>
        <HStack spacing={"30rem"}>
          <FormControl w="60">
            <FormLabel>Player 1</FormLabel>
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
          <FormControl w="60" ml="1rem">
            <FormLabel>Player 2</FormLabel>
            <AutoComplete openOnFocus>
              <AutoCompleteInput
                variant="filled"
                onChange={handleSearchInputChange2}
                placeholder="Search by name"
                list="nameSuggestions2"
              />
              <AutoCompleteList>
                {nameSuggestions2.map((name, index) => (
                  <AutoCompleteItem
                    key={index}
                    value={name}
                    textTransform="capitalize"
                    onMouseDown={() => handleNameSelection2(name)}
                    onTouchStart={() => handleNameSelection2(name)}
                  >
                    {name}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </FormControl>
        </HStack>
      </Center>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Player 1</Th>
              <Th>
                <Heading as="h2" size="lg" mb={4}>
                  Stats
                </Heading>
              </Th>
              <Th>Player 2</Th>
            </Tr>
          </Thead>
          <Tbody>
            {columnNames.map((columnName) => (
              <Tr key={columnName}>
                <Td>
                  {selectedPlayerData1 &&
                  Object.keys(selectedPlayerData1).length !== 0
                    ? Math.round(selectedPlayerData1[columnName] * 100) / 100
                    : ""}
                </Td>
                <Td>{columnName}</Td>
                <Td>
                  {selectedPlayerData2 &&
                  Object.keys(selectedPlayerData2).length !== 0
                    ? Math.round(selectedPlayerData2[columnName] * 100) / 100
                    : ""}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ComparisonTool;
