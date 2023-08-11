import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { updateScreenWidth } from "../../utilities/general-utils.js";
import ByBar from "../Articles/ByBar.js";
import ToolSelector from "./ToolSelector.js";
import styles from "./Rankings.module.css";

const xColumnNames = [
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

const tooltipColumnNames = ["Player"];
const collectionName = "hof_probs_v1_all";
const yPredAttribute = "Prediction";
const yTrueAttribute = "Hall_of_Fame";
const activeButtonState = "all";
const useBubbles = true;
const tooSmallForHeadersWidth = 1200; // Adjust the value as per your requirements
const searchTextColumn = "Player";
const toggleColumn = "Eligible";
const toggleActiveValue = 0;
const toggleHistoricValue = 1;
const displayYear = false;
const useSandbox = true;
const useComparison = true;

const RankingsUpdated = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const fontSize = useBreakpointValue({
    small: "3xl",
    base: "4xl",
    md: "5xl",
    lg: "5xl",
  });

  // Add an event listener to update the screen width when it changes
  useEffect(() => {
    const handleResizeCleanup = updateScreenWidth(setScreenWidth);

    return () => {
      handleResizeCleanup();
    };
  }, []);

  return (
    <Flex p="10" flexDir="column">
      <Heading className={styles.hofText} fontSize={fontSize}>
        HALL OF FAME CALCULATOR
      </Heading>
      <ByBar />
      {screenWidth >= tooSmallForHeadersWidth && (
        <>
          <Image
            className={styles.headerPlayers}
            src={"rankings-header-players.svg"}
          />
        </>
      )}
      <Text className={styles.questionText} pb="5" fontSize="2xl" as="i">
        In the eyes of voters, what makes an NBA player worthy of induction into
        the Basketball Hall of Fame?
      </Text>
      <Text className={styles.descriptionText} pb="5" fontSize="1xl">
        Using stat averages and accolades obtained throughout a given NBA
        player’s career, this model outputs the probability that the player will
        be inducted into the Hall of Fame at the conclusion of their career. For
        more information on the model and the methodology behind it, click{" "}
        <Link color="teal.500" to="/methods">
          here.
        </Link>
      </Text>
      <ToolSelector
        screenWidth={screenWidth}
        collectionName={collectionName}
        columnNames={xColumnNames}
        yPredAttribute={yPredAttribute}
        yTrueAttribute={yTrueAttribute}
        tooltipColumnNames={tooltipColumnNames}
        activeButtonState={activeButtonState}
        useBubbles={useBubbles}
        searchTextColumn={searchTextColumn}
        toggleColumn={toggleColumn}
        toggleActiveValue={toggleActiveValue}
        toggleHistoricValue={toggleHistoricValue}
        displayYear={displayYear}
        useSandbox={useSandbox}
        useComparison={useComparison}
      ></ToolSelector>{" "}
    </Flex>
  );
};

export default RankingsUpdated;
