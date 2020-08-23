import React, { useState, useEffect } from "react";
import { Flex, Text, Icon } from "@chakra-ui/core";
import { useStudentList } from "../providers/TeacherProvider";
import { useRoomName } from "../providers/SocketProvider";

export interface ITeacherRoomStats {
  roomID: string;
}

const TeacherRoomStats: React.FC<ITeacherRoomStats> = ({ roomID }) => {
  const studentList = useStudentList();
  const getRoomName = useRoomName();
  const [isLoading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");

  const resolveRoomName = React.useCallback(async () => {
    setLoading(true);
    const name = await getRoomName(roomID);
    setRoomName(name);
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    resolveRoomName();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <Flex justifyContent="space-between" mt={10} mb={20}>
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight={900}>
          {roomName}
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
