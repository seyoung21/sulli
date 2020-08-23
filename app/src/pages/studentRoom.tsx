import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Heading, Flex, Text, Box, Button } from "@chakra-ui/core";
import StudentReactions from "../components/studentreactions";
import { useLeaveRoom, useRoomName } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

export interface IStudentRoom {
  path: any;
  roomID?: string;
}

const StudentRoom: React.FC<IStudentRoom> = ({ path, roomID }) => {
  const leaveRoom = useLeaveRoom();
  const getRoomName = useRoomName();

  const [isLoading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");

  const resolveRoomName = React.useCallback(async () => {
    if (roomID) {
      setLoading(true);
      const name = await getRoomName(roomID);
      console.log(name);
      setRoomName(name);
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    resolveRoomName();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Flex justifyContent="space-between" width="100%">
          <Text fontSize="3xl" fontWeight={900} color="gray.400">
            Loading...
          </Text>
          <Text fontSize="3xl" fontWeight={900} color="gray.400">
            {roomID}
          </Text>
        </Flex>
      ) : (
        <Flex justifyContent="space-between" width="100%">
          <Text fontSize="3xl" fontWeight={900}>
            {roomName}
          </Text>
          <Text fontSize="3xl" fontWeight={900} color="gray.400">
            {roomID}
          </Text>
        </Flex>
      )}
      <Flex
        h={["xs", "sm", "md", "md", "md"]}
        alignItems="center"
        justifyContent="center"
        m="auto"
        flexDirection="column"
      >
        <Heading my={20}>How are you feeling?</Heading>
        <StudentReactions roomID={roomID || ""} />
      </Flex>
      <Flex w="100%" justifyContent="right">
        {roomID ? (
          <Button
            my={10}
            p={6}
            bg="red.500"
            color="white"
            borderRadius={10}
            _hover={{ backgroundColor: "red.400" }}
            onClick={() => {
              leaveRoom(roomID);
              navigate("/");
            }}
          >
            Leave
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </Layout>
  );
};

export default StudentRoom;
