import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
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
} from "@chakra-ui/react";

import {
  handleSearchAndFilter,
  handleResetFilters,
  handleFilterChange,
  handleToggleEligibilityButtonClick,
  handleToggleActiveTeamButtonClick,
} from "../../../utilities/data-backend-utils.js"; // import from your utility file

import {
  toggleShowAllStats,
  getPageRange,
  isPlayerPresent,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  paginateData,
} from "../../../utilities/table-frontend-utils.js";

import RankingsTextBubble from "../RankingsTextBubble.js";
import styles from "../Rankings.module.css";

const columnNames = [
  "Age",
  "MOV",
  "SOS",
  "SRS",
  "ORtg",
  "DRtg",
  "NRtg",
  "Pace",
  "FTr",
  "3PAr",
  "TS%",
  "OeFG%",
  "OTOV%",
  "ORB%",
  "OFT/FGA",
  "DeFG%",
  "DTOV%",
  "DRB%",
  "DFT/FGA",
  "W/L%",
  "won_last",
  "won_last_3",
];

const tooSmallForBubblesWidth = 1250; // Adjust the value as per your requirements

const RankingsTable = (props) => {
  const { screenWidth, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(30);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAllStats, setShowAllStats] = useState(false);
  const [activeButton, setActiveButton] = useState("active");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const { paginatedData: displayedData, maxPage } = paginateData(
    filteredData,
    currentPage,
    playersPerPage
  );

  return (
    <Flex p="10" flexDir="column">
      <Center>
        <Stack
          style={{ width: showAllStats ? "60%" : "30%" }}
          className={styles.rankingsTable}
          height={"1850px"}
        >
          <Button
            colorScheme="custom"
            bg="rgba(232, 158, 16, 0.88)"
            width="40%"
            ml={3}
            mb={3}
            fontSize="1xl"
            onClick={() => toggleShowAllStats(setShowAllStats)}
          >
            {showAllStats ? "Hide Team Stats" : "See Team Stats"}
          </Button>
          <ButtonGroup spacing={0} isAttached={true}>
            <Button
              colorScheme="custom"
              bg={
                activeButton === "active" ? "rgba(249, 250, 251, 1)" : "white"
              }
              onClick={() =>
                handleToggleActiveTeamButtonClick(
                  "active",
                  data,
                  filters,
                  searchText,
                  setFilters,
                  setFilteredData,
                  setCurrentPage,
                  setActiveButton
                )
              }
              flex="1"
              borderColor="rgba(208, 213, 221, 1)"
              color="rgba(52, 64, 84, 1)"
              borderTop="1px solid rgba(208, 213, 221, 1)"
              borderBottom="1px solid rgba(208, 213, 221, 1)"
            >
              Teams
            </Button>
            <Button
              colorScheme="custom"
              bg={
                activeButton === "historic" ? "rgba(249, 250, 251, 1)" : "white"
              }
              onClick={() =>
                handleToggleActiveTeamButtonClick(
                  "historic",
                  data,
                  filters,
                  searchText,
                  setFilters,
                  setFilteredData,
                  setCurrentPage,
                  setActiveButton
                )
              }
              flex="1"
              color="rgba(52, 64, 84, 1)"
              border="1px solid rgba(208, 213, 221, 1)"
            >
              Players
            </Button>
          </ButtonGroup>
          <HStack>
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={() =>
                handleSearchAndFilter(
                  data,
                  "Team",
                  filters,
                  searchText,
                  setFilteredData
                )
              }
              width="80%"
              placeholder="Search by name"
            />
            <Button
              colorScheme="custom"
              bg="rgba(232, 158, 16, 0.88)"
              mt={4}
              width="40%"
              fontSize="1xl"
              onClick={() => toggleShowAllStats(setShowAllStats)}
            >
              {"Filters"}
            </Button>
          </HStack>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Team Name</Th>
                  <Th isNumeric>Sentiment</Th>
                  {showAllStats &&
                    columnNames.map((column) => <Th key={column}>{column}</Th>)}
                </Tr>
              </Thead>
              <Tbody>
                {displayedData.map((row, index) => {
                  const rank = (currentPage - 1) * playersPerPage + index + 1;
                  return (
                    <Tr key={index}>
                      <Td>{rank}</Td>
                      <Td>{row["Team"]}</Td>
                      <Td isNumeric>{row["Sentiment"]}%</Td>
                      {showAllStats &&
                        columnNames.map((column) => (
                          <Td key={column}>{row[column]}</Td>
                        ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <Tbody>
                {filteredData.length > playersPerPage && (
                  <Tr>
                    <Td colSpan={columnNames.length + 3}>
                      <Stack
                        direction="row"
                        spacing={2}
                        width="90%"
                        justifyContent="center"
                        style={{ margin: "auto" }}
                      >
                        <Button
                          colorScheme="custom"
                          bg="rgba(232, 158, 16, 0.88)"
                          onClick={() => goToFirstPage(setCurrentPage)}
                        >
                          First
                        </Button>
                        <Button
                          colorScheme="custom"
                          bg="rgba(232, 158, 16, 0.88)"
                          onClick={() =>
                            goToPreviousPage(currentPage, setCurrentPage)
                          }
                        >
                          Previous
                        </Button>
                        <Button
                          colorScheme="custom"
                          bg="rgba(232, 158, 16, 0.88)"
                          onClick={() =>
                            goToNextPage(
                              currentPage,
                              setCurrentPage,
                              filteredData,
                              playersPerPage
                            )
                          }
                        >
                          Next
                        </Button>
                        <Button
                          colorScheme="custom"
                          bg="rgba(232, 158, 16, 0.88)"
                          onClick={() =>
                            goToLastPage(
                              setCurrentPage,
                              filteredData,
                              playersPerPage
                            )
                          }
                        >
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
            value={filters[column] !== undefined ? filters[column] : ""}
            onChange={(e) =>
              handleFilterChange(
                column,
                Number(e.target.value) || 0,
                setFilters
              )
            }
            width="20%"
            placeholder={`Enter ${column}`}
          />
        </Stack>
      ))}

      <Button
        colorScheme="custom"
        bg="rgba(232, 158, 16, 0.88)"
        mt={4}
        onClick={() =>
          handleSearchAndFilter(
            data,
            "Team",
            filters,
            searchText,
            setFilteredData
          )
        }
      >
        Filter
      </Button>

      <Button
        colorScheme="custom"
        bg="rgba(232, 158, 16, 0.88)"
        mt={4}
        onClick={() =>
          handleResetFilters(
            data,
            filters,
            setFilters,
            setFilteredData,
            setSearchText
          )
        }
      >
        Reset Filters
      </Button>
    </Flex>
  );
};

export default RankingsTable;
