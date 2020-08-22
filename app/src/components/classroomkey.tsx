import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/core";
import { useJoinClassRoom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

const ClassRoomKey = () => {
  const joinRoom = useJoinClassRoom();
  const [classRoomID, setClassroomID] = useState<string>("");

  const joinRoomWithPin = (roomID: string) => {
    console.log("Joining room", roomID);
    const status = joinRoom({ roomID });
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
      <Text my={10}>Enter Classroom Code</Text>
      <InputGroup>
        <Input
          placeholder="XXXXX"
          mx={10}
          textAlign="center"
          maxW="md"
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
  );
};

export default ClassRoomKey;
