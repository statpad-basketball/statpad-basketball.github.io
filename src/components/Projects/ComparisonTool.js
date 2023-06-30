import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
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

const ComparisonTool = (props) => {
  const { data } = props;
  const [nameSuggestions1, setNameSuggestions1] = useState([]);
  const [nameSuggestions2, setNameSuggestions2] = useState([]);
  const [selectedPlayerData1, setSelectedPlayerData1] = useState({});
  const [selectedPlayerData2, setSelectedPlayerData2] = useState({});

  return (
    <Flex p="10" flexDir="column">
      <Center mt={600} width={"80%"}>
        <HStack spacing={"30rem"}>
          <FormControl w="60">
            <FormLabel>Player 1</FormLabel>
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
          <FormControl w="60" ml="1rem">
            <FormLabel>Player 2</FormLabel>
            <AutoComplete openOnFocus>
              <AutoCompleteInput
                variant="filled"
                onChange={(e) =>
                  debouncedHandleSearchInputChange(
                    e.target.value.trim(),
                    data,
                    setNameSuggestions2
                  )
                }
                placeholder="Search by name"
                list="nameSuggestions2"
              />
              <AutoCompleteList>
                {nameSuggestions2.map((name, index) => (
                  <AutoCompleteItem
                    key={index}
                    value={name}
                    textTransform="capitalize"
                    onMouseDown={() =>
                      handleNameSelection(name, data, setSelectedPlayerData2)
                    }
                    onTouchStart={() =>
                      handleNameSelection(name, data, setSelectedPlayerData2)
                    }
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
