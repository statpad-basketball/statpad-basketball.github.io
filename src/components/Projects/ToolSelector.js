import React from "react";
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
import styles from "./Rankings.module.css";

//TODO: Add style to text

const ToolSelector = () => {
  return (
    <Tabs defaultIndex={0} display="flex" justifyContent="center">
      <TabList
        borderWidth="1px"
        borderRadius="30"
        width="40.5625rem"
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
          Sandbox Tool
        </Tab>
        <Tab fontWeight="bold" _selected={{ borderBottom: "4px solid orange" }}>
          Comparison Tool
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{<RankingsTable />}</TabPanel>
        <TabPanel>{<Sandbox />}</TabPanel>
        <TabPanel>{<ComparisonTool />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ToolSelector;
