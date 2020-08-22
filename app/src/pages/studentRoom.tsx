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
  const getRoomCount = useRoomCount();
  const leaveRoom = useLeaveRoom();
  const [roomCount, setRoomCount] = useState(0);
  const roomCountCallback = React.useCallback(async () => {
    if (roomID) {
      const count = await getRoomCount(roomID);
      setRoomCount(count);
    }
  }, [getRoomCount]);

  return (
    <Layout>
      <Box>
        <Text>Room Name: Room</Text>
        <Text>Room Code: {roomID}</Text>
        <Text onClick={roomCountCallback}>Room Participants: {roomCount}</Text>
      </Box>
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
      {roomID ? (
        <Button
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
    </Layout>
  );
};

export default StudentRoom;
