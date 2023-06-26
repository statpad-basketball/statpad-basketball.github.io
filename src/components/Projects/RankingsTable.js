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
// import { parse } from 'papaparse';
import { fetchData, sortData, filterData, paginateData } from './rankings-utils.js'; // import from your utility file

import ByBar from '../Articles/ByBar';
import RankingsTextBubble from './RankingsTextBubble';
import ToolSelector from './ToolSelector';
import styles from './Rankings.module.css';

//const columnNames = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'PER', 'VORP', 'MVP', 'Champ', 'DPOY'];
const columnNames = ['MVP', 'All_Star', 'FG_totals', 'TRB_totals', 'BLK_totals', 'pts_per_g_seasonal', 'ws_seasonal', 'PER_advanced', 'OWS_advanced', 'DWS_advanced', 'Champ'];
const RankingsTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage, setPlayersPerPage] = useState(25);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
  
    useEffect(() => {
      const fetchAndSortData = async () => {
        const fetchedData = await fetchData();
        const sortedData = sortData(fetchedData, 'pred');
        setData(sortedData);
        setFilteredData(sortedData);
      };
    
      fetchAndSortData();
    }, []);
    
    const handleSearchAndFilter = () => {
      let filteredResult = data;
    
      if (Object.keys(filters).length > 0) {
        // Apply filters
        filteredResult = filterData(filteredResult, filters);
      }
    
      if (searchText !== '') {
        // Apply search within the filtered data
        filteredResult = filteredResult.filter((row) =>
          row['Player'].toLowerCase().startsWith(searchText.toLowerCase())
        );
      }
    
      setFilteredData(filteredResult);
    };
  
    const handleFilter = () => {
      const filteredResult = filterData(data, filters)
      setFilteredData(filteredResult); // filter the original data instead of sortedData
    };
  
    const handleResetFilters = () => {
      setFilters({});
      setSearchText(''); // Reset the search input
      setFilteredData(data);
    };
  
    const { paginatedData: displayedData, maxPage } = paginateData(filteredData, currentPage, playersPerPage);
  
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
        <Stack className={styles.rankingsTable}>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleSearchAndFilter}
          width="80%"
          placeholder="Search by name"
        />
        <TableContainer>
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
            {displayedData.map((row, index) => {
            const rank = (currentPage - 1) * playersPerPage + index + 1;
            return (
                <Tr key={index} color={index === 0 ? '#E1AA0F' : index === 3 ? 'green' : undefined}>
                <Td>{rank}</Td>
                <Td>{row['Player']}</Td>
                <Td isNumeric>{Math.round(row['pred'] * 100) / 100}</Td>
                {columnNames.map((column) => (
                    <Td key={column} isNumeric>
                    {row[column]}
                    </Td>
                ))}
                </Tr>
            );
            })}
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
        </Stack>
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

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={handleSearchAndFilter}>
        Filter
      </Button>

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </Flex>
    )
}

export default RankingsTable
