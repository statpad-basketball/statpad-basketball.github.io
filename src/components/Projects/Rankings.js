import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Center, Flex, HStack, Heading, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Stack} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { parse } from 'papaparse'; // for parsing CSV data

import ByBar from '../Articles/ByBar'
import RankingsTextBubble from './RankingsTextBubble'
import styles from "./Rankings.module.css";

//TODO: Add style to text

const Rankings = () => {

    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage, setPlayersPerPage] = useState(25);

    useEffect(() => {
      const fetchData = async () => {
        const hof_csv = await fetch('data/HOF-Example.csv');
        console.log(hof_csv);
        const csvData = await hof_csv.text();
        console.log(csvData);
        const parsedData = parse(csvData, { header: true }).data;
        setData(parsedData);
      };
  
      fetchData();
    }, []);
  
    const sortedData = data.slice().sort((a, b) => b['HOF Probability'] - a['HOF Probability']);  

    const handleShowMore = () => {
        setShowAll((prevShowAll) => !prevShowAll);
      };

    const getPlayerIndexRange = () => {
        const indexOfLastPlayer = currentPage * playersPerPage;
        const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
        return { indexOfFirstPlayer, indexOfLastPlayer };
    };

      const { indexOfFirstPlayer, indexOfLastPlayer } = getPlayerIndexRange();
      const displayedData = sortedData.slice(indexOfFirstPlayer, indexOfLastPlayer);
    
      const goToFirstPage = () => {
        setCurrentPage(1);
      };
    
      const goToPreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      };
    
      const goToNextPage = () => {
        const maxPage = Math.ceil(sortedData.length / playersPerPage);
        if (currentPage < maxPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };
    
      const goToLastPage = () => {
        const maxPage = Math.ceil(sortedData.length / playersPerPage);
        setCurrentPage(maxPage);
      };

    console.log(sortedData)

    return (
        <Flex p="10" flexDir="column">
            <Heading className={styles.hofText} fontSize="5xl">HALL OF FAME CALCULATOR</Heading>

            <ByBar></ByBar>
            <Image className={styles.headerPlayers} src={"rankings-header-players.svg"}/>

            <Text className={styles.questionText} pb="5" fontSize="2xl" as='i'>In the eyes of voters, what makes an NBA player worthy of induction into
                the Basketball Hall of Fame?</Text>
            <Text className={styles.descriptionText} pb="5" fontSize="1xl">Using stat averages and accolades obtained throughout a given NBA player’s
                career, this model outputs the probability that the player will be inducted into the Hall of Fame at the
                conclusion of their career. For more information on the model and the methodology behind it, click{' '}
                <Link color="teal.500" to="/methods">here.</Link>
            </Text>

            <Heading className={styles.probsText}>Hall of Fame probabilities: Current and former players</Heading>

            <RankingsTextBubble bubbleClass={styles.lebronTextBubble} textmargLeft={"10px"} textmargRight={"0px"} bubbleText={"With a resume including 18 All-Star selections, a record-high 18 All-NBA selections, 4 MVPs, and 4 NBA championships, LeBron comfortably grabs the top spot as the biggest Hall of Fame lock of all time."}></RankingsTextBubble>
            <RankingsTextBubble bubbleClass={styles.russellTextBubble} textmargLeft={"0px"} textmargRight={"10px"} bubbleText={"Boasting a staggering 11 NBA championships, the most in the history of the sport, the late Bill Russell cemented himself as one of basketball’s greatest icons both as a player and a coach."}></RankingsTextBubble>

            <img className={styles.lebronPanel} alt="" src="lebron-rankings-panel.svg"/>
            <img className={styles.russellPanel} alt="" src="bill-russell-rankings-panel.svg"/>
            
            <Center>
                <TableContainer className={styles.rankingsTable}>
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Player Name</Th>
                        <Th isNumeric>HOF Probability</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {displayedData.map((row, index) => (
                        <Tr
                        key={index}
                        color={index === 0 ? '#E1AA0F' : index === 3 ? 'green' : undefined}
                        >
                        <Td>{indexOfFirstPlayer + index + 1}</Td>
                        <Td>{row['Player Name']}</Td>
                        <Td isNumeric>{row['HOF Probability']}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                    <Tbody>
                    {sortedData.length > playersPerPage && (
                    <Tr>
                        <Td colSpan={3}>
                        <HStack marginLeft="60px" width="90%">
                            <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToFirstPage}>
                            First
                            </Button>
                            <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToPreviousPage}>
                            Previous
                            </Button>
                            <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToNextPage}>
                            Next
                            </Button>
                            <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" onClick={goToLastPage}>
                            Last
                            </Button>
                        </HStack>
                        </Td>
                    </Tr>
                    )}
                </Tbody>
                </Table>
                </TableContainer>
        </Center>
    </Flex>
    
  )
};

export default Rankings
