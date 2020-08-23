import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Heading, Flex, Text, Box, Button } from "@chakra-ui/core";
import StudentReactions from "../components/studentreactions";
import { useRoomCount, useLeaveRoom } from "../providers/SocketProvider";
import { navigate } from "@reach/router";

export interface IStudentRoom {
  path: any;
  roomID?: string;
}

const StudentRoom: React.FC<IStudentRoom> = ({ path, roomID }) => {
  const leaveRoom = useLeaveRoom();

  return (
    <Layout>
      <Flex justifyContent="right" width="100%">
        <Text fontSize="3xl" fontWeight={900} color="gray.400">
          {roomID}
        </Text>
      </Flex>
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
