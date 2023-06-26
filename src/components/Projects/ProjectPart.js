import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";

const ProjectPart = (props) => {
  return (
    <Center>
      <Stack
        borderWidth="1px"
        borderRadius="30"
        w="100%"
        height="15rem"
        direction="row"
        bg="#E7E7E7"
        pr={4}
        mb="4"
      >
        <Flex flex={0.3}>
          <Image
            borderLeftRadius="30"
            objectFit="cover"
            boxSize="100%"
            src={props.img}
            marginLeft={props.imgmarginLeft}
          />
        </Flex>

        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          p={1}
          pt={2}
        >
          <HStack>
            <Heading fontSize={"4xl"} fontFamily={"body"}>
              {props.title}
            </Heading>
            <Text
              fontSize="2xl"
              fontWeight={600}
              color={"gray.800"}
              size="sm"
              mb={4}
            >
              {props.date}
            </Text>
          </HStack>
          <Text color={useColorModeValue("gray.700", "gray.400")}>
            {props.desc}
          </Text>

          <Wrap align="center" spacing="5%">
            <WrapItem>
              {props.button1 && (
                <Stack
                  width="30%"
                  mt={"2rem"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Link to={props.buttonLink1}>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      colorScheme={props.buttonColor}
                      borderRadius="15"
                      _focus={{
                        bg: "gray.200",
                      }}
                    >
                      {props.button1}
                    </Button>
                  </Link>
                </Stack>
              )}
            </WrapItem>
            <WrapItem>
              {props.button2 && (
                <Stack
                  width="30%"
                  mt={"2rem"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Link to={props.buttonLink2}>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      colorScheme={props.buttonColor2}
                      borderRadius="15"
                      _focus={{
                        bg: "gray.200",
                      }}
                    >
                      {props.button2}
                    </Button>
                  </Link>
                </Stack>
              )}
            </WrapItem>
          </Wrap>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ProjectPart;
