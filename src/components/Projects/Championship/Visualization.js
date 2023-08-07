import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Select,
  HStack,
} from "@chakra-ui/react";
import {
  handleResetFilters,
  handleFilter,
  handleFilterChange,
} from "../../../utilities/data-backend-utils.js";
import {
  createScatterPlot,
  handleXAxisChange,
} from "../../../utilities/graph-utils.js";
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

const Visualization = (props) => {
  const { data } = props;
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [xAxisColumn, setXAxisColumn] = useState(columnNames[0]);
  const chartRef = useRef(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    createScatterPlot(chartRef, filteredData, xAxisColumn);
  }, [filteredData, xAxisColumn]);

  return (
    <Flex p="10" flexDir="column" marginTop={"350px"}>
      <HStack>
        <Stack>
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
                width="45%"
                placeholder={`Enter ${column}`}
              />
            </Stack>
          ))}
          <Button
            colorScheme="custom"
            bg="rgba(232, 158, 16, 0.88)"
            mt={4}
            onClick={() => handleFilter(data, filters, setFilteredData)}
          >
            Filter
          </Button>

          <Button
            colorScheme="custom"
            bg="rgba(232, 158, 16, 0.88)"
            mt={4}
            onClick={() =>
              handleResetFilters(data, setFilters, setFilteredData, undefined)
            }
          >
            Reset Filters
          </Button>
        </Stack>
        <Stack>
          <Flex flex="1" justifyContent="flex-end">
            <svg ref={chartRef} className={styles.chart}></svg>
          </Flex>{" "}
          <Flex flex="1" mt={400} justifyContent="flex-end">
            <Text mr={10} fontWeight="bold">
              X-Axis:
            </Text>
            <Select
              mr={250}
              value={xAxisColumn}
              onChange={(e) => handleXAxisChange(e, setXAxisColumn)}
              width="200px"
            >
              {columnNames.map((column) => (
                <option value={column} key={column}>
                  {column}
                </option>
              ))}
            </Select>
          </Flex>
        </Stack>
      </HStack>
    </Flex>
  );
};

export default Visualization;
