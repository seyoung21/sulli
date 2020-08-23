import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
} from "@chakra-ui/core";
import { useJoinClassRoom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

const ClassRoomKey = () => {
  const joinRoom = useJoinClassRoom();
  const [classRoomID, setClassroomID] = useState<string>("");

  const joinRoomWithPin = async (roomID: string) => {
    console.log("Joining room", roomID);
    const status = await joinRoom({ roomID });
    if (status) {
      navigate(`student/${roomID}`);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h={["xs", "sm", "md", "md", "md"]}
    >
      <Heading w="100%" textAlign="center" my={10}>
        Enter Classroom Code
      </Heading>
      <Flex justifyContent="center" alignItems="center" w="100%">
        <InputGroup maxW="md" m="auto">
          <Input
            placeholder="XXXXX"
            fontWeight="bold"
            textAlign="center"
            px={10}
            onChange={(event: any) => setClassroomID(event.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon="chevron-right"
              aria-label="next"
              onClick={() => {
                joinRoomWithPin(classRoomID);
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default ClassRoomKey;
