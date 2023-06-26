import { Flex, Heading, Text } from "@chakra-ui/react";

import ArticlePart from "./ArticlePart";
import styles from "./../LandingPage/LandingPage.module.css";
import React from "react";

const Articles = () => {
  return (
    <Flex p="10" flexDir="column">
      <div className={styles.rectangleIntroCurve}>
        <Heading
          paddingLeft="50px"
          marginTop="-25px"
          fontSize="7xl"
          fontWeight="600"
        >
          ARTICLES
        </Heading>
      </div>
      <Text pb="5" fontSize="2xl" as="i" marginTop="100px">
        Explore our latest articles:
      </Text>
      <ArticlePart
        title="Underrated teams entering 2023"
        date="COMING SOON"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="curry.svg"
      />
      <ArticlePart
        title="Filler title"
        date="COMING SOON"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="curry.svg"
      />
      <ArticlePart
        title="Filler title"
        date="COMING SOON"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="curry.svg"
      />
    </Flex>
  );
};

export default Articles;
