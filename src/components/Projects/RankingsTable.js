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
  handleToggleFilterButtonClick,
} from "../../utilities/data-backend-utils.js"; // import from your utility file

import {
  toggleShowAllStats,
  getPageRange,
  isEntityPresent,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  paginateData,
} from "../../utilities/table-frontend-utils.js";

import RankingsTextBubble from "./RankingsTextBubble.js";
import styles from "./Rankings.module.css";

const tooSmallForBubblesWidth = 1250; // Adjust the value as per your requirements

const RankingsTable = (props) => {
  const {
    screenWidth,
    data,
    columnNames,
    activeButtonState,
    useBubbles,
    searchTextColumn,
    toggleColumn,
    toggleActiveValue,
    toggleHistoricValue,
    yPredAttribute,
    yTrueAttribute,
    displayYear,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [entitiesPerPage, setEntitiesPerPage] = useState(25);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAllStats, setShowAllStats] = useState(false);
  const [activeButton, setActiveButton] = useState(activeButtonState);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const { paginatedData: displayedData, maxPage } = paginateData(
    filteredData,
    currentPage,
    entitiesPerPage
  );

  // Find if LeBron James or Bill Russell are present in the displayedData
  const isLeBronJamesPresent = isEntityPresent(
    displayedData,
    "LeBron James",
    useBubbles
  );
  const isBillRussellPresent = isEntityPresent(
    displayedData,
    "Bill Russell",
    useBubbles
  );

  return (
    <Flex p="10" flexDir="column">
      {!showAllStats && screenWidth >= tooSmallForBubblesWidth && (
        <>
          {isLeBronJamesPresent && (
            <RankingsTextBubble
              bubbleClass={styles.lebronTextBubble}
              textmargLeft={"10px"}
              textmargRight={"0px"}
              bubbleText={
                "With a resume including 18 All-Star selections, a record-high 18 All-NBA selections, 4 MVPs, and 4 NBA championships, LeBron comfortably grabs the top spot as the biggest Hall of Fame lock of all time."
              }
            />
          )}
          {isBillRussellPresent && (
            <RankingsTextBubble
              bubbleClass={styles.russellTextBubble}
              textmargLeft={"0px"}
              textmargRight={"10px"}
              bubbleText={
                "Boasting a staggering 11 NBA championships, the most in the history of the sport, the late Bill Russell cemented himself as one of basketball’s greatest icons both as a player and a coach."
              }
            />
          )}

          {isLeBronJamesPresent && (
            <Image
              className={styles.lebronPanel}
              alt=""
              src="lebron-rankings-panel.svg"
            />
          )}
          {isBillRussellPresent && (
            <Image
              className={styles.russellPanel}
              alt=""
              src="bill-russell-rankings-panel.svg"
            />
          )}
        </>
      )}

      <Center>
        <Stack
          style={{ width: showAllStats ? "60%" : "30%" }}
          className={styles.rankingsTable}
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
            {showAllStats
              ? `Hide ${searchTextColumn} Stats`
              : `See ${searchTextColumn} Stats`}
          </Button>
          <ButtonGroup spacing={0} isAttached={true}>
            <Button
              colorScheme="custom"
              bg={activeButton === "all" ? "rgba(249, 250, 251, 1)" : "white"}
              onClick={() =>
                handleToggleFilterButtonClick(
                  "all",
                  data,
                  filters,
                  searchText,
                  searchTextColumn,
                  toggleColumn,
                  toggleActiveValue,
                  toggleHistoricValue,
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
              All {searchTextColumn}s
            </Button>
            <Button
              colorScheme="custom"
              bg={
                activeButton === "active" ? "rgba(249, 250, 251, 1)" : "white"
              }
              onClick={() =>
                handleToggleFilterButtonClick(
                  "active",
                  data,
                  filters,
                  searchText,
                  searchTextColumn,
                  toggleColumn,
                  toggleActiveValue,
                  toggleHistoricValue,
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
              Active {searchTextColumn}s
            </Button>
            <Button
              colorScheme="custom"
              bg={
                activeButton === "historic" ? "rgba(249, 250, 251, 1)" : "white"
              }
              onClick={() =>
                handleToggleFilterButtonClick(
                  "historic",
                  data,
                  filters,
                  searchText,
                  searchTextColumn,
                  toggleColumn,
                  toggleActiveValue,
                  toggleHistoricValue,
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
              Historic {searchTextColumn}s
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
                  searchTextColumn,
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
                  {displayYear && <Th>Year</Th>}
                  <Th>{searchTextColumn} Name</Th>
                  <Th isNumeric>Probability</Th>
                  <Th isNumeric>{yTrueAttribute}</Th>
                  {showAllStats &&
                    columnNames.map((column) => <Th key={column}>{column}</Th>)}
                </Tr>
              </Thead>
              <Tbody>
                {displayedData.map((row, index) => {
                  const rank = (currentPage - 1) * entitiesPerPage + index + 1;
                  const name = row[searchTextColumn];
                  return (
                    <Tr
                      key={index}
                      color={
                        name === "LeBron James"
                          ? "#E1AA0F"
                          : name === "Bill Russell"
                          ? "green"
                          : undefined
                      }
                    >
                      <Td>{rank}</Td>
                      {displayYear && <Td>{row["Year"]}</Td>}
                      <Td>{row[searchTextColumn]}</Td>
                      <Td isNumeric>
                        {Math.round(row[yPredAttribute] * 100) / 100}
                      </Td>
                      <Td>
                        <Box
                          display="flex"
                          width="4.125rem"
                          height="1.125rem"
                          padding="0rem 0.25rem"
                          alignItems="center"
                          gap="0.25rem"
                          flexShrink={0}
                          borderRadius="6px"
                          background="#FCF1DD"
                          justifyContent="center" // Added to center the text horizontally
                          color="rgba(155, 106, 10, 1)" // Set the text color
                          fontSize="0.625rem"
                          fontFamily="Inter"
                          fontWeight={600}
                          lineHeight="1.5rem"
                          letterSpacing="-0.00375rem"
                        >
                          {toggleColumn === "Eligible" &&
                          row[toggleColumn] === 0
                            ? "Not Eligible"
                            : row[yTrueAttribute] === "Y" ||
                              row[yTrueAttribute] === 1
                            ? `${yTrueAttribute}`
                            : `Not ${yTrueAttribute}`}
                        </Box>
                      </Td>
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
                {filteredData.length > entitiesPerPage && (
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
                              entitiesPerPage
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
                              entitiesPerPage
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
            searchTextColumn,
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
