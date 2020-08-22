import React from "react";
import { Flex, Button } from "@chakra-ui/core";
import { useSendStudentReaction } from "../providers/SocketProvider";

export interface IStudentReactions {
  roomID: string;
}

const StudentReactions: React.FC<IStudentReactions> = ({ roomID }) => {
  const sendStudentReaction = useSendStudentReaction();

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <Button
        onClick={() => {
          sendStudentReaction("happy", roomID);
        }}
      >
        Send happy reaction
      </Button>
    </Flex>
  );
};

export default StudentReactions;
