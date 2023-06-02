import React from 'react'
import {Stack, Text} from '@chakra-ui/react'

//TODO: Add style to text

const ByBar = () => {
    return (
        <Stack
            borderWidth="1px"
            borderRadius="30"
            w="100%"
            height="64px"
            direction="row"
            bg="#F2F0F0"
            pr={4}
            mb="4"
            justifyContent= "center"
            alignItems= "center"
            position= "absolute"
            width= "1353px"
            left= "48px"
            top= "298px"
        >
            <Text zIndex="1" pb="5" fontSize="1xl" fontFamily="Open Sans" letterSpacing="-0.02em" marginLeft="auto" textAlign="right">By Frankie Willard and Miles King</Text>
        </Stack>
    )
}

export default ByBar
