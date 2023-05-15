import {Flex, Heading, Text} from '@chakra-ui/react'

import ProjectPart from './ProjectPart'
import styles from "./LandingPage.module.css";
import React from "react";

//            <img className={styles.lebronIcon} alt="" src="../lebron.svg"/>
//
//AD: https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Anthony_Davis_pre-game_%28cropped%29.jpg/800px-Anthony_Davis_pre-game_%28cropped%29.jpg
//Kareem trade: https://cdn-wp.thesportsrush.com/2022/08/8fbbbb6d-untitled-design-2022-08-31t111025.511.jpg
//Kobe: https://www.thedelite.com/wp-content/uploads/2019/04/KobeBryant.jpg
//MJ: https://www.biography.com/.image/t_share/MTY5NjUxOTg2OTIzMjY3MzMw/bio-headers-groups-basketball-players.jpg
const Projects = () => {
    return (
        <Flex p="10" flexDir="column">
            <div className={styles.rectangleIntroCurve}>
                <Heading paddingLeft="50px" marginTop="-25px" fontSize="7xl" fontWeight="600">PROJECTS</Heading>
            </div>
            <Text pb="5" fontSize="2xl" as='i' marginTop="100px">Explore our completed projects:</Text>
            <ProjectPart title="HALL OF FAME CALCULATOR" date="AUGUST 2022"
                         desc="Which factors make NBA players the most likely to reach the Basketball Hall of Fame? Is it NBA Championships? All-Star Selections? MVP Awards? Using machine learning, we build a model to predict the probability of every NBA player making the Hall of Fame if they retired today."
                         button1="View Rankings" buttonLink1="/rankings" buttonColor="orange" button2="View Methodology"
                         buttonLink2="/methods" buttonColor2="gray"
                         img="../lebron.svg"/>
            <Text pb="5" fontSize="2xl" as='i'>See what we've been working on recently:</Text>
            <ProjectPart title="CHAMPIONSHIP PREDICTOR" date="COMING SOON"
                         desc="What team is most poised to win the 2023 NBA Championship? Which teams have the highest playoff probabilities? We project the success of each team in the 2023 season."
                         button1="GitHub Repository" buttonColor="orange"
                         img="../wiggins.svg"/>
            <ProjectPart title="ROOKIE SUCCESS MODEL" date="COMING SOON"
                         desc="Can college performance predict the career success of NBA draft picks? Using college statistics, player measurements, and team fit, we predict each rookie’s probability of becoming a rotation player, starter, all-star, or an all-time great by the conclusion of their career."
                         button1="GitHub Repository" buttonColor="yellow"
                         img="../paolo.svg"/>
            <ProjectPart title="TRADE EVALUATOR" date="COMING SOON"
                         desc="Did the Hawks win the Dejounte Murray trade? What will his stat averages be on his new team? Using artificial intelligence, we quantify the value that newly-traded players will bring to their new teams."
                         button1="GitHub Repository" buttonColor="blue"
                         img="../dejounte.svg"/>
        </Flex>
    )
}

/*
             <ProjectPart title="LIVE WIN PROBABILITY TRACKER" date="COMING SOON"
                         desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                         button1="GitHub Repository" buttonColor="pink"
                         img="https://miro.medium.com/max/720/1*GRhI0b3sO9YWJbfxwX5Ulg.jpeg"/>
            <ProjectPart title="NBA MVP PREDICTOR" date="COMING SOON"
                         desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                         button1="GitHub Repository" buttonColor="yellow"
                         img="https://images.eurohoops.net/2022/05/306acc14-doncic-625x375.jpg"/>
 */

export default Projects
