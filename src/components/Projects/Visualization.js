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
  fetchData,
  filterData,
  handleResetFilters,
  handleFilter,
  handleFilterChange,
} from "../../utilities/data-backend-utils.js";
import { createScatterPlot } from "../../utilities/graph-utils.js";
import styles from "./Rankings.module.css";

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

  const handleFilterWrapper = () => {
    handleFilter(data, filters, setFilteredData);
  };

  const handleResetFiltersWrapper = () => {
    handleResetFilters(data, setFilters, setFilteredData, undefined);
  };

  const handleFilterChangeWrapper = (column, value) => {
    handleFilterChange(column, value, setFilters);
  };

  const handleXAxisChange = (event) => {
    setXAxisColumn(event.target.value);
  };

  return (
    <Flex p="10" flexDir="column" marginTop={"550px"}>
      <HStack>
        <Stack>
          {columnNames.map((column) => (
            <Stack direction="row" align="center" mt={4} key={column}>
              <Text fontWeight="bold">{column}:</Text>
              <Input
                type="number"
                value={filters[column] !== undefined ? filters[column] : ""}
                onChange={(e) =>
                  handleFilterChangeWrapper(column, Number(e.target.value) || 0)
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
            onClick={handleFilterWrapper}
          >
            Filter
          </Button>

          <Button
            colorScheme="custom"
            bg="rgba(232, 158, 16, 0.88)"
            mt={4}
            onClick={handleResetFiltersWrapper}
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
              onChange={handleXAxisChange}
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
