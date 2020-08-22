import React from "react";
import { Flex, Button } from "@chakra-ui/core";

const StartClass = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h={["xs", "sm", "md", "md", "md"]}
    >
      <Button>Start the classroom</Button>
    </Flex>
  );
};

export default StartClass;
