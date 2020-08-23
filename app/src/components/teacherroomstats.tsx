import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/core";
import { useStudentList } from "../providers/TeacherProvider";

export interface ITeacherRoomStats {
  roomID: string;
}

const TeacherRoomStats: React.FC<ITeacherRoomStats> = ({ roomID }) => {
  const studentList = useStudentList();

  return (
    <Flex justifyContent="space-between" mt={10} mb={20}>
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight={900}>
          Room Name
        </Text>
        <Flex alignItems="center">
          <Icon name="view" fontSize="3xl" mr={4} />
          <Text fontSize="3xl">{studentList ? studentList.length - 1 : 0}</Text>
        </Flex>
      </Flex>
      <Text fontSize="3xl" fontWeight={900} color="gray.400">
        {roomID}
      </Text>
    </Flex>
  );
};

export default TeacherRoomStats;
