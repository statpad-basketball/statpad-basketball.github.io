import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
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
// import { parse } from 'papaparse';
import { fetchData, sortData, filterData, paginateData } from './rankings-utils.js'; // import from your utility file

import ByBar from '../Articles/ByBar';
import styles from './Rankings.module.css';

const columnNames = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'PER', 'VORP', 'MVP', 'Champ', 'DPOY'];

const Comparison = () => {
    const [data, setData] = useState([]);
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [nameSuggestions1, setNameSuggestions1] = useState([]);
    const [nameSuggestions2, setNameSuggestions2] = useState([]);
    const [selectedName1, setSelectedName1] = useState('');
    const [selectedName2, setSelectedName2] = useState('');
  
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
    setSearchText1(inputText);

    const suggestedNames = data
      .filter((row) => row['Player Name'].toLowerCase().startsWith(inputText.toLowerCase()))
      .map((row) => row['Player Name']);

    setNameSuggestions1(suggestedNames);
  };

  const handleSearchInputChange2 = (e) => {
    const inputText = e.target.value;
    setSearchText2(inputText);

    const suggestedNames = data
      .filter((row) => row['Player Name'].toLowerCase().startsWith(inputText.toLowerCase()))
      .map((row) => row['Player Name']);

    setNameSuggestions2(suggestedNames);
  };

  const handleNameSelection1 = (selectedName) => {
    setSelectedName1(selectedName);
  };

  const handleNameSelection2 = (selectedName) => {
    setSelectedName2(selectedName);
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
      <Input
            type="text"
            value={searchText1}
            onChange={handleSearchInputChange1}
            width="30%"
            placeholder="Search by name"
            list="nameSuggestions1"
          />
          <datalist id="nameSuggestions1">
            {nameSuggestions1.map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
          <Input
            type="text"
            value={searchText2}
            onChange={handleSearchInputChange2}
            width="30%"
            placeholder="Search by name"
            list="nameSuggestions2"
          />
          <datalist id="nameSuggestions2">
            {nameSuggestions2.map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
      </Center>

    </Flex>
  );
};

export default Comparison;