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
  Stack,
  Input,
} from '@chakra-ui/react';
import { parse } from 'papaparse';

import ByBar from '../Articles/ByBar';
import RankingsTextBubble from './RankingsTextBubble';
import styles from './Rankings.module.css';

const columnNames = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'PER', 'VORP', 'MVP', 'Champ', 'DPOY'];

const Rankings = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(25);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const hof_csv = await fetch('data/HOF-Example.csv');
      const csvData = await hof_csv.text();
      const parsedData = parse(csvData, { header: true }).data;
      setData(parsedData);
      setFilteredData(parsedData);
    };

    fetchData();
  }, []);

  const sortedData = data.slice().sort((a, b) => b['HOF Probability'] - a['HOF Probability']);

  const handleFilter = () => {
    const filtered = sortedData.filter((player) =>
      Object.entries(filters).every(([column, filterValue]) => player[column] >= filterValue || filterValue === 0)
    );
    setFilteredData(filtered);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredData(sortedData);
  };

  const getPlayerIndexRange = () => {
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    return { indexOfFirstPlayer, indexOfLastPlayer };
  };

  const { indexOfFirstPlayer, indexOfLastPlayer } = getPlayerIndexRange();
  const displayedData = filteredData.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(filteredData.length / playersPerPage);
    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToLastPage = () => {
    const maxPage = Math.ceil(filteredData.length / playersPerPage);
    setCurrentPage(maxPage);
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
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

      <RankingsTextBubble
        bubbleClass={styles.lebronTextBubble}
        textmargLeft={'10px'}
        textmargRight={'0px'}
        bubbleText={
          'With a resume including 18 All-Star selections, a record-high 18 All-NBA selections, 4 MVPs, and 4 NBA championships, LeBron comfortably grabs the top spot as the biggest Hall of Fame lock of all time.'
        }
      />
      <RankingsTextBubble
        bubbleClass={styles.russellTextBubble}
        textmargLeft={'0px'}
        textmargRight={'10px'}
        bubbleText={
          'Boasting a staggering 11 NBA championships, the most in the history of the sport, the late Bill Russell cemented himself as one of basketball’s greatest icons both as a player and a coach.'
        }
      />

      <Image className={styles.lebronPanel} alt="" src="lebron-rankings-panel.svg" />
      <Image className={styles.russellPanel} alt="" src="bill-russell-rankings-panel.svg" />

      <Center>
        <TableContainer className={styles.rankingsTable}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Player Name</Th>
                <Th isNumeric>HOF Probability</Th>
                {columnNames.map((column) => (
                  <Th key={column} isNumeric>
                    {column}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {displayedData.map((row, index) => (
                <Tr key={index} color={index === 0 ? '#E1AA0F' : index === 3 ? 'green' : undefined}>
                  <Td>{indexOfFirstPlayer + index + 1}</Td>
                  <Td>{row['Player Name']}</Td>
                  <Td isNumeric>{row['HOF Probability']}</Td>
                  {columnNames.map((column) => (
                    <Td key={column} isNumeric>
                      {row[column]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
            <Tbody>
              {filteredData.length > playersPerPage && (
                <Tr>
                  <Td colSpan={3}>
                    <Stack direction="row" spacing={2} marginLeft="60px" width="90%">
                      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToFirstPage}>
                        First
                      </Button>
                      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToPreviousPage}>
                        Previous
                      </Button>
                      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToNextPage}>
                        Next
                      </Button>
                      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToLastPage}>
                        Last
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>

      {columnNames.map((column) => (
        <Stack direction="row" align="center" mt={4} key={column}>
          <Text fontWeight="bold">{column}:</Text>
          <Input
            type="number"
            value={filters[column] !== undefined ? filters[column] : ''}
            onChange={(e) => handleFilterChange(column, Number(e.target.value) || 0)}
            width="20%"
            placeholder={`Enter ${column}`}
          />
        </Stack>
      ))}

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={handleFilter}>
        Filter
      </Button>

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </Flex>
  );
};

export default Rankings;