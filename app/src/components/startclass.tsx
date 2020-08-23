import React, { useState } from "react";
import { Flex, Button, Input } from "@chakra-ui/core";
import { useNewClassroom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

const StartClass = () => {
  const createClassRoom = useNewClassroom();
  const [isLoading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");

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
      <Input
        placeholder="Give this room a name. Ex: STAT1603_2A"
        fontSize="xl"
        py={10}
        px={10}
        m={10}
        maxW="md"
        onChange={(event: any) => setRoomName(event.target.value)}
      />
      <Button
        isDisabled={isLoading || roomName.length === 0}
        isLoading={isLoading}
        onClick={startClassroom}
        maxW="md"
        w="100%"
        variant={roomName.length ? "solid" : "outline"}
        variantColor="green"
        py={10}
      >
        Start the classroom
      </Button>
    </Flex>
  );
};

export default StartClass;
