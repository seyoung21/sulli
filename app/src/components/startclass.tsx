import React from "react";
import { Flex, Button } from "@chakra-ui/core";
import { useNewClassroom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

const StartClass = () => {
  const createClassRoom = useNewClassroom();

  const startClassroom = async () => {
    console.log("Starting classroom");
    const classroomID = await createClassRoom();
    navigate(`teacher/${classroomID}`);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h={["xs", "sm", "md", "md", "md"]}
    >
      <Button onClick={startClassroom}>Start the classroom</Button>
    </Flex>
  );
};

export default StartClass;
