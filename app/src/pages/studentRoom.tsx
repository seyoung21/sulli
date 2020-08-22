import React from "react";
import Layout from "../components/layout";
import { Heading } from "@chakra-ui/core";
import StudentReactions from "../components/studentreactions";

export interface IStudentRoom {
  path: any;
  roomID?: string;
}

const StudentRoom: React.FC<IStudentRoom> = ({ path, roomID }) => {
  return (
    <Layout>
      <Heading>Room: {roomID}</Heading>
      <StudentReactions />
    </Layout>
  );
};

export default StudentRoom;
