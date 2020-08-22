import React from "react";
import { Flex, Text, Input } from "@chakra-ui/core";

const ClassRoomKey = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h={["xs", "sm", "md", "md", "md"]}
    >
      <Text my={10}>Enter Classroom Code</Text>
      <Input placeholder="XXXXX" mx={10} textAlign="center" maxW="md" />
    </Flex>
  );
};

export default ClassRoomKey;
