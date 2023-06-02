import React from 'react'
import {Link} from 'react-router-dom'
import {Center, Flex, Heading, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react'

import ByBar from './ByBar'
import RankingsTextBubble from './RankingsTextBubble'
import styles from "./Rankings.module.css";

//TODO: Add style to text

const Rankings = () => {
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

            <Center className={styles.rankingsTable}>
                <TableContainer width="50%">
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Rank</Th>
                                <Th>Player Name</Th>
                                <Th isNumeric>HOF Probability</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr color="#E1AA0F">
                                <Td>1</Td>
                                <Td>LeBron James</Td>
                                <Td isNumeric>1.000</Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>Kareem Abdul-Jabbar</Td>
                                <Td isNumeric>1.000</Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>Michael Jordan</Td>
                                <Td isNumeric>1.000</Td>
                            </Tr>
                            <Tr color="green">
                                <Td>4</Td>
                                <Td>Bill Russell</Td>
                                <Td isNumeric>1.000</Td>
                            </Tr>
                            <Tr>
                                <Td>5</Td>
                                <Td>Kobe Bryant</Td>
                                <Td isNumeric>1.000</Td>
                            </Tr>
                            <Tr>
                                <Td>6</Td>
                                <Td>Giannis Antetokounmpo</Td>
                                <Td isNumeric>0.934</Td>
                            </Tr>
                            <Tr>
                                <Td>7</Td>
                                <Td>Tony Snell</Td>
                                <Td isNumeric>0.931</Td>
                            </Tr>
                            <Tr>
                                <Td>8</Td>
                                <Td>Stephen Curry</Td>
                                <Td isNumeric>0.911</Td>
                            </Tr>
                            <Tr>
                                <Td>9</Td>
                                <Td>Thanasis Antetokounmpo</Td>
                                <Td isNumeric>0.832</Td>
                            </Tr>
                            <Tr>
                                <Td>10</Td>
                                <Td>Grayson Allen</Td>
                                <Td isNumeric>0.731</Td>
                            </Tr>
                            <Tr>
                                <Td>11</Td>
                                <Td>Dwight Howard</Td>
                                <Td isNumeric>0.654</Td>
                            </Tr>
                            <Tr>
                                <Td>12</Td>
                                <Td>Paolo Banchero</Td>
                                <Td isNumeric>0.549</Td>
                            </Tr>
                            <Tr>
                                <Td>13</Td>
                                <Td>Mark Williams</Td>
                                <Td isNumeric>0.321</Td>
                            </Tr>
                            <Tr>
                                <Td>14</Td>
                                <Td>Armando Bacot</Td>
                                <Td isNumeric>0.000</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>

        </Flex>
    )
}

export default Rankings
