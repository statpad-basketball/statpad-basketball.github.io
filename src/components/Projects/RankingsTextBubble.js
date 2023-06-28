import React from "react";
import { Stack, Text } from "@chakra-ui/react";

//TODO: Add style to text

const RankingsTextBubble = (props) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="30"
      w="400px"
      direction="row"
      bg="#F2F0F0"
      pr={4}
      mb="4"
      justifyContent="center"
      alignItems="center"
      className={props.bubbleClass}
    >
      <Text
        pb="5"
        pt="2"
        fontSize="1xl"
        marginLeft={props.textmargLeft}
        marginRight={props.textmargRight}
        letterSpacing="-0.02em"
        textAlign="center"
      >
        {props.bubbleText}
      </Text>
    </Stack>
  );
};

export default RankingsTextBubble;
