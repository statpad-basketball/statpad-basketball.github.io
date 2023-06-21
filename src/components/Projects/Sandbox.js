import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
// import { parse } from 'papaparse';

import ByBar from '../Articles/ByBar';
import styles from './Rankings.module.css';
import axios from 'axios';

const columnNames = [ 'MVP',  'All_Star',  'FG%_totals',  'TRB_totals',  'BLK_totals',  'pts_per_g_seasonal',  'ws_seasonal',  'PER_advanced',  'OWS_advanced',  'DWS_advanced',  'Champ']

const Sandbox = () => {
  const [data, setData] = useState([]);
  const [predictedProbability, setPredictedProbability] = useState(null); // Add state for predicted probability
  
  const generateRandomStats = () => {
    const randomValues = {};

    columnNames.forEach((column) => {
      const minValue = 0; // Minimum value for random stats
      const maxValue = 5; // Maximum value for random stats
      const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

      randomValues[column] = randomValue;
    });

    setData(randomValues);
  };

    const generateHOFProbabilities = async () => {
        // Prepare the input data
        const inputValues = columnNames.reduce((values, column) => {
            values[column] = parseFloat(data[column] || 0);
            return values;
          }, {});
      
        try {
            // Make a POST request to the server
            const response = await axios.post('http://localhost:2000/predict', inputValues);
    
            // Get the predicted probabilities from the response
            const { predictedProbabilities } = response.data;

            setPredictedProbability(predictedProbabilities[0]); // Assuming only one predicted probability
      
            // Do something with the predicted probabilities
            console.log('Predicted Probabilities:', data.predictedProbabilities);
        } catch (error) {
            console.error('Error:', error);
        }
      };

    const handleInputChange = (column, value) => {
    setData((prevData) => ({
        ...prevData,
        [column]: value,
    }));
    };

  return (
    <Flex p="10" flexDir="column">
      <Heading className={styles.hofText} fontSize="5xl">
        HALL OF FAME CALCULATOR
      </Heading>

      <ByBar />
      <Image className={styles.headerPlayers} src={'rankings-header-players.svg'} />

      <Text className={styles.questionText} pb="5" fontSize="2xl" as="i">
        In the eyes of voters, what makes an NBA player worthy of induction into the Basketball Hall of Fame?
      </Text>
      <Text className={styles.descriptionText} pb="5" fontSize="1xl">
        Using stat averages and accolades obtained throughout a given NBA player’s career, this model outputs the
        probability that the player will be inducted into the Hall of Fame at the conclusion of their career. For more
        information on the model and the methodology behind it, click{' '}
        <Link color="teal.500" to="/methods">
          here.
        </Link>
      </Text>

      <Heading className={styles.probsText}>Hall of Fame probabilities: Current and former players</Heading>

        <Stack mt={600} ml={200}>
        {columnNames.map((column) => (
            <Stack direction="row" align="center" mt={4} key={column}>
            <Text fontWeight="bold">{column}:</Text>
            <Input
                id={`${column}_input`}
                type="number"
                value={data[column] !== undefined ? data[column] : ''}
                onChange={(e) => handleInputChange(column, e.target.value)}
                width="20%"
                placeholder={`Enter ${column}`}
            />
            </Stack>
        ))}
        </Stack>

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={generateRandomStats}>
        Generate Random Statistics
      </Button>

      <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={generateHOFProbabilities}>
        Generate Hall of Fame Probabilities
      </Button>
      {(
        <Text mt={4} fontSize="xl" fontWeight="bold">
          Predicted Probability: {predictedProbability}
        </Text>
      )}
    </Flex>
  );
};

export default Sandbox;