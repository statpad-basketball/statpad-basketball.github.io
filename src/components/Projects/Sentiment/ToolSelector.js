import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  StylesProvider,
} from "@chakra-ui/react";
import RankingsTable from "./RankingsTable";
import Visualization from "../Visualization";
import styles from "../Rankings.module.css";
import { fetchData, sortData } from "../../../utilities/data-backend-utils.js"; // import from your utility file
//TODO: Add style to text

const ToolSelector = (props) => {
  const {
    screenWidth,
    collectionName,
    columnNames,
    yPredAttribute,
    yTrueAttribute,
    tooltipColumnNames,
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
        width="30.5625rem"
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
        <Tab fontWeight="bold" _selected={{ borderBottom: "4px solid orange" }}>
          Visualization Tool
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {<RankingsTable screenWidth={screenWidth} data={data} />}
        </TabPanel>
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
