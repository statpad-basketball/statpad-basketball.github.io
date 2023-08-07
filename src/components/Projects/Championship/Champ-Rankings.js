import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { fetchData, sortData } from "../../../utilities/data-backend-utils.js";
import { updateScreenWidth } from "../../../utilities/general-utils.js";
import ByBar from "../../Articles/ByBar.js";
import styles from "../Rankings.module.css";
import RankingsTable from "./RankingsTable.js";

const tooSmallForHeadersWidth = 1200; // Adjust the value as per your requirements

const ChampRankings = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const fontSize = useBreakpointValue({
    small: "3xl",
    base: "4xl",
    md: "5xl",
    lg: "5xl",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAndSortData = async () => {
      const fetchedData = await fetchData("hof-rankings", "hof_probs_v1_all");
      const sortedData = sortData(fetchedData, "Prediction");
      setData(sortedData);
    };

    fetchAndSortData();
  }, []);

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
        CHAMPIONSHIP PREDICTIONS
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
        Who has the best chance to win this year's NBA Championship?
      </Text>
      <Text className={styles.descriptionText} pb="5" fontSize="1xl">
        Our live championship model is updated daily
      </Text>

      <RankingsTable screenWidth={screenWidth} data={data} />
    </Flex>
  );
};

export default ChampRankings;
