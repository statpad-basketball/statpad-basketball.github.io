import { Flex, Heading, Text } from "@chakra-ui/react";

import AboutPart from "../About/AboutPart";
import styles from "../About/About.module.css";
import React from "react";

//TODO: Add style to text

const Page404 = () => {
  return (
    <Flex p="10" flexDir="column">
      <div className={styles.rectangleIntroCurve}>
        <Heading
          paddingLeft="50px"
          marginTop="-25px"
          fontSize="7xl"
          fontWeight="600"
        >
          404 Not Found
        </Heading>
      </div>
    </Flex>
  );
};

export default Page404;
