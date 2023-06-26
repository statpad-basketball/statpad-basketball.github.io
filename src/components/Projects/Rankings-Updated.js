import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
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
// import { parse } from 'papaparse';
import {
  fetchData,
  sortData,
  filterData,
  paginateData,
} from "./rankings-utils.js"; // import from your utility file

import ByBar from "../Articles/ByBar";
import RankingsTextBubble from "./RankingsTextBubble";
import ToolSelector from "./ToolSelector";
import styles from "./Rankings.module.css";

const RankingsUpdated = () => {
  return (
    <Flex p="10" flexDir="column">
      <Heading className={styles.hofText} fontSize="5xl">
        HALL OF FAME CALCULATOR
      </Heading>

      <ByBar />
      <Image
        className={styles.headerPlayers}
        src={"rankings-header-players.svg"}
      />

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

      <ToolSelector />
    </Flex>
  );
};

export default RankingsUpdated;
