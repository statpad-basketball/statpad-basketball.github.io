import React from "react";
import {
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  UnorderedList,
  ListItem,
  OrderedList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import ByBar from "../Articles/ByBar";
import styles from "./Methods.module.css";

//TODO: Add style to text

const Methodology = () => {
  return (
    <Flex p="10" flexDir="column">
      <Heading fontSize="6xl" className={styles.methodologyText}>
        METHODOLOGY:{" "}
      </Heading>
      <Heading fontSize="6xl" className={styles.hofCalcText}>
        HALL OF FAME CALCULATOR
      </Heading>
      <ByBar></ByBar>
      <Image
        className={styles.headerPlayers}
        src={"methods-header-players.svg"}
      />

      <Text pb="5" fontSize="2xl" className={styles.introHeadingText}>
        Prior to building the model, we compiled individual player data to be
        used in the model fitting process.
      </Text>
      <Text
        pb="5"
        fontSize="1xl"
        className={styles.introBodyText}
        left={"70px"}
        top={"524.01px"}
      >
        We parsed the individual player pages of 5,062 active and historic NBA
        and ABA players on Basketball Reference to scrape relevant player
        metadata, statistics, and accolades. An example of a player statistics
        page can be found here. In total, we scraped 67 variables from each
        page, which can be broken roughly into four categories as follows:
      </Text>
      <Center>
        <OrderedList
          className={styles.introBodyText}
          left={"70px"}
          top={"624.01px"}
          textAlign={"left"}
        >
          <ListItem>
            Metadata (name, primary position, Hall of Fame eligibility)
          </ListItem>
          <ListItem>
            Accolades (All-Star selections, All-NBA selections, championships,
            etc.)
          </ListItem>
          <ListItem>
            Statistics (per-game and career totals for categories including
            points, rebounds, assists, field goal percentage, and true shooting
            percentage)
          </ListItem>
          <ListItem>
            Advanced metrics (VORP, box plus-minus, win shares, etc.)
          </ListItem>
        </OrderedList>
      </Center>

      <Text
        pb="5"
        fontSize="1xl"
        className={styles.introBodyText}
        left={"70px"}
        top={"794.01px"}
      >
        In scraping the data, we performed preliminary feature selection,
        removing statistics deemed redundant or irrelevant for our use. The
        scraped data was compiled into a dataframe, with each player
        representing a row. This data scripting script is re-run annually to
        keep our data up to date.
      </Text>

      <Text pb="5" fontSize="2xl" as="i" className={styles.secondHeadingText}>
        Various steps were taken to make the scraped data suitable for modeling
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.secondBodyText}>
        One of the biggest considerations for the data cleaning process involved
        the handling of American Basketball Association ("ABA") data. The ABA, a
        rival to the NBA, existed from 1967 to 1976, and there were numerous
        players (and several Hall of Famers) who spent time in both leagues.
        Since the Basketball Hall of Fame considers a player's professional
        career inside and away from the NBA, excluding ABA statistics and
        accolades threatened to harm the accuracy of the model. For example, Mel
        Daniels—a two-time ABA MVP and three-time ABA Champion—was inducted into
        the Hall of Fame in 2012; however, he only played in the NBA for one
        season, and would not have made the Hall of Fame off of his body of NBA
        work alone. As such, it would not be accurate to train the model on ABA
        players if ABA accolades were not considered. Yet, since the ABA no
        longer exists today and only a small fraction of the historical player
        pool competed in the NBA, it did not make sense to include ABA-specific
        variables in the model. We therefore decided to combine relevant NBA and
        ABA accolades. Basketball Reference did this automatically for career
        totals and some accolades (including All-Star selections and MVP), and
        we furthered it to apply to All-ABA selections and ABA Championships,
        which are considered to carry the same weight as All-NBA selections and
        NBA Championships in our model.
      </Text>
      <Text
        pb="5"
        fontSize="1xl"
        className={styles.secondBodyText}
        left={"70px"}
        top={"1194.01px"}
      >
        In addition, we removed certain variables that would not be used in the
        modeling process, including metadata (like the player's name and their
        eligibility for the Hall of Fame) and statistics deemed collinear (such
        as career field goal attempts, which provided no information since it
        can be computed from career field goal makes and career field goal
        percentage).
      </Text>
      <Text
        pb="5"
        fontSize="1xl"
        className={styles.secondBodyText}
        left={"70px"}
        top={"1294.01px"}
      >
        Finally, considerable consideration was given to filling missing data.
        The NBA's growing dependence on analytics has led to a rise in the
        number of recorded statistics. As such, some collected statistics were
        not recorded in the early years of the NBA. In other cases, missing data
        resulted from a lack of a statistic for a specific player. In general,
        missing data was handled in a few different ways:
      </Text>
      <Center>
        <OrderedList
          className={styles.secondBodyText}
          left={"70px"}
          top={"1394.01px"}
          textAlign={"left"}
        >
          <ListItem>
            Drop the column: some data, like the season long number of triple
            doubles, was collected so recently that the vast majority had an NA
            value for this column. It made more sense to drop these columns than
            impute a large number.{" "}
          </ListItem>
          <ListItem>
            Fill missing values with zero: some statistics, especially those
            related to three-point shots, did not exist prior to the inception
            of the three-point line, so we filled these columns with zero
          </ListItem>
          <ListItem>
            Fill with the league average: some statistics, such as PER, VORP,
            and effective field goal percentage, were not calculated (or have a
            formula that relies on three-point numbers). In these cases, the
            columns were simply imputed based on the league average.
          </ListItem>
          <ListItem>
            Fill with the positional average: for other statistics, such as
            rebounds, assists, blocks, and steals, there are clear positional
            differences, so we filled the statistic with the average among all
            other players in the database who shared the same primary position. {" "}
          </ListItem>
        </OrderedList>
      </Center>
      <Text
        pb="5"
        fontSize="1xl"
        className={styles.secondBodyText}
        left={"70px"}
        top={"1594.01px"}
      >
        This list is not exhaustive, and a closer look at each variable dropped
        or imputed can be found in the data cleaning section of the model
        notebook.
      </Text>
      <Text pb="5" fontSize="2xl" as="i" className={styles.thirdHeadingText}>
        After cleaning the data, feature selection was performed to assess the
        predictive power of the remaining variables
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.thirdBodyText}>
        We relied primarily on the scikit-learn package and its built-in feature
        selection tools—specifically KBest, RFE, and SFM—to perform feature
        selection. While each tool has a slightly different process for
        determining which features are significant, we decided to keep the
        features that were deemed significant by at least two of the three
        methods. After removing variables deemed collinear, we were left with
        the following predictors:
      </Text>
      <Center>
        <UnorderedList
          className={styles.secondBodyText}
          left={"70px"}
          top={"2024.01px"}
          textAlign={"left"}
        >
          <ListItem>Number of MVPs </ListItem>
          <ListItem>Number of Championships</ListItem>
          <ListItem>All-Star Selections</ListItem>
          <ListItem>Career FG% </ListItem>
          <ListItem>Career Total Rebounds</ListItem>
          <ListItem>Career Blocks</ListItem>
          <ListItem>Career Player Efficiency Rating (outlined here)</ListItem>
          <ListItem>Career Offensive Win Shares (outlined here) </ListItem>
          <ListItem>Career Defensive Win Shares (outlined here)</ListItem>
        </UnorderedList>
      </Center>

      <Text
        pb="5"
        fontSize="2xl"
        as="i"
        className={styles.thirdHeadingText}
        top={"2224.01px"}
      >
        Aiming to optimize the trade-off between accuracy and predictability, we
        experimented with a number of models
      </Text>

      <Text
        pb="5"
        fontSize="1xl"
        className={styles.secondBodyText}
        top={"2424.01px"}
      >
        To perform model selection, we compared accuracy metrics from a number
        of different models, including logistic regression, a decision tree, a
        random forest, an XGB classifier, SVC, Gaussian NB, and K-Neighbors. We
        sought to optimize the tradeoff between precision (i.e. of players that
        the model thinks are Hall of Fame caliber, how many truly were) and
        recall (of true Hall of Fame players, how many did the model correctly
        identify). The logistic regression model performed best on the test
        data.
      </Text>

      <Text
        pb="5"
        fontSize="2xl"
        as="i"
        className={styles.thirdHeadingText}
        top={"2524.01px"}
      >
        The logistic regression model yielded interpretable variable
        coefficients
      </Text>

      <HStack>
        <TableContainer width="100%" className={styles.coefficientsTable}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Variable</Th>
                <Th isNumeric>Coefficient</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Test 1</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 2</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 3</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 4</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 5</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </HStack>

      <Text pb="5" fontSize="2xl" as="i" className={styles.ackHeader}>
        Acknowledgements, sources, GitHub icon with link to GitHub repo, etc.
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.ackBody}>
        Est placerat in egestas erat imperdiet sed. Semper auctor neque vitae
        tempus quam. Nibh praesent tristique magna sit amet purus. Amet est
        placerat in egestas erat imperdiet sed euismod. Sed turpis tincidunt id
        aliquet. Risus feugiat in ante metus dictum at. Ornare massa eget
        egestas purus viverra accumsan in. Urna nunc id cursus metus aliquam
        eleifend mi in nulla. Quam viverra orci sagittis eu. Eget nunc lobortis
        mattis aliquam faucibus purus in massa tempor. Leo integer malesuada
        nunc vel risus commodo viverra maecenas. Massa vitae tortor condimentum
        lacinia quis vel eros donec ac. Ultricies mi quis hendrerit dolor magna
        eget est lorem ipsum. Sapien faucibus et molestie ac feugiat. Morbi
        tristique senectus et netus. Venenatis urna cursus eget nunc
        scelerisque.
      </Text>
    </Flex>
  );
};

export default Methodology;
