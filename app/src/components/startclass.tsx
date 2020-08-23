import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/core";
import { useNewClassroom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

const StartClass = () => {
  const createClassRoom = useNewClassroom();
  const [isLoading, setLoading] = useState(false);

  const startClassroom = async () => {
    console.log("Starting classroom");
    setLoading(true);
    const classroomID = await createClassRoom();
    setLoading(false);
    navigate(`teacher/${classroomID}`);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h={["xs", "sm", "md", "md", "md"]}
    >
      <Button
        isDisabled={isLoading}
        isLoading={isLoading}
        onClick={startClassroom}
      >
        Start the classroom
      </Button>
    </Flex>
  );
};

export default StartClass;
