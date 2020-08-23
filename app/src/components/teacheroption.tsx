import React from "react";
import { Flex, Text, Link } from "@chakra-ui/core";

const TeacherOption = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <Text my={10}>
        Are you a teacher? Click{" "}
        {
          <Link href="teacher" color="yellow.400">
            here
          </Link>
        }
      </Text>
    </Flex>
  );
};

export default TeacherOption;
