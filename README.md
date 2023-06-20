# statpad.github.io

<Tbody>
              <Tr>
                <Td colSpan={3}>
                  <HStack>
                  <Stack>
                    <Stack direction="row" align="center" mt={4}>
                  <Text fontWeight="bold">Points &gt;</Text>
                  <Input
                    type="number"
                    value={filterPoints}
                    left="8%"
                    onChange={(e) => setFilterPoints(Number(e.target.value))}
                    width="30%"
                    placeholder="Enter Points"
                  />
                </Stack>
                <Stack direction="row" align="center" mt={4}>
                  <Text fontWeight="bold">Rebounds &gt;</Text>
                  <Input
                    type="number"
                    value={filterRebounds}
                    onChange={(e) => setFilterRebounds(Number(e.target.value))}
                    width="30%"
                    placeholder="Enter Rebounds"
                  />
                        </Stack>
                    </Stack>
                    <Button colorScheme="custom" bg="rgba(232, 158, 16, 0.88)" mt={4} onClick={handleFilterPoints}>
                  Filter
                </Button>

                  </HStack>


                </Td>
              </Tr>
            </Tbody>