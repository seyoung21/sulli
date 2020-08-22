import React from "react";
import Layout from "../components/layout";
import { Heading } from "@chakra-ui/core";
import TeacherProvider, {
  IIncomingMessage,
} from "../providers/TeacherProvider";
import TeacherRoomStats from "../components/teacherroomstats";

export interface ITeacherRoom {
  path: any;
  roomID?: string;
}

const TeacherRoom: React.FC<ITeacherRoom> = ({ path, roomID }) => {
  const messageListener = (message: IIncomingMessage) => {
    console.log(message);
  };

  return (
    <Layout>
      <TeacherProvider incomingMessageListener={messageListener}>
        {roomID ? <TeacherRoomStats roomID={roomID} /> : <></>}
      </TeacherProvider>
    </Layout>
  );
};

export default TeacherRoom;
