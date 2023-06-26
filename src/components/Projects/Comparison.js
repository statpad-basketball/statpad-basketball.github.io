import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
  } from "@choc-ui/chakra-autocomplete";
// import { parse } from 'papaparse';
import { fetchData, sortData, filterData, paginateData } from './rankings-utils.js'; // import from your utility file

import ByBar from '../Articles/ByBar';
import styles from './Rankings.module.css';

const columnNames = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'PER', 'VORP', 'MVP', 'Champ', 'DPOY'];

const Comparison = () => {
    const [data, setData] = useState([]);
    const [nameSuggestions1, setNameSuggestions1] = useState([]);
    const [nameSuggestions2, setNameSuggestions2] = useState([]);
    const [selectedPlayerData1, setSelectedPlayerData1] = useState({});
    const [selectedPlayerData2, setSelectedPlayerData2] = useState({});
    const [forceRender, setForceRender] = useState(false);
  
    useEffect(() => {
    const fetchAndSortData = async () => {
      const fetchedData = await fetchData();
      const sortedData = sortData(fetchedData);
      setData(sortedData);
    };
  
    fetchAndSortData();
  }, []);
  

  const handleSearchInputChange1 = (e) => {
    const inputText = e.target.value;

    const suggestedNames = data
      .filter((row) => row['Player Name'].toLowerCase().startsWith(inputText.toLowerCase()))
      .map((row) => row['Player Name']);

    setNameSuggestions1(suggestedNames);
  };

  const handleSearchInputChange2 = (e) => {
    const inputText = e.target.value;

    const suggestedNames = data
      .filter((row) => row['Player Name'].toLowerCase().startsWith(inputText.toLowerCase()))
      .map((row) => row['Player Name']);

    setNameSuggestions2(suggestedNames);
  };

  const handleNameSelection1 = (selectedName) => {
    const playerData = data.find((row) => row['Player Name'] === selectedName);
    setSelectedPlayerData1(playerData);
  };

  const handleNameSelection2 = (selectedName) => {
    const playerData = data.find((row) => row['Player Name'] === selectedName);
    setSelectedPlayerData2(playerData);
  };

  return (
    <Flex p="10" flexDir="column">
      <Heading className={styles.hofText} fontSize="5xl">
        HALL OF FAME CALCULATOR
      </Heading>

      <ByBar />
      <Image className={styles.headerPlayers} src={'rankings-header-players.svg'} />

      <Text className={styles.questionText} pb="5" fontSize="2xl" as="i">
        In the eyes of voters, what makes an NBA player worthy of induction into the Basketball Hall of Fame?
      </Text>
      <Text className={styles.descriptionText} pb="5" fontSize="1xl">
        Using stat averages and accolades obtained throughout a given NBA player’s career, this model outputs the
        probability that the player will be inducted into the Hall of Fame at the conclusion of their career. For more
        information on the model and the methodology behind it, click{' '}
        <Link color="teal.500" to="/methods">
          here.
        </Link>
      </Text>

      <Heading className={styles.probsText}>Hall of Fame probabilities: Current and former players</Heading>

      
      <Center mt={600} width={"80%"}>
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
        <FormControl w="60" ml={"1rem"}>
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
      </Center>

      <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Player 1</Th>
            <Th>Player 2</Th>
          </Tr>
        </Thead>
        <Tbody>
          {columnNames.map((columnName) => (
            <Tr key={columnName}>
              <Td>{columnName}</Td>
              <Td>{selectedPlayerData1[columnName]}</Td>
              <Td>{selectedPlayerData2[columnName]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </Flex>
  );
};

export default Comparison;