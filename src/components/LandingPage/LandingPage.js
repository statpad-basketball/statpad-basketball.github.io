import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <Flex className={styles.landingPageDiv}>
      <Image
        className={styles.backgroundCircleIcon}
        alt=""
        src="background-circle.svg"
      />
      <Image
        className={styles.graphPaperDots}
        alt=""
        overflow="hidden"
        src="graph-paper-dots.svg"
      />
      <Image className={styles.blobIcon} alt="" src="blob.svg" />
      <Image className={styles.basketballIcon} alt="" src="basketball.svg" />
      <Image className={styles.ellipseIcon} alt="" src="ellipse-3.svg" />
      <Image className={styles.ellipseIcon1} alt="" src="ellipse-5.svg" />
      <Image className={styles.ellipseIcon2} alt="" src="ellipse-5.svg" />
      <Box className={styles.quantifyingHoopsB} fontWeight="bold">
        <Text className={styles.quantifyingP}>Quantifying</Text>
        <Text className={styles.hoops}>Hoops.</Text>
      </Box>
      <Image className={styles.arrowIcon} alt="" src="arrow-1.svg" />
      <Image className={styles.arrowIcon1} alt="" src="arrow-5.svg" />
      <Image className={styles.arrowIcon2} alt="" src="arrow-6.svg" />
      <Image className={styles.arrowIcon3} alt="" src="arrow-3.svg" />
      <Image className={styles.arrowIcon4} alt="" src="arrow-4.svg" />
      <Image className={styles.arrowIcon5} alt="" src="arrow-2.svg" />
      <Image className={styles.arrowIcon6} alt="" src="arrow-8.svg" />
      <Image className={styles.arrowIcon7} alt="" src="arrow-7.svg" />
      <Image className={styles.giannisIcon} alt="" src="giannis.svg" />
      <Image className={styles.groupIcon} alt="" src="klay.svg" />
      <Link to="/projects">
        <Button
          className={styles.workButton}
          bg="rgba(232, 158, 16, 0.88)"
          height="64px"
        >
          <Text fontWeight="bold" className={styles.seeOurWork} to="/projects">
            See Our Work
          </Text>
        </Button>
      </Link>
    </Flex>
  );
};

export default LandingPage;
