import React from "react";
import { Flex, Heading, Text, Icon } from "@chakra-ui/core";
import { useRoomCount } from "../providers/SocketProvider";
import { useStudentList } from "../providers/TeacherProvider";

export interface ITeacherRoomStats {
  roomID: string;
}

const TeacherRoomStats: React.FC<ITeacherRoomStats> = ({ roomID }) => {
  const studentList = useStudentList();

  return (
    <Flex flexDirection="column">
      <Text>Room ID: {roomID}</Text>
      <Text>Room Name: Room</Text>
      <Flex alignItems="center">
        <Icon name="view" fontSize={24} mr={4} />
        <Text>{studentList ? studentList.length - 1 : 0}</Text>
      </Flex>
    </Flex>
  );
};

export default TeacherRoomStats;
