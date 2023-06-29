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

const columnNames = [
  "MVP",
  "All_Star",
  "Field_Goal_Percentage",
  "Total_Rebounds",
  "Total_Blocks",
  "Points_Per_Game_Award",
  "Win_Shares",
  "Player_Efficiency_Rating",
  "Offensive_Win_Shares",
  "Defensive_Win_Shares",
  "Championships",
];

const integerColumns = ['MVP', 'All_Star', 'Total_Rebounds', 'Total_Blocks', 'Points_Per_Game_Award', 'Win_Shares', 'Championships'];

const columnRanges = {
  'MVP': { minValue: 0, maxValue: 6 }, // Range: 0 to 1
  'All_Star': { minValue: 0, maxValue: 18 }, // Range: 0 to 10
  'Field_Goal_Percentage': { minValue: 0.2, maxValue: 0.6 }, // Range: 0.4 to 0.6
  'Total_Rebounds': { minValue: 0, maxValue: 12000 }, // Range: 0 to 10,000
  'Total_Blocks': { minValue: 0, maxValue: 5000 }, // Range: 0 to 5,000
  'Points_Per_Game_Award': { minValue: 0, maxValue: 100 }, // Range: 0 to 40
  'Win_Shares': { minValue: 0, maxValue: 100 }, // Range: 0 to 20
  'Player_Efficiency_Rating': { minValue: 0, maxValue: 30 }, // Range: 0 to 30
  'Offensive_Win_Shares': { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  'Defensive_Win_Shares': { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  'Championships': { minValue: 0, maxValue: 6 }, // Range: 0 to 1
};

const Sandbox = () => {
  const [data, setData] = useState([]);
  const [predictedProbability, setPredictedProbability] = useState(null); // Add state for predicted probability
  
  const generateRandomStats = () => {
    const randomValues = {};

    columnNames.forEach((column) => {
      const { minValue, maxValue } = columnRanges[column];
      let randomValue = Math.random() * (maxValue - minValue) + minValue;

      // Round the random value to the nearest integer for specific columns
      if (integerColumns.includes(column)) {
        randomValue = Math.round(randomValue);
      }

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