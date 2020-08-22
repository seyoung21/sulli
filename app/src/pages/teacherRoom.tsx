import React from "react";
import Layout from "../components/layout";
import { Heading } from "@chakra-ui/core";

export interface ITeacherRoom {
  path: any;
  roomID?: string;
}

const TeacherRoom: React.FC<ITeacherRoom> = ({ path, roomID }) => {
  return (
    <Layout>
      <Heading>Room: {roomID}</Heading>
    </Layout>
  );
};

export default TeacherRoom;
