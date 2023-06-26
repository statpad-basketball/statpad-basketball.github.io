import { Flex, Heading, Text } from "@chakra-ui/react";

import AboutPart from "./AboutPart";
import styles from "./About.module.css";
import React from "react";

//TODO: Add style to text

const About = () => {
  return (
    <Flex p="10" flexDir="column">
      <div className={styles.rectangleIntroCurve}>
        <Heading
          paddingLeft="50px"
          marginTop="-25px"
          fontSize="7xl"
          fontWeight="600"
        >
          ABOUT US
        </Heading>
      </div>
      <Text pb="5" fontSize="2xl" marginTop="100px">
        We love basketball. And stats. And when those things are together. Etc.
        Etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Eros donec ac odio tempor orci dapibus
        ultrices in. Vivamus at augue eget arcu dictum varius duis at. Ante
        metus dictum at tempor commodo ullamcorper a lacus vestibulum. Leo vel
        orci porta non pulvinar.
      </Text>
      <Heading fontSize="4xl">THE TEAM</Heading>
      <AboutPart
        title="Miles King,"
        role="Data Scientist, Graphic Designer"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="miles-king.svg"
        linkedinLink="https://www.linkedin.com/in/milesfking/"
        githubLink="https://www.linkedin.com/in/milesfking/"
        gmailLink="https://www.linkedin.com/in/milesfking/"
      />
      <AboutPart
        title="Frankie Willard,"
        role="Data Scientist, Software Engineer"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="miles-king.svg"
        linkedinLink="https://www.linkedin.com/in/milesfking/"
        githubLink="https://www.linkedin.com/in/milesfking/"
        gmailLink="https://www.linkedin.com/in/milesfking/"
      />
      <AboutPart
        title="Aditya Sardesai"
        role="Data Scientist, Software Engineer"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        img="miles-king.svg"
        linkedinLink="https://www.linkedin.com/in/milesfking/"
        githubLink="https://www.linkedin.com/in/milesfking/"
        gmailLink="https://www.linkedin.com/in/milesfking/"
      />
      <Heading fontSize="4xl" mt={10}>
        GET IN TOUCH
      </Heading>
      <Heading fontSize="2xl">Contribute a project or article:</Heading>
      <Text pb="5" fontSize="2xl">
        Have an idea for a data-driven article or project? Let us know your
        vision by filling out this form, and we would love to publish your work
        if we think it's a good fit.
      </Text>
      <Heading fontSize="2xl">Pitch a story:</Heading>
      <Text pb="5" fontSize="2xl">
        Have an idea but unable to pursue it yourself? Submit your idea here,
        and our staff would love craft a story (and give you credit) if the idea
        is worth pursuing.
      </Text>
      <Heading fontSize="2xl">Contact us:</Heading>
      <Text pb="5" fontSize="2xl">
        To get in touch, contact us at questions@statpad.com
      </Text>
    </Flex>
  );
};

export default About;
