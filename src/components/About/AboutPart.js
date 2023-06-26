import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Image,
  Stack,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./About.module.css";
import React from "react";

const AboutPart = (props) => {
  return (
    <Center>
      <Stack
        borderWidth="1px"
        borderRadius="30"
        w="70%"
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
              {props.role}
            </Text>
          </HStack>

          <Text color={useColorModeValue("gray.700", "gray.400")}>
            {props.desc}
          </Text>
        </Stack>
        <HStack spacing={4} position="relative" bottom="30%" right="5%">
          <Link href={props.linkedinLink}>
            <Image className={styles.icon} alt="" src="linkedin.svg" />
          </Link>
          <Link href={props.githubLink}>
            <Image className={styles.icon} alt="" src="github.svg" />
          </Link>
          <Link href={props.gmailLink}>
            <Image className={styles.icon} alt="" src="gmail.svg" />
          </Link>
        </HStack>
      </Stack>
    </Center>
  );
};

export default AboutPart;
