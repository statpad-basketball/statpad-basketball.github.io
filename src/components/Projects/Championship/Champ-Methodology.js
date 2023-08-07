import React from "react";
import {
  Flex,
  Heading,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import ByBar from "../../Articles/ByBar";
import styles from "../Methods.module.css";

//TODO: Add style to text

const ChampMethodology = () => {
  return (
    <Flex p="10" flexDir="column">
      <Heading fontSize="6xl" className={styles.methodologyText}>
        METHODOLOGY:{" "}
      </Heading>
      <Heading fontSize="6xl" className={styles.hofCalcText}>
        HALL OF FAME CALCULATOR
      </Heading>
      <ByBar></ByBar>
      <Image
        className={styles.headerPlayers}
        src={"methods-header-players.svg"}
      />

      <Text pb="5" fontSize="2xl" className={styles.introHeadingText}>
        Intro heading goes here to introduce project, also a link to the Hall of
        Fame Calculator page itself{" "}
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.introBodyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in
        mollis nunc. Pellentesque massa placerat duis ultricies lacus sed turpis
        tincidunt id. Sed sed risus pretium quam vulputate dignissim. Ac turpis
        egestas maecenas pharetra. Facilisis volutpat est velit egestas dui id
        ornare arcu. Praesent tristique magna sit amet purus gravida quis
        blandit turpis. Laoreet sit amet cursus sit amet. Eget egestas purus
        viverra accumsan in nisl nisi scelerisque eu. Rhoncus dolor purus non
        enim praesent elementum facilisis. Ac orci phasellus egestas tellus
        rutrum. Egestas congue quisque egestas diam in arcu cursus euismod quis.
        Nibh sed pulvinar proin gravida hendrerit lectus. Convallis convallis
        tellus id interdum velit laoreet. Feugiat nibh sed pulvinar proin
        gravida hendrerit lectus a. Elementum tempus egestas sed sed risus
        pretium quam vulputate dignissim. Senectus et netus et malesuada fames
        ac. Vitae aliquet nec ullamcorper sit amet. Ut tellus elementum sagittis
        vitae et. Sed euismod nisi porta lorem. Id venenatis a condimentum vitae
        sapien pellentesque. Id diam maecenas ultricies mi eget mauris. Egestas
        integer eget aliquet nibh. Quis risus sed vulputate odio ut enim
        blandit. Gravida in fermentum et sollicitudin ac orci phasellus egestas
        tellus. Etiam non quam lacus suspendisse faucibus interdum posuere. Enim
        ut tellus elementum sagittis vitae et. Sed felis eget velit aliquet
        sagittis id consectetur. Ante in nibh mauris cursus mattis molestie a.
        Leo duis ut diam quam nulla. Donec enim diam vulputate ut pharetra.
        Egestas integer eget aliquet nibh praesent. Felis donec et odio
        pellentesque diam. Massa tincidunt nunc pulvinar sapien et ligula
        ullamcorper malesuada proin.
      </Text>
      <Text pb="5" fontSize="2xl" as="i" className={styles.secondHeadingText}>
        Second heading, sections describing data scraping/cleaning, the modeling
        process, assumptions
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.secondBodyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in
        mollis nunc. Pellentesque massa placerat duis ultricies lacus sed turpis
        tincidunt id. Sed sed risus pretium quam vulputate dignissim. Ac turpis
        egestas maecenas pharetra. Facilisis volutpat est velit egestas dui id
        ornare arcu. Praesent tristique magna sit amet purus gravida quis
        blandit turpis. Laoreet sit amet cursus sit amet. Eget egestas purus
        viverra accumsan in nisl nisi scelerisque eu. Rhoncus dolor purus non
        enim praesent elementum facilisis. Ac orci phasellus egestas tellus
        rutrum. Egestas congue quisque egestas diam in arcu cursus euismod quis.
        Nibh sed pulvinar proin gravida hendrerit lectus. Convallis convallis
        tellus id interdum velit laoreet. Feugiat nibh sed pulvinar proin
        gravida hendrerit lectus a. Elementum tempus egestas sed sed risus
        pretium quam vulputate dignissim. Senectus et netus et malesuada fames
        ac. Vitae aliquet nec ullamcorper sit amet. Ut tellus elementum sagittis
        vitae et. Sed euismod nisi porta lorem. Id venenatis a condimentum vitae
        sapien pellentesque. Id diam maecenas ultricies mi eget mauris. Egestas
        integer eget aliquet nibh. Quis risus sed vulputate odio ut enim
        blandit. Gravida in fermentum et sollicitudin ac orci phasellus egestas
        tellus. Etiam non quam lacus suspendisse faucibus interdum posuere. Enim
        ut tellus elementum sagittis vitae et. Sed felis eget velit aliquet
        sagittis id consectetur. Ante in nibh mauris cursus mattis molestie a.
        Leo duis ut diam quam nulla. Donec enim diam vulputate ut pharetra.
        Egestas integer eget aliquet nibh praesent. Felis donec et odio
        pellentesque diam. Massa tincidunt nunc pulvinar sapien et ligula
        ullamcorper malesuada proin.
      </Text>
      <Text pb="5" fontSize="2xl" as="i" className={styles.thirdHeadingText}>
        Third heading, maybe this is model coefficients? In a table?
      </Text>
      <HStack>
        <TableContainer width="100%" className={styles.coefficientsTable}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Variable</Th>
                <Th isNumeric>Coefficient</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Test 1</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 2</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 3</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 4</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
              <Tr>
                <Td>Test 5</Td>
                <Td isNumeric>1.000</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Text pb="5" fontSize="1xl" className={styles.thirdBodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl
          purus in mollis nunc. Pellentesque massa placerat duis ultricies lacus
          sed turpis tincidunt id. Sed sed risus pretium quam vulputate
          dignissim. Ac turpis egestas maecenas pharetra. Facilisis volutpat est
          velit egestas dui id ornare arcu. Praesent tristique magna sit amet
          purus gravida quis blandit turpis. Laoreet sit amet cursus sit amet.
          Eget egestas purus viverra accumsan in nisl nisi scelerisque eu.
          Rhoncus dolor purus non enim praesent elementum facilisis. Ac orci
          phasellus egestas tellus rutrum. Egestas congue quisque egestas diam
          in arcu cursus euismod quis. Nibh sed pulvinar proin gravida hendrerit
          lectus. Convallis convallis tellus id interdum velit laoreet. Feugiat
          nibh sed pulvinar proin gravida hendrerit lectus a. Elementum tempus
          egestas sed sed risus pretium quam vulputate dignissim. Senectus et
          netus et malesuada fames ac. Vitae aliquet nec ullamcorper sit amet.
          Ut tellus elementum sagittis vitae et. Sed euismod nisi porta lorem.
          Id venenatis a condimentum vitae sapien pellentesque. Id diam maecenas
          ultricies mi eget mauris. Egestas integer eget aliquet nibh. Quis
          risus sed vulputate odio ut enim blandit. Gravida in fermentum et
          sollicitudin ac orci phasellus egestas tellus. Etiam non quam lacus
          suspendisse faucibus interdum posuere. Enim ut tellus elementum
          sagittis vitae et. Sed felis eget velit aliquet sagittis id
          consectetur. Ante in nibh mauris cursus mattis molestie a. Leo duis ut
          diam quam nulla. Donec enim diam vulputate ut pharetra. Egestas
          integer eget aliquet nibh praesent. Felis donec et odio pellentesque
          diam. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper
          malesuada proin.
        </Text>
      </HStack>
      <Text pb="5" fontSize="2xl" as="i" className={styles.ackHeader}>
        Acknowledgements, sources, GitHub icon with link to GitHub repo, etc.
      </Text>
      <Text pb="5" fontSize="1xl" className={styles.ackBody}>
        Est placerat in egestas erat imperdiet sed. Semper auctor neque vitae
        tempus quam. Nibh praesent tristique magna sit amet purus. Amet est
        placerat in egestas erat imperdiet sed euismod. Sed turpis tincidunt id
        aliquet. Risus feugiat in ante metus dictum at. Ornare massa eget
        egestas purus viverra accumsan in. Urna nunc id cursus metus aliquam
        eleifend mi in nulla. Quam viverra orci sagittis eu. Eget nunc lobortis
        mattis aliquam faucibus purus in massa tempor. Leo integer malesuada
        nunc vel risus commodo viverra maecenas. Massa vitae tortor condimentum
        lacinia quis vel eros donec ac. Ultricies mi quis hendrerit dolor magna
        eget est lorem ipsum. Sapien faucibus et molestie ac feugiat. Morbi
        tristique senectus et netus. Venenatis urna cursus eget nunc
        scelerisque.
      </Text>
    </Flex>
  );
};

export default ChampMethodology;
