import React from "react";
import { Flex, Text, Link, Button } from "@chakra-ui/core";
import { useSendStudentReaction } from "../providers/SocketProvider";

const StudentReactions = () => {
  const sendStudentReaction = useSendStudentReaction();

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <Button
        onClick={() => {
          sendStudentReaction("happy");
        }}
      >
        Send happy reaction
      </Button>
    </Flex>
  );
};

export default StudentReactions;
