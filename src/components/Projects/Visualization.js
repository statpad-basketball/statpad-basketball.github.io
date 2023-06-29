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
  sortData,
  filterData,
} from "../../utilities/data-backend-utils.js";
import * as d3 from "d3";
import tip from "d3-tip";
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

const Visualization = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [xAxisColumn, setXAxisColumn] = useState(columnNames[0]);
  const chartRef = useRef(null);

  useEffect(() => {
    const setFetchedData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setFilteredData(fetchedData);
    };

    setFetchedData();
  }, []);

  useEffect(() => {
    const xScale = d3
      .scaleLinear()
      .domain([
        Math.min(
          d3.min(filteredData, (d) => d[xAxisColumn]),
          0
        ),
        d3.max(filteredData, (d) => d[xAxisColumn]),
      ])
      .range([40, 720]);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(
          d3.min(filteredData, (d) => d.Prediction),
          0
        ),
        d3.max(filteredData, (d) => d.Prediction),
      ])
      .range([360, 40]);

    const xAxis = d3.axisBottom(xScale).ticks(5).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(5).tickSizeOuter(0);

    const chart = d3.select(chartRef.current);

    chart.selectAll("*").remove();

    chart
      .append("rect")
      .attr("x", 40)
      .attr("y", 40)
      .attr("width", 720)
      .attr("height", 320)
      .attr("stroke", "black")
      .attr("fill", "none");

    const tooltip = tip().attr("class", "d3-tip").offset([-10, 0]);

    chart.call(tooltip);

    function handleMouseOver(event, d) {
      const { Player, Prediction } = d;

      d3.select(this).attr("r", 7).style("fill", "orange");

      tooltip.show(d, this);

      const tooltipBox = chart.append("g").attr("class", "tooltip-box");

      tooltipBox
        .append("rect")
        .attr("class", "tooltip-rect")
        .attr("x", xScale(d[xAxisColumn]) + 5)
        .attr("y", yScale(Prediction) - 20)
        .attr("width", 180)
        .attr("height", 60)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", "white");

      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(Prediction) - 5)
        .text(`Player: ${Player}`)
        .style("font-size", "12px");

      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(Prediction) + 10)
        .text(`Probability: ${Math.round(Prediction * 100) / 100}`)
        .style("font-size", "12px");

      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(Prediction) + 25)
        .text(`${xAxisColumn}: ${d[xAxisColumn]}`)
        .style("font-size", "12px");
    }

    function handleMouseOut(event, d) {
      d3.select(this).attr("r", 5).style("fill", "steelblue");

      tooltip.hide(d);

      chart.selectAll(".tooltip-box").remove();
    }

    chart
      .selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[xAxisColumn]))
      .attr("cy", (d) => yScale(d.Prediction))
      .attr("r", 5)
      .style("fill", "steelblue")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    chart.append("g").attr("transform", "translate(0, 360)").call(xAxis);
    chart.append("g").attr("transform", "translate(40, 0)").call(yAxis);

    chart
      .append("text")
      .attr("x", 400)
      .attr("y", 400)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(xAxisColumn);

    chart
      .append("text")
      .attr("x", -180)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "14px")
      .text("Prediction");

    chart
      .append("text")
      .attr("x", 400)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`Scatter plot of ${xAxisColumn} vs Prediction`);
  }, [filteredData, xAxisColumn]);

  const handleFilter = () => {
    const filteredResult = filterData(data, filters);
    setFilteredData(filteredResult);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredData(data);
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
  };

  const handleXAxisChange = (event) => {
    setXAxisColumn(event.target.value);
  };

  return (
    <Flex p="10" flexDir="column">
      <HStack>
        <Stack>
          {columnNames.map((column) => (
            <Stack direction="row" align="center" mt={4} key={column}>
              <Text fontWeight="bold">{column}:</Text>
              <Input
                type="number"
                value={filters[column] !== undefined ? filters[column] : ""}
                onChange={(e) =>
                  handleFilterChange(column, Number(e.target.value) || 0)
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
            onClick={handleFilter}
          >
            Filter
          </Button>

          <Button
            colorScheme="custom"
            bg="rgba(232, 158, 16, 0.88)"
            mt={4}
            onClick={handleResetFilters}
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
