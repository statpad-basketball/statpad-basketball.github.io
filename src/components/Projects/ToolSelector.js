import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  StylesProvider,
} from "@chakra-ui/react";
import Sandbox from "./Sandbox";
import RankingsTable from "./RankingsTable";
import ComparisonTool from "./ComparisonTool";
import Visualization from "./Visualization";
import styles from "./Rankings.module.css";
import { fetchData, sortData } from "../../utilities/data-backend-utils.js"; // import from your utility file
import { getTabListWidth } from "../../utilities/tool-selector-utils.js";

const ToolSelector = (props) => {
  const {
    screenWidth,
    collectionName,
    columnNames,
    yPredAttribute,
    yTrueAttribute,
    tooltipColumnNames,
    activeButtonState,
    useBubbles,
    searchTextColumn,
    toggleColumn,
    toggleActiveValue,
    toggleHistoricValue,
    displayYear,
    useSandbox,
    useComparison,
  } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAndSortData = async () => {
      const fetchedData = await fetchData("hof-rankings", collectionName);
      const sortedData = sortData(fetchedData, yPredAttribute);
      setData(sortedData);
    };

    fetchAndSortData();
  }, []);

  return (
    <Tabs defaultIndex={0} display="flex" justifyContent="center">
      <TabList
        borderWidth="1px"
        borderRadius="30"
        width={`${getTabListWidth(useSandbox, useComparison)}rem`}
        height="2.375rem"
        bg="#F2F0F0"
        mb="4"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        className={styles.tabList}
      >
        <Tab fontWeight="bold" _selected={{ borderBottom: "4px solid orange" }}>
          Probabilities Tool
        </Tab>
        {useSandbox && (
          <Tab
            fontWeight="bold"
            _selected={{ borderBottom: "4px solid orange" }}
          >
            Sandbox Tool
          </Tab>
        )}
        {useComparison && (
          <Tab
            fontWeight="bold"
            _selected={{ borderBottom: "4px solid orange" }}
          >
            Comparison Tool
          </Tab>
        )}
        <Tab fontWeight="bold" _selected={{ borderBottom: "4px solid orange" }}>
          Visualization Tool
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {
            <RankingsTable
              screenWidth={screenWidth}
              data={data}
              columnNames={columnNames}
              activeButtonState={activeButtonState}
              useBubbles={useBubbles}
              searchTextColumn={searchTextColumn}
              toggleColumn={toggleColumn}
              toggleActiveValue={toggleActiveValue}
              toggleHistoricValue={toggleHistoricValue}
              yPredAttribute={yPredAttribute}
              yTrueAttribute={yTrueAttribute}
              displayYear={displayYear}
              useSandbox={useSandbox}
              useComparison={useComparison}
            />
          }
        </TabPanel>
        {useSandbox && <TabPanel>{<Sandbox data={data} />}</TabPanel>}
        {useComparison && <TabPanel>{<ComparisonTool data={data} />}</TabPanel>}
        <TabPanel>
          {
            <Visualization
              data={data}
              columnNames={columnNames}
              yPredAttribute={yPredAttribute}
              yTrueAttribute={yTrueAttribute}
              tooltipColumnNames={tooltipColumnNames}
            />
          }
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ToolSelector;
