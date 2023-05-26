import {Button, Center, Flex, Heading, HStack, Image, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import styles from "./About.module.css";
import React from "react";


const AboutPart = (props) => {
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
                        src={
                            props.img
                        }
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    p={1}
                    pt={2}>
                    <HStack>
                        <Heading fontSize={'4xl'} fontFamily={'body'}>
                            {props.title}
                        </Heading>
                        <Text fontSize="2xl" fontWeight={600} color={'gray.800'} size="sm" mb={4}>
                            {props.role}
                        </Text>
                        <a href={props.linkedinLink}>
                            <img className={styles.linkedinIcon} alt="" src="/statpad.github.io/linkedin.svg"/>
                        </a>
                        <a href={props.githubLink}>
                            <img className={styles.githubIcon} alt="" src="/statpad.github.io/github.svg"/>
                        </a>
                        <a href={props.gmailLink}>
                            <img className={styles.gmailIcon} alt="" src="/statpad.github.io/gmail.svg"/>
                        </a>

                    </HStack>

                    <Text
                        color={useColorModeValue('gray.700', 'gray.400')}
                    >
                        {props.desc}
                    </Text>

                </Stack>
            </Stack>
        </Center>
    )
}

export default AboutPart
